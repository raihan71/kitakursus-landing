import type { VercelRequest, VercelResponse } from '@vercel/node';

const GOOGLE_RECAPTCHA_ENDPOINT =
  'https://www.google.com/recaptcha/api/siteverify';
const MIN_SCORE = Number.parseFloat(process.env.RECAPTCHA_MIN_SCORE ?? '0.5');

const recaptchaSecretKey = process.env.RECAPTCHA_SECRET_KEY;
const allowedOrigins = (process.env.RECAPTCHA_ALLOWED_ORIGINS ?? '*')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const corsAllowsAny = allowedOrigins.includes('*');

const nnnEndpoint =
  process.env.NNN_ENROLL_ENDPOINT ?? process.env.VITE_ENDPOINT_NNN ?? '';
const nnnUsername =
  process.env.NNN_BASIC_AUTH_USERNAME ??
  process.env.BASIC_AUTH_USERNAME ??
  process.env.VITE_BASIC_AUTH_USERNAME ??
  '';
const nnnPassword =
  process.env.NNN_BASIC_AUTH_PASSWORD ??
  process.env.BASIC_AUTH_PASSWORD ??
  process.env.VITE_BASIC_AUTH_PASSWORD ??
  '';

const getAllowedOrigin = (requestOrigin?: string) => {
  if (corsAllowsAny) {
    return requestOrigin ?? '*';
  }

  if (requestOrigin && allowedOrigins.includes(requestOrigin)) {
    return requestOrigin;
  }

  return allowedOrigins[0] ?? '*';
};

const setCorsHeaders = (res: VercelResponse, origin?: string) => {
  res.setHeader('Access-Control-Allow-Origin', getAllowedOrigin(origin));
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Vary', 'Origin');
};

const handleOptions = (req: VercelRequest, res: VercelResponse) => {
  setCorsHeaders(res, req.headers.origin);
  res.status(204).end();
};

const respondJson = (
  res: VercelResponse,
  origin: string | undefined,
  status: number,
  payload: unknown,
) => {
  setCorsHeaders(res, origin);
  res.status(status).json(payload);
};

type EnrollmentPayload = {
  fullName: string;
  email: string;
  phone: string;
  notes?: string;
  course?: string;
};

const verifyTokenWithGoogle = async (token: string, remoteIp?: string) => {
  if (!recaptchaSecretKey) {
    throw new Error('Server misconfigured: missing RECAPTCHA_SECRET_KEY.');
  }

  const params = new URLSearchParams({
    secret: recaptchaSecretKey,
    response: token,
  });

  if (remoteIp) {
    params.set('remoteip', remoteIp);
  }

  const response = await fetch(GOOGLE_RECAPTCHA_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params.toString(),
  });

  if (!response.ok) {
    throw new Error(
      `Failed to contact Google reCAPTCHA: ${response.status} ${response.statusText}`,
    );
  }

  return response.json();
};

const forwardEnrollment = async (payload: EnrollmentPayload) => {
  if (!nnnEndpoint) {
    throw new Error('Server misconfigured: missing NNN endpoint.');
  }

  if (!nnnUsername || !nnnPassword) {
    throw new Error('Server misconfigured: missing Basic auth credentials.');
  }

  const credentials = Buffer.from(`${nnnUsername}:${nnnPassword}`, 'utf8').toString(
    'base64',
  );

  const response = await fetch(nnnEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${credentials}`,
    },
    body: JSON.stringify(payload),
  });

  const textBody = await response.text();
  let parsedBody: unknown = null;

  try {
    parsedBody = textBody ? JSON.parse(textBody) : null;
  } catch {
    parsedBody = textBody;
  }

  if (!response.ok) {
    throw new Error(
      `NNN endpoint responded with ${response.status}: ${
        typeof parsedBody === 'string' ? parsedBody : JSON.stringify(parsedBody)
      }`,
    );
  }

  return parsedBody;
};

const sanitizePayload = (payload: EnrollmentPayload): EnrollmentPayload => ({
  fullName: payload.fullName.trim(),
  email: payload.email.trim().toLowerCase(),
  phone: payload.phone.trim(),
  notes: payload.notes?.trim() ?? '',
  course: payload.course?.trim(),
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'OPTIONS') {
    handleOptions(req, res);
    return;
  }

  if (req.method !== 'POST') {
    respondJson(res, req.headers.origin, 405, { error: 'Method Not Allowed' });
    return;
  }

  try {
    let requestBody = req.body ?? {};
    if (typeof req.body === 'string') {
      try {
        requestBody = JSON.parse(req.body);
      } catch (parseError) {
        respondJson(res, req.headers.origin, 400, {
          error: 'Invalid JSON payload.',
          details:
            parseError instanceof Error ? parseError.message : 'Unable to parse request body.',
        });
        return;
      }
    }

    const token = typeof requestBody?.token === 'string' ? requestBody.token : null;
    const remoteIp =
      typeof requestBody?.remoteIp === 'string' ? requestBody.remoteIp : undefined;
    const payload = requestBody?.payload as EnrollmentPayload | undefined;

    if (!token) {
      respondJson(res, req.headers.origin, 400, {
        error: 'Missing reCAPTCHA token.',
      });
      return;
    }

    if (!payload) {
      respondJson(res, req.headers.origin, 400, {
        error: 'Missing enrollment payload.',
      });
      return;
    }

    const requiredFields: (keyof EnrollmentPayload)[] = ['fullName', 'email', 'phone'];
    const missingField = requiredFields.find((field) => {
      const value = payload[field];
      return typeof value !== 'string' || value.trim().length === 0;
    });

    if (missingField) {
      respondJson(res, req.headers.origin, 400, {
        error: `Field "${missingField}" is required.`,
      });
      return;
    }

    const verification = await verifyTokenWithGoogle(token, remoteIp);
    const success = Boolean(verification.success);
    const score =
      typeof verification.score === 'number' ? verification.score : undefined;

    if (!success) {
      respondJson(res, req.headers.origin, 400, {
        error: 'Failed to verify reCAPTCHA token.',
        errors: verification['error-codes'] ?? [],
      });
      return;
    }

    const belowThreshold =
      typeof score === 'number'
        ? Number.isFinite(MIN_SCORE) && score < MIN_SCORE
        : false;

    if (belowThreshold) {
      respondJson(res, req.headers.origin, 400, {
        error: 'reCAPTCHA score below threshold.',
        score,
      });
      return;
    }

    const sanitizedPayload = sanitizePayload(payload);

    const remoteResponse = await forwardEnrollment(sanitizedPayload);

    respondJson(res, req.headers.origin, 200, {
      success: true,
      score,
      message:
        remoteResponse && typeof remoteResponse === 'object'
          ? (remoteResponse as Record<string, unknown>).message ?? 'success enroll'
          : 'success enroll',
      remoteResponse,
    });
  } catch (error) {
    console.error('Enrollment handler error:', error);
    respondJson(res, req.headers.origin, 500, {
      error: 'Unable to submit enrollment.',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}

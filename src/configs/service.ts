const hunterEmailApi = 'https://api.hunter.io/v2';
const nnnEndpoint = import.meta.env.VITE_ENDPOINT_NNN;
const apiKey = import.meta.env.VITE_EMAIL_HUNTER_API;
const reCaptchaSiteKey = import.meta.env.VITE_RCAPTCHA_SITE_KEY;
const reCaptchaSecretKey = import.meta.env.VITE_RCAPTCHA_SECRET_KEY;

export const serviceConfig = {
  verify: (email: string) => {
    const params = new URLSearchParams({
      email,
      api_key: apiKey,
    });

    if (!apiKey) {
      throw new Error('Email Hunter API key is not configured.');
    }

    return `${hunterEmailApi}/email-verifier?${params.toString()}`;
  },
  submitEnrollment: () => {
    if (!nnnEndpoint) {
      throw new Error('Enrollment endpoint is not configured.');
    }

    return nnnEndpoint;
  },
  reCaptcha: () => {
    if (!reCaptchaSiteKey || !reCaptchaSecretKey) {
      throw new Error('reCAPTCHA site key and secret key are not configured.');
    }

    return {
      endpoint: 'https://www.google.com/recaptcha/api/siteverify',
      siteKey: reCaptchaSiteKey,
      secretKey: reCaptchaSecretKey,
    } as const;
  },
};

const hunterEmailApi = 'https://api.hunter.io/v2';
const apiKey = import.meta.env.VITE_EMAIL_HUNTER_API;
const reCaptchaSiteKey = import.meta.env.VITE_RCAPTCHA_SITE_KEY;
const enrollmentApiEndpoint =
  import.meta.env.VITE_ENROLLMENT_API ?? '/api/enroll';

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
  submitEnrollment: () => enrollmentApiEndpoint,
  reCaptcha: () => {
    if (!reCaptchaSiteKey) {
      throw new Error('reCAPTCHA site key is not configured.');
    }

    return {
      siteKey: reCaptchaSiteKey,
    } as const;
  },
};

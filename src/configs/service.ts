const hunterEmailApi = 'https://api.hunter.io/v2';
const nnnEndpoint = import.meta.env.VITE_ENDPOINT_NNN;
const apiKey = import.meta.env.VITE_EMAIL_HUNTER_API;

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
};

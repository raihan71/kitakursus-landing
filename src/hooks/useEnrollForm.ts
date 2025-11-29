import {
  type ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import type { FormEvent } from 'react';
import { fetchData } from '../services/fetch';
import { serviceConfig } from '../configs/service';
import { useRecaptcha } from './useRecaptcha';

type EnrollFormData = {
  fullName: string;
  email: string;
  phone: string;
  notes: string;
};

type HunterVerificationResponse = {
  data?: {
    status?: string;
    score?: number;
  };
};

type UseEnrollFormOptions = {
  courseTitle?: string;
  messages: {
    invalidEmail: string;
    genericError: string;
  };
  onSuccess?: () => void;
};

type UseEnrollFormResult = {
  formData: EnrollFormData;
  handleChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  isSubmitting: boolean;
  errorMessage: string | null;
};

const createInitialState = (): EnrollFormData => ({
  fullName: '',
  email: '',
  phone: '',
  notes: '',
});

const encodeCredentials = (username: string, password: string) => {
  if (typeof globalThis.btoa === 'function') {
    return globalThis.btoa(`${username}:${password}`);
  }

  throw new Error('Unable to encode credentials in this environment.');
};

export const useEnrollForm = ({
  courseTitle,
  messages,
  onSuccess,
}: UseEnrollFormOptions): UseEnrollFormResult => {
  const [formData, setFormData] = useState<EnrollFormData>(() =>
    createInitialState(),
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const { getToken: getRecaptchaToken } = useRecaptcha();

  useEffect(() => () => abortControllerRef.current?.abort(), []);

  const handleChange = useCallback<UseEnrollFormResult['handleChange']>(
    (event) => {
      const { name, value } = event.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    [],
  );

  const handleSubmit = useCallback<UseEnrollFormResult['handleSubmit']>(
    async (event) => {
      event.preventDefault();
      setErrorMessage(null);
      setIsSubmitting(true);

      abortControllerRef.current?.abort();
      const controller = new AbortController();
      abortControllerRef.current = controller;

      try {
        const recaptchaToken = await getRecaptchaToken('submit_enrollment');

        const sanitizedPayload = {
          fullName: formData.fullName.trim(),
          email: formData.email.trim().toLowerCase(),
          phone: formData.phone.trim(),
          notes: formData.notes.trim(),
          course: courseTitle,
          recaptchaToken,
        };

        const verification = await fetchData<HunterVerificationResponse>(
          serviceConfig.verify(sanitizedPayload.email),
          { signal: controller.signal },
        );

        const status = verification.data?.status;
        const score = verification.data?.score ?? 0;

        if (status !== 'valid' || score <= 50) {
          throw new Error(messages.invalidEmail);
        }

        const username = import.meta.env.VITE_BASIC_AUTH_USERNAME;
        const password = import.meta.env.VITE_BASIC_AUTH_PASSWORD;

        if (!username || !password) {
          throw new Error(messages.genericError);
        }

        const credentials = encodeCredentials(username, password);

        const resp: any = await fetchData(serviceConfig.submitEnrollment(), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${credentials}`,
          },
          body: JSON.stringify(sanitizedPayload),
          signal: controller.signal,
        });

        if (resp.message === 'success enroll') {
          setFormData(createInitialState());
          setIsSubmitting(false);
          onSuccess?.();
        } else {
          throw new Error(messages.genericError);
        }
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          setIsSubmitting(false);
          return;
        }

        console.error('Enrollment failed', error);
        setIsSubmitting(false);
        setErrorMessage(
          error instanceof Error ? error.message : messages.genericError,
        );
      }
    },
    [courseTitle, formData, messages, onSuccess, getRecaptchaToken],
  );

  return {
    formData,
    handleChange,
    handleSubmit,
    isSubmitting,
    errorMessage,
  };
};

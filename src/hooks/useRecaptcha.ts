import { useCallback, useMemo, useRef, useState } from 'react';
import { serviceConfig } from '../configs/service';

type GrecaptchaV3 = {
  ready(callback: () => void): void;
  execute(siteKey: string, options?: { action?: string }): Promise<string>;
};

type UseRecaptchaOptions = {
  actionName?: string;
};

type UseRecaptchaResult = {
  isReady: boolean;
  loadError: string | null;
  getToken: (action?: string) => Promise<string>;
};

const SCRIPT_ID = 'kitakursus-recaptcha-script';
const DEFAULT_ACTION = 'submit_enrollment';

const getGreCaptcha = () =>
  (globalThis as typeof globalThis & { grecaptcha?: GrecaptchaV3 }).grecaptcha;

export const useRecaptcha = (
  options?: UseRecaptchaOptions,
): UseRecaptchaResult => {
  const recaptchaConfig = useMemo(() => serviceConfig.reCaptcha(), []);
  const [isReady, setIsReady] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const loadPromiseRef = useRef<Promise<void> | null>(null);
  const defaultAction = options?.actionName ?? DEFAULT_ACTION;

  const ensureScriptLoaded = useCallback(() => {
    if (loadPromiseRef.current) {
      return loadPromiseRef.current;
    }

    loadPromiseRef.current = new Promise<void>((resolve, reject) => {
      if (typeof document === 'undefined') {
        const error = new Error('reCAPTCHA is only available in the browser.');
        setLoadError(error.message);
        reject(error);
        return;
      }

      const handleLoad = () => {
        const recaptcha = getGreCaptcha();
        if (recaptcha?.ready) {
          recaptcha.ready(() => {
            setIsReady(true);
            resolve();
          });
        } else {
          setIsReady(true);
          resolve();
        }
      };

      const handleError = () => {
        const error = new Error('Failed to load reCAPTCHA script.');
        setLoadError(error.message);
        loadPromiseRef.current = null;
        reject(error);
      };

      const recaptcha = getGreCaptcha();
      if (recaptcha) {
        recaptcha.ready(() => {
          setIsReady(true);
          resolve();
        });
        return;
      }

      const existingScript = document.getElementById(SCRIPT_ID);
      if (existingScript) {
        existingScript.addEventListener('load', handleLoad, { once: true });
        existingScript.addEventListener('error', handleError, { once: true });
        return;
      }

      const script = document.createElement('script');
      script.id = SCRIPT_ID;
      script.src = `https://www.google.com/recaptcha/api.js?render=${recaptchaConfig.siteKey}`;
      script.async = true;
      script.defer = true;
      script.addEventListener('load', handleLoad, { once: true });
      script.addEventListener('error', handleError, { once: true });
      document.body.appendChild(script);
    });

    return loadPromiseRef.current;
  }, [recaptchaConfig.siteKey]);

  const getToken = useCallback(
    async (action = defaultAction) => {
      await ensureScriptLoaded();
      const recaptcha = getGreCaptcha();

      if (!recaptcha?.execute) {
        throw new Error('reCAPTCHA is not ready.');
      }

      const token = await recaptcha.execute(recaptchaConfig.siteKey, { action });

      if (!token) {
        throw new Error('Unable to retrieve reCAPTCHA token.');
      }

      return token;
    },
    [defaultAction, ensureScriptLoaded, recaptchaConfig.siteKey],
  );

  return {
    isReady,
    loadError,
    getToken,
  };
};

import React, { useState, useEffect } from 'react';

interface ToastProps {
  message: string;
  onClose: () => void;
}

const COOKIE_NAME = 'toast_shown';

function setCookie(name: string, value: string, days: number) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie =
    name +
    '=' +
    encodeURIComponent(value) +
    '; expires=' +
    expires +
    '; path=/';
}

function getCookie(name: string) {
  return document.cookie
    .split('; ')
    .find((row) => row.startsWith(name + '='))
    ?.split('=')[1];
}

const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!getCookie(COOKIE_NAME)) {
      setIsVisible(true);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setCookie(COOKIE_NAME, '1', 365); // Set for 1 year
    onClose();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-gray-800 text-white py-3 px-6 rounded-lg shadow-lg flex items-center justify-between max-w-sm z-50">
      <span>{message}</span>
      <button
        onClick={handleClose}
        className="ml-4 cursor-pointer text-white hover:text-gray-300"
      >
        Ok
      </button>
    </div>
  );
};

export default Toast;

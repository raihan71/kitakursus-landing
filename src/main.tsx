import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import mixpanel from 'mixpanel-browser';
import './index.css';
import './i18n';
import routes from './routes.tsx';

mixpanel.init(import.meta.env.VITE_MIXPANEL_TOKEN as string, {
  autocapture: true,
  debug: false,
  persistence: 'cookie',
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={routes} />
  </StrictMode>,
);

import React, { Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { Loader } from './components/shared/elements';

const Welcome = React.lazy(() => import('./pages/welcome'));
const DetailCourse = React.lazy(() => import('./pages/course/[id]'));
const EnrollCourse = React.lazy(() => import('./pages/enroll/[id]'));
const About = React.lazy(() => import('./pages/about'));

const routes = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<Loader />}>
        <Welcome />
      </Suspense>
    ),
  },
  {
    path: '/about',
    element: (
      <Suspense fallback={<Loader />}>
        <About />
      </Suspense>
    ),
  },
  {
    path: '/course/:id',
    element: (
      <Suspense fallback={<Loader />}>
        <DetailCourse />
      </Suspense>
    ),
  },
  {
    path: '/enroll/:id',
    element: (
      <Suspense fallback={<Loader />}>
        <EnrollCourse />
      </Suspense>
    ),
  },
]);

export default routes;

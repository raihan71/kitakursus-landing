import { createBrowserRouter } from 'react-router-dom';
import { Welcome } from './pages/welcome';
import DetailCourse from './pages/course/[id]';
import EnrollCourse from './pages/enroll/[id]';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <Welcome />,
  },
  {
    path: '/course/:id',
    element: <DetailCourse />,
  },
  {
    path: '/enroll/:id',
    element: <EnrollCourse />,
  },
]);

export default routes;

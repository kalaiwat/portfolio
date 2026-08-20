import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { RootLayout } from './layouts/RootLayout';
import { Home } from './routes/Home';
import { About } from './routes/About';
import { Projects } from './routes/Projects';
import { ProjectDetail } from './routes/ProjectDetail';
import { Experience } from './routes/Experience';
import { ExperienceDetail } from './routes/ExperienceDetail';
import { Writing } from './routes/Writing';
import { WritingPost } from './routes/WritingPost';
import { NotFound } from './routes/NotFound';

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/about', element: <About /> },
      { path: '/projects', element: <Projects /> },
      { path: '/projects/:slug', element: <ProjectDetail /> },
      { path: '/experience', element: <Experience /> },
      { path: '/experience/:slug', element: <ExperienceDetail /> },
      { path: '/writing', element: <Writing /> },
      { path: '/writing/:slug', element: <WritingPost /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

export function App() {
  return <RouterProvider router={router} />;
}

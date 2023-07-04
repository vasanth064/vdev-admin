import { Typography } from '@mui/material';
import { Navigate } from 'react-router-dom';
import About from './Pages/About';
import Login from './Pages/Login';
import Projects from './Pages/Projects';
import SocialLinks from './Pages/SocialLinks';

const projectRoutes = [
  {
    path: '/',
    private: true,
    element: <Projects />,
  },
  {
    path: '/home',
    private: true,
    element: <Navigate to='/' replace />,
  },
  {
    path: '/login',
    private: false,
    element: <Login />,
  },
  {
    path: '/projects',
    private: true,
    element: <Navigate to='/' replace />,
  },
  // {
  //   path: '/about',
  //   private: true,
  //   element: <About />,
  // },
  // {
  //   path: '/contact',
  //   private: true,
  //   element: <Contact />,
  // },
  // {
  //   path: '/navigation',
  //   private: true,
  //   element: <Navigation />,
  // },
  {
    path: '/social',
    private: true,
    element: <SocialLinks />,
  },
  {
    path: '*',
    private: true,
    element: <Typography variant='h1'>Not Found</Typography>,
  },
];

export default projectRoutes;

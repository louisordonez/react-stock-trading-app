import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
  Route,
} from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import './index.css';
import Root from './routes/root';
import ErrorPage from './error-page';
import SignIn from './routes/sign-in';
import SignUp from './routes/sign-up';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Root />} errorElement={<ErrorPage />} />
      <Route path="/sign_in" element={<SignIn />} />
      <Route path="/sign_up" element={<SignUp />} />
    </>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MantineProvider theme={{ colorScheme: 'dark' }}>
      <RouterProvider router={router} />
    </MantineProvider>
  </React.StrictMode>
);

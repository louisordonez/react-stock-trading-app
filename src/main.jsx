import React from 'react';
import ReactDOM from 'react-dom/client';
import { createRoutesFromElements, createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { Toaster } from 'react-hot-toast';
import './index.css';
import Root from './routes/root';
import ErrorPage from './error-page';
import SignIn from './routes/sign-in';
import SignUp from './routes/sign-up';
import Client from './routes/client';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Root />} errorElement={<ErrorPage />} />
      <Route path="/sign_in" element={<SignIn />} />
      <Route path="/sign_up" element={<SignUp />} />
      <Route path="/client" element={<Client />} />
    </>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MantineProvider theme={{ colorScheme: 'dark' }}>
      <Toaster position="top-right" reverseOrder={true} />
      <RouterProvider router={router} />
    </MantineProvider>
  </React.StrictMode>
);

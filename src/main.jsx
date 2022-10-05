import React from 'react';
import ReactDOM from 'react-dom/client';
import { createRoutesFromElements, createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import './index.css';
import Root from './routes/Root';
import Error from './routes/Error';
import SignIn from './routes/SignIn';
import SignUp from './routes/SignUp';
import Client from './routes/Client';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Root />} errorElement={<Error />} />
      <Route path="/sign_in" element={<SignIn />} />
      <Route path="/sign_up" element={<SignUp />} />
      <Route path="/client" element={<Client />} />
    </>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MantineProvider theme={{ colorScheme: 'dark' }}>
      <NotificationsProvider position="top-right" zIndex={2077}>
        <RouterProvider router={router} />
      </NotificationsProvider>
    </MantineProvider>
  </React.StrictMode>
);

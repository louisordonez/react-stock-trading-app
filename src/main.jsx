import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
  Route,
} from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import './index.css';
import Root from './routes/Root';
import Error from './routes/Error';
import SignIn from './routes/SignIn';
import SignUp from './routes/SignUp';
import VerifyEmail from './routes/VerifyEmail';
import ProtectedRoute from './routes/ProtectedRoute';
import {
  SIGN_IN_LINK,
  SIGN_UP_LINK,
  VERIFY_EMAIL_LINK,
  CLIENT_DASHBOARD_LINK,
  CLIENT_MARKET_LINK,
  CLIENT_WALLET_LINK,
  CLIENT_PORTFOLIO_LINK,
  CLIENT_USERS_LINK,
  CLIENT_TRANSACTIONS_LINK,
  CLIENT_ACCOUNT_LINK,
} from './services/constants/links';
import Client from './routes/Client/Client';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Root />} errorElement={<Error />} />
      <Route path={`${SIGN_IN_LINK}`} element={<SignIn />} />
      <Route path={`${SIGN_UP_LINK}`} element={<SignUp />} />
      <Route path={`${VERIFY_EMAIL_LINK}`} element={<VerifyEmail />} />
      <Route element={<ProtectedRoute />}>
        <Route errorElement={<Error />}>
          <Route path={`${CLIENT_DASHBOARD_LINK}`} element={<Client />} />
          <Route path={`${CLIENT_MARKET_LINK}`} element={<Client />} />
          <Route path={`${CLIENT_WALLET_LINK}`} element={<Client />} />
          <Route path={`${CLIENT_PORTFOLIO_LINK}`} element={<Client />} />
          <Route path={`${CLIENT_USERS_LINK}`} element={<Client />} />
          <Route path={`${CLIENT_TRANSACTIONS_LINK}`} element={<Client />} />
          <Route path={`${CLIENT_ACCOUNT_LINK}`} element={<Client />} />
        </Route>
      </Route>
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

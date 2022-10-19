import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SHOW_USER_ENDPOINT } from '../constants/usersEndpoints';
import { SIGN_IN_LINK, SIGN_UP_LINK, VERIFY_EMAIL_LINK, CLIENT_DASHBOARD_LINK } from '../constants/links';
import { accessTokenCookie } from '../constants/cookies';
import { isLoggedIn } from './isLoggedIn';
import { axiosGet } from './axios';
import { getCookie } from './cookie';

export const useRedirect = () => {
  const navigate = useNavigate();
  const accessToken = getCookie(accessTokenCookie);
  const headers = { Authorization: accessToken };
  let urlPath = window.location.pathname.split('/');

  urlPath = `/${urlPath[1]}`;

  useEffect(() => {
    isLoggedIn().then((bool) => {
      if (bool) {
        axiosGet(SHOW_USER_ENDPOINT, headers).then((response) => {
          if (!response.data.email_verified) {
            navigate(VERIFY_EMAIL_LINK);
          }
        });

        switch (urlPath) {
          case '/':
            navigate(CLIENT_DASHBOARD_LINK);
            break;
          case SIGN_IN_LINK:
          case SIGN_UP_LINK:
            navigate(CLIENT_DASHBOARD_LINK);
        }
      } else {
        switch (urlPath) {
          case '/':
            navigate('/');
            break;
          case SIGN_UP_LINK:
            navigate(SIGN_UP_LINK);
            break;
          default:
            navigate(SIGN_IN_LINK);
            break;
        }
      }
    });
  }, []);
};

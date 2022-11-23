import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SHOW_USER_ENDPOINT } from '../constants/usersEndpoints';
import {
  SIGN_IN_LINK,
  SIGN_UP_LINK,
  VERIFY_EMAIL_LINK,
  CLIENT_DASHBOARD_LINK,
} from '../constants/links';
import { accessTokenCookie } from '../constants/cookies';
import { isLoggedIn } from './isLoggedIn';
import { axiosGet } from './axios';
import { getCookie } from './cookie';

export const useRedirect = () => {
  const navigate = useNavigate();
  const accessToken = getCookie(accessTokenCookie);
  const headers = {
    'Access-Control-Allow-Origin': '*',
    Authorization: accessToken,
  };
  const urlPath = `/${window.location.pathname.split('/')[1]}`;

  useEffect(() => {
    if (isLoggedIn()) {
      axiosGet(SHOW_USER_ENDPOINT, headers).then((response) => {
        if (response.data.error !== undefined) {
          navigate(VERIFY_EMAIL_LINK);
        }
      });

      navigate(CLIENT_DASHBOARD_LINK);
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
  }, []);
};

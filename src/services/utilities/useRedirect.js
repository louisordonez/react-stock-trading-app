import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SHOW_USER_ENDPOINT } from '../constants/usersEndpoints';
import { SIGN_IN_LINK, SIGN_UP_LINK, VERIFY_EMAIL_LINK, CLIENT_DASHBOARD_LINK } from '../constants/links';
import { isLoggedIn } from './isLoggedIn';
import { axiosGet } from './axios';
import { accessTokenCookie, getCookie } from './cookie';

export const useRedirect = () => {
  const navigate = useNavigate();
  const accessToken = getCookie(accessTokenCookie);
  const headers = {
    Authorization: `${accessToken}`,
  };
  let urlPath = window.location.pathname.split('/');

  urlPath = `/${urlPath[1]}`;

  useEffect(() => {
    if (isLoggedIn()) {
      axiosGet(SHOW_USER_ENDPOINT, headers).then((response) => {
        response.data.email_verified ? navigate(CLIENT_DASHBOARD_LINK) : navigate(VERIFY_EMAIL_LINK);
      });
    } else {
      if (urlPath !== SIGN_UP_LINK) {
        navigate(SIGN_IN_LINK);
      }
    }
  }, []);
};

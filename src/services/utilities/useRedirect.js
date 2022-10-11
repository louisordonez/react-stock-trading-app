import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SHOW_USER_ENDPOINT } from '../constants/usersEndpoints';
import { SIGN_IN_LINK, VERIFY_EMAIL_LINK, CLIENT_DASHBOARD_LINK } from '../constants/links';
import { isLoggedIn } from './isLoggedIn';
import { axiosGet } from './axios';
import { accessTokenCookie, getCookie } from './cookie';

export const useRedirect = () => {
  const navigate = useNavigate();
  const accessToken = getCookie(accessTokenCookie);
  const headers = {
    Authorization: `${accessToken}`,
  };

  useEffect(() => {
    if (isLoggedIn()) {
      axiosGet(SHOW_USER_ENDPOINT, headers).then((response) => {
        if (response.data.email_verified === false) {
          navigate(VERIFY_EMAIL_LINK);
        }
      });
    } else {
      navigate(SIGN_IN_LINK);
    }
  }, []);
};

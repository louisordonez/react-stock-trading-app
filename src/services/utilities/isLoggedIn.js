import { accessTokenCookie } from '../constants/cookies';
import { SHOW_USER_ENDPOINT } from '../constants/usersEndpoints';
import { getCookie } from './cookie';
import { axiosGet } from './axios';

export const isLoggedIn = async () => {
  const accessToken = getCookie(accessTokenCookie);
  const headers = { Authorization: `${accessToken}` };

  if (accessToken === '') {
    return false;
  } else {
    return axiosGet(SHOW_USER_ENDPOINT, headers).then((response) => {
      switch (response.status) {
        case 200:
          return true;
        case 401:
        case 403:
        case 404:
        case 422:
          return false;
        default:
          return false;
      }
    });
  }
};

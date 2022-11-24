import { accessTokenCookie } from '../constants/cookies';
import { SHOW_USER_ENDPOINT } from '../constants/usersEndpoints';
import { getCookie } from './cookie';
import { axiosGet } from './axios';

export const isLoggedIn = () => {
  const accessToken = getCookie(accessTokenCookie);
  const headers = {
    'Access-Control-Allow-Origin': '*',
    Authorization: accessToken,
  };

  if (accessToken === '') {
    return false;
  } else {
    return axiosGet(SHOW_USER_ENDPOINT, headers).then((response) => {
      response.status === 200 ? true : fasle;
    });
  }
};

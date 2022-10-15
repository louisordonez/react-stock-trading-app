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
      if (response.status === 200) {
        return true;
      } else if (response.response.status === 422) {
        return false;
      }
    });
  }
};

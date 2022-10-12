import { CHECK_ROLE_ENDPOINT } from '../constants/usersEndpoints';
import { accessTokenCookie, getCookie } from './cookie';
import { axiosGet } from './axios';

const accessToken = getCookie(accessTokenCookie);
const headers = { Authorization: accessToken };

export const getUserRole = async () => {
  return axiosGet(CHECK_ROLE_ENDPOINT, headers).then((response) => {
    return response.data.role;
  });
};

import { accessTokenCookie, getCookie } from './cookie';

export const isLoggedIn = () => (getCookie(accessTokenCookie) === '' ? false : true);

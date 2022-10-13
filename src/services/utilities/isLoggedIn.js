import { accessTokenCookie } from '../constants/cookies';
import { getCookie } from './cookie';

export const isLoggedIn = () => (getCookie(accessTokenCookie) === '' ? false : true);

import { getCookie } from './cookie';

export const isLoggedIn = () => (getCookie('access-token') === '' ? false : true);

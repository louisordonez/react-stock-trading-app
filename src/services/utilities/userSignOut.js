import { accessTokenCookie, deleteCookie } from './cookie';
import { SIGN_IN_LINK } from '../constants/links';

export const userSignOut = () => {
  deleteCookie(accessTokenCookie);

  window.location.assign(SIGN_IN_LINK);
};

import { SIGN_IN_LINK } from '../constants/links';
import { accessTokenCookie } from '../constants/cookies';
import { deleteCookie } from './cookie';

export const userSignOut = () => {
  deleteCookie(accessTokenCookie);

  window.location.assign(SIGN_IN_LINK);
};

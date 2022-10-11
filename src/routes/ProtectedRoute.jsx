import { Navigate, Outlet } from 'react-router-dom';
import { isLoggedIn } from '../services/utilities/isLoggedIn';
import { SIGN_IN_LINK } from '../services/constants/links';

const ProtectedRoute = () => {
  return isLoggedIn() ? <Outlet /> : <Navigate to={`${SIGN_IN_LINK}`} />;
};

export default ProtectedRoute;

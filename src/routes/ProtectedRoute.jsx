import { Navigate, Outlet } from 'react-router-dom';
import { isLoggedIn } from '../services/utilities/isLoggedIn';

const ProtectedRoute = () => {
  return isLoggedIn() ? <Outlet /> : <Navigate to="/sign_in" />;
};

export default ProtectedRoute;

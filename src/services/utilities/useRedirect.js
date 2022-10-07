import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isLoggedIn } from './isLoggedIn';

export const useRedirect = () => {
  let navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn()) {
      navigate('/client');
    }
  }, []);
};

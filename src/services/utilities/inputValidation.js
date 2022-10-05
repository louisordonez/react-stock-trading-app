import { notifyError } from '../../components/Toast';

export const isInvalidPassword = (password, confirmPassword) => {
  const passwordMinLength = 6;

  if (password.length === passwordMinLength) {
    if (password !== confirmPassword) {
      notifyError('Password and Confirm Password  match.');
      return true;
    }
  } else {
    notifyError('Password must be at least 6 characters.');
    return true;
  }

  return false;
};

export const isInvalidEmail = (email) => {
  const validate = /^\S+@\S+$/.test(email);

  if (!validate) {
    notifyError('Invalid Email.');
    return true;
  }

  return false;
};

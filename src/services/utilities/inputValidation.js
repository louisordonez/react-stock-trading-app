import { showErrorNotification } from '../../components/Notification';

export const isInvalidPassword = (password, confirmPassword) => {
  const passwordMinLength = 6;

  if (password.length === passwordMinLength) {
    if (password !== confirmPassword) {
      showErrorNotification('Password and Confirm Password  match.');
      return true;
    }
  } else {
    showErrorNotification('Password must be at least 6 characters.');
    return true;
  }

  return false;
};

export const isInvalidEmail = (email) => {
  const validate = /^\S+@\S+$/.test(email);

  if (!validate) {
    showErrorNotification('Invalid Email.');
    return true;
  }

  return false;
};

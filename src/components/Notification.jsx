import { showNotification } from '@mantine/notifications';
import { TbCheck, TbX } from 'react-icons/tb';

export const showSuccessNotification = (text) => {
  showNotification({
    title: 'Success',
    message: `${text}`,
    color: 'green',
    icon: <TbCheck />,
  });
};

export const showErrorNotification = (text) => {
  showNotification({
    title: 'Failed',
    message: `${text}`,
    color: 'red',
    icon: <TbX />,
  });
};

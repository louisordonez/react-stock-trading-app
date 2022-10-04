import toast from 'react-hot-toast';
import { Text } from '@mantine/core';

export const notifySuccess = (text) => {
  toast.success(() => <Text>{`${text}`}</Text>, {
    style: {
      background: '#333',
      color: '#fff',
    },
    duration: 5000,
  });
};

export const notifyError = (text) => {
  toast.error(() => <Text>{`${text}`}</Text>, {
    style: {
      background: '#333',
      color: '#fff',
    },
    duration: 5000,
  });
};

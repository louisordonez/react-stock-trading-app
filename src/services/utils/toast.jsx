import toast from 'react-hot-toast';
import { Text } from '@mantine/core';

export const notifySuccess = (text) => {
  toast.success((t) => <Text>{`${text}`}</Text>, {
    style: {
      background: '#333',
      color: '#fff',
    },
    duration: 5000,
  });
};

export const notifyError = (text) => {
  toast.error((t) => <Text>{`${text}`}</Text>, {
    style: {
      background: '#333',
      color: '#fff',
    },
    duration: 5000,
  });
};

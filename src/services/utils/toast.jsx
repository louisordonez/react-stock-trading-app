import toast from 'react-hot-toast';
import { Text, CloseButton, Group } from '@mantine/core';

export const notifySuccess = (text) => {
  toast.success(
    (t) => (
      <Group position="apart">
        <Text>{`${text}`}</Text>
        <CloseButton onClick={() => toast.dismiss(t.id)} />
      </Group>
    ),
    {
      style: {
        background: '#333',
        color: '#fff',
      },
      duration: 5000,
    }
  );
};

export const notifyError = (text) => {
  toast.error(
    (t) => (
      <Group position="apart">
        <Text>{`${text}`}</Text>
        <CloseButton onClick={() => toast.dismiss(t.id)} />
      </Group>
    ),
    {
      style: {
        background: '#333',
        color: '#fff',
      },
      duration: 5000,
    }
  );
};

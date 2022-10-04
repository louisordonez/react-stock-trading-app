import { TextInput, PasswordInput, Paper, Button, Group } from '@mantine/core';
import { notifySuccess, notifyError } from '../../services/utilities/toast';

const SignUpForm = () => {
  return (
    <>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <Group grow>
          <TextInput label="First name" required />
          <TextInput label="Last name" required />
        </Group>
        <TextInput label="Email" required mt="md" />
        <Group grow>
          <PasswordInput label="Password" required mt="md" />
          <PasswordInput label="Confirm Password" required mt="md" />
        </Group>
        <Button
          fullWidth
          mt="xl"
          color="violet"
          onClick={() => {
            notifySuccess(`You may now sign in to your account!`);
          }}
        >
          Sign up
        </Button>
      </Paper>
    </>
  );
};

export default SignUpForm;

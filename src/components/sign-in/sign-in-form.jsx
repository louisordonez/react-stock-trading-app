import { TextInput, PasswordInput, Paper, Button } from '@mantine/core';
import { notifySuccess, notifyError } from '../../services/utils/toast';

const SignInForm = () => {
  return (
    <>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput label="Email" required />
        <PasswordInput label="Password" required mt="md" />
        <Button
          fullWidth
          mt="xl"
          color="violet"
          onClick={() => {
            notifySuccess(`You may now sign in to your account!`);
          }}
        >
          Sign in
        </Button>
      </Paper>
    </>
  );
};

export default SignInForm;

import { TextInput, PasswordInput, Paper, Button } from '@mantine/core';
import { notifyError } from '../../services/utils/toast';

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
            notifyError(`Invalid email or password.`);
          }}
        >
          Sign in
        </Button>
      </Paper>
    </>
  );
};

export default SignInForm;

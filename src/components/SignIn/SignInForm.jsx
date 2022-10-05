import { useState } from 'react';
import { TextInput, PasswordInput, Paper, Button } from '@mantine/core';

const SignInForm = ({ onSignInSubmit, isError }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const resetForm = () => {
    setEmail('');
    setPassword('');
  };

  const handleSubmit = () => {
    onSignInSubmit({
      email,
      password,
    });
    resetForm();
  };

  return (
    <>
      <Paper
        withBorder
        shadow="md"
        p={30}
        mt={30}
        radius="md"
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            handleSubmit();
          }
        }}
      >
        <TextInput label="Email" onChange={(event) => setEmail(event.target.value)} value={email} error={isError} />
        <PasswordInput
          label="Password"
          mt="md"
          onChange={(event) => setPassword(event.target.value)}
          value={password}
          error={isError}
        />
        <Button fullWidth mt="xl" color="violet" onClick={handleSubmit}>
          Sign in
        </Button>
      </Paper>
    </>
  );
};

export default SignInForm;

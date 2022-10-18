import { useState } from 'react';
import { TextInput, PasswordInput, Paper, Button, Group } from '@mantine/core';
import { isInvalidEmail, isInvalidPassword } from '../../services/utilities/inputValidation';
import { showSuccessNotification, showErrorNotification } from '../Notification';

const SignUpForm = ({ onSignUpSubmit }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [isFirstNameError, setIsFirstNameError] = useState(false);
  const [isLastNameError, setIsLastNameError] = useState(false);
  const [isEmailError, setIsEmailError] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);
  const [isConfirmPasswordError, setIsConfirmPasswordError] = useState(false);

  const resetForm = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');

    setIsFirstNameError('');
    setIsLastNameError('');
    setIsEmailError('');
    setIsPasswordError('');
    setIsConfirmPasswordError('');
  };

  const isValidInput = () => {
    let errors = {};

    if (firstName === '') {
      setIsFirstNameError(true);
      showErrorNotification('First name cannot be empty.');
      errors.firstName = 'invalid';
    }

    if (lastName === '') {
      setIsLastNameError(true);
      showErrorNotification('Last name cannot be empty.');
      errors.lastName = 'invalid';
    }

    if (isInvalidEmail(email)) {
      setIsEmailError(true);
      errors.email = 'invalid';
    }

    if (isInvalidPassword(password, confirmPassword)) {
      setIsPasswordError(true);
      setIsConfirmPasswordError(true);
      errors.password = 'invalid';
    }

    return Object.keys(errors).length === 0 ? true : false;
  };

  const handleSubmit = () => {
    if (isValidInput()) {
      onSignUpSubmit({
        first_name: firstName,
        last_name: lastName,
        email,
        password,
      });
      resetForm();
    }
  };

  return (
    <>
      <Paper
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
        <Group grow>
          <TextInput
            label="First name"
            required
            onChange={(event) => setFirstName(event.target.value)}
            value={firstName}
            error={isFirstNameError}
          />
          <TextInput
            label="Last name"
            required
            onChange={(event) => setLastName(event.target.value)}
            value={lastName}
            error={isLastNameError}
          />
        </Group>
        <TextInput
          label="Email"
          required
          mt="md"
          onChange={(event) => setEmail(event.target.value)}
          value={email}
          error={isEmailError}
        />
        <Group grow>
          <PasswordInput
            label="Password"
            required
            mt="md"
            onChange={(event) => setPassword(event.target.value)}
            value={password}
            error={isPasswordError}
          />
          <PasswordInput
            label="Confirm Password"
            required
            mt="md"
            onChange={(event) => setConfirmPassword(event.target.value)}
            value={confirmPassword}
            error={isConfirmPasswordError}
          />
        </Group>
        <Button
          fullWidth
          mt="xl"
          color="violet"
          onClick={() => {
            handleSubmit();
          }}
        >
          Sign up
        </Button>
      </Paper>
    </>
  );
};

export default SignUpForm;

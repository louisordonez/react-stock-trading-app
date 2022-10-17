import { useState, useEffect } from 'react';
import { Title, Paper, Group, TextInput, PasswordInput, Button, Container } from '@mantine/core';
import { accessTokenCookie } from '../../services/constants/cookies';
import { getCookie } from '../../services/utilities/cookie';
import {
  SHOW_USER_ENDPOINT,
  SIGN_IN_USER_ENDPOINT,
  UPDATE_USER_ENDPOINT,
} from '../../services/constants/usersEndpoints';
import { axiosGet, axiosPost, axiosPatch } from '../../services/utilities/axios';
import { showErrorNotification, showSuccessNotification } from '../../components/Notification';

const ClientAccount = () => {
  const accessToken = getCookie(accessTokenCookie);

  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [currentPasswordError, setCurrentPasswordError] = useState(false);

  useEffect(() => {
    const headers = { Authorization: `${accessToken}` };

    axiosGet(SHOW_USER_ENDPOINT, headers).then((response) => {
      setEmail(response.data.email);
      setFirstName(response.data.first_name);
      setLastName(response.data.last_name);
    });
  }, []);

  const resetForm = () => {
    setPassword('');
    setCurrentPassword('');
    setConfirmPassword('');
  };

  const resetErrors = () => {
    setPasswordError(false);
    setCurrentPasswordError(false);
  };
  const handleSubmit = () => {
    const userInfo = {
      email,
      password: `${currentPassword}`,
    };
    const headers = {
      Authorization: `${accessToken}`,
      'Content-Type': 'multipart/form-data',
    };
    const formData = new FormData();

    if (password !== '') {
      if (password.length >= 6) {
        if (password === confirmPassword) {
          axiosPost(SIGN_IN_USER_ENDPOINT, userInfo).then((response) => {
            if (response.status === 200) {
              formData.append('password', password);

              axiosPatch(UPDATE_USER_ENDPOINT, formData, headers).then((response) => {
                if (response.status === 200) {
                  showSuccessNotification('Account has been updated!');
                  resetErrors();
                  resetForm();
                } else {
                  showErrorNotification('Account was not updated.');
                  resetForm();
                }
              });
            } else {
              showErrorNotification('Account was not updated. Invalid current password.');
              setCurrentPasswordError(true);
              resetForm();
            }
          });
        } else {
          showErrorNotification('Account was not updated. Password and Confirm Password does not match.');
          setPasswordError(true);
          resetForm();
        }
      } else {
        showErrorNotification('Account was not updated. Password is too short (minimum is 6 characters).');
        setPasswordError(true);
        resetForm();
      }
    } else {
      formData.append('first_name', firstName);
      formData.append('last_name', lastName);

      axiosPatch(UPDATE_USER_ENDPOINT, formData, headers).then((response) => {
        response.status === 200
          ? showSuccessNotification('Account has been updated!')
          : showErrorNotification('Account was not updated.');
      });
    }
  };

  return (
    <>
      <Title pl="md">Account</Title>
      <Container size={520} my="md">
        <Group grow>
          <Paper p="xl" radius="md" shadow="md" withBorder>
            <Group grow>
              <TextInput label="First name" value={firstName} onChange={(event) => setFirstName(event.target.value)} />
              <TextInput label="Last name" value={lastName} onChange={(event) => setLastName(event.target.value)} />
            </Group>
            <Group grow>
              <PasswordInput
                label="Password"
                mt="md"
                error={passwordError}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <PasswordInput
                label="Confirm Password"
                mt="md"
                error={passwordError}
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
              />
            </Group>
            <Group grow>
              <PasswordInput
                label="Current Password"
                description="Leave blank if you don't want to change the current password"
                mt="md"
                error={currentPasswordError}
                value={currentPassword}
                onChange={(event) => setCurrentPassword(event.target.value)}
              />
            </Group>
            <Group>
              <Button fullWidth mt="xl" color="violet" onClick={handleSubmit}>
                Submit
              </Button>
            </Group>
          </Paper>
        </Group>
      </Container>
    </>
  );
};

export default ClientAccount;

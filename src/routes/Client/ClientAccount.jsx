import { useState, useEffect } from 'react';
import { Title, Paper, Group, TextInput, PasswordInput, Button, Container } from '@mantine/core';
import { accessTokenCookie } from '../../services/constants/cookies';
import { getCookie } from '../../services/utilities/cookie';
import { SHOW_USER_ENDPOINT, UPDATE_USER_ENDPOINT } from '../../services/constants/usersEndpoints';
import { axiosGet, axiosPut } from '../../services/utilities/axios';
import { showSuccessNotification } from '../../components/Notification';

const ClientAccount = () => {
  const accessToken = getCookie(accessTokenCookie);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    const headers = { Authorization: `${accessToken}` };

    axiosGet(SHOW_USER_ENDPOINT, headers).then((response) => {
      setFirstName(response.data.first_name);
      setLastName(response.data.last_name);
    });
  }, []);

  const handleSubmit = () => {
    const headers = {
      Authorization: `${accessToken}`,
      'Content-Type': 'multipart/form-data',
    };
    const formData = new FormData();

    formData.append('first_name', firstName);
    formData.append('last_name', lastName);

    axiosPut(UPDATE_USER_ENDPOINT, formData, headers).then(() => {
      showSuccessNotification('Account has been updated!');
    });
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
                label="Current Password"
                mt="md"
                value={currentPassword}
                onChange={(event) => setCurrentPassword(event.target.value)}
              />
            </Group>
            <Group grow>
              <PasswordInput
                label="Password"
                mt="md"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <PasswordInput
                label="Confirm Password"
                mt="md"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
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

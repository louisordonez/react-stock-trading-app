import { useState, useEffect } from 'react';
import { Title, Paper, Group, TextInput, PasswordInput, Button, Container } from '@mantine/core';
import { accessTokenCookie } from '../../services/constants/cookies';
import { getCookie } from '../../services/utilities/cookie';
import { SHOW_USER_ENDPOINT } from '../../services/constants/usersEndpoints';
import { axiosGet, axiosPost } from '../../services/utilities/axios';

const ClientAccount = () => {
  const accessToken = getCookie(accessTokenCookie);
  const headers = { Authorization: `${accessToken}` };

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    axiosGet(SHOW_USER_ENDPOINT, headers).then((response) => {
      setFirstName(response.data.first_name);
      setLastName(response.data.last_name);
    });
  }, []);

  return (
    <>
      <Title pl={16}>Account</Title>
      <Container size={520} my={16}>
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
              <Button fullWidth mt="xl" color="violet">
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

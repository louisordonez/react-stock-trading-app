import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Title,
  Text,
  Paper,
  Group,
  Table,
  Anchor,
  ScrollArea,
  Button,
  Modal,
  Container,
  TextInput,
} from '@mantine/core';
import { showSuccessNotification } from '../../../components/Notification';
import SignUpForm from '../../../components/SignUp/SignUpForm';

import { accessTokenCookie } from '../../../services/constants/cookies';
import { getCookie } from '../../../services/utilities/cookie';
import { axiosGet, axiosPost, axiosPatch } from '../../../services/utilities/axios';
import {
  SHOW_USER_ENDPOINT,
  UPDATE_USER_ENDPOINT,
  ALL_USERS_ENDPOINT,
  USERS_ENDPOINT,
} from '../../../services/constants/usersEndpoints';

const ClientAdminUsers = ({ setVisible }) => {
  const accessToken = getCookie(accessTokenCookie);
  const headers = { Authorization: accessToken };

  const [openCreate, setOpenCreate] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [users, setUsers] = useState([]);

  const [current, setCurrent] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const userRows = users.map((user) => {
    const { id, first_name, last_name, email, email_verified, trade_verified } = user;
    return (
      <tr key={id}>
        <td>{id}</td>
        <td>{first_name}</td>
        <td>{last_name}</td>
        <td>{email}</td>
        <td>{email_verified ? 'Verified' : 'Not Verified'}</td>
        <td>{trade_verified ? 'Verified' : 'Not Verified'}</td>
        <td>
          <Anchor
            onClick={() => {
              setVisible(true);
              axiosGet(`${SHOW_USER_ENDPOINT}/${id}`, headers).then((response) => {
                setVisible(false);
                setOpenUpdate(true);
                setCurrent(response.data);
                setFirstName(response.data.first_name);
                setLastName(response.data.last_name);
                setEmail(response.data.email);
              });
            }}
          >
            Update
          </Anchor>
        </td>
      </tr>
    );
  });

  const handleCreateSubmit = (createInfo) => {
    const formData = new FormData();

    Object.entries(createInfo).forEach(([key, value]) => {
      formData.append(key, value);
    });

    setVisible(true);
    axiosPost(USERS_ENDPOINT, formData, headers).then((response) => {
      setVisible(false);
      showSuccessNotification('An email has been sent to verify your account!');
      setUsers([...users, response.data.user]);
    });
  };

  const handleUpdateSubmit = () => {
    const headers = {
      Authorization: `${accessToken}`,
      'Content-Type': 'multipart/form-data',
    };

    const formData = new FormData();
    formData.append('first_name', firstName);
    formData.append('last_name', lastName);
    formData.append('email', email);

    setVisible(true);
    axiosPatch(`${UPDATE_USER_ENDPOINT}/${current.id}`, formData, headers).then((response) => {
      setVisible(false);
      let filtered = users.filter((user) => user.id !== current.id);
      let updated = response.data.user;
      setUsers([...filtered, updated]);
      showSuccessNotification('Account has been updated!');
    });
  };

  useEffect(() => {
    axiosGet(ALL_USERS_ENDPOINT, headers).then((response) => {
      setUsers(response.data);
      console.log(response.data);
    });
  }, []);

  return (
    <>
      <Title pl="md">Users</Title>
      <Group px="md" py="md">
        <Button onClick={() => setOpenCreate(true)}>Create User</Button>
      </Group>
      <Group px="md" py="md" grow>
        <Paper p="xl" radius="md" shadow="md" withBorder>
          <ScrollArea>
            <Table highlightOnHover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Account</th>
                  <th>Trade</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {userRows.length > 0 ? (
                  userRows
                ) : (
                  <tr>
                    <td colSpan={7}>
                      <Text align="center">No User Accounts</Text>
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </ScrollArea>
        </Paper>
      </Group>
      <Modal opened={openCreate} onClose={() => setOpenCreate(false)} title="Sign Up New User Account">
        <SignUpForm onSignUpSubmit={handleCreateSubmit} />
      </Modal>
      <Modal opened={openUpdate} onClose={() => setOpenUpdate(false)} title="Update User Account">
        <Container size={520} my="md">
          <Group grow>
            <Paper
              radius="md"
              shadow="md"
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  handleUpdateSubmit();
                }
              }}
            >
              <Group grow>
                <TextInput
                  label="First name"
                  value={firstName}
                  onChange={(event) => setFirstName(event.target.value)}
                />
                <TextInput label="Last name" value={lastName} onChange={(event) => setLastName(event.target.value)} />
              </Group>
              <Group grow>
                <TextInput
                  label="Email"
                  mt="md"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </Group>
              <Group>
                <Button fullWidth mt="xl" color="violet" onClick={handleUpdateSubmit}>
                  Submit
                </Button>
              </Group>
            </Paper>
          </Group>
        </Container>
      </Modal>
    </>
  );
};

export default ClientAdminUsers;

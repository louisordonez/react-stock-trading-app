import { useState, useEffect } from 'react';
import {
  Title,
  Text,
  Paper,
  Group,
  Table,
  ScrollArea,
  Button,
  Modal,
  TextInput,
  Stack,
} from '@mantine/core';
import { TbCheck, TbX } from 'react-icons/tb';
import { showSuccessNotification } from '../../../components/Notification';
import SignUpForm from '../../../components/SignUp/SignUpForm';
import { accessTokenCookie } from '../../../services/constants/cookies';
import { getCookie } from '../../../services/utilities/cookie';
import {
  SHOW_USER_ENDPOINT,
  UPDATE_USER_ENDPOINT,
  ALL_USERS_ENDPOINT,
  USERS_ENDPOINT,
} from '../../../services/constants/usersEndpoints';
import {
  axiosGet,
  axiosPost,
  axiosPatch,
} from '../../../services/utilities/axios';

const ClientAdminUsers = ({ setVisible }) => {
  const accessToken = getCookie(accessTokenCookie);
  const headers = {
    'Access-Control-Allow-Origin': '*',
    Authorization: accessToken,
  };

  const [openCreate, setOpenCreate] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [users, setUsers] = useState([]);
  const [current, setCurrent] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isDoneLoading, setIsDoneLoading] = useState(true);
  const [isButtonLoading, setIsButtonLoading] = useState(false);

  useEffect(() => {
    setVisible(true);
    setIsDoneLoading(false);
    axiosGet(ALL_USERS_ENDPOINT, headers).then((response) => {
      const usersArr = response.data.map((item) => {
        return {
          ...item,
          id: item.id.toString(),
        };
      });
      setUsers(usersArr);
      setIsDoneLoading(true);
      setVisible(false);
    });
  }, []);

  const handleCreateSubmit = (createInfo) => {
    const formData = new FormData();

    Object.entries(createInfo).forEach(([key, value]) => {
      formData.append(key, value);
    });

    setVisible(true);
    axiosPost(USERS_ENDPOINT, formData, headers).then((response) => {
      const usersArr = response.data.map((item) => {
        return {
          ...item,
          id: item.id.toString(),
        };
      });
      setUsers([...users, usersArr]);
      setVisible(false);
      setOpenCreate(false);
      showSuccessNotification('An email has been sent to verify the account!');
    });
  };

  const handleUpdateSubmit = () => {
    const headers = {
      'Access-Control-Allow-Origin': '*',
      Authorization: accessToken,
      'Content-Type': 'multipart/form-data',
    };
    const formData = new FormData();

    formData.append('first_name', firstName);
    formData.append('last_name', lastName);
    formData.append('email', email);

    setIsButtonLoading(true);
    axiosPatch(`${UPDATE_USER_ENDPOINT}/${current.id}`, formData, headers).then(
      (response) => {
        let filtered = users.filter((user) => user.id !== current.id);
        let updated = response.data.user;

        setUsers([...filtered, updated]);
        setIsButtonLoading(false);
        setOpenUpdate(false);
        showSuccessNotification('Account has been updated!');
      }
    );
  };

  const displayTable = () => {
    if (isDoneLoading) {
      return (
        <Table highlightOnHover>
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th style={{ textAlign: 'center' }}>Email Verified</th>
              <th style={{ textAlign: 'center' }}>Trade Verified</th>
              <th style={{ textAlign: 'center' }}>Actions</th>
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
      );
    }
  };

  const userRows = users
    .sort((x, y) => y.id - x.id)
    .map((user) => {
      const {
        id,
        first_name,
        last_name,
        email,
        email_verified,
        trade_verified,
      } = user;
      const color = email_verified ? 'green' : 'red';

      return (
        <tr key={id}>
          <td>{id}</td>
          <td>{first_name}</td>
          <td>{last_name}</td>
          <td>{email}</td>
          <td style={{ color: color, textAlign: 'center' }}>
            {email_verified ? <TbCheck color="green" /> : <TbX color="red" />}
          </td>
          <td style={{ color: color, textAlign: 'center' }}>
            {trade_verified ? <TbCheck color="green" /> : <TbX color="red" />}
          </td>
          <td style={{ textAlign: 'center' }}>
            <Button
              compact
              color="violet"
              onClick={() => {
                setVisible(true);
                axiosGet(`${SHOW_USER_ENDPOINT}/${id}`, headers).then(
                  (response) => {
                    setVisible(false);
                    setOpenUpdate(true);
                    setCurrent(response.data);
                    setFirstName(response.data.first_name);
                    setLastName(response.data.last_name);
                    setEmail(response.data.email);
                  }
                );
              }}
            >
              Update
            </Button>
          </td>
        </tr>
      );
    });

  return (
    <>
      <Group px="md" align="end" position="apart">
        <Title>Users</Title>
        <Button color="violet" onClick={() => setOpenCreate(true)}>
          Create User
        </Button>
      </Group>
      <Group px="md" py="md" grow>
        <Paper p="xl" radius="md" shadow="md" withBorder>
          <ScrollArea>{displayTable()}</ScrollArea>
        </Paper>
      </Group>
      <Modal
        opened={openCreate}
        onClose={() => setOpenCreate(false)}
        title="Create"
        centered
      >
        <SignUpForm onSignUpSubmit={handleCreateSubmit} />
      </Modal>
      <Modal
        opened={openUpdate}
        onClose={() => setOpenUpdate(false)}
        title="Update"
        centered
      >
        <Group
          grow
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              handleUpdateSubmit();
            }
          }}
        >
          <TextInput
            label="First name"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
          />
          <TextInput
            label="Last name"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
          />
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
          <Button
            fullWidth
            mt="xl"
            color="violet"
            onClick={handleUpdateSubmit}
            loading={isButtonLoading}
          >
            Submit
          </Button>
        </Group>
      </Modal>
    </>
  );
};

export default ClientAdminUsers;

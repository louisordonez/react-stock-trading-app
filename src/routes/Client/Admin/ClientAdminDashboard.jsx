import { useState, useEffect } from 'react';
import { TbUser, TbReceipt } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';

import { Title, Text, Paper, Group, Grid, ThemeIcon, Table, Anchor, ScrollArea } from '@mantine/core';
import { showErrorNotification, showSuccessNotification } from '../../../components/Notification';

import { accessTokenCookie } from '../../../services/constants/cookies';
import { getCookie } from '../../../services/utilities/cookie';
import { axiosGet, axiosPatch } from '../../../services/utilities/axios';
import { ALL_USERS_ENDPOINT, APPROVE_TRADE_ENDPOINT } from '../../../services/constants/usersEndpoints';
import { ALL_STOCK_TRANSACTIONS_ENDPOINT } from '../../../services/constants/transactionsEndpoints';

import { CLIENT_USERS_LINK, CLIENT_TRANSACTIONS_LINK } from '../../../services/constants/links';

const ClientAdminDashboard = ({ setVisible }) => {
  const accessToken = getCookie(accessTokenCookie);
  const headers = { Authorization: accessToken };
  const navigate = useNavigate();

  const [userCount, setUserCount] = useState('');
  const [transactionCount, setTransactionCount] = useState('');
  const [tradeUnverified, setTradeUnverified] = useState([]);

  const handleApprove = (id) => {
    axiosPatch(`${APPROVE_TRADE_ENDPOINT}/${id}`, {}, headers)
      .then((response) => {
        showSuccessNotification('Account has been approved for trading.');
        let filtered = tradeUnverified.filter((user) => user.id !== id);
        setTradeUnverified(filtered);
      })
      .catch((err) => {
        showErrorNotification(err.message);
      });
  };

  const tradeUnverifiedRows = tradeUnverified.map((user) => {
    const { id, first_name, last_name, email } = user;
    return (
      <tr key={id}>
        <td>{id}</td>
        <td>{first_name}</td>
        <td>{last_name}</td>
        <td>{email}</td>
        <td>
          {user.email_verified ? <Anchor onClick={() => handleApprove(id)}>Approve</Anchor> : 'Email not confirmed'}
        </td>
      </tr>
    );
  });

  useEffect(() => {
    setVisible(true);
    axiosGet(ALL_USERS_ENDPOINT, headers).then((response) => {
      setVisible(false);
      setUserCount(response.data.length);
      setTradeUnverified(response.data.filter((user) => !user.trade_verified));
    });
    axiosGet(ALL_STOCK_TRANSACTIONS_ENDPOINT, headers).then((response) => {
      setTransactionCount(response.data.length);
    });
  }, []);

  return (
    <>
      <Title pl="md">Dashboard</Title>
      <Grid px="md" py="md" grow>
        <Grid.Col sm={6}>
          <Paper p="xl" radius="md" shadow="md" withBorder mr="md">
            <ThemeIcon radius={48} size={48} color="violet">
              <TbUser size={28} />
            </ThemeIcon>
            <Text weight={700} size={28} mt="md">
              {userCount}
            </Text>
            <Group position="apart">
              <Text size={22} color="dimmed">
                User Accounts
              </Text>
              <Anchor
                size={22}
                onClick={() => {
                  navigate(CLIENT_USERS_LINK);
                }}
              >
                View All
              </Anchor>
            </Group>
          </Paper>
        </Grid.Col>

        <Grid.Col sm={6}>
          <Paper p="xl" radius="md" shadow="md" withBorder mr="md">
            <ThemeIcon radius={48} size={48} color="violet">
              <TbReceipt size={28} />
            </ThemeIcon>
            <Text weight={700} size={28} mt="md">
              {transactionCount}
            </Text>
            <Group position="apart">
              <Text size={22} color="dimmed">
                Stock Transactions
              </Text>
              <Anchor
                size={22}
                onClick={() => {
                  navigate(CLIENT_TRANSACTIONS_LINK);
                }}
              >
                View All
              </Anchor>
            </Group>
          </Paper>
        </Grid.Col>
      </Grid>

      <Group px="md" py="md" grow>
        <Paper p="xl" radius="md" shadow="md" withBorder>
          <Group pb="md">
            <Title order={3}>Pending User Accounts</Title>
          </Group>
          <ScrollArea>
            <Table highlightOnHover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {tradeUnverifiedRows.length > 0 ? (
                  tradeUnverifiedRows
                ) : (
                  <tr>
                    <td colSpan={5}>
                      <Text align="center">No Pending User Accounts</Text>
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </ScrollArea>
        </Paper>
      </Group>
    </>
  );
};

export default ClientAdminDashboard;

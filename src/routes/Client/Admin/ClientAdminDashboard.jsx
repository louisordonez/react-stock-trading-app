import { useState, useEffect } from 'react';
import { TbUser, TbReceipt } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import { Title, Text, Paper, Group, Grid, ThemeIcon, Table, Anchor, ScrollArea, Button } from '@mantine/core';
import { showErrorNotification, showSuccessNotification } from '../../../components/Notification';
import { accessTokenCookie } from '../../../services/constants/cookies';
import { CLIENT_USERS_LINK, CLIENT_TRANSACTIONS_LINK } from '../../../services/constants/links';
import { ALL_USERS_ENDPOINT, APPROVE_TRADE_ENDPOINT } from '../../../services/constants/usersEndpoints';
import { ALL_STOCK_TRANSACTIONS_ENDPOINT } from '../../../services/constants/transactionsEndpoints';
import { getCookie } from '../../../services/utilities/cookie';
import { axiosGet, axiosPatch } from '../../../services/utilities/axios';

const ClientAdminDashboard = ({ setVisible }) => {
  const accessToken = getCookie(accessTokenCookie);
  const headers = {
    'Access-Control-Allow-Origin': '*',
    Authorization: accessToken,
  };
  const navigate = useNavigate();

  const [userCount, setUserCount] = useState('');
  const [transactionCount, setTransactionCount] = useState('');
  const [tradeUnverified, setTradeUnverified] = useState([]);
  const [isDoneLoading, setIsDoneLoading] = useState(true);

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
      setUserCount(response.data.length);
      setTradeUnverified(usersArr.filter((user) => !user.trade_verified));
      setIsDoneLoading(true);
      setVisible(false);
    });
    axiosGet(ALL_STOCK_TRANSACTIONS_ENDPOINT, headers).then((response) => {
      setTransactionCount(response.data.length);
    });
  }, []);

  const handleApprove = (id) => {
    setVisible(true);
    axiosPatch(`${APPROVE_TRADE_ENDPOINT}/${id}`, {}, headers)
      .then(() => {
        setTradeUnverified(tradeUnverified.filter((user) => user.id !== id));
        showSuccessNotification('Account has been approved for trading!');
        setVisible(false);
      })
      .catch((error) => {
        showErrorNotification(error.message);
        setVisible(false);
      });
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
              <th style={{ textAlign: 'center' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {tradeUnverifiedRows.length > 0 ? (
              tradeUnverifiedRows
            ) : (
              <tr>
                <td colSpan={5}>
                  <Text align="center">No Pending Trader Accounts</Text>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      );
    }
  };

  const tradeUnverifiedRows = tradeUnverified
    .sort((x, y) => y.id - x.id)
    .map((user) => {
      const { id, first_name, last_name, email, email_verified } = user;
      const disabled = !email_verified ? true : false;
      return (
        <tr key={id}>
          <td>{id}</td>
          <td>{first_name}</td>
          <td>{last_name}</td>
          <td>{email}</td>
          <td style={{ textAlign: 'center' }}>
            <Button color="violet" compact onClick={() => handleApprove(id)} disabled={disabled}>
              Approve
            </Button>
          </td>
        </tr>
      );
    });

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
            <Title order={3}>Pending Trader Accounts</Title>
          </Group>
          <ScrollArea>{displayTable()}</ScrollArea>
        </Paper>
      </Group>
    </>
  );
};

export default ClientAdminDashboard;

import { useState, useEffect } from 'react';
import { TbUser, TbReceipt } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';

import { Title, Text, Paper, Group, Grid, ThemeIcon, Table, Anchor, ScrollArea } from '@mantine/core';

import { accessTokenCookie } from '../../../services/constants/cookies';
import { getCookie } from '../../../services/utilities/cookie';
import { axiosGet } from '../../../services/utilities/axios';
import { ALL_USERS_ENDPOINT } from '../../../services/constants/usersEndpoints';
import {
  CLIENT_USERS_LINK,
  CLIENT_TRANSACTIONS_LINK
} from '../../../services/constants/links';


const ClientAdminDashboard = ({ setVisible }) => {
  const accessToken = getCookie(accessTokenCookie);
  const headers = { Authorization: accessToken };
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [tradeUnverified, setTradeUnverified] = useState([]);

  useEffect(() => {
    axiosGet(ALL_USERS_ENDPOINT, headers).then(response => {
      console.log(response)
      setUsers(response.data)
      setTradeUnverified(response.data.filter(user => !user.trade_verified))
      console.log("TradeUnverified", tradeUnverified)
      // setTradeUnverified
    })
  }, [])
  


  return (
    <>
      <Title pl="md">Dashboard</Title>
      <Grid px="md" py="md">
        <Grid.Col md={6}>
          <Paper p="xl" radius="md" shadow="md" withBorder mr="md">
              <ThemeIcon radius={48} size={48} color="violet">
                <TbUser size={28} />
              </ThemeIcon>
              <Text weight={700} size={28} mt="md">
                {users.length}
              </Text>
              <Text size={22} color="dimmed">
                Fintrader User Accounts
              </Text>
              <Anchor
                size={22}
                onClick={() => {
                  navigate(CLIENT_USERS_LINK);
                }}
              >
                View All
              </Anchor>
          </Paper>
        </Grid.Col>  

        <Grid.Col md={6}>
          <Paper p="xl" radius="md" shadow="md" withBorder mr="md">
              <ThemeIcon radius={48} size={48} color="violet">
                <TbReceipt size={28} />
              </ThemeIcon>
              <Text weight={700} size={28} mt="md">
                100
              </Text>
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
          </Paper>
        </Grid.Col>
      </Grid>
    </>
  )
};

export default ClientAdminDashboard;

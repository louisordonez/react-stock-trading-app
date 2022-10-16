import { useState, useEffect } from 'react';
import { Title, Text, Paper, Group, ThemeIcon, Table, Anchor, ScrollArea } from '@mantine/core';
import { TbWallet, TbChartBar } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import { CLIENT_WALLET_LINK, CLIENT_TRANSACTIONS_LINK } from '../../../services/constants/links';
import { SHOW_WALLET_ENDPOINT } from '../../../services/constants/walletEndpoints';
import { USER_STOCK_TRANSACTIONS_ENDPOINT } from '../../../services/constants/stockEndpoints';
import { accessTokenCookie } from '../../../services/constants/cookies';
import { showCurrency } from '../../../services/utilities/showCurrency';
import { axiosGet } from '../../../services/utilities/axios';
import { getCookie } from '../../../services/utilities/cookie';
import { toProperCase } from '../../../services/utilities/toProperCase';
import { convertDatetime } from '../../../services/utilities/convertDatetime';

const ClientUserDashboard = () => {
  const accessToken = getCookie(accessTokenCookie);
  const headers = { Authorization: accessToken };
  const navigate = useNavigate();

  const [balance, setBalance] = useState(0);
  const [stocksOwned, setStocksOwned] = useState(0);
  const [walletTransactions, setWalletTransactions] = useState([]);
  const [stockTransactions, setStockTransactions] = useState([]);

  useEffect(() => {
    axiosGet(SHOW_WALLET_ENDPOINT, headers).then((response) => {
      setBalance(showCurrency(response.data.wallet.balance));
      setWalletTransactions(response.data.transactions);
    });
    axiosGet(USER_STOCK_TRANSACTIONS_ENDPOINT, headers).then((response) => {
      const stocksQuantity = response.data.map((array) => parseFloat(array.stock_quantity)).reduce((x, y) => x + y);

      setStocksOwned(stocksQuantity.toLocaleString('en-US', { maximumFractionDigits: 1, minimumFractionDigits: 1 }));
      setStockTransactions(response.data);
    });
  }, []);

  const walletTransactionsRows = walletTransactions.slice(0, 5).map((column, index) => {
    const { created_at, action_type, total_amount } = column;

    return (
      <tr key={index}>
        <td>{convertDatetime(created_at)}</td>
        <td>{toProperCase(action_type)}</td>
        <td>{showCurrency(total_amount)}</td>
      </tr>
    );
  });

  const stockTransactionsRows = stockTransactions.slice(0, 5).map((column, index) => {
    const { created_at, action_type, stock_name, stock_symbol, stock_price, stock_quantity, total_amount } = column;

    return (
      <tr key={index}>
        <td>{convertDatetime(created_at)}</td>
        <td>{toProperCase(action_type)}</td>
        <td>{stock_name}</td>
        <td>{stock_symbol}</td>
        <td>{showCurrency(stock_price)}</td>
        <td>{stock_quantity}</td>
        <td>{showCurrency(total_amount)}</td>
      </tr>
    );
  });

  return (
    <>
      <Title pl="md">Dashboard</Title>
      <Group px="md" py="md" grow>
        <Paper p="xl" radius="md" shadow="md" withBorder mr="md">
          <ScrollArea>
            <ThemeIcon radius={48} size={48} color="violet">
              <TbWallet size={28} />
            </ThemeIcon>
            <Text weight={700} size={28} mt="md">
              {balance}
            </Text>
            <Text size={22} color="dimmed">
              Balance
            </Text>
          </ScrollArea>
        </Paper>
        <Paper p="xl" radius="md" shadow="md" withBorder>
          <ScrollArea>
            <ThemeIcon radius={48} size={48} color="violet">
              <TbChartBar size={28} />
            </ThemeIcon>
            <Text weight={700} size={28} mt="md">
              {stocksOwned}
            </Text>

            <Text size={22} color="dimmed">
              Stocks Owned
            </Text>
          </ScrollArea>
        </Paper>
      </Group>
      <Group px="md" py="md" grow>
        <Paper p="xl" radius="md" shadow="md" withBorder>
          <Group position="apart" pb="md">
            <Title order={3}>Wallet Transactions</Title>
            <Anchor
              size={22}
              onClick={() => {
                navigate(CLIENT_WALLET_LINK);
              }}
            >
              View All
            </Anchor>
          </Group>
          <ScrollArea>
            <Table>
              <thead>
                <tr>
                  <th>Datetime</th>
                  <th>Action</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>{walletTransactionsRows}</tbody>
            </Table>
          </ScrollArea>
        </Paper>
      </Group>
      <Group px="md" py="md" grow>
        <Paper p="xl" radius="md" shadow="md" withBorder>
          <Group position="apart" pb="md">
            <Title order={3}>Stock Transactions</Title>
            <Anchor
              size={22}
              onClick={() => {
                navigate(CLIENT_TRANSACTIONS_LINK);
              }}
            >
              View All
            </Anchor>
          </Group>
          <ScrollArea>
            <Table>
              <thead>
                <tr>
                  <th>Datetime</th>
                  <th>Action</th>
                  <th>Name</th>
                  <th>Symbol</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>{stockTransactionsRows}</tbody>
            </Table>
          </ScrollArea>
        </Paper>
      </Group>
    </>
  );
};

export default ClientUserDashboard;

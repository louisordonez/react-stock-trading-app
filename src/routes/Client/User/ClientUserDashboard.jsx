import { useState } from 'react';
import { Title, Text, Paper, Group, ThemeIcon, Table, Anchor, ScrollArea } from '@mantine/core';
import { TbWallet, TbChartBar } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import { CLIENT_WALLET_LINK, CLIENT_TRANSACTIONS_LINK } from '../../../services/constants/links';
import { showCurrency } from '../../../services/utilities/showCurrency';

const ClientUserDashboard = () => {
  const navigate = useNavigate();

  const [balance, setBalance] = useState(10000);
  const [stocksOwned, setStocksOwned] = useState(10);

  const walletTransactions = [
    { datetime: '2022-02-01', action: 'Withdraw', amount: 1000.0 },
    { datetime: '2022-02-02', action: 'Deposit', amount: 2000.0 },
    { datetime: '2022-02-03', action: 'Deposit', amount: 3000.0 },
    { datetime: '2022-02-04', action: 'Deposit', amount: 4000.0 },
    { datetime: '2022-02-05', action: 'Withdraw', amount: 5000.0 },
  ];

  const stockTransactions = [
    {
      datetime: '2022-02-01',
      action: 'Buy',
      stock_name: 'Stock 1',
      stock_symbol: 'ST 1',
      stock_price: 1000.0,
      quantity: 1,
      total_amount: 500.0,
    },
    {
      datetime: '2022-02-02',
      action: 'Sell',
      stock_name: 'Stock 2',
      stock_symbol: 'ST 2',
      stock_price: 2000.0,
      quantity: 2,
      total_amount: 1000.0,
    },
    {
      datetime: '2022-02-03',
      action: 'Buy',
      stock_name: 'Stock 3',
      stock_symbol: 'ST 3',
      stock_price: 3000.0,
      quantity: 3,
      total_amount: 1500.0,
    },
    {
      datetime: '2022-02-04',
      action: 'Sell',
      stock_name: 'Stock 4',
      stock_symbol: 'ST 4',
      stock_price: 4000.0,
      quantity: 4,
      total_amount: 2000.0,
    },
    {
      datetime: '2022-02-05',
      action: 'Buy',
      stock_name: 'Stock 5',
      stock_symbol: 'ST 5',
      stock_price: 5000.0,
      quantity: 5,
      total_amount: 2500.0,
    },
  ];

  const walletTransactionsRows = walletTransactions.map((column, index) => (
    <tr key={index}>
      <td>{column.datetime}</td>
      <td>{column.action}</td>
      <td>{showCurrency(column.amount)}</td>
    </tr>
  ));

  const stockTransactionsRows = stockTransactions.map((column, index) => (
    <tr key={index}>
      <td>{column.datetime}</td>
      <td>{column.action}</td>
      <td>{column.stock_name}</td>
      <td>{column.stock_symbol}</td>
      <td>{showCurrency(column.stock_price)}</td>
      <td>{column.quantity}</td>
      <td>{showCurrency(column.total_amount)}</td>
    </tr>
  ));

  return (
    <>
      <Title pl={16}>Dashboard</Title>
      <Group px={16} py={16} grow>
        <Paper p="xl" radius="md" shadow="md" withBorder mr={16}>
          <ScrollArea>
            <ThemeIcon radius={48} size={48} color="violet">
              <TbWallet size={28} />
            </ThemeIcon>
            <Text weight={700} size={28}>
              {showCurrency(balance)}
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
            <Text weight={700} size={28}>
              {stocksOwned}
            </Text>

            <Text size={22} color="dimmed">
              Stocks Owned
            </Text>
          </ScrollArea>
        </Paper>
      </Group>
      <Group px={16} py={16} grow>
        <Paper p="xl" radius="md" shadow="md" withBorder>
          <Group position="apart" pb={16}>
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
      <Group px={16} py={16} grow>
        <Paper p="xl" radius="md" shadow="md" withBorder>
          <Group position="apart" pb={16}>
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

import { useState, useEffect } from 'react';

import { Title, Text, Paper, Group, Grid, ThemeIcon, Table, Anchor, ScrollArea } from '@mantine/core';

import { accessTokenCookie } from '../../../services/constants/cookies';
import { getCookie } from '../../../services/utilities/cookie';
import { toProperCase } from '../../../services/utilities/toProperCase';
import { convertDatetime } from '../../../services/utilities/convertDatetime';
import { axiosGet } from '../../../services/utilities/axios';
import { ALL_STOCK_TRANSACTIONS_ENDPOINT } from '../../../services/constants/transactionsEndpoints';

const ClientAdminTransactions = ({ setVisible }) => {
  const accessToken = getCookie(accessTokenCookie);
  const headers = { Authorization: accessToken };

  const [transactions, setTransactions] = useState([]);

  const transactionRows = transactions.map((transaction) => {
    const { id, action_type, stock_symbol, stock_name, stock_quantity, stock_price, total_amount } = transaction;
    return (
      <tr key={id}>
        <td>{convertDatetime(created_at)}</td>
        <td>{toProperCase(action_type)}</td>
        <td>{stock_symbol}</td>
        <td>{stock_name}</td>
        <td>{showCurrency(stock_price)}</td>
        <td>{stock_quantity}</td>
        <td>{showCurrency(total_amount)}</td>
      </tr>
    );
  });

  useEffect(() => {
    setVisible(true);
    axiosGet(ALL_STOCK_TRANSACTIONS_ENDPOINT, headers).then((response) => {
      setVisible(false);
      setTransactions(response.data);
    });
  }, []);

  return (
    <>
      <Title pl="md">Transactions</Title>
      <Group px="md" py="md" grow>
        <Paper p="xl" radius="md" shadow="md" withBorder>
          <ScrollArea>
            <Table highlightOnHover>
              <thead>
                <tr>
                  <th>Date & Time</th>
                  <th>Action</th>
                  <th>Symbol</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {transactionRows.length > 0 ? (
                  transactionRows
                ) : (
                  <tr>
                    <td colSpan={7}>
                      <Text align="center">No Stock Transactions</Text>
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

export default ClientAdminTransactions;

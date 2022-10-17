import { useState, useEffect } from 'react';
import { Title, Paper, Group, ScrollArea, Table, Text } from '@mantine/core';
import { USER_STOCK_TRANSACTIONS_ENDPOINT } from '../../../services/constants/transactionsEndpoints';
import { accessTokenCookie } from '../../../services/constants/cookies';
import { showCurrency } from '../../../services/utilities/showCurrency';
import { axiosGet } from '../../../services/utilities/axios';
import { getCookie } from '../../../services/utilities/cookie';
import { toProperCase } from '../../../services/utilities/toProperCase';
import { convertDatetime } from '../../../services/utilities/convertDatetime';

const ClientUserTransactions = ({ setVisible }) => {
  const accessToken = getCookie(accessTokenCookie);
  const headers = { Authorization: accessToken };

  const [stockTransactions, setStockTransactions] = useState([]);

  useEffect(() => {
    axiosGet(USER_STOCK_TRANSACTIONS_ENDPOINT, headers).then((response) => {
      setStockTransactions(response.data);
    });
  }, []);

  const stockTransactionsRows = stockTransactions.map((column, index) => {
    const { created_at, action_type, stock_symbol, stock_name, stock_price, stock_quantity, total_amount } = column;

    return (
      <tr key={index}>
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

  return (
    <>
      <Title pl="md">Transactions</Title>
      <Group px="md" py="md" grow>
        <Paper p="xl" radius="md" shadow="md" withBorder>
          <ScrollArea>
            <Table>
              <thead>
                <tr>
                  <th>Datetime</th>
                  <th>Action</th>
                  <th>Symbol</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {stockTransactionsRows.length > 0 ? (
                  stockTransactionsRows
                ) : (
                  <tr>
                    <td colSpan={7}>
                      <Text align="center">No transactions</Text>
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

export default ClientUserTransactions;

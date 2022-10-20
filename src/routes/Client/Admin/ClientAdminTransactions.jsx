import { useState, useEffect } from 'react';
import { Title, Text, Paper, Group, Table, ScrollArea } from '@mantine/core';
import { accessTokenCookie } from '../../../services/constants/cookies';
import { ALL_STOCK_TRANSACTIONS_ENDPOINT } from '../../../services/constants/transactionsEndpoints';
import { ALL_USERS_ENDPOINT } from '../../../services/constants/usersEndpoints';
import { getCookie } from '../../../services/utilities/cookie';
import { axiosGet } from '../../../services/utilities/axios';
import { showCurrency } from '../../../services/utilities/showCurrency';
import { convertDatetime } from '../../../services/utilities/convertDatetime';
import { toProperCase } from '../../../services/utilities/toProperCase';

const ClientAdminTransactions = ({ setVisible }) => {
  const accessToken = getCookie(accessTokenCookie);
  const headers = {
    'Access-Control-Allow-Origin': '*',
    Authorization: accessToken,
  };

  const [transactions, setTransactions] = useState([]);
  const [userList, setUserList] = useState([]);
  const [isDoneLoading, setIsDoneLoading] = useState(true);

  const displayTable = () => {
    if (isDoneLoading) {
      return (
        <Table highlightOnHover>
          <thead>
            <tr>
              <th>Datetime</th>
              <th>User ID</th>
              <th>User Name</th>
              <th>Action</th>
              <th>Symbol</th>
              <th>Stock Name</th>
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
                <td colSpan={8}>
                  <Text align="center">No Transactions</Text>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      );
    }
  };

  const transactionRows = transactions
    .sort((x, y) => y.id - x.id)
    .map((transaction, index) => {
      const { user_id, created_at, action_type, stock_symbol, stock_name, stock_price, stock_quantity, total_amount } =
        transaction;
      const user = userList.find((user) => user.id === user_id);

      if (isDoneLoading) {
        return (
          <tr key={index}>
            <td>{convertDatetime(created_at)}</td>
            <td>{user_id}</td>
            <td>{`${user.first_name} ${user.last_name}`}</td>
            <td>{toProperCase(action_type)}</td>
            <td>{stock_symbol}</td>
            <td>{stock_name}</td>
            <td>{showCurrency(stock_price)}</td>
            <td>{stock_quantity}</td>
            <td>{showCurrency(total_amount)}</td>
          </tr>
        );
      }
    });

  useEffect(() => {
    setVisible(true);
    setIsDoneLoading(false);
    axiosGet(ALL_STOCK_TRANSACTIONS_ENDPOINT, headers).then((response) => {
      setTransactions(response.data);
    });
    axiosGet(ALL_USERS_ENDPOINT, headers).then((response) => {
      const usersArr = response.data.map((item) => {
        return {
          ...item,
          id: item.id.toString(),
        };
      });
      setUserList(usersArr);
      setVisible(false);
      setIsDoneLoading(true);
    });
  }, []);

  return (
    <>
      <Title pl="md">Transactions</Title>
      <Group px="md" py="md" grow>
        <Paper p="xl" radius="md" shadow="md" withBorder>
          <ScrollArea>{displayTable()}</ScrollArea>
        </Paper>
      </Group>
    </>
  );
};

export default ClientAdminTransactions;

import { Title, Paper, Group, ScrollArea, Table } from '@mantine/core';

const ClientUserTransactions = () => {
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

  const stockTransactionsRows = stockTransactions.map((column, index) => (
    <tr key={index}>
      <td>{column.datetime}</td>
      <td>{column.action}</td>
      <td>{column.stock_name}</td>
      <td>{column.stock_symbol}</td>
      <td>{column.stock_price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
      <td>{column.quantity}</td>
      <td>{column.total_amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
    </tr>
  ));

  return (
    <>
      <Title pl={16}>Transactions</Title>
      <Group px={16} py={16} grow>
        <Paper p="xl" radius="md" shadow="md" withBorder>
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

export default ClientUserTransactions;

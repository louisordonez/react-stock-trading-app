import { useState } from 'react';
import {
  Title,
  Text,
  Paper,
  Group,
  ScrollArea,
  Stack,
  Button,
  ThemeIcon,
  Table,
  TextInput,
  Modal,
} from '@mantine/core';
import { TbWallet } from 'react-icons/tb';

const ClientUserWallet = () => {
  const walletTransactions = [
    { datetime: '2022-02-01', action: 'Withdraw', amount: 1000.0 },
    { datetime: '2022-02-02', action: 'Deposit', amount: 2000.0 },
    { datetime: '2022-02-03', action: 'Deposit', amount: 3000.0 },
    { datetime: '2022-02-04', action: 'Deposit', amount: 4000.0 },
    { datetime: '2022-02-05', action: 'Withdraw', amount: 5000.0 },
  ];

  const [opened, setOpened] = useState(false);
  const [modalType, setModalType] = useState('');
  const [modalTitle, setModalTitle] = useState('');

  const handleModal = (modal, title) => {
    setOpened((opened) => !opened);
    setModalType(modal);
    setModalTitle(title);
  };

  const showModalContent = () => {
    if (modalType === 'Withdraw') {
      return (
        <>
          <TextInput label="Amount" />
          <Group position="right">
            <Button color="violet" mt={32}>
              Submit
            </Button>
          </Group>
        </>
      );
    } else {
      return (
        <>
          <TextInput label="Amount" />
          <Group position="right">
            <Button color="violet" mt={32}>
              Submit
            </Button>
          </Group>
        </>
      );
    }
  };

  const walletTransactionsRows = walletTransactions.map((column, index) => (
    <tr key={index}>
      <td>{column.datetime}</td>
      <td>{column.action}</td>
      <td>{column.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
    </tr>
  ));

  return (
    <>
      <Title pl={16}>Wallet</Title>
      <Group px={16} grow>
        <Stack>
          <Group grow mt={16}>
            <Paper p="xl" radius="md" shadow="md" withBorder>
              <ScrollArea>
                <Group>
                  <Group>
                    <ThemeIcon size={72} color="violet">
                      <TbWallet size={42} />
                    </ThemeIcon>
                  </Group>
                  <Stack>
                    <Text weight={700} size={28}>
                      $10,000.00
                      <Text weight={400} size={22} color="dimmed">
                        Balance
                      </Text>
                    </Text>
                  </Stack>
                </Group>
              </ScrollArea>
              <Group position="right" mt={16}>
                <Button color="violet" onClick={() => handleModal('Withdraw', 'Withdraw')}>
                  Withdraw
                </Button>
                <Button color="violet" onClick={() => handleModal('Deposit', 'Deposit')}>
                  Deposit
                </Button>
              </Group>
            </Paper>
          </Group>
          <Title order={3}>Transactions</Title>
          <Group grow>
            <Paper p="xl" radius="md" shadow="md" withBorder>
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
        </Stack>
      </Group>
      <Modal opened={opened} onClose={() => setOpened(false)} title={`${modalTitle}`} centered>
        {showModalContent()}
      </Modal>
    </>
  );
};

export default ClientUserWallet;

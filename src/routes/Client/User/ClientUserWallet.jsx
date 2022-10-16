import { useState, useEffect } from 'react';
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
import { SHOW_WALLET_ENDPOINT } from '../../../services/constants/walletEndpoints';
import { accessTokenCookie } from '../../../services/constants/cookies';
import { showCurrency } from '../../../services/utilities/showCurrency';
import { axiosGet } from '../../../services/utilities/axios';
import { getCookie } from '../../../services/utilities/cookie';
import { toProperCase } from '../../../services/utilities/toProperCase';
import { convertDatetime } from '../../../services/utilities/convertDatetime';

const ClientUserWallet = () => {
  const accessToken = getCookie(accessTokenCookie);
  const headers = { Authorization: accessToken };

  const [balance, setBalance] = useState(0);
  const [walletTransactions, setWalletTransactions] = useState([]);

  const [opened, setOpened] = useState(false);
  const [modalType, setModalType] = useState('');
  const [modalTitle, setModalTitle] = useState('');

  useEffect(() => {
    axiosGet(SHOW_WALLET_ENDPOINT, headers).then((response) => {
      setBalance(showCurrency(response.data.wallet.balance));
      setWalletTransactions(response.data.transactions);
    });
  }, []);

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

  const walletTransactionsRows = walletTransactions.map((column, index) => {
    const { created_at, action_type, total_amount } = column;

    return (
      <tr key={index}>
        <td>{convertDatetime(created_at)}</td>
        <td>{toProperCase(action_type)}</td>
        <td>{showCurrency(total_amount)}</td>
      </tr>
    );
  });

  return (
    <>
      <Title pl="md">Wallet</Title>
      <Group px="md" pt="md" grow>
        <Stack>
          <Group grow>
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
                      {balance}
                      <Text weight={400} size={22} color="dimmed">
                        Balance
                      </Text>
                    </Text>
                  </Stack>
                </Group>
              </ScrollArea>
              <Group position="right">
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

import { useState } from 'react';
import { Modal, TextInput, Button, Group } from '@mantine/core';

const ClientWithdrawModal = ({ opened, setWithdrawModal }) => {
  return (
    <>
      <Modal opened={opened} onClose={() => setWithdrawModal(false)} title="Withdraw" centered>
        <TextInput label="Amount" />
        <Group position="right">
          <Button color="violet" mt={32}>
            Submit
          </Button>
        </Group>
      </Modal>
    </>
  );
};

export default ClientWithdrawModal;

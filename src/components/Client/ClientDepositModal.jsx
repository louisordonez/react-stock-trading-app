import { useState } from 'react';
import { Modal, TextInput, Button, Group } from '@mantine/core';

const ClientDepositModal = ({ opened, setDepositModal }) => {
  return (
    <>
      <Modal opened={opened} onClose={() => setDepositModal(false)} title="Deposit" centered>
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

export default ClientDepositModal;

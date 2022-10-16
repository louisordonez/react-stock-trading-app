import { useState } from 'react';
import { Title, Text, Paper, Group, ScrollArea, Input, Stack, Button, Image, Modal, TextInput } from '@mantine/core';
import { TbSearch } from 'react-icons/tb';

const ClientUserMarket = () => {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Title pl={16}>Market</Title>
      <Group px={16} pt={16} grow>
        <Stack>
          <Input icon={<TbSearch />} placeholder="Search stock symbol" size="xl" />
          <Title order={3} mb={-16}>
            Most Active
          </Title>
          <Group grow mt={16}>
            <Paper p="xl" radius="md" shadow="md" withBorder>
              <ScrollArea>
                <Group>
                  <div style={{ width: 180 }}>
                    <Image
                      radius="md"
                      src="https://images.unsplash.com/photo-1511216335778-7cb8f49fa7a3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
                    />
                  </div>
                  <Stack>
                    <Text weight={700}>MSFT</Text>
                    <Text>Microsoft</Text>
                    <Text>$100.00</Text>
                    <Text>Owned: 10</Text>
                  </Stack>
                </Group>
              </ScrollArea>
              <Group position="right" mt={16}>
                <Button color="violet" onClick={() => setOpened((opened) => !opened)}>
                  Buy
                </Button>
              </Group>
            </Paper>
          </Group>
        </Stack>
      </Group>
      <Modal opened={opened} onClose={() => setOpened(false)} title="Buy" centered>
        <TextInput label="Quantity" />
        <Group position="right">
          <Button color="violet" mt={32}>
            Submit
          </Button>
        </Group>
      </Modal>
    </>
  );
};

export default ClientUserMarket;

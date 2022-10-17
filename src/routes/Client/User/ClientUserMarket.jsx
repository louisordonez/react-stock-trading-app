import { useState } from 'react';
import { Title, Text, Paper, Group, ScrollArea, Input, Stack, Button, Image, Modal, TextInput } from '@mantine/core';
import { TbSearch } from 'react-icons/tb';

const ClientUserMarket = ({ setVisible }) => {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Title pl="md">Market</Title>
      <Group px="md" pt="md" grow>
        <Stack>
          <Input icon={<TbSearch />} placeholder="Search by stock symbol" size="xl" />
          <Title order={3}>Most Active</Title>
          <Group grow mb="md">
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
              <Group position="right">
                <Button color="violet" onClick={() => setOpened((opened) => !opened)}>
                  Buy
                </Button>
              </Group>
            </Paper>
          </Group>
          <Group grow mb="md">
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
              <Group position="right">
                <Button color="violet" onClick={() => setOpened((opened) => !opened)}>
                  Buy
                </Button>
              </Group>
            </Paper>
          </Group>
          <Group grow mb="md">
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
              <Group position="right">
                <Button color="violet" onClick={() => setOpened((opened) => !opened)}>
                  Buy
                </Button>
              </Group>
            </Paper>
          </Group>
          <Group grow mb="md">
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
              <Group position="right">
                <Button color="violet" onClick={() => setOpened((opened) => !opened)}>
                  Buy
                </Button>
              </Group>
            </Paper>
          </Group>
          <Group grow mb="md">
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
              <Group position="right">
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

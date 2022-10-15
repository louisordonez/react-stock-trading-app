import { Title, Paper, Group, TextInput, PasswordInput, Button, Container } from '@mantine/core';

const ClientAccount = () => {
  return (
    <>
      <Title pl={16}>Account</Title>
      <Container size={520} my={16}>
        <Group grow>
          <Paper p="xl" radius="md" shadow="md" withBorder>
            <Group grow>
              <TextInput label="First name" />
              <TextInput label="Last name" />
            </Group>
            <TextInput label="Email" mt="md" />
            <Group grow>
              <PasswordInput label="Password" mt="md" />
              <PasswordInput label="Confirm Password" mt="md" />
            </Group>
            <Group>
              <Button fullWidth mt="xl" color="violet">
                Submit
              </Button>
            </Group>
          </Paper>
        </Group>
      </Container>
    </>
  );
};

export default ClientAccount;

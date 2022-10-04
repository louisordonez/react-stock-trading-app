import {
  AppShell,
  useMantineTheme,
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Button,
  Group,
} from '@mantine/core';
import LandingHeader from '../components/landing/landing-header';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const theme = useMantineTheme();
  const navigate = useNavigate();

  return (
    <>
      <AppShell
        padding="md"
        styles={{
          main: {
            background:
              theme.colorScheme === 'dark'
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
          },
        }}
        header={<LandingHeader />}
      >
        <Container size={520} my={40}>
          <Title
            align="center"
            sx={(theme) => ({
              fontFamily: `Greycliff CF, ${theme.fontFamily}`,
              fontWeight: 900,
              color: 'white',
            })}
          >
            Create an account
          </Title>
          <Text color="dimmed" size="sm" align="center" mt={5}>
            Already have an account?{' '}
            <Anchor size="sm" onClick={() => navigate('/sign_in')}>
              Sign in
            </Anchor>
          </Text>
          <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            <Group grow>
              <TextInput label="First name" required />
              <TextInput label="Last name" required />
            </Group>
            <TextInput label="Email" required mt="md" />
            <Group grow>
              <PasswordInput label="Password" required mt="md" />
              <PasswordInput label="Confirm Password" required mt="md" />
            </Group>
            <Button fullWidth mt="xl" color="violet">
              Sign up
            </Button>
          </Paper>
        </Container>
      </AppShell>
    </>
  );
};

export default SignUp;

import { AppShell, useMantineTheme, Anchor, Title, Text, Container } from '@mantine/core';
import LandingHeader from '../components/landing/landing-header';
import { useNavigate } from 'react-router-dom';
import SignInForm from '../components/sign-in/sign-in-form';

const SignIn = () => {
  const theme = useMantineTheme();
  const navigate = useNavigate();

  return (
    <>
      <AppShell
        padding="md"
        styles={{
          main: {
            background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
          },
        }}
        header={<LandingHeader />}
      >
        <Container size={420} my={40}>
          <Title
            align="center"
            sx={(theme) => ({
              fontFamily: `Greycliff CF, ${theme.fontFamily}`,
              fontWeight: 900,
              color: 'white',
            })}
          >
            Welcome back!
          </Title>
          <Text color="dimmed" size="sm" align="center" mt={5}>
            Do not have an account yet?{' '}
            <Anchor size="sm" onClick={() => navigate('/sign_up')}>
              Sign up
            </Anchor>
          </Text>
          <SignInForm />
        </Container>
      </AppShell>
    </>
  );
};

export default SignIn;

import { AppShell, useMantineTheme, Anchor, Title, Text, Container } from '@mantine/core';
import LandingHeader from '../components/landing/landing-header';
import { useNavigate } from 'react-router-dom';
import SignUpForm from '../components/sign-up/sign-up-form';

const SignUp = () => {
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
            Create an account
          </Title>
          <Text color="dimmed" size="sm" align="center" mt={5}>
            Already have an account?{' '}
            <Anchor size="sm" onClick={() => navigate('/sign_in')}>
              Sign in
            </Anchor>
          </Text>
          <SignUpForm />
        </Container>
      </AppShell>
    </>
  );
};

export default SignUp;

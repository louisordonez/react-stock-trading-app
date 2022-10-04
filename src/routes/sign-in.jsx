import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppShell, useMantineTheme, Anchor, Title, Text, Container } from '@mantine/core';
import LandingHeader from '../components/landing/landing-header';
import SignInForm from '../components/sign-in/sign-in-form';
import { notifySuccess, notifyError } from '../services/utilities/toast';
import { axiosPost } from '../services/utilities/axios';

const SignIn = () => {
  const theme = useMantineTheme();
  const navigate = useNavigate();

  const [isError, setIsError] = useState(false);

  const handleSignInSubmit = (signInInfo) => {
    axiosPost('/auth/sign_in', signInInfo).then((response) => {
      if (response.status === 200) {
        setIsError(false);
        notifySuccess(`${response.data.token}`);
      } else {
        setIsError(true);
        notifyError(`Invalid email or password.`);
      }
    });
  };

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
          <SignInForm onSignInSubmit={handleSignInSubmit} isError={isError} />
        </Container>
      </AppShell>
    </>
  );
};

export default SignIn;

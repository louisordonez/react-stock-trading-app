import { useState } from 'react';
import { AppShell, useMantineTheme, Anchor, Title, Text, Container } from '@mantine/core';
import LandingHeader from '../components/Landing/LandingHeader';
import SignInForm from '../components/SignIn/SignInForm';
import { notifyError } from '../components/Toast';
import { axiosPost } from '../services/utilities/axios';
import { signInUserEndpoint } from '../services/constants/usersEndpoint';
import { setCookie, getCookie } from '../services/utilities/cookie';

const SignIn = () => {
  const theme = useMantineTheme();

  const [isError, setIsError] = useState(false);

  const handleSignInSubmit = (signInInfo) => {
    axiosPost(signInUserEndpoint, signInInfo).then((response) => {
      if (response.status === 200) {
        setIsError(false);
        setCookie('access-token', response.data['access-token'], 7);
        console.log(`access-token: ${response.data['access-token']}`);
        console.log(`getCookie: ${getCookie('access-token')}`);
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
            })}
          >
            Welcome back!
          </Title>
          <Text color="dimmed" size="sm" align="center" mt={5}>
            Do not have an account yet?{' '}
            <Anchor size="sm" href="/sign_up">
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

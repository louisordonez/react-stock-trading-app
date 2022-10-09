import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppShell, useMantineTheme, Anchor, Title, Text, Container } from '@mantine/core';
import LandingHeader from '../components/Landing/LandingHeader';
import SignInForm from '../components/SignIn/SignInForm';
import { showErrorNotification } from '../components/Notification';
import { axiosPost } from '../services/utilities/axios';
import { SIGN_IN_USER_ENDPOINT } from '../services/constants/usersEndpoints';
import { setCookie } from '../services/utilities/cookie';
import { useRedirect } from '../services/utilities/useRedirect';
import { encodeEmail } from '../services/utilities/encodeEmail';

const SignIn = () => {
  useRedirect();

  const theme = useMantineTheme();
  const navigate = useNavigate();

  const [isError, setIsError] = useState(false);

  const handleSignInSubmit = (signInInfo) => {
    axiosPost(SIGN_IN_USER_ENDPOINT, signInInfo).then((response) => {
      if (response.status === 200) {
        setIsError(false);
        setCookie('access-token', response.data['access_token'], response.data.expiration);
        navigate('/client/dashboard');
      } else {
        if (response.response.data.error === 'Invalid login credentials') {
          setIsError(true);
          showErrorNotification('Invalid email or password.');
        } else if (response.response.data.error.message === 'Account needs to be verified.') {
          const email = encodeEmail(signInInfo.email);

          navigate(`/verify_email/${email}`);
        }
      }
    });
  };

  return (
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
  );
};

export default SignIn;

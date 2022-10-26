import { useState } from 'react';
import {
  AppShell,
  useMantineTheme,
  Anchor,
  Title,
  Text,
  Container,
  LoadingOverlay,
} from '@mantine/core';
import LandingHeader from '../components/Landing/LandingHeader';
import SignInForm from '../components/SignIn/SignInForm';
import { showErrorNotification } from '../components/Notification';
import { axiosPost } from '../services/utilities/axios';
import { SIGN_IN_USER_ENDPOINT } from '../services/constants/usersEndpoints';
import { accessTokenCookie } from '../services/constants/cookies';
import { setCookie } from '../services/utilities/cookie';
import { useRedirect } from '../services/utilities/useRedirect';
import {
  CLIENT_DASHBOARD_LINK,
  VERIFY_EMAIL_LINK,
} from '../services/constants/links';

const SignIn = () => {
  useRedirect();

  const theme = useMantineTheme();

  const [isError, setIsError] = useState(false);
  const [visible, setVisible] = useState(false);

  const handleSignInSubmit = (signInInfo) => {
    setVisible(true);
    axiosPost(SIGN_IN_USER_ENDPOINT, signInInfo).then((response) => {
      setVisible(false);

      if (response.status === 200) {
        setIsError(false);
        setCookie(
          accessTokenCookie,
          response.data[accessTokenCookie],
          response.data.expiration
        );

        if (response.data.user.email_verified) {
          window.location.assign(`${CLIENT_DASHBOARD_LINK}`);
        } else {
          window.location.assign(`${VERIFY_EMAIL_LINK}`);
        }
      } else {
        setIsError(true);
        showErrorNotification('Invalid email or password.');
      }
    });
  };

  return (
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
      <LoadingOverlay
        visible={visible}
        overlayBlur={2}
        loaderProps={{ color: 'violet' }}
      />
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
          Don't have an account yet?{' '}
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

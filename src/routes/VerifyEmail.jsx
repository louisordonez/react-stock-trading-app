import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppShell, useMantineTheme, Title, Text, Container, Paper, Button, Center } from '@mantine/core';
import { showSuccessNotification } from '../components/Notification';
import LandingHeader from '../components/Landing/LandingHeader';
import { SHOW_USER_ENDPOINT, REQUEST_EMAIL_VERIFICATION_ENDPOINT } from '../services/constants/usersEndpoints';
import { SIGN_IN_LINK, CLIENT_DASHBOARD_LINK } from '../services/constants/links';
import { axiosGet } from '../services/utilities/axios';
import { accessTokenCookie, getCookie } from '../services/utilities/cookie';
import { isLoggedIn } from '../services/utilities/isLoggedIn';

const VerifyEmail = () => {
  const navigate = useNavigate();
  const theme = useMantineTheme();
  const accessToken = getCookie(accessTokenCookie);
  const headers = {
    Authorization: `${accessToken}`,
  };

  const [email, setEmail] = useState('');

  useEffect(() => {
    if (isLoggedIn) {
      axiosGet(SHOW_USER_ENDPOINT, headers).then((response) => {
        response.data.email_verified ? navigate(CLIENT_DASHBOARD_LINK) : setEmail(response.data.email);
      });
    } else {
      navigate(SIGN_IN_LINK);
    }
  }, []);

  const handleResendEmail = () => {
    axiosGet(REQUEST_EMAIL_VERIFICATION_ENDPOINT, headers).then(() => {
      showSuccessNotification('An email has been sent to verify your account!');
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
          Please verify your email
        </Title>
        <Paper
          withBorder
          shadow="md"
          p={30}
          mt={30}
          radius="md"
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              handleSubmit();
            }
          }}
        >
          <Text color="dimmed" size="sm" align="center">
            We sent an email to <b>{email}</b>
          </Text>
          <Text color="dimmed" size="sm" align="center" mt={16}>
            Still can't find the email?
          </Text>
          <Center style={{ marginTop: '16px' }}>
            <Button color="violet" onClick={handleResendEmail}>
              Resend Email
            </Button>
          </Center>
        </Paper>
      </Container>
    </AppShell>
  );
};

export default VerifyEmail;

import { useNavigate, useParams } from 'react-router-dom';
import { AppShell, useMantineTheme, Title, Text, Container, Paper, Button, Center } from '@mantine/core';
import LandingHeader from '../components/Landing/LandingHeader';
import { showSuccessNotification } from '../components/Notification';
import { axiosPost } from '../services/utilities/axios';
import { RESEND_EMAIL_VERIFICATION_ENDPOINT } from '../services/constants/usersEndpoints';
import { useRedirect } from '../services/utilities/useRedirect';

const VerifyEmail = () => {
  useRedirect();

  const theme = useMantineTheme();
  const emailParam = new URLSearchParams(window.location.search);
  const email = emailParam.get('email');

  const handleResendEmail = () => {
    axiosPost(RESEND_EMAIL_VERIFICATION_ENDPOINT, { email: `${email}` }).then(() => {
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

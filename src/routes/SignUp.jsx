import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppShell, useMantineTheme, Anchor, Title, Text, Container, Paper } from '@mantine/core';
import LandingHeader from '../components/Landing/LandingHeader';
import SignUpForm from '../components/SignUp/SignUpForm';
import { showSuccessNotification } from '../components/Notification';
import { axiosPost } from '../services/utilities/axios';
import { USERS_ENDPOINT } from '../services/constants/usersEndpoints';
import { useRedirect } from '../services/utilities/useRedirect';
import { SIGN_IN_LINK } from '../services/constants/links';

const SignUp = () => {
  useRedirect();

  const theme = useMantineTheme();
  const navigate = useNavigate();
  const headers = { 'Content-Type': 'multipart/form-data' };

  const [isButtonLoading, setIsButtonLoading] = useState(false);

  const handleSignUpSubmit = (signUpInfo) => {
    const formData = new FormData();

    Object.entries(signUpInfo).forEach(([key, value]) => {
      formData.append(key, value);
    });

    setIsButtonLoading(true);
    axiosPost(USERS_ENDPOINT, formData, headers).then(() => {
      setIsButtonLoading(false);
      showSuccessNotification('An email has been sent to verify your account!');
      navigate(`${SIGN_IN_LINK}`);
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
          Create an account
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Already have an account?{' '}
          <Anchor size="sm" href="/sign_in">
            Sign in
          </Anchor>
        </Text>
        <Paper shadow="md" p={30} mt={30} radius="md">
          <SignUpForm onSignUpSubmit={handleSignUpSubmit} isButtonLoading={isButtonLoading} />
        </Paper>
      </Container>
    </AppShell>
  );
};

export default SignUp;

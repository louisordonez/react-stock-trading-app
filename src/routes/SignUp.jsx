import { useNavigate } from 'react-router-dom';
import { AppShell, useMantineTheme, Anchor, Title, Text, Container } from '@mantine/core';
import LandingHeader from '../components/Landing/LandingHeader';
import SignUpForm from '../components/SignUp/SignUpForm';
import { showSuccessNotification } from '../components/Notification';
import { axiosPost } from '../services/utilities/axios';
import { USERS_ENDPOINT } from '../services/constants/usersEndpoints';
import { useRedirect } from '../services/utilities/useRedirect';
import { encodeEmail } from '../services/utilities/encodeEmail';

const SignUp = () => {
  useRedirect();

  const theme = useMantineTheme();
  const navigate = useNavigate();

  const handleSignUpSubmit = (signUpInfo) => {
    axiosPost(USERS_ENDPOINT, signUpInfo).then(() => {
      showSuccessNotification('An email has been sent to verify your account!');

      navigate('/sign_in');
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
        <SignUpForm onSignUpSubmit={handleSignUpSubmit} />
      </Container>
    </AppShell>
  );
};

export default SignUp;

import { useNavigate } from 'react-router-dom';
import { AppShell, useMantineTheme, Anchor, Title, Text, Container } from '@mantine/core';
import LandingHeader from '../components/Landing/LandingHeader';
import SignUpForm from '../components/SignUp/SignUpForm';
import { notifySuccess } from '../components/Toast';
import { axiosPost } from '../services/utilities/axios';
import { usersEndpoint } from '../services/constants/usersEndpoint';

const SignUp = () => {
  const theme = useMantineTheme();

  const navigate = useNavigate();

  const handleSignUpSubmit = (signUpInfo) => {
    signUpInfo.role = 'user';

    axiosPost(usersEndpoint, signUpInfo).then(() => {
      notifySuccess('An email has been sent to verify your account!');
      navigate('/sign_in');
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
    </>
  );
};

export default SignUp;

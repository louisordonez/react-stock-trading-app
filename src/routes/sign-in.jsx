import { AppShell, useMantineTheme } from '@mantine/core';
import LandingHeader from '../components/landing/landing-header';

const SignIn = () => {
  const theme = useMantineTheme();

  return (
    <>
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
        {/* Your application here */}
      </AppShell>
    </>
  );
};

export default SignIn;

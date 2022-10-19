import { AppShell, useMantineTheme, Text, Center, Image, Stack } from '@mantine/core';
import LandingHeader from '../components/Landing/LandingHeader';
import { useRedirect } from '../services/utilities/useRedirect';

const Root = () => {
  useRedirect();

  const theme = useMantineTheme();

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
      <Center style={{ height: '100%' }}>
        <Stack>
          <div>
            <Text
              style={{
                fontSize: '36px',
                fontWeight: '700',
                textAlign: 'center',
                marginBottom: '3rem',
              }}
            >
              Get started and invest.
            </Text>
          </div>
          <div
            style={{
              width: '100vmin',
              paddingLeft: '3rem',
              paddingRight: '3rem',
            }}
          >
            <Image src="landing.png" />
          </div>
        </Stack>
      </Center>
    </AppShell>
  );
};

export default Root;

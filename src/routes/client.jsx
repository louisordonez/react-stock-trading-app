import { useState } from 'react';
import { AppShell, Text, useMantineTheme } from '@mantine/core';
import ClientHeader from '../components/Client/ClientHeader';
import ClientNavbar from '../components/Client/ClientNavbar';

const Client = () => {
  const theme = useMantineTheme();

  const [opened, setOpened] = useState(false);

  return (
    <AppShell
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <>
          <ClientNavbar opened={opened} />
        </>
      }
      header={<ClientHeader opened={opened} setOpened={setOpened} theme={theme} />}
    >
      <Text>Resize app to see responsive navbar in action</Text>
    </AppShell>
  );
};

export default Client;

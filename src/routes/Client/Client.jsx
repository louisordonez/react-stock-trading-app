import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AppShell, useMantineTheme } from '@mantine/core';
import ClientHeader from '../../components/Client/ClientHeader';
import ClientNavbar from '../../components/Client/ClientNavbar';
import ClientAdminDashboard from './Admin/ClientAdminDashboard';
import ClientUserDashboard from './User/ClientUserDashboard';

const Client = () => {
  const theme = useMantineTheme();
  const location = useLocation();

  const [opened, setOpened] = useState(false);

  const useDisplayContent = () => {
    switch (location.pathname) {
      case '/client/dashboard':
        return <ClientAdminDashboard />;
    }
  };

  return (
    <AppShell
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={<ClientNavbar opened={opened} />}
      header={<ClientHeader opened={opened} setOpened={setOpened} theme={theme} />}
    >
      {useDisplayContent()}
    </AppShell>
  );
};

export default Client;

import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AppShell, useMantineTheme } from '@mantine/core';
import ClientHeader from '../../components/Client/ClientHeader';
import ClientNavbar from '../../components/Client/ClientNavbar';
import {
  clientDashboardLink,
  clientPortfolioLink,
  clientTransactionsLink,
  clientAccountLink,
} from '../../services/constants/clientLinks';
import ClientAdminDashboard from './Admin/ClientAdminDashboard';
import ClientUserDashboard from './User/ClientUserDashboard';
import ClientUserPortolio from './User/ClientUserPortolio';
import ClientUserTransactions from './User/ClientUserTransactions';
import ClientAccount from './ClientAccount';

const Client = () => {
  const theme = useMantineTheme();
  const location = useLocation();

  const [opened, setOpened] = useState(false);

  const useDisplayContent = () => {
    switch (location.pathname) {
      case clientDashboardLink:
        return <ClientUserDashboard />;
      case clientPortfolioLink:
        return <ClientUserPortolio />;
      case clientTransactionsLink:
        return <ClientUserTransactions />;
      case clientAccountLink:
        return <ClientAccount />;
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

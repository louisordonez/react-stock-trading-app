import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { AppShell, useMantineTheme, LoadingOverlay } from '@mantine/core';
import ClientHeader from '../../components/Client/ClientHeader';
import ClientNavbar from '../../components/Client/ClientNavbar';
import {
  CLIENT_DASHBOARD_LINK,
  CLIENT_MARKET_LINK,
  CLIENT_WALLET_LINK,
  CLIENT_PORTFOLIO_LINK,
  CLIENT_USERS_LINK,
  CLIENT_TRANSACTIONS_LINK,
  CLIENT_ACCOUNT_LINK,
} from '../../services/constants/links';
import ClientAdminDashboard from './Admin/ClientAdminDashboard';
import ClientAdminTransactions from './Admin/ClientAdminTransactions';
import ClientAdminUsers from './Admin/ClientAdminUsers';
import ClientUserDashboard from './User/ClientUserDashboard';
import ClientUserMarket from './User/ClientUserMarket';
import ClientUserWallet from './User/ClientUserWallet';
import ClientUserPortolio from './User/ClientUserPortolio';
import ClientUserTransactions from './User/ClientUserTransactions';
import ClientAccount from './ClientAccount';
import { useRedirect } from '../../services/utilities/useRedirect';
import { getUserRole } from '../../services/utilities/getUserRole';

const Client = () => {
  useRedirect();

  const theme = useMantineTheme();
  const location = useLocation();

  const [opened, setOpened] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [visible, setVisible] = useState(false);

  const handleOpened = () => {
    setOpened((opened) => !opened);
  };

  useEffect(() => {
    getUserRole().then((response) => {
      setUserRole(response);
      useDisplayContent();
    });
  }, [userRole]);

  const useDisplayContent = () => {
    if (userRole !== '') {
      switch (location.pathname) {
        case CLIENT_DASHBOARD_LINK:
          return userRole === 'admin' ? (
            <ClientAdminDashboard setVisible={setVisible} />
          ) : (
            <ClientUserDashboard setVisible={setVisible} />
          );
        case CLIENT_MARKET_LINK:
          return <ClientUserMarket setVisible={setVisible} />;
        case CLIENT_WALLET_LINK:
          return <ClientUserWallet setVisible={setVisible} />;
        case CLIENT_PORTFOLIO_LINK:
          return <ClientUserPortolio setVisible={setVisible} />;
        case CLIENT_USERS_LINK:
          return <ClientAdminUsers setVisible={setVisible} />;
        case CLIENT_TRANSACTIONS_LINK:
          return userRole === 'admin' ? (
            <ClientAdminTransactions setVisible={setVisible} />
          ) : (
            <ClientUserTransactions setVisible={setVisible} />
          );
        case CLIENT_ACCOUNT_LINK:
          return <ClientAccount setVisible={setVisible} />;
      }
    }
  };

  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <ClientNavbar
          opened={opened}
          onOpened={handleOpened}
          userRole={userRole}
        />
      }
      header={
        <ClientHeader opened={opened} onOpened={handleOpened} theme={theme} />
      }
    >
      <LoadingOverlay
        visible={visible}
        overlayBlur={2}
        loaderProps={{ color: 'violet' }}
      />
      {useDisplayContent()}
    </AppShell>
  );
};

export default Client;

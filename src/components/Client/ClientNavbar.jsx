import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { createStyles, Navbar } from '@mantine/core';
import { TbDeviceAnalytics, TbFolder, TbReceipt, TbUser, TbLogout } from 'react-icons/tb';
import {
  clientDashboardLink,
  clientPortfolioLink,
  clientTransactionsLink,
  clientAccountLink,
} from '../../services/constants/clientLinks';
import { deleteCookie } from '../../services/utilities/cookie';

const useStyles = createStyles((theme, _params, getRef) => {
  const icon = getRef('icon');

  return {
    header: {
      paddingBottom: theme.spacing.md,
      marginBottom: theme.spacing.md * 1.5,
      borderBottom: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]}`,
    },

    footer: {
      paddingTop: theme.spacing.md,
      marginTop: theme.spacing.md,
      borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]}`,
    },

    link: {
      ...theme.fn.focusStyles(),
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none !important',
      fontSize: theme.fontSizes.sm,
      color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,
      cursor: 'pointer',

      '&:hover': {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,

        [`& .${icon}`]: {
          color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        },
      },
    },

    linkIcon: {
      ref: icon,
      color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
      marginRight: theme.spacing.sm,
      stroke: 1.5,
    },

    linkActive: {
      '&, &:hover': {
        backgroundColor: theme.fn.variant({ variant: 'light', color: 'violet' }).background,
        color: theme.fn.variant({ variant: 'light', color: 'violet' }).color,
        [`& .${icon}`]: {
          color: theme.fn.variant({ variant: 'light', color: 'violet' }).color,
        },
      },
    },
  };
});

const data = [
  { link: clientDashboardLink, label: 'Dashboard', icon: TbDeviceAnalytics },
  { link: clientPortfolioLink, label: 'Portfolio', icon: TbFolder },
  { link: clientTransactionsLink, label: 'Transactions', icon: TbReceipt },
];

const ClientNavbar = ({ opened }) => {
  const { classes, cx } = useStyles();
  const location = useLocation();
  const navigate = useNavigate();

  const [active, setActive] = useState('');

  useEffect(() => {
    const setActiveLink = () => {
      const pathName = location.pathname;
      switch (pathName) {
        case clientDashboardLink:
          setActive('Dashboard');
          break;
        case clientPortfolioLink:
          setActive('Portfolio');
          break;
        case clientTransactionsLink:
          setActive('Transactions');
          break;
        case clientAccountLink:
          setActive('Account');
          break;
      }
    };

    setActiveLink();
  }, [active]);

  const userSignOut = () => {
    deleteCookie('access-token');
    window.location.assign('/sign_in');
  };

  const links = data.map((item) => (
    <a
      className={cx(classes.link, { [classes.linkActive]: item.label === active })}
      key={item.label}
      onClick={() => {
        setActive(item.label);
        navigate(item.link);
      }}
    >
      <item.icon className={classes.linkIcon} />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
      <Navbar.Section grow>{links}</Navbar.Section>
      <Navbar.Section className={classes.footer}>
        <a
          className={cx(classes.link, { [classes.linkActive]: 'Account' === active })}
          onClick={() => {
            setActive('Account');
            navigate(clientAccountLink);
          }}
        >
          <TbUser className={classes.linkIcon} />
          <span>Account</span>
        </a>
        <a className={classes.link} onClick={userSignOut}>
          <TbLogout className={classes.linkIcon} />
          <span>Sign out</span>
        </a>
      </Navbar.Section>
    </Navbar>
  );
};

export default ClientNavbar;

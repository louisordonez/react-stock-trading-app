import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { createStyles, Navbar } from '@mantine/core';
import { TbUser, TbLogout } from 'react-icons/tb';
import {
  CLIENT_DASHBOARD_LINK,
  CLIENT_MARKET_LINK,
  CLIENT_WALLET_LINK,
  CLIENT_PORTFOLIO_LINK,
  CLIENT_USERS_LINK,
  CLIENT_TRANSACTIONS_LINK,
  CLIENT_ACCOUNT_LINK,
} from '../../services/constants/links';
import { userSignOut } from '../../services/utilities/userSignOut';
import { getNavbarData } from '../../services/utilities/getNavbarData';

const useStyles = createStyles((theme, _params, getRef) => {
  const icon = getRef('icon');

  return {
    header: {
      paddingBottom: theme.spacing.md,
      marginBottom: theme.spacing.md * 1.5,
      borderBottom: `1px solid ${
        theme.colorScheme === 'dark'
          ? theme.colors.dark[4]
          : theme.colors.gray[2]
      }`,
    },

    footer: {
      paddingTop: theme.spacing.md,
      marginTop: theme.spacing.md,
      borderTop: `1px solid ${
        theme.colorScheme === 'dark'
          ? theme.colors.dark[4]
          : theme.colors.gray[2]
      }`,
    },

    link: {
      ...theme.fn.focusStyles(),
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none !important',
      fontSize: theme.fontSizes.sm,
      color:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[1]
          : theme.colors.gray[7],
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,
      cursor: 'pointer',

      '&:hover': {
        backgroundColor:
          theme.colorScheme === 'dark'
            ? theme.colors.dark[6]
            : theme.colors.gray[0],
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,

        [`& .${icon}`]: {
          color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        },
      },
    },

    linkIcon: {
      ref: icon,
      color:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[2]
          : theme.colors.gray[6],
      marginRight: theme.spacing.sm,
      stroke: 1.5,
    },

    linkActive: {
      '&, &:hover': {
        backgroundColor: theme.fn.variant({ variant: 'light', color: 'violet' })
          .background,
        color: theme.fn.variant({ variant: 'light', color: 'violet' }).color,
        [`& .${icon}`]: {
          color: theme.fn.variant({ variant: 'light', color: 'violet' }).color,
        },
      },
    },
  };
});

const ClientNavbar = ({ opened, onOpened, userRole }) => {
  const { classes, cx } = useStyles();
  const location = useLocation();
  const navigate = useNavigate();

  const [active, setActive] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    const setActiveLink = () => {
      switch (location.pathname) {
        case CLIENT_DASHBOARD_LINK:
          setActive('Dashboard');
          break;
        case CLIENT_MARKET_LINK:
          setActive('Market');
          break;
        case CLIENT_WALLET_LINK:
          setActive('Wallet');
          break;
        case CLIENT_PORTFOLIO_LINK:
          setActive('Portfolio');
          break;
        case CLIENT_USERS_LINK:
          setActive('Users');
          break;
        case CLIENT_TRANSACTIONS_LINK:
          setActive('Transactions');
          break;
        case CLIENT_ACCOUNT_LINK:
          setActive('Account');
          break;
      }
    };

    setData(getNavbarData(userRole));
    setActiveLink();
  }, [userRole, location]);

  const links = data.map((item) => (
    <a
      className={cx(classes.link, {
        [classes.linkActive]: item.label === active,
      })}
      key={item.label}
      onClick={() => {
        setActive(item.label);
        navigate(item.link);
        onOpened();
      }}
    >
      <item.icon className={classes.linkIcon} />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <Navbar
      p="md"
      hiddenBreakpoint="sm"
      hidden={!opened}
      width={{ sm: 200, lg: 300 }}
    >
      <Navbar.Section grow>{links}</Navbar.Section>
      <Navbar.Section className={classes.footer}>
        <a
          className={cx(classes.link, {
            [classes.linkActive]: 'Account' === active,
          })}
          onClick={() => {
            setActive('Account');
            navigate(CLIENT_ACCOUNT_LINK);
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

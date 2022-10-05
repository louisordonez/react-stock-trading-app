import { useState } from 'react';
import { createStyles, Navbar } from '@mantine/core';
import {
  TbBellRinging,
  TbReceipt2,
  TbFingerprint,
  TbKey,
  TbDatabaseImport,
  Tb2Fa,
  TbSettings,
  TbSwitchHorizontal,
  TbLogout,
} from 'react-icons/tb';

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
      textDecoration: 'none',
      fontSize: theme.fontSizes.sm,
      color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,

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
  { link: '', label: 'Notifications', icon: TbBellRinging },
  { link: '', label: 'Billing', icon: TbReceipt2 },
  { link: '', label: 'Security', icon: TbFingerprint },
  { link: '', label: 'SSH Keys', icon: TbKey },
  { link: '', label: 'Databases', icon: TbDatabaseImport },
  { link: '', label: 'Authentication', icon: Tb2Fa },
  { link: '', label: 'Other Settings', icon: TbSettings },
];

const ClientNavbar = ({ opened }) => {
  const { classes, cx } = useStyles();

  const [active, setActive] = useState('Notifications');

  const links = data.map((item) => (
    <a
      className={cx(classes.link, { [classes.linkActive]: item.label === active })}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <>
      <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
        <Navbar.Section grow>{links}</Navbar.Section>
        <Navbar.Section className={classes.footer}>
          <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
            <TbSwitchHorizontal className={classes.linkIcon} />
            <span>Change account</span>
          </a>
          <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
            <TbLogout className={classes.linkIcon} />
            <span>Logout</span>
          </a>
        </Navbar.Section>
      </Navbar>
    </>
  );
};

export default ClientNavbar;

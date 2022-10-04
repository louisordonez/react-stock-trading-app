import { useRouteError } from 'react-router-dom';
import { createStyles, Title, Text, Button, Container, Group, useMantineTheme } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: 80,
    paddingBottom: 80,
  },

  label: {
    textAlign: 'center',
    fontWeight: 900,
    fontSize: 220,
    lineHeight: 1,
    marginBottom: theme.spacing.xl * 1.5,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[2],

    [theme.fn.smallerThan('sm')]: {
      fontSize: 120,
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    textAlign: 'center',
    fontWeight: 900,
    fontSize: 38,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[2],

    [theme.fn.smallerThan('sm')]: {
      fontSize: 32,
    },
  },

  description: {
    maxWidth: 500,
    margin: 'auto',
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.xl * 1.5,
  },
}));

const ErrorPage = () => {
  const error = useRouteError();
  const { classes } = useStyles();
  const theme = useMantineTheme();

  return (
    <>
      <div
        style={{
          width: '100%',
          height: '100%',
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        }}
      >
        <Container className={classes.root}>
          <div className={classes.label}>404</div>
          <Title className={classes.title}>{error.statusText || error.message}. You have found a secret place.</Title>
          <Text color="dimmed" size="lg" align="center" className={classes.description}>
            Unfortunately, this is only a 404 page. You may have mistyped the address, or the page has been moved to
            another URL.
          </Text>
          <Group position="center">
            <Button variant="subtle" color="violet" size="md" onClick={() => window.location.assign('/')}>
              Take me back to home page
            </Button>
          </Group>
        </Container>
      </div>
    </>
  );
};

export default ErrorPage;

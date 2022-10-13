import { Header, Text, Space, Button, Anchor } from '@mantine/core';
import { AiOutlineStock } from 'react-icons/ai';
import { SIGN_IN_LINK, SIGN_UP_LINK, VERIFY_EMAIL_LINK } from '../../services/constants/links';
import { userSignOut } from '../../services/utilities/userSignOut';
import ThemeToggle from '../ThemeToggle';

const LandingHeader = () => {
  const hideButtons = () => {
    let urlPath = window.location.pathname.split('/');

    urlPath = `/${urlPath[1]}`;

    if (urlPath !== SIGN_IN_LINK && urlPath !== SIGN_UP_LINK && urlPath !== VERIFY_EMAIL_LINK) {
      return (
        <>
          <Anchor
            href={`${SIGN_IN_LINK}`}
            style={{
              color: 'white',
              fontWeight: '700',
              marginRight: '1rem',
            }}
          >
            Sign in
          </Anchor>
          <Anchor href={`${SIGN_UP_LINK}`}>
            <Button color="violet">Sign up</Button>
          </Anchor>
        </>
      );
    } else if (urlPath === VERIFY_EMAIL_LINK) {
      return (
        <Anchor>
          <Button color="violet" onClick={userSignOut}>
            Sign out
          </Button>
        </Anchor>
      );
    }
  };

  return (
    <>
      <Header height={70} p="md">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '100%',
          }}
        >
          <Anchor
            href="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              height: '100%',
              textDecoration: 'none',
            }}
          >
            <AiOutlineStock color="white" size={36} />
            <Space w="xs" />
            <Text weight={700} color="white">
              Fintrader
            </Text>
          </Anchor>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              height: '100%',
              textDecoration: 'none',
            }}
          >
            {hideButtons()}
            <ThemeToggle />
          </div>
        </div>
      </Header>
    </>
  );
};

export default LandingHeader;

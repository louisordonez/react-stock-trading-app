import { Header, Text, Space, Button, Anchor } from '@mantine/core';
import { AiOutlineStock } from 'react-icons/ai';
import { SIGN_IN_LINK, SIGN_UP_LINK } from '../../services/constants/links';

const LandingHeader = () => {
  const hideButtons = () => {
    const urlPath = window.location.pathname.split('/');

    if (urlPath[1] !== 'sign_in' && urlPath[1] !== 'sign_up') {
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
              Stock Trading
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
          </div>
        </div>
      </Header>
    </>
  );
};

export default LandingHeader;

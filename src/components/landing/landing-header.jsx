import { Link } from 'react-router-dom';
import { Header, Text, Space, Button, Anchor } from '@mantine/core';
import { AiOutlineStock } from 'react-icons/ai';

const LandingHeader = () => {
  const hideButtons = () => {
    const urlPath = window.location.pathname.split('/');

    if (urlPath[1] !== 'sign_in' && urlPath[1] !== 'sign_up') {
      return (
        <>
          <Link to="/sign_in">
            <Button variant="white" color="dark">
              Sign in
            </Button>
          </Link>
          <Space w="sm" />
          <Button color="violet">Sign up</Button>
        </>
      );
    }
  };

  return (
    <Header height={70} p="xs">
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '100%',
        }}
      >
        <Link
          to="/"
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
        </Link>
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
  );
};

export default LandingHeader;

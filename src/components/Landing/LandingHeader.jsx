import { Link, useNavigate } from 'react-router-dom';
import { Header, Text, Space, Button, Anchor } from '@mantine/core';
import { AiOutlineStock } from 'react-icons/ai';

const LandingHeader = () => {
  const navigate = useNavigate();

  const hideButtons = () => {
    const urlPath = window.location.pathname.split('/');

    if (urlPath[1] !== 'sign_in' && urlPath[1] !== 'sign_up') {
      return (
        <>
          <Anchor
            onClick={() => navigate('/sign_in')}
            style={{
              color: 'white',
              fontWeight: '700',
              marginRight: '1rem',
            }}
          >
            Sign in
          </Anchor>
          <Link to="/sign_up">
            <Button color="violet">Sign up</Button>
          </Link>
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

import { Header, Text, Space, MediaQuery, Burger, Anchor } from '@mantine/core';
import { AiOutlineStock } from 'react-icons/ai';

const ClientHeader = ({ opened, onOpened, theme }) => {
  return (
    <>
      <Header height={70} p="md">
        <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
          <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
            <Burger
              opened={opened}
              onClick={onOpened}
              size="sm"
              color={theme.colors.gray[6]}
              mr="xl"
            />
          </MediaQuery>
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
        </div>
      </Header>
    </>
  );
};

export default ClientHeader;

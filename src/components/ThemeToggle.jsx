import { useState } from 'react';
import { Switch, Group, useMantineTheme } from '@mantine/core';
import { TbSun, TbMoonStars } from 'react-icons/tb';

const ThemeToggle = () => {
  const theme = useMantineTheme();

  const [isLightMode, setIsLightMode] = useState(false);

  const toggleColorScheme = () => {
    setIsLightMode((bool) => !bool);
  };

  return (
    <Group position="center" my={30}>
      <Switch
        checked={isLightMode}
        onChange={toggleColorScheme}
        size="lg"
        onLabel={<TbSun color={theme.white} size={20} />}
        offLabel={<TbMoonStars color={theme.colors.gray[6]} size={20} />}
        color="violet"
      />
    </Group>
  );
};

export default ThemeToggle;

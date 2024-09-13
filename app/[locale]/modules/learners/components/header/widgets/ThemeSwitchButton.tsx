import { useTheme } from 'next-themes';
import { FiSun } from 'react-icons/fi';
import { IoMoon } from 'react-icons/io5';

import { Button } from '@/app/[locale]/shared/components/shacdn-ui';

export const ThemeSwitchButton = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      className="h-11 w-11 rounded-full text-icon"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      {theme === 'light' ? <IoMoon size={28} /> : <FiSun size={28} />}
    </Button>
  );
};

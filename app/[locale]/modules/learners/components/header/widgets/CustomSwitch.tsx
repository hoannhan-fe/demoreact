import { Center, Icon } from '@chakra-ui/react';
import { useTheme } from 'next-themes';
import { BsSunFill, BsFillMoonFill } from 'react-icons/bs';
import { IconType } from 'react-icons/lib';

const CustomSwitch = () => {
  const { theme, setTheme } = useTheme();
  return (
    <Center
      className={`${theme === 'dark' ? 'bg-black' : 'bg-slate-300'} rounded-[32px] border-2 border-slate-300`}
      w="80px"
      p={1}
      pos="relative"
      cursor="pointer"
      borderColor={'gray'}
    >
      <IconTemplate
        as={BsSunFill}
        theme={theme}
        opacity={theme === 'light' ? 0 : 1}
      />
      <IconTemplate
        as={BsFillMoonFill}
        theme={theme}
        opacity={theme === 'light' ? 1 : 0}
      />
      <Center
        bg="white"
        borderRadius="50%"
        h="32px"
        w="32px"
        transition=".2s"
        willChange={'transform'}
        transform={
          theme === 'light' ? 'translate(-60%, 0)' : 'translate(60%, 0)'
        }
        onClick={() =>
          setTheme(
            theme === 'light' ? 'dark' : theme === 'system' ? 'dark' : 'light',
          )
        }
      />
    </Center>
  );
};
const IconTemplate = ({
  as,
  theme,
  opacity,
}: {
  as: IconType;
  theme: string | undefined;
  opacity: number;
}) => {
  return (
    <Center
      transition="color .1s"
      className={`opacity-${opacity} absolute ${as == BsSunFill ? 'left-2' : 'right-2'}`}
    >
      <Icon as={as} color={theme == 'light' ? 'black' : 'yellow'} />
    </Center>
  );
};
export default CustomSwitch;

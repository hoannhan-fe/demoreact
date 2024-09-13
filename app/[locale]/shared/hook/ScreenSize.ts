import { useMediaQuery } from '@react-hook/media-query';

export const useScreenSize = () => {
  const sm = useMediaQuery('(max-width: 767px)');
  const md = useMediaQuery('(min-width: 767px) and (max-width: 1023px)');
  const lg = useMediaQuery('(min-width: 1023px)');

  return { sm, md, lg };
};

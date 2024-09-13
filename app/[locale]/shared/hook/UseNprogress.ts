import { useEffect } from 'react';
import NProgress from 'nprogress';
import 'styles/nprogress.css';

export const useNprogress = (isFetching: boolean) => {
  useEffect(() => {
    if (isFetching) {
      NProgress.start();
    } else {
      NProgress.done();
    }
  }, [isFetching]);

  return null;
};

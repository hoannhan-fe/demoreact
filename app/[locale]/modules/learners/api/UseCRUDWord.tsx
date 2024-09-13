import { useErrorHandler } from '@/app/[locale]/shared/hook';

import { useQuery } from 'react-query';

import { GetWordService } from '../services/Word.service';

export function useGetWord(word: string, enabled?: boolean) {
  const { handle } = useErrorHandler();
  const {
    data: res,
    isFetching,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: ['GET_WORD', word],
    queryFn: () => GetWordService.getWord(word),
    onError: handle,
    enabled,
  });

  return {
    data: res?.data ?? undefined,
    isFetching,
    isSuccess,
    refetch,
  };
}

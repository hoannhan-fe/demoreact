'use client';
import { useQuery } from 'react-query';

import { DEFAULT_PAGE, PAGE_SIZE } from '@/app/[locale]/shared/constants';
import { useErrorHandler } from '@/app/[locale]/shared/hook';

import { videoService } from '../services';

// Helen Speaking
export function useGetAllHelenSpeaking(enabled?: boolean) {
  const { handle } = useErrorHandler();
  const {
    data: res,
    isFetching,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: 'GET_ALL_HELEN_SPEAKING',
    queryFn: () =>
      videoService.getAllHelenSpeaking({
        page: DEFAULT_PAGE,
        limit: PAGE_SIZE[1],
      }),
    onError: handle,
    enabled,
  });

  return {
    data: res?.data?.data ?? [],
    meta: res?.data?.metaData,
    isFetching,
    isSuccess,
    refetch,
  };
}

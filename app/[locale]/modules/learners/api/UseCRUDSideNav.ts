'use client';
import { useQuery } from 'react-query';

import { useErrorHandler } from '@/app/[locale]/shared/hook';
import { sideNavService } from '../services';

// Helen Speaking
export function useGetAllHelenSpeakingChannel(enabled?: boolean) {
  const { handle } = useErrorHandler();
  const {
    data: res,
    isFetching,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: 'GET_ALL_HELEN_SPEAKING_CHANNEL',
    queryFn: () => sideNavService.getAllHelenSpeakingChannel(),
    onError: handle,
    enabled,
  });

  return {
    data: res?.data ?? [],
    isFetchingChannel: isFetching,
    isSuccessChannel: isSuccess,
    refetch,
  };
}

export function useGetAllHelenSpeakingAudio(enabled?: boolean) {
  const { handle } = useErrorHandler();
  const {
    data: res,
    isFetching,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: 'GET_ALL_HELEN_SPEAKING_AUDIO',
    queryFn: () => sideNavService.getAllHelenSpeakingAudio(),
    onError: handle,
    enabled,
  });

  return {
    data: res?.data ?? [],
    isFetchingAudio: isFetching,
    isSuccessAudio: isSuccess,
    refetch,
  };
}

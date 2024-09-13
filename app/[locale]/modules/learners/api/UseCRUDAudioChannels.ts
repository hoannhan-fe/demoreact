'use client';
import { useQuery } from 'react-query';

import { useErrorHandler } from '@/app/[locale]/shared/hook';
import { audioChannelsService } from '../services/AudioChannels.service';

export function useGetAudioChannels(enabled?: boolean) {
  const { handle } = useErrorHandler();
  const {
    data: res,
    isFetching,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: 'GET_AUDIO_CHANNELS',
    queryFn: () => audioChannelsService.getAudioChannels(),
    onError: handle,
    enabled,
  });

  return {
    data: res?.data ?? [],
    isFetching,
    isSuccess,
    refetch,
  };
}

import { useErrorHandler } from '@/app/[locale]/shared/hook';
import { IGetListAudioRequest } from '../types';
import { useQuery } from 'react-query';
import { audioService } from '../services';

export function usePostListAudioById(
  req: IGetListAudioRequest,
  enabled?: boolean,
) {
  const { handle } = useErrorHandler();
  const {
    data: resp,
    isFetching,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: 'GET_LIST_AUDIO_BY_ID',
    queryFn: () => audioService.postAllAudioById(req),
    onError: handle,
    enabled,
  });

  return {
    data: resp?.data?.data ?? [],
    meta: resp?.data?.metaData,
    isFetching,
    isSuccess,
    refetch,
  };
}

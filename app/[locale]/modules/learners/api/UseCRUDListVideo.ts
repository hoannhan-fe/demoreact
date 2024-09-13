import { useErrorHandler } from '@/app/[locale]/shared/hook';
import { listVideoService } from '../services/ListVideo.service';
import { useQuery } from 'react-query';
import { IGetAllListVideoRequest } from '../types';

export function useGetAllListVideo(
  req: IGetAllListVideoRequest,
  queryKey?: string,
  enabled?: boolean,
) {
  const { handle } = useErrorHandler();
  const {
    data: resp,
    isFetching,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: ['GET_ALL_LIST_VIDEO', queryKey],
    queryFn: () => listVideoService.getAllListVideo(req),
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
export function usePostRecommendListVideo(videoId: string, enabled?: boolean) {
  const { handle } = useErrorHandler();
  const {
    data: res,
    isFetching,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: 'GET_RECOMMEND_LIST_VIDEO',
    queryFn: () => listVideoService.postVideoRecommend(videoId),
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

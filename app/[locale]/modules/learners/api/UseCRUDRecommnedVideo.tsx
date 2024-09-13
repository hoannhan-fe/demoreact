'use client';
import { useQuery } from 'react-query';

import { useErrorHandler } from '@/app/[locale]/shared/hook';
import { recommendVideoService } from '../services/Recommend.service';
import { IRecommendRequest } from '../types/Recommend.types';

// Helen Speaking
export function useGetRecommendVideo(
  req: IRecommendRequest,
  enabled?: boolean,
) {
  const { handle } = useErrorHandler();
  const {
    data: res,
    isFetching,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: 'GET_RECOMMEND_VIDEO',
    queryFn: () => recommendVideoService.getRecommendVideo(req),
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

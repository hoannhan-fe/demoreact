'use client';
import { useQuery } from 'react-query';

import { useErrorHandler } from '@/app/[locale]/shared/hook';
import { videoPlayerService } from '../services';

// Helen Speaking
export function useGetVideoSubtitles(videoId: string, enabled?: boolean) {
  const { handle } = useErrorHandler();
  const {
    data: res,
    isFetching,
    isSuccess,
    error,
    refetch,
  } = useQuery({
    queryKey: 'GET_VIDEO_SUBTITLE',
    queryFn: () => videoPlayerService.getVideoSubtitles(videoId),
    onError: (error: unknown) => {
      handle(error);
    },
    enabled,
  });

  return {
    data: res?.data ?? [],
    isFetching,
    isSuccess,
    error,
    refetch,
  };
}

export function usePostVideoVocabulary(videoId: string, enabled?: boolean) {
  const { handle } = useErrorHandler();
  const {
    data: res,
    isFetching,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: 'POST_VIDEO_VOCABULARY',
    queryFn: () => videoPlayerService.postVideoVocabulary(videoId),
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

export function useGetWord(word: string, enabled?: boolean) {
  const { handle } = useErrorHandler();
  const {
    data: res,
    isFetching,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: ['GET_WORD', word],
    queryFn: () => videoPlayerService.getWord(word),
    onError: handle,
    enabled,
  });

  return {
    data: res ?? undefined,
    isFetching,
    isSuccess,
    refetch,
  };
}

export function usePostDictationCheck(
  checkStr: string,
  originalStr: string,
  enabled?: boolean,
) {
  const { handle } = useErrorHandler();
  const {
    data: res,
    isFetching,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: 'POST_DICTATION_CHECK',
    queryFn: () => videoPlayerService.postDictationCheck(checkStr, originalStr),
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

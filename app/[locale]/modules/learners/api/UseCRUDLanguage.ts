'use client';

import { useQuery } from 'react-query';

import { useErrorHandler } from '@/app/[locale]/shared/hook';

import { languageService } from '../services';

// Language
export function useGetAllLanguage(enabled?: boolean) {
  const { handle } = useErrorHandler();
  const {
    data: res,
    isFetching,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: 'GET_ALL_LANGUAGE',
    queryFn: () => languageService.getAllLanguage({}),
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
// Language Pair
export function useGetLanguagePair(locale: string, enabled?: boolean) {
  const { handle } = useErrorHandler();
  const {
    data: res,
    isFetching,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: ['GET_LANGUAGE_PAIR', locale],
    queryFn: () => languageService.getLanguagePair(locale),
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

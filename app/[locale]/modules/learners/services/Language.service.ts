import { handleFilterParams } from '@/app/[locale]/shared/utils';
import { apiClient } from '@/app/[locale]/shared/api';
import {
  IGetAllLanguageRequest,
  IListLanguagePairResponse,
  IListLanguageResponse,
} from '../types/Language.types';
import { LEARNER_API_ROUTES } from '../utils';

async function getAllLanguage(
  req: IGetAllLanguageRequest,
): Promise<IListLanguageResponse> {
  return apiClient.get(
    LEARNER_API_ROUTES.GET_ALL_LANGUAGE,
    handleFilterParams(req),
  );
}

async function getLanguagePair(
  locale: string,
): Promise<IListLanguagePairResponse> {
  return apiClient.get(`${LEARNER_API_ROUTES.GET_LANGUAGE_PAIR}/${locale}`);
}

export const languageService = {
  getAllLanguage,
  getLanguagePair,
};

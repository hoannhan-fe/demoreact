import { apiClient } from '@/app/[locale]/shared/api';
import { LEARNER_API_ROUTES } from '../utils';
import { IGetWordDefinitionResponseBody } from '../types';

async function getWord(word: string): Promise<IGetWordDefinitionResponseBody> {
  return apiClient.post(LEARNER_API_ROUTES.GET_WORD, {
    word: word,
  });
}
export const GetWordService = {
  getWord,
};

import { apiClient } from '@/app/[locale]/shared/api';
import {
  IDictationCheckResponseBody,
  IGetWordDefinitionResponseBody,
  IGroupIDefinition,
  IListVideoPlayerResponse,
} from '../types';
import { groupDefinitions, LEARNER_API_ROUTES } from '../utils';
import { IListWordVocab } from '../types/VocabWord.types';

async function getVideoSubtitles(
  id: string,
): Promise<IListVideoPlayerResponse> {
  return apiClient.post(LEARNER_API_ROUTES.GET_YOUTUBE_SUB, {
    mediaUrl: `https://www.youtube.com/watch?v=${id}`,
  });
}

async function getWord(word: string): Promise<IGroupIDefinition> {
  try {
    const wordInfo = await apiClient.post<IGetWordDefinitionResponseBody>(
      LEARNER_API_ROUTES.GET_WORD,
      {
        word: word,
      },
    );

    // Gộp các định nghĩa từ
    const groupedWordInfo = groupDefinitions(wordInfo);

    return groupedWordInfo;
  } catch (error) {
    console.error('Error fetching word definition:', error);
    throw error;
  }
}

async function postVideoVocabulary(id: string): Promise<IListWordVocab> {
  return apiClient.post(LEARNER_API_ROUTES.POST_VIDEO_VOCAB_WORDS, {
    mediaUrl: `https://www.youtube.com/watch?v=${id}`,
  });
}

async function postDictationCheck(
  checkStr: string,
  originalStr: string,
): Promise<IDictationCheckResponseBody> {
  return apiClient.post(LEARNER_API_ROUTES.POST_DICTATION_CHECK, {
    checkStr,
    originalStr,
  });
}

export const videoPlayerService = {
  getVideoSubtitles,
  getWord,
  postVideoVocabulary,
  postDictationCheck,
};

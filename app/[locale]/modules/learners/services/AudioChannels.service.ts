import { apiClient } from '@/app/[locale]/shared/api';

import { LEARNER_API_ROUTES } from '../utils';
import { IAudioChannelsResponse } from '../types/AudioChannels.types';

function getAudioChannels(): Promise<IAudioChannelsResponse> {
  try {
    const response = apiClient.get<IAudioChannelsResponse>(
      LEARNER_API_ROUTES.GET_ALL_HELEN_SPEAKING_AUDIO,
    );
    return response;
  } catch (error) {
    console.error('Error fetching data', error);
    throw error;
  }
}
export const audioChannelsService = {
  getAudioChannels,
};

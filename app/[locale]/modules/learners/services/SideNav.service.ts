import { apiClient } from '@/app/[locale]/shared/api';
import {
  IListSideNavAudioResponse,
  IListHelenSpeakingChannelResponse,
} from '../types';
import { LEARNER_API_ROUTES } from '../utils';

function getAllHelenSpeakingChannel(): Promise<IListHelenSpeakingChannelResponse> {
  try {
    const response = apiClient.get<IListHelenSpeakingChannelResponse>(
      LEARNER_API_ROUTES.GET_ALL_HELEN_SPEAKING_CHANNEL,
    );
    return response;
  } catch (error) {
    console.error('Error fetching data', error);
    throw error; // Hoặc bạn có thể trả về giá trị mặc định tùy thuộc vào yêu cầu của bạn
  }
}

function getAllHelenSpeakingAudio(): Promise<IListSideNavAudioResponse> {
  try {
    const response = apiClient.get<IListSideNavAudioResponse>(
      LEARNER_API_ROUTES.GET_ALL_HELEN_SPEAKING_AUDIO,
    );

    return response;
  } catch (error) {
    console.error('Error fetching data', error);
    throw error;
  }
}
export const sideNavService = {
  getAllHelenSpeakingChannel,
  getAllHelenSpeakingAudio,
};

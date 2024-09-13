import { apiClient } from '@/app/[locale]/shared/api';
import { IGetListAudioRequest, IListAudioResponse } from '../types';
import { LEARNER_API_ROUTES } from '../utils';
import { handleFilterParams } from '@/app/[locale]/shared/utils';

function postAllAudioById(
  req: IGetListAudioRequest,
): Promise<IListAudioResponse> {
  try {
    const response = apiClient.post<IListAudioResponse>(
      LEARNER_API_ROUTES.POST_ALL_HELEN_SPEAKING_AUDIO_LIST_BY_ID,
      handleFilterParams(req),
    );
    return response;
  } catch (error) {
    console.error('Error fetching data', error);
    throw error;
  }
}
export const audioService = {
  postAllAudioById,
};

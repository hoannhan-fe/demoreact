import { handleFilterParams } from '@/app/[locale]/shared/utils';
import { apiClient } from '@/app/[locale]/shared/api';
import {
  IGetAllHelenSpeakingRequest,
  IListHelenSpeakingResponse,
} from '../types/Video.types';
import { LEARNER_API_ROUTES } from '../utils';

async function getAllHelenSpeaking(
  req: IGetAllHelenSpeakingRequest,
): Promise<IListHelenSpeakingResponse> {
  return apiClient.post(
    LEARNER_API_ROUTES.GET_ALL_HELEN_SPEAKING,
    handleFilterParams(req),
  );
}

export const videoService = {
  getAllHelenSpeaking,
};

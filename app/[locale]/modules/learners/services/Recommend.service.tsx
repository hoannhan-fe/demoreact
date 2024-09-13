import { apiClient } from '@/app/[locale]/shared/api';

import { LEARNER_API_ROUTES } from '../utils';
import {
  IRecommendRequest,
  IRecommendResponse,
} from '../types/Recommend.types';
import { handleFilterParams } from '@/app/[locale]/shared/utils';

async function getRecommendVideo(
  req: IRecommendRequest,
): Promise<IRecommendResponse> {
  return apiClient.post(
    LEARNER_API_ROUTES.POST_VIDEO_RECOMMEND,
    handleFilterParams(req),
  );
}

export const recommendVideoService = {
  getRecommendVideo,
};

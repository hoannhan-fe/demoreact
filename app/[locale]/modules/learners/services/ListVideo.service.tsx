import { handleFilterParams } from '@/app/[locale]/shared/utils';
import {
  IGetAllListVideoRequest,
  IGetAllListVideoResponse,
  IGetRecommendListVideoResponse,
} from '../types/ListVideo.types';
import { apiClient } from '@/app/[locale]/shared/api';
import { LEARNER_API_ROUTES } from '../utils';

async function getAllListVideo(
  req: IGetAllListVideoRequest,
): Promise<IGetAllListVideoResponse> {
  return apiClient.post(
    LEARNER_API_ROUTES.GET_ALL_HELEN_SPEAKING_CHANNEL_VIDEO,
    handleFilterParams(req),
  );
}
async function postVideoRecommend(
  id: string,
): Promise<IGetRecommendListVideoResponse> {
  return apiClient.post(LEARNER_API_ROUTES.POST_VIDEO_RECOMMEND, {
    videoUrl: `https://www.youtube.com/watch?v=${id}`,
  });
}
export const listVideoService = {
  getAllListVideo,
  postVideoRecommend,
};

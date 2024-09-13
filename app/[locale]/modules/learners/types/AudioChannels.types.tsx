import { IListResponseBody2 } from '@/app/[locale]/shared/types';
export interface IAudioChannels {
  channelId?: number;
  name: string;
  slug: string;
  description: string;
  difficulty: string;
  imageUrl: string;
  totalAudios: number;
}

export interface IAudioChannelsResponse
  extends IListResponseBody2<IAudioChannels> {}

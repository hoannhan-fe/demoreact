import React from 'react';
import { useRouter } from 'next/navigation';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/app/[locale]/shared/components/shacdn-ui/Carousel';
import { youtube_parser } from '@/app/[locale]/shared/utils';

import CardListRecommendVideo from './CardListRecommendVideo';
import { IRecommend } from '../../types/Recommend.types';
import { useGetRecommendVideo } from '../../api/UseCRUDRecommnedVideo';
const RecommendVideo = () => {
  const { data: listRecommendvideos } = useGetRecommendVideo({
    videoUrl: 'recommend_for_you',
  });

  const router = useRouter();

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-5 h-full pb-10">
      <div className="col-span-full">
        <h1 className="font-semibold text-2xl mb-4">Recommend Videos</h1>
      </div>
      <div className="col-span-full px-2">
        <Carousel
          opts={{
            align: 'start',
          }}
          className="w-full"
        >
          <CarouselContent className="w-full">
            {listRecommendvideos.map((recommend: IRecommend, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
                <div
                  className="p-1"
                  onClick={() =>
                    router.push(
                      `/videos/${youtube_parser(recommend.youtubeUrl)}`,
                    )
                  }
                >
                  <CardListRecommendVideo data={recommend} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious
            className="hover:bg-transparent hover:text-white"
            style={{
              width: '32px',
              height: '32px',
              fontSize: '16px',
              padding: '4px',
            }}
          />
          <CarouselNext
            className="hover:bg-transparent hover:text-white"
            style={{
              width: '32px',
              height: '32px',
              fontSize: '16px',
              padding: '4px',
            }}
          />
        </Carousel>
      </div>
    </div>
  );
};

export default RecommendVideo;

import { useRouter } from 'next/navigation';

import {
  DEFAULT_PAGE,
  MAX_PAGE_SIZE,
} from '@/app/[locale]/shared/constants/DataTable.constants';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/app/[locale]/shared/components/shacdn-ui/Carousel';
import { youtube_parser } from '@/app/[locale]/shared/utils';

import { useGetAllListVideo } from '../../api/UseCRUDListVideo';
import { IGetAllListVideo } from '../../types/ListVideo.types';
import CardListVideoTrendingLatest from './widgets/CardListVideoTrendingLatest';

// import { useEffect } from 'react';

const LatestVideo = () => {
  const router = useRouter();

  const { data: listAllVideo } = useGetAllListVideo(
    {
      page: DEFAULT_PAGE,
      limit: MAX_PAGE_SIZE,

      sortBy: 'publishedAt',
    },
    'publishedAt',
  );

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-4 h-full pb-10">
      <div className="col-span-full px-2">
        <h1 className="font-semibold text-xl mb-2">Latest Videos</h1>
      </div>
      <div className="col-span-full px-2">
        <Carousel
          opts={{
            align: 'start',
          }}
          className="w-full"
        >
          <CarouselContent className="w-full">
            {listAllVideo.map((item: IGetAllListVideo, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
                <div
                  className="p-1"
                  onClick={() =>
                    router.push(`/videos/${youtube_parser(item.youtubeUrl)}`)
                  }
                >
                  <CardListVideoTrendingLatest data={item} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hover:bg-transparent hover:text-white" />
          <CarouselNext className="hover:bg-transparent hover:text-white" />
        </Carousel>
      </div>
    </div>
  );
};

export default LatestVideo;

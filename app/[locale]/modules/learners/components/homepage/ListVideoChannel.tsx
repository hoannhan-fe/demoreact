import React from 'react';
import { useRouter } from 'next/navigation';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/app/[locale]/shared/components/shacdn-ui/Carousel';

import { useGetAllHelenSpeakingChannel } from '../../api/UseCRUDSideNav';
import CardVideoChannel from './CardVideoChannel';
import { ISideNav } from '../../types';

const ListVideoChannel = () => {
  const router = useRouter();
  const { data: listChannels } = useGetAllHelenSpeakingChannel();
  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-5 h-full pb-10">
      <div className="col-span-full">
        <h1 className="font-semibold text-xl mb-4">All Channels</h1>
      </div>
      <div className="col-span-full px-2">
        <Carousel className="w-full">
          <CarouselContent className="w-full">
            {listChannels.map((channel: ISideNav, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/5">
                <div
                  className="p-1"
                  onClick={() => router.push(`/channels/${channel.value}`)}
                >
                  <CardVideoChannel data={channel} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hover:bg-transparent hover:text-white" />
          <CarouselNext className="text-black hover:bg-transparent hover:text-white" />
        </Carousel>
      </div>
    </div>
  );
};

export default ListVideoChannel;

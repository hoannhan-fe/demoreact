import React from 'react';
import { useRouter } from 'next/navigation';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/app/[locale]/shared/components/shacdn-ui/Carousel';

import { useGetAudioChannels } from '../../api/UseCRUDAudioChannels';
import { IAudioChannels } from '../../types/AudioChannels.types';
import CardAudioChannel from './CardAudioChannel';

const ListVideoChannel = () => {
  const router = useRouter();
  const { data: listAudioChannels } = useGetAudioChannels();
  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-5 h-full pb-10">
      <div className="col-span-full ">
        <h1 className="font-semibold text-xl mb-4">All Audio</h1>
      </div>
      <div className="col-span-full px-2">
        <Carousel className="w-full">
          <CarouselContent className="w-full">
            {listAudioChannels.map((audio: IAudioChannels, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/5">
                <div
                  className="p-1"
                  onClick={() => router.push(`/audio/${audio.slug}`)}
                >
                  <CardAudioChannel data={audio} />
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

export default ListVideoChannel;

import React from 'react';
import { IAudioChannels } from '../../types/AudioChannels.types';

type IAudioChannelProps = {
  data: IAudioChannels;
};

const CardAudioChannel = ({ data }: IAudioChannelProps) => {
  return (
    <div className="group relative w-[238px] h-[80px] cursor-pointer overflow-hidden duration-200 border border-white/0 hover:border-white rounded-lg">
      <div className="overflow-hidden ">
        <img
          src={data.imageUrl}
          alt={data.name}
          className="w-full h-full  transition-transform duration-200  group-hover:scale-110"
          style={{ opacity: 0.6 }}
        />
      </div>
      <div className="absolute inset-0 flex items-center justify-center text-white px-4 py-2 bg-black bg-opacity-50">
        <h2 className="text-sm font-bold">{data.name}</h2>
      </div>
    </div>
  );
};

export default CardAudioChannel;

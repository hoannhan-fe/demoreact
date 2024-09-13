'use client';
import { IAudioDetail } from '../../types';
import Script from 'next/script';
import { AudioPlayerWidget } from './audio-widget/AudioPlayerWidget';

export const AudioPlayerDetail = ({
  audioDetail,
}: {
  audioDetail: IAudioDetail;
}) => {
  console.log(audioDetail);
  return (
    <>
      <div className="relative h-fit flex flex-col w-full lg:w-[1320px] mx-auto my-4">
        <div className="flex flex-col w-full h-min">
          {/* Audio Player Section */}
          <div className="relative rounded-[10px] overflow-hidden w-[58%] flex-none min-h-[225px] bg-blue-400">
            <AudioPlayerWidget key={audioDetail.id} audioDetail={audioDetail} />
          </div>
          <div className="flex flex-col gap-2 w-[58%] mt-2 "></div>
        </div>
        {/* Subtitle Section */}
        <div className="absolute w-[41%] top-0 right-0 h-full flex flex-col bg-[#393939] rounded-lg "></div>
      </div>
      <Script src="https://unpkg.com/wavesurfer.js@7" />
      <script src="https://unpkg.com/wavesurfer.js@7/dist/plugins/regions.min.js"></script>
    </>
  );
};

import { FaHeadphones } from 'react-icons/fa';
// import Image from 'next/image';
import { IGetRecommendVideo } from '../../../../../types';
import { ImageVideoComponent } from './ImageVideo.component';

export const CardListVideo = ({
  videoRecommend,
}: {
  videoRecommend: IGetRecommendVideo;
}) => {
  return (
    <div className="w-full h-full cursor-pointer overflow-hidden duration-200 rounded-lg text-black mt-6 hover:bg-white group">
      <button className="w-full 2xl:h-[170px] xl:h-[120px] lg:h-[110px] md:h-[100px] sm:h-[130px] flex gap-4  xl:gap-2 lg:gap-1 md:gap-0 justify-start items-start">
        <div className="relative 2xl:w-5/12 xl:w-6/12 lg:w-4/12 md:w-4/12 sm:w-4/12 md:text-xs  overflow-hidden">
          <div
            className="2xl:h-[180px] xl:h-[130px] lg:h-[120px] md:h-[110px] sm:h-[140px]"
            style={{ position: 'relative', width: '100%' }}
          >
            <ImageVideoComponent url={videoRecommend.blurThumbnailUrl} />
          </div>
          <span className="absolute bottom-[5px] 2xl:bottom-4 xl:bottom-3  md:bottom-12 xl:text-sm lg:bottom-[5px] right-2 bg-black text-white text-sm md:text-[10px] px-2 py-1 rounded">
            <p>{videoRecommend.durationText}</p>
          </span>
        </div>
        <div className="m-2 py-2 w-full 2xl:w-9/12 xl:6/12 lg:w-8/12 md:w-8/12 sm:w-8/12 lg:my-0 md:text-[9px]">
          <div className="text-left line-clamp-2 h-[58px] lg:h-[40px] font-semibold text-lg lg:text-sm md:text-[14px]">
            {videoRecommend.title}
          </div>
          <div className="flex 2xl:pt-20 xl:pt-10 justify-between text-lg lg:text-sm md:text-[14px] md:pt-0 pt-5 ">
            <div className=" flex items-center gap-2 text-gray">
              <FaHeadphones />
              <p>{videoRecommend.totalViewed}</p>
            </div>
            <div
              className={` px-4 py-1 rounded-lg font-semibold text-lg lg:text-sm md:text-[14px] text-white ${
                videoRecommend.cefrLevel === 'B1'
                  ? 'bg-yellow-500'
                  : videoRecommend.cefrLevel === 'B2'
                    ? 'bg-orange-400'
                    : 'bg-green-600'
              }`}
            >
              {videoRecommend.cefrLevel}
            </div>
          </div>
        </div>
      </button>
    </div>
  );
};

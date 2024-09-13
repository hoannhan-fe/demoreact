'use client';
import { FaHeadphones } from 'react-icons/fa';
// import { useYoutubeDetail } from '../../data/SubAndTitile.context';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../store';
import { Skeleton } from '@/app/[locale]/shared/components';

export const SubTitle = () => {
  const { data: videoDetailAndSub } = useSelector(
    (state: RootState) => state.videoOptionSlice,
  );
  if (
    !videoDetailAndSub ||
    !videoDetailAndSub.mediaInfo ||
    !videoDetailAndSub.mediaInfo.title
  ) {
    return <Skeleton className="w-full h-8" />;
  }
  return (
    <div className="w-full h-auto">
      <div className="flex items-center pt-5">
        <div
          className={`flex items-center justify-center rounded p-2 w-10 h-6 text-ms text-white mx-1 ${
            videoDetailAndSub.mediaInfo.cefrLevel === 'B1'
              ? 'bg-yellow-500 text-white'
              : videoDetailAndSub.mediaInfo.cefrLevel === 'B2'
                ? 'bg-orange-400 text-white'
                : 'bg-green-600 text-white'
          }`}
        >
          {videoDetailAndSub.mediaInfo.cefrLevel}
        </div>
        <div className="flex items-center justify-center rounded bg-blue-500 p-2 w-10 h-6 text-ms text-white mx-1">
          {videoDetailAndSub.mediaInfo.accent}
        </div>
      </div>
      <div className="text-xl font-medium pt-8">
        {videoDetailAndSub.mediaInfo.title}
      </div>
      <div className="flex justify-between items-center py-4">
        <div className="">
          <div className="flex">
            <div className="mr-5 flex justify-center items-center">
              <FaHeadphones className="mr-1 " color="grey" />
              <span className="my-1">
                {videoDetailAndSub.mediaInfo.totalViewed}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

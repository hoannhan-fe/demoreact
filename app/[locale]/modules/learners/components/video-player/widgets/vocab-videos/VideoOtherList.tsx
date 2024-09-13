// import { Label, Switch } from '@/app/[locale]/shared/components';
import { CardListVideo } from './widget-vocab';
import { IGetRecommendVideo } from '../../../../types';
import { useRouter } from 'next/navigation';
import { youtube_parser } from '@/app/[locale]/shared/utils';
import { Skeleton } from '@/app/[locale]/shared/components';

const SkeletonCard = ({ count }: { count: number }) => {
  return (
    <>
      {[...Array(count)].map((_, index) => (
        <div className="w-full h-40 flex p-4" key={index}>
          <div className="flex-shrink-0">
            <Skeleton className="w-36 h-32" />
          </div>
          <div className="flex-grow ml-4 space-y-2">
            <Skeleton className="w-full h-6" />
            <Skeleton className="w-full h-6" />
            <Skeleton className="w-full h-6" />
          </div>
        </div>
      ))}
    </>
  );
};

export const VideoOtherList = ({
  listVideoRecommend,
}: {
  listVideoRecommend: IGetRecommendVideo[];
}) => {
  const router = useRouter();
  return (
    <div className="w-full">
      {/* <div className="flex items-center space-x-2">
        <Label htmlFor="airplane-mode" className="text-xl">
          Auto Play
        </Label>
        <Switch id="airplane-mode" />
      </div> */}
      {listVideoRecommend.length <= 0 ? (
        <SkeletonCard count={10} />
      ) : (
        listVideoRecommend
          .slice(0, 10)
          .map((videoRecommend: IGetRecommendVideo, idx: number) => (
            <div
              key={idx}
              className="w-full h-full"
              onClick={() =>
                router.push(
                  `/videos/${youtube_parser(videoRecommend.youtubeUrl)}`,
                )
              }
            >
              <CardListVideo videoRecommend={videoRecommend} />
            </div>
          ))
      )}
    </div>
  );
};

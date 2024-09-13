import { Skeleton } from '@/app/[locale]/shared/components';
import { RefObject, useCallback } from 'react';
import ReactPlayer from 'react-player';
import { ConvertedSub } from '../../../../types';
import SubtitleBlock from './SubtitleBlock.component';

interface SubtitleBoxContentProps {
  convertedListSubtitle: ConvertedSub[];
  subIdx: number;
  playerRef: RefObject<ReactPlayer>;
  subtitleContainerRef: RefObject<HTMLDivElement>;
}

export const SubtitleBoxContent = ({
  convertedListSubtitle,
  subIdx,
  playerRef,
  subtitleContainerRef,
}: SubtitleBoxContentProps) => {
  const handlePlaySub = useCallback((sub: ConvertedSub) => {
    playerRef.current?.seekTo(sub.startTime / 1000, 'seconds');
    // Continue to play after seekTo
    playerRef.current?.getInternalPlayer().playVideo();
  }, []);

  return (
    <div
      className="h-full overflow-x-hidden overflow-y-scroll scrollbar-hidden"
      ref={subtitleContainerRef}
    >
      {convertedListSubtitle.length <= 0 ? (
        <div className="px-4">
          <SkeletonCard count={8} />
        </div>
      ) : (
        convertedListSubtitle.map((sub: ConvertedSub, idx: number) => (
          <SubtitleBlock
            sub={sub}
            isFocused={idx === subIdx}
            key={idx}
            idx={idx}
            onClick={handlePlaySub}
          />
        ))
      )}
    </div>
  );
};

const SkeletonCard = ({ count }: { count: number }) => {
  return (
    <>
      {[...Array(count)].map((_, index) => (
        <div
          key={index}
          className="border-b border-gray py-2 font-medium space-y-2"
        >
          <Skeleton className="w-full h-6 bg-black/55" />
          <Skeleton className="w-9/12 h-6 bg-black/55" />
        </div>
      ))}
    </>
  );
};

SubtitleBoxContent.displayName = 'SubtitleBoxContent';

'use client';

import LatestVideo from '@/app/[locale]/modules/learners/components/homepage/LatestVideo';
import ListAudioChannel from '@/app/[locale]/modules/learners/components/homepage/ListAudioChannel ';
import ListVideoChannel from '@/app/[locale]/modules/learners/components/homepage/ListVideoChannel';
import RecommendVideo from '@/app/[locale]/modules/learners/components/homepage/RecommendVideo';
import SlideShow from '@/app/[locale]/modules/learners/components/homepage/SlideShow';
import TrendingVideo from '@/app/[locale]/modules/learners/components/homepage/TrendingVideo';

import { useScreenSize } from '@/app/[locale]/shared/hook';

export default function LandingPage() {
  const { lg } = useScreenSize();
  return (
    <>
      {lg ? (
        <div className="h-full w-full bg-background dark:bg-background text-text-light dark:text-text-dark transition-colors duration-300  p-8  min-h-screen auto-rows-min ">
          <div className="flex items-center justify-center">
            <SlideShow />
          </div>

          <div className="m-5 ">
            <TrendingVideo />
            <LatestVideo />
            <ListVideoChannel />
            <ListAudioChannel />
            <RecommendVideo />
          </div>
        </div>
      ) : null}
    </>
  );
}

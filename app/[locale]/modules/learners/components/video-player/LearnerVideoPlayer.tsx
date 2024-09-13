'use client';
import { useParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ReactPlayer from 'react-player/lazy';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { ConvertedSub, Sub, VideoDetailAndSub, VideoTab } from '../../types';
import { processSubtitles } from '../../utils/subtitles.util';
import { FontSizeProvider } from './context/FontSizeContext';
import { ListFontControl } from './data/FontSizeControl.data';
import {
  CurrentSubtitleDisplay,
  SubtitleBoxContent,
  VideoController,
} from './widgets';
import { DictationBoxContent } from './widgets/dictation/DictationBox.component';
import { Skeleton } from '@/app/[locale]/shared/components';
import handleKeyDown from '../../utils/handleKeyDown.utils';
import { useDebounceFunction } from '@/app/[locale]/shared/hook';
import { binarySearchSubtitleIndex } from '../../utils';

interface Progress {
  played: number;
  playedSeconds: number;
  loaded: number;
  loadedSeconds: number;
}

const isVideoDetailAndSub = (data: unknown): data is VideoDetailAndSub => {
  return (
    typeof data === 'object' &&
    data !== null &&
    'mediaInfo' in data &&
    'subtitles' in data
  );
};

const LearnerVideoPlayerComponent = () => {
  const [playing, setPlaying] = useState(false);
  const [subIdx, setSubIdx] = useState(0);
  const [repeat, setRepeat] = useState(3);
  const [isTracking, setIsTracking] = useState(true);
  const [repeatCounter, setRepeatCounter] = useState(3);
  const [tab, setTab] = useState<VideoTab>(VideoTab.Subtitles);
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [isUserScrolling, setIsUserScrolling] = useState(false);

  const playerRef = useRef<ReactPlayer>(null);
  const subtitleContainerRef = useRef<HTMLDivElement>(null);

  const { id } = useParams<{ id: string }>();

  const { data: videoDetailAndSub } = useSelector(
    (state: RootState) => state.videoOptionSlice,
  );
  const listSubtitles: Sub[] = isVideoDetailAndSub(videoDetailAndSub)
    ? videoDetailAndSub.subtitles
    : [];

  const convertedListSubtitle: ConvertedSub[] = useMemo(() => {
    if (listSubtitles.length) {
      return processSubtitles(listSubtitles);
    }
    return [];
  }, [listSubtitles]);

  const url = `https://www.youtube.com/watch?v=${id}`;

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) =>
      handleKeyDown({
        event,
        setPlaying,
        setSubIdx,
        listSubtitles,
        playerRef,
      });

    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [setPlaying, setSubIdx, listSubtitles, playerRef, subIdx]);

  const handleUserScrollEnd = useDebounceFunction(
    useCallback(() => {
      setIsUserScrolling(false);
    }, []),
    500,
  );
  useEffect(() => {
    const container = subtitleContainerRef.current;

    const handleScroll = () => {
      setIsUserScrolling(true);
      handleUserScrollEnd();
    };

    if (container) {
      container.addEventListener('scroll', handleScroll);

      return () => {
        container.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  // useEffect(() => {
  //   if (listSubtitles.length) {
  //     const asyncProcessSubtitles = async () => {
  //       try {
  //         const result = await processSubtitles(listSubtitles);
  //         setConvertedListSubtitle(result);
  //       } catch (error) {
  //         console.error('Error processing subtitles:', error);
  //       }
  //     };
  //     asyncProcessSubtitles();
  //   }
  // }, []);

  const onProgressHandler = (progress: Progress) => {
    const current = progress.playedSeconds * 1000;
    // setPlayed(current);
    const idx = binarySearchSubtitleIndex(listSubtitles, current);
    if (tab == VideoTab.Subtitles && idx !== -1 && idx !== subIdx) {
      setSubIdx(idx);
      if (!isUserScrolling) {
        // Scroll the current subtitle into view
        const subtitleElement = document.getElementById(idx.toString());
        if (
          subtitleElement &&
          subtitleContainerRef.current &&
          subtitleElement.offsetTop !==
            subtitleContainerRef.current.clientHeight
        ) {
          // Scroll the element into view within the container
          subtitleContainerRef.current.scrollTo({
            top: subtitleElement.offsetTop,
            behavior: 'smooth',
          });
        }
      }
    }
    if (tab == VideoTab.Dictation) {
      if (current > listSubtitles[subIdx].endTime && isTracking) {
        if (repeatCounter > 1) {
          // Repeat the current subtitle
          setRepeatCounter((prevRepeat) => prevRepeat - 1);
          playerRef.current?.seekTo(listSubtitles[subIdx].startTime / 1000);
        } else {
          // Stop repeating and pause the video
          setPlaying(false);
          setIsTracking(false);
          playerRef.current?.getInternalPlayer().pauseVideo();
          setRepeatCounter(repeat); // Reset repeat counter for next subtitle
        }
      }
    }
  };

  // Context value of init font size button
  const defaultFontControl = ListFontControl.find(
    (value) => value.percent === 100,
  );

  if (!defaultFontControl) {
    throw new Error('Default font control with 100% not found');
  }
  return (
    <div className="relative h-fit flex flex-col w-full 2xl:w-[1320px] mx-auto my-4">
      <div className="flex flex-col w-full h-min">
        <div className="relative rounded-[10px] overflow-hidden w-[58%] flex-none min-h-[225px]">
          {showSkeleton && (
            <div
              className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}
            >
              <Skeleton className="w-full h-full" />
            </div>
          )}
          <ReactPlayer
            className="aspect-video"
            controls
            ref={playerRef}
            url={url}
            width={'100%'}
            height={'100%'}
            playing={playing}
            onProgress={onProgressHandler}
            progressInterval={500}
            onReady={() => {
              setFadeOut(true);
              setTimeout(() => {
                setShowSkeleton(false);
              }, 500); // Chờ 500ms trước khi hoàn toàn ẩn lớp phủ
            }}
            onEnded={() => {
              setSubIdx(-1);
              setPlaying(false);
            }}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
          />
        </div>
        <FontSizeProvider size={defaultFontControl}>
          <div className="flex flex-col gap-2 w-[58%] mt-2">
            <CurrentSubtitleDisplay
              // subList={listSubtitles}
              // subIdx={subIdx}
              sub={convertedListSubtitle[subIdx]}
              disabled={tab === VideoTab.Dictation}
            />
            <VideoController
              tab={tab}
              repeat={repeat}
              setRepeat={setRepeat}
              setRepeatCounter={setRepeatCounter}
              subIdx={subIdx}
              setSubIdx={setSubIdx}
              playing={playing}
              setPlaying={setPlaying}
              setIsTracking={setIsTracking}
              playerRef={playerRef}
              listSubtitles={listSubtitles}
            />
          </div>
        </FontSizeProvider>
      </div>
      {/* Functional Box */}
      <div className="absolute w-[41%] top-0 right-0 h-full flex flex-col bg-[#393939] rounded-[10px] overflow-hidden">
        <div className="flex justify-between items-center py-4 pl-3 pr-5 text-white bg-[#393939] z-10">
          <div className="flex gap-2">
            <span
              className={
                'font-normal px-2 text-lg cursor-pointer border-b ' +
                (tab === VideoTab.Subtitles
                  ? 'border-white text-white'
                  : 'border-white/0 text-white/60')
              }
              onClick={() => setTab(VideoTab.Subtitles)}
            >
              Subtitles
            </span>
            <span
              className={
                'font-normal px-2 text-lg cursor-pointer border-b ' +
                (tab === VideoTab.Dictation
                  ? 'border-white text-white'
                  : 'border-white/0 text-white/60')
              }
              onClick={() => setTab(VideoTab.Dictation)}
            >
              Dictation
            </span>
          </div>
          {tab === VideoTab.Dictation && (
            <h1 className="font-medium text-lg">
              {subIdx + 1}/{listSubtitles.length}
            </h1>
          )}
        </div>
        <div className="h-fit">
          <div
            className="w-full h-[0.75px]"
            style={{
              background:
                'linear-gradient(90deg, rgba(57, 57, 57, 0.00) 0%, rgba(49, 149, 247, 0.50) 24%, #46A0F8 50%, rgba(70, 160, 248, 0.50) 76.5%, rgba(57, 57, 57, 0.00) 100%)',
            }}
          ></div>
          <div
            className="absolute w-full h-4"
            style={{
              filter: 'blur(25px)',
              background:
                'linear-gradient(90deg, rgba(57, 57, 57, 0.50) -1.29%, rgba(11, 24, 67, 0.50) 5.21%, rgba(3, 113, 244, 0.50) 14.21%, rgba(21, 199, 245, 0.50) 48.71%, rgba(3, 113, 244, 0.50) 82.71%, rgba(11, 24, 67, 0.50) 91.21%, rgba(57, 57, 57, 0.50) 98.71%)',
            }}
          ></div>
        </div>
        <div className="relative w-full text-sm h-full overflow-hidden">
          {tab === VideoTab.Subtitles ? (
            <SubtitleBoxContent
              convertedListSubtitle={convertedListSubtitle}
              playerRef={playerRef}
              subIdx={subIdx}
              subtitleContainerRef={subtitleContainerRef}
            />
          ) : (
            <DictationBoxContent
              subIdx={subIdx}
              convertedListSubtitles={convertedListSubtitle}
              listSubtitles={listSubtitles}
              setSubIdx={setSubIdx}
              playerRef={playerRef}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default LearnerVideoPlayerComponent;

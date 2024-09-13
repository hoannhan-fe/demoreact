'use client';

import React, { RefObject } from 'react';
import { BsPauseCircleFill, BsPlayCircleFill } from 'react-icons/bs';
import { MdSkipNext, MdSkipPrevious } from 'react-icons/md';
import ReactPlayer from 'react-player';
import { Sub, VideoTab } from '../../../types';
import RepeatSelect from './RepeatSelect.component';
import { ShortkeyDisplay } from './video-controller/ShortkeyDisplay';

interface VideoControllerProps {
  tab: VideoTab;
  repeat: number;
  setRepeat: React.Dispatch<React.SetStateAction<number>>;
  setRepeatCounter: React.Dispatch<React.SetStateAction<number>>;
  subIdx: number;
  setSubIdx: React.Dispatch<React.SetStateAction<number>>;
  playing: boolean;
  setPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  setIsTracking: React.Dispatch<React.SetStateAction<boolean>>;
  playerRef: RefObject<ReactPlayer>;
  listSubtitles: Sub[];
}

export const VideoController = ({
  tab,
  repeat,
  setRepeat,
  setRepeatCounter,
  subIdx,
  setSubIdx,
  playing,
  setPlaying,
  setIsTracking,
  playerRef,
  listSubtitles,
}: VideoControllerProps) => {
  const handlePlaySegment = () => {
    if (tab === VideoTab.Subtitles) {
      setPlaying(true);
    } else {
      setIsTracking(true);
      setRepeatCounter(repeat);
      if (playerRef.current) {
        playerRef.current.seekTo(
          listSubtitles[subIdx].startTime / 1000,
          'seconds',
        );
        setPlaying(true);
      }
    }
  };
  const onClickPrev = (disable: boolean) => {
    if (!disable) {
      setSubIdx(subIdx - 1);
      playerRef.current?.seekTo(
        listSubtitles[subIdx - 1].startTime / 1000,
        'seconds',
      );
    }
  };

  const onClickNext = (disable: boolean) => {
    if (!disable) {
      setSubIdx(subIdx + 1);
      playerRef.current?.seekTo(
        listSubtitles[subIdx + 1].startTime / 1000,
        'seconds',
      );
      // setRepeatCounter(-1);
    }
  };

  return (
    <div className="relative bg-[#373737] shadow-[0_4px_4px_0px_rgba(0,0,0,0.25)] w-full flex items-center justify-center px-5 py-4 text-center text-white rounded-lg">
      {repeat && setRepeat && (
        <RepeatSelect repeat={repeat} setRepeat={setRepeat} />
      )}
      <div className="flex gap-3 items-center">
        <MdSkipPrevious
          className={`h-7 w-7 ${subIdx <= 0 ? 'opacity-50' : 'cursor-pointer'}`}
          onClick={() => onClickPrev(subIdx <= 0)}
        />
        {!playing ? (
          <BsPlayCircleFill
            className="h-9 w-9 cursor-pointer"
            // onClick={handlePlaySegment}
            onClick={handlePlaySegment}
          />
        ) : (
          <BsPauseCircleFill
            className="h-9 w-9 cursor-pointer"
            onClick={() => setPlaying(false)}
          />
        )}
        <MdSkipNext
          className={`h-7 w-7 ${listSubtitles && subIdx == listSubtitles.length - 1 ? 'opacity-50' : 'cursor-pointer'}`}
          onClick={() => onClickNext(subIdx == listSubtitles.length - 1)}
        />
      </div>
      <ShortkeyDisplay />
    </div>
  );
};

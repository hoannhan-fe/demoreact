'use client';
import axios from 'axios';
import { CheckSquare } from 'lucide-react';
import { useRef, useState } from 'react';
import { BsSoundwave, BsTranslate } from 'react-icons/bs';
import ReactPlayer from 'react-player/lazy';
import { parseSrt } from '../../utils';
import { ListUserInput, UserInput } from './data';

export interface Sub {
  id: string;
  startTime: number;
  endTime: number;
  text: string;
}

interface Progress {
  played: number;
  playedSeconds: number;
  loaded: number;
  loadedSeconds: number;
}

const VideoPlayerComponent = () => {
  // const [played, setPlayed] = useState(0);
  const [isAutoScroll, setIsAutoScroll] = useState(false);
  const [srtJson, setSrtJson] = useState<Sub[]>([]);

  const playerRef = useRef<ReactPlayer>(null);

  const url = 'https://www.youtube.com/watch?v=7OZT3i0Gpdc';
  const fetchSrt = async () =>
    await axios.get(
      'https://nmd-srt.s3.amazonaws.com/teenager/srt/7OZT3i0Gpdc.srt',
    );
  fetchSrt().then((res) => {
    setSrtJson(parseSrt(res?.data));
  });

  const onProgressHandler = (progress: Progress) => {
    // setPlayed(progress.playedSeconds * 1000);
    // scroll current sub into view
    const current = progress.playedSeconds * 1000;
    for (let i = 0; i < srtJson.length; i++) {
      const sentence = srtJson[i];
      if (
        current >= sentence.startTime &&
        current <= sentence.endTime &&
        isAutoScroll
      ) {
        const element = document.getElementById(i.toString());
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  // const handleOnclickSub = (sub: Sub) => {
  //   setPlayed(sub.startTime);
  //   playerRef.current?.seekTo(sub.startTime / 1000, 'seconds');
  //   // Continue to play after seekTo
  //   playerRef.current?.getInternalPlayer().playVideo();
  // };

  const handleAutoScrollClick = () => {
    setIsAutoScroll(!isAutoScroll);
  };

  return (
    <div className="h-screen flex p-4 gap-6 justify-center">
      <div className="flex flex-col gap-2 items-center w-full lg:w-2/3 sm:w-3/4">
        {/* Video Player Section */}
        <div className="rounded-xl overflow-hidden w-full flex-none min-h-[225px]">
          <ReactPlayer
            className="grow aspect-video"
            controls
            ref={playerRef}
            url={url}
            width={'100%'}
            height={'100%'}
            onProgress={onProgressHandler}
          />
        </div>
        {/* Subtitle Section */}
        <div className="w-full flex justify-center">
          <button
            onClick={handleAutoScrollClick}
            className={`hidden px-5 py-1.5 ${isAutoScroll ? 'bg-green-400 text-black' : 'bg-white text-black'} border-2 rounded-full font-semibold duration-200 border-black`}
          >
            Auto scroll
          </button>
        </div>
        <div
          className={`relative group scrollbar w-full text-sm overflow-hidden ${isAutoScroll ? 'pr-[16px]' : ''}`}
        >
          <div
            className={`absolute right-0 top-0 z-[1] h-full w-[16px] bg-white ${isAutoScroll ? '' : 'group-hover:invisible'}`}
          ></div>
          <div
            className={`h-full ${isAutoScroll ? 'overflow-hidden' : 'overflow-auto'}`}
          >
            {srtJson &&
              srtJson.map((sub: Sub, idx: number) => (
                // <SubtitleBlock
                //   sub={sub}
                //   played={played}
                //   key={idx}
                //   idx={idx}
                //   onClick={handleOnclickSub}
                // />
                <div key={idx}></div>
              ))}
          </div>
        </div>
      </div>
      {/* <div className="rounded-xl border border-slate-200 h-fit p-4 grow flex justify-center items-center"> */}
      <div className="grow flex flex-col justify-between">
        {/* Top Right Section */}
        <div className="w-full text-zinc-600">
          <div className="mb-3 px-3 py-4 border border-zinc-200 rounded-md">
            <div className="mb-2 flex gap-2 items-center text-lg">
              <BsTranslate className="h-5 w-5" />
              Translation
            </div>
            <div className="">
              <span>Complete the challenge or </span>
              <span className="text-decoration-underline cursor-pointer">
                click here
              </span>
              <span> to show.</span>
            </div>
          </div>
          <div className="mb-3 px-3 py-4 border border-zinc-200 rounded-md">
            <div className="mb-2 flex gap-2 items-center text-lg">
              <BsSoundwave className="h-5 w-5" />
              Pronunciation
              <i className="bi bi-info-circle ms-2"></i>
            </div>
            <div>
              <div className="">
                <span>Complete the challenge or </span>
                <span className="text-decoration-underline cursor-pointer">
                  click here
                </span>
                <span> to show.</span>
              </div>
            </div>
          </div>
          <div className="px-3 py-4 border border-zinc-200 rounded-md">
            <div className="mb-2 flex gap-2 items-center text-lg">
              <CheckSquare className="h-5 w-5" />
              Correct Answer
            </div>
            <button className="btn text-decoration-underline p-0">Show</button>
          </div>
        </div>
        {/* Scoreboard Section */}
        <div className="overflow-y-auto h-fit max-h-96">
          {ListUserInput.map((input: UserInput, idx) => (
            <div className="w-full p-4 pl-8 bg-sky-600/30" key={idx}>
              <div className="w-full flex justify-between font-semibold mb-2">
                <span>
                  {input.id}. {input.username}
                </span>
                <span className="text-red-500">{input.score}</span>
              </div>
              <span className="text-blue-700 italic">{input.input}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoPlayerComponent;

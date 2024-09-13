import { memo } from 'react';
import { IoMic, IoPlay } from 'react-icons/io5';
import { ConvertedSub } from '../../../../types';
import SubtitleSentence from './SubtitleSentence.component';

interface SubtitleBlockProps {
  sub: ConvertedSub;
  isFocused: boolean;
  idx: number;
  onClick: (sub: ConvertedSub) => void;
}
const SubtitleBlock = ({ sub, isFocused, idx }: SubtitleBlockProps) => {
  return (
    <div
      className={`px-4 text-white ${isFocused ? 'bg-gradient-to-r from-[#D9D9D920] to-[#15c8f566]' : ''}`}
      id={idx.toString()}
    >
      <div className="border-b border-gray flex font-medium">
        <div className="flex flex-col gap-2 items-center justify-center my-3 text-2xl text-white">
          <div
            className={`h-6 w-6 flex items-center rounded-full text-sm cursor-pointer ${isFocused ? 'bg-[#437074] border-2 border-[#84c1c5] hover:bg-[#374A5C] drop-shadow pl-[4px]' : 'pl-[6px] bg-zinc-600 hover:bg-[#374A5C] drop-shadow'}`}
            // onClick={() => onClick(sub)}
          >
            <IoPlay />
          </div>
          <div
            className={`h-6 w-6 flex items-center justify-center rounded-full text-base cursor-pointer ${isFocused ? 'bg-[#4c6f8f] hover:bg-[#374A5C] border-2 border-[#8fb3d5] drop-shadow' : 'bg-zinc-600 hover:bg-[#374A5C] drop-shadow'}`}
          >
            <IoMic />
          </div>
        </div>
        <div className="py-4 px-4 text-base flex items-center">
          <SubtitleSentence words={sub.text} />
        </div>
      </div>
    </div>
  );
};

export default memo(SubtitleBlock);
SubtitleBlock.displayName = 'SubtitleBlock';

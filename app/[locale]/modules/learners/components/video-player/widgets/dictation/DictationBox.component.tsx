import { Button } from '@/app/[locale]/shared/components';
import React, { RefObject, useState } from 'react';
import ReactPlayer from 'react-player';
import { usePostDictationCheck } from '../../../../api';
import { ConvertedSub, ITextCheck, Sub } from '../../../../types';

interface DictationBoxContentProps {
  subIdx: number;
  convertedListSubtitles: ConvertedSub[];
  listSubtitles: Sub[];
  setSubIdx: React.Dispatch<React.SetStateAction<number>>;
  playerRef: RefObject<ReactPlayer>;
}

export const DictationBoxContent = ({
  subIdx,
  convertedListSubtitles,
  listSubtitles,
  setSubIdx,
  playerRef,
}: DictationBoxContentProps) => {
  const [checked, setChecked] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [answer, setAnswer] = useState<string[]>([]);
  const originalStr = listSubtitles[subIdx] ? listSubtitles[subIdx].text : '';

  const { data: textDiffData, refetch } = usePostDictationCheck(
    inputValue,
    originalStr,
    false,
  );

  const handleOnclickCheck = () => {
    if (inputValue != '') {
      setChecked(true);
      setAnswer(convertedListSubtitles[subIdx].text);
      refetch();
      setInputValue('');
    } else {
      alert('Please type your answer!');
    }
  };

  const handleOnclickNextSub = () => {
    setChecked(false);
    playerRef.current?.seekTo(
      listSubtitles[subIdx + 1].startTime / 1000,
      'seconds',
    );
    setSubIdx(subIdx + 1);
    setInputValue('');
  };

  return (
    <div className="relative w-full flex flex-col h-full text-sm overflow-hidden text-white px-[15px] pb-6">
      {checked ? (
        <div className="scrollbar-hidden overflow-x-hidden overflow-y-scroll flex flex-col justify-between gap-6 items-end w-full h-full">
          <p
            className="px-3 pt-8 w-full whitespace-pre-wrap leading-9 font-semibold text-[18px] text-white"
            style={{ wordSpacing: '0.75rem' }}
          >
            {answer &&
              answer.map((word: string, idx: number) =>
                /^\w+(?:'\w+)?$/.test(word) ? (
                  <span
                    className="border-b-2 border-dotted pb-1 mb-2"
                    key={idx}
                  >
                    {word}
                  </span>
                ) : (
                  <span key={idx}>{word}</span>
                ),
              )}
          </p>
          <div className="flex flex-col gap-6 items-end w-full">
            {textDiffData && textDiffData.score === 1000 ? (
              <h1 className="text-[22px] text-[#7DD5B3] font-semibold">
                Correct!
              </h1>
            ) : (
              <h1 className="text-[22px] text-[#CA7873] font-semibold">
                Oops! Your answer is{' '}
                {textDiffData ? Math.round(textDiffData.score / 10) : 0}%
                correct!
              </h1>
            )}
            <div
              className={`border ${textDiffData && textDiffData.score === 1000 ? 'border-[#7DD5B3]' : 'border-[#CA7873]'} h-[150px] w-full rounded-[25px] p-4`}
            >
              <div className="flex gap-2.5 flex-wrap font-medium text-base text-[#7DD5B3]">
                {textDiffData &&
                  textDiffData.detailData.map(
                    (word: ITextCheck, idx: number) => (
                      <span
                        className={
                          word.type ? 'text-[#CA7873]' : 'text-[#7DD5B3]'
                        }
                        key={idx}
                      >
                        {word.text}
                      </span>
                    ),
                  )}
              </div>
            </div>
            <Button
              variant="default"
              className="w-[116px] h-[42px] shadow-[2px_2px_5px_2px_rgba(0,0,0,0.25)] rounded-full"
              style={{
                background:
                  'linear-gradient(114deg, #3195F7 13.79%, #15C7F5 85.53%)',
              }}
              onClick={handleOnclickNextSub}
            >
              Next
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-end gap-5 h-full">
          <div className="border border-[#9C9A9A] rounded-2xl p-4 w-full h-32 font-semibold">
            <textarea
              name="input"
              id="input"
              value={inputValue}
              placeholder="Type what you hear..."
              className="bg-white/0 resize-none w-full h-full focus:outline-none font-normal text-base"
              onChange={(e) => setInputValue(e.target.value)}
            ></textarea>
          </div>
          <div className="flex gap-5 font-semibold text-base justify-end">
            <Button
              variant="outline"
              className="w-[116px] h-[42px] shadow-[2px_2px_5px_2px_rgba(0,0,0,0.25)] rounded-full bg-white/0"
              onClick={handleOnclickNextSub}
            >
              Skip
            </Button>
            <Button
              variant="default"
              className="w-[116px] h-[42px] shadow-[2px_2px_5px_2px_rgba(0,0,0,0.25)] rounded-full bg-"
              style={{
                background:
                  'linear-gradient(114deg, #3195F7 13.79%, #15C7F5 85.53%)',
              }}
              onClick={handleOnclickCheck}
            >
              Check
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

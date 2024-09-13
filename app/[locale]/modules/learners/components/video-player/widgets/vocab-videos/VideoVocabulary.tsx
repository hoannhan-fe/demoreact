'use client';
import { FaA } from 'react-icons/fa6';
import { FiFilter } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';
import { VocabItem, SubTitle } from './widget-vocab';
import { VocabWord } from '../../../../types/VocabWord.types';
import { Dispatch, SetStateAction } from 'react';
import { Skeleton } from '@/app/[locale]/shared/components';

const SkeletonCard = ({ count }: { count: number }) => {
  return (
    <>
      {[...Array(count)].map((_, index) => (
        <div className="p-4 mb-4" key={index}>
          <div className="mb-5 space-y-2">
            <Skeleton className="w-28 h-6" />
            <Skeleton className="w-36 h-6" />
          </div>
          <div className="mb-5 space-y-2">
            <Skeleton className="w-32 h-6" />
            <Skeleton className="w-10/12 h-6" />
            <Skeleton className="w-10/12 h-6" />
          </div>
          <div className="mb-2 space-y-2">
            <Skeleton className="w-32 h-6" />
            <Skeleton className="w-10/12 h-6" />
            <Skeleton className="w-10/12 h-6" />
          </div>
        </div>
      ))}
    </>
  );
};

export const VideoVocabulary = ({
  listVocabWord,
  numberDisplay,
  setNumberDisplay,
}: {
  listVocabWord: VocabWord[];
  numberDisplay: number;
  setNumberDisplay: Dispatch<SetStateAction<number>>;
}) => {
  const titleVideoVocab = 'Video vocabulary';

  const handelClickMoreVocabulary = () => {
    if (numberDisplay == listVocabWord.length) setNumberDisplay(10);
    else if (numberDisplay + 10 > listVocabWord.length)
      setNumberDisplay(listVocabWord.length);
    else setNumberDisplay(numberDisplay + 10);
  };
  return (
    <div className="">
      <SubTitle />
      <div className="bg-white">
        <div
          className="flex items-center justify-center text-center p-4 "
          style={{
            boxShadow: '0px 1px 4px 0 rgba(90, 103, 216, 0.6)',
            borderBottom: '3px solid #6b46c1',
          }}
        >
          <div className="bg-purple-800 text-white p-2 rounded">
            <FaA size={12} />
          </div>
          <span className="ml-2 ">{titleVideoVocab}</span>
        </div>
        <div className="p-4 mt-5 flex gap-2">
          <div className="flex gap-2 text-lg">
            <FiFilter size={25} />
            <span>Filter</span>
            <span>|</span>
          </div>
          <div className="flex gap-3 pt-1 text-gray text-sm">
            <div className="border py-1 px-2 flex gap-2 items-center rounded-md">
              <span>Keywords</span>
              <IoClose size={22} />
            </div>
            <div className="border py-1 px-2 flex gap-2 items-center rounded-md">
              <span>Saved</span>
              <IoClose size={22} />
            </div>
            <div className="border py-1 px-2 flex gap-2 items-center rounded-md">
              <span>Searched</span>
              <IoClose size={22} />
            </div>
          </div>
        </div>
        {listVocabWord.length <= 0 ? (
          <SkeletonCard count={5} />
        ) : (
          listVocabWord
            .slice(0, numberDisplay)
            .map((vocabWord: VocabWord, idx: number) => (
              <VocabItem key={idx} vocabWord={vocabWord} />
            ))
        )}

        <div className="w-full h-[80px] flex justify-center items-center">
          <button
            onClick={() => handelClickMoreVocabulary()}
            className="border border-purple-800 w-1/5 h-1/2 rounded-2xl text-purple-800 hover:bg-purple-700/40"
          >
            {numberDisplay < listVocabWord.length
              ? 'More vocabulary'
              : 'Collapse'}
          </button>
        </div>
      </div>
    </div>
  );
};

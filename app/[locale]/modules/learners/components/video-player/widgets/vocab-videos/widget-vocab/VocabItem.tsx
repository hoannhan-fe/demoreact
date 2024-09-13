'use client';
import { Tooltip } from 'react-tooltip';
import { GrFormNext } from 'react-icons/gr';
import { FaRegCopy, FaRegHeart, FaShareAlt, FaVolumeUp } from 'react-icons/fa';
import { VocabWord } from '../../../../../types/VocabWord.types';
import { DefinitionsVocab } from './DefinitionsVocab';

export const VocabItem = ({ vocabWord }: { vocabWord: VocabWord }) => {
  return (
    <div>
      <div className="p-4 border-b-[1px]">
        <div className="flex justify-between">
          <div className="text-xl">
            <span className="text-gray-700">{vocabWord.word}</span>
            <div className="flex items-center gap-2 text-gray">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">US /`sʌtl/</span>
                <FaVolumeUp className="cursor-pointer" />
              </div>
              <p>.</p>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">UK /`sʌtl/</span>
                <FaVolumeUp className="cursor-pointer" />
              </div>
            </div>
          </div>
          <div className="flex gap-8 items-center">
            <div data-tip="Copy vocabulary" className="cursor-pointer">
              <FaRegCopy className="h-6 w-6 text-gray" id="copy_vocabulary" />
              <Tooltip anchorSelect="#copy_vocabulary" place="bottom">
                Copy vocabulary
              </Tooltip>
            </div>
            <div data-tip="Share" className="cursor-pointer">
              <FaShareAlt className="h-6 w-6 text-gray" id="my_share" />
              <Tooltip anchorSelect="#my_share" place="bottom">
                Share vocabulary
              </Tooltip>
            </div>
            <div data-tip="Favorite" className="cursor-pointer">
              <FaRegHeart className="h-6 w-6 text-gray" id="my_save" />
              <Tooltip anchorSelect="#my_save" place="bottom">
                Save
              </Tooltip>
            </div>
          </div>
        </div>
        {/*Definitions Vocab*/}
        {vocabWord?.definitions ? (
          vocabWord.definitions
            .slice(0, 2)
            .map((definition, index) => (
              <DefinitionsVocab key={index} definition={definition} />
            ))
        ) : (
          <></>
        )}
        {/*Definitions Vocab*/}
        <div className="flex justify-between pt-2">
          <div
            className={`flex items-center justify-center rounded w-12 h-8 text-ms text-white mx-1 ${
              vocabWord.cefrLevel === 'B1'
                ? 'bg-yellow-500'
                : vocabWord.cefrLevel === 'B2'
                  ? 'bg-orange-400'
                  : 'bg-green-600'
            }`}
          >
            {vocabWord.cefrLevel}
          </div>
          <div className="flex items-center text-purple-600 text-lg font-medium">
            <span>More</span>
            <GrFormNext size={25} />
          </div>
        </div>
      </div>
    </div>
  );
};

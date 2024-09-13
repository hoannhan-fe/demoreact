import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/app/[locale]/shared/components';
import { Loader2, X } from 'lucide-react';
import { memo, useState } from 'react';
import { MdVolumeUp } from 'react-icons/md';
import { useGetWord } from '../../../../api';
import { CefrLevelTag } from '../../../list-video/tag';
import { IDefinitionGroup } from '../../../../types';

interface SubtitleSentenceProps {
  words: string[];
}
const SubtitleSentence = memo(({ words }: SubtitleSentenceProps) => {
  const [selectedWord, setSelectedWord] = useState('');
  const [openPopovers, setOpenPopovers] = useState<Record<number, boolean>>({});
  // make useGetWord not call initially
  const { data: wordData, isFetching } = useGetWord(
    selectedWord,
    !!selectedWord,
  );

  const handleOnClickWord = (word: string) => {
    setSelectedWord(word);
  };

  const handleOpenChange = (index: number, isOpen: boolean) => {
    setOpenPopovers((prev) => ({ ...prev, [index]: isOpen }));
  };

  return (
    <p className="leading-6 whitespace-pre-line">
      {words.map((word, index) =>
        !/^\w+(?:'\w+)?$/.test(word) ? (
          <span
            key={index}
            className="font-normal"
            dangerouslySetInnerHTML={{ __html: word }}
          ></span>
        ) : (
          <Popover
            key={index}
            open={openPopovers[index] || false}
            onOpenChange={(isOpen) => handleOpenChange(index, isOpen)}
          >
            <PopoverTrigger>
              <span
                className="font-normal cursor-pointer py-[2px] rounded hover:bg-cyan-600 bg-cyan hover:drop-shadow-md"
                onClick={() => handleOnClickWord(word)}
                dangerouslySetInnerHTML={{ __html: word }}
              ></span>
            </PopoverTrigger>
            <PopoverContent style={{ width: '400px' }}>
              <div className="flex justify-between text-xl items-center font-semibold">
                <h1>{word}</h1>
                <X
                  onClick={() => handleOpenChange(index, false)}
                  className="cursor-pointer"
                />
              </div>
              {!isFetching ? (
                wordData &&
                wordData.definitions != undefined &&
                wordData.definitions.length > 0 ? (
                  <>
                    <div>
                      <p className="flex items-center gap-1 text-sm font-medium mt-0.5 text-gray">
                        {wordData &&
                          wordData.definitions[0].pronunciationUS != '' && (
                            <div className="flex">
                              <span>
                                US /{wordData.definitions[0].pronunciationUS}/
                              </span>
                              <MdVolumeUp />・
                            </div>
                          )}
                        {wordData &&
                          wordData.definitions[0].pronunciationUK != '' && (
                            <div className="flex">
                              <span>
                                UK /{wordData?.definitions[0].pronunciationUK}/
                              </span>
                              <MdVolumeUp />
                            </div>
                          )}
                      </p>
                      <div className="mb-2.5">
                        {wordData?.cefrLevel && (
                          <CefrLevelTag cefrLevel={wordData?.cefrLevel} />
                        )}
                      </div>
                    </div>
                    <div className="flex justify-center max-h-28 h-full items-center flex-wrap overflow-x-hidden overflow-y-scroll scrollbar-hidden">
                      {wordData.definitions.map(
                        (def: IDefinitionGroup, idx: number) => (
                          <div className="w-full" key={idx}>
                            <p className="font-bold">{def.posFullName}</p>
                            <div className="pl-2">
                              {def.englishDefinition != undefined &&
                                def.englishDefinition?.length >= 1 &&
                                def.englishDefinition?.map(
                                  (item, idx) =>
                                    item != '' && (
                                      <p key={idx}>
                                        <span>| {item}</span>
                                      </p>
                                    ),
                                )}
                            </div>
                          </div>
                        ),
                      )}
                    </div>
                  </>
                ) : (
                  <div className="mt-4">No result.</div>
                )
              ) : (
                <div className="flex justify-center items-center h-20">
                  <Loader2 className="animate-spin duration-500" />
                </div>
              )}
            </PopoverContent>
          </Popover>
        ),
      )}
    </p>
  );
});

export default SubtitleSentence;
SubtitleSentence.displayName = 'SubtitleSentence';

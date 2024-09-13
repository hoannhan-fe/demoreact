// import React, { useEffect } from 'react';
import { useGetWord } from '../../api/UseCRUDWord';

import { AiFillSound } from 'react-icons/ai';
type wordprops = {
  search: string;
};
const Wordcomponent = ({ search }: wordprops) => {
  const { data: getWord } = useGetWord(search, !!search);
  const handlePlay = (audioSrc: string) => {
    new Audio(audioSrc).play();
  };
  // useEffect(() => {
  //   refetch();
  // }, [search]);
  return (
    <div>
      {getWord === undefined ? null : (
        <>
          <div className="bg-white w-[780px] rounded-lg p-4 mb-4">
            <div className="flex-col p-2 m-2">
              <h1 className="text-4xl px-8 py-2">{getWord.word}</h1>
              <span
                className={` px-2 py-1 w-fit flex items-center  rounded-sm font-semibold text-xs ${
                  getWord.cefrLevel === 'B1'
                    ? 'bg-yellow-500 text-white'
                    : getWord.cefrLevel === 'B2'
                      ? 'bg-orange-400 text-white'
                      : 'bg-green-600 text-white'
                }`}
              >
                {getWord.cefrLevel}
              </span>
            </div>
            <div>
              <div className="flex gap-10 px-4 text-zinc-600">
                <div className="flex items-center m-2">
                  {getWord.definitions[0]?.pronunciationUK && (
                    <div className="flex items-center m-2">
                      <p className="text-lg ">
                        UK/
                        <span className="p-2 text-xm">
                          {getWord.definitions[0]?.pronunciationUK}
                        </span>
                        /
                      </p>
                      <AiFillSound
                        onClick={() =>
                          handlePlay(getWord.definitions[0]?.pronunciationUKMp3)
                        }
                      />
                    </div>
                  )}
                </div>

                <div className="flex items-center text-zinc-600">
                  {getWord.definitions[0]?.pronunciationUK && (
                    <div className="flex items-center m-2">
                      <p className="text-lg">
                        US/
                        <span className="p-2 text-xm">
                          {getWord.definitions[0]?.pronunciationUS}{' '}
                        </span>
                        /
                      </p>
                      <AiFillSound
                        onClick={() =>
                          handlePlay(getWord.definitions[0]?.pronunciationUSMp3)
                        }
                      />
                    </div>
                  )}
                </div>
                <div className="flex items-center text-zinc-600">
                  {getWord.definitions[0]?.pronunciationKK && (
                    <div className="flex items-center m-2">
                      <p className="text-lg ">
                        KK/
                        <span className="p-2 text-xm">
                          {getWord.definitions[0]?.pronunciationKK}{' '}
                        </span>
                        /
                      </p>
                      <AiFillSound
                        onClick={() =>
                          handlePlay(getWord.definitions[0]?.pronunciationUKMp3)
                        }
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="text-sm text-gray-600 px-4 text-zinc-600">
                {getWord.definitions[0]?.wordPlural && (
                  <p>
                    <strong>Plural:</strong>{' '}
                    {getWord.definitions[0]?.wordPlural}
                  </p>
                )}
                {getWord.definitions[0]?.wordPast && (
                  <p>
                    <strong>Past:</strong> {getWord.definitions[0]?.wordPast}
                  </p>
                )}
                {getWord.definitions[0]?.wordDone && (
                  <p>
                    <strong>Past Participle:</strong>{' '}
                    {getWord.definitions[0]?.wordDone}
                  </p>
                )}
                {getWord.definitions[0]?.wordIng && (
                  <p>
                    <strong>Present Participle:</strong>{' '}
                    {getWord.definitions[0]?.wordIng}
                  </p>
                )}
                {getWord.definitions[0]?.wordThird && (
                  <p>
                    <strong>Third Person Singular:</strong>{' '}
                    {getWord.definitions[0]?.wordThird}
                  </p>
                )}
                {getWord.definitions[0]?.pronunciationIPA && (
                  <p>
                    <strong>IPA:</strong>{' '}
                    {getWord.definitions[0]?.pronunciationIPA}
                  </p>
                )}
              </div>

              <div className="text-sm text-gray-600 px-4 text-zinc-600">
                {getWord.definitions?.reduce(
                  (acc: JSX.Element[], definition) => {
                    const existingIndex = acc.findIndex(
                      (def) => def.key === definition.posFullName,
                    );
                    if (existingIndex === -1) {
                      acc.push(
                        <div key={definition.posFullName}>
                          <p>
                            <strong>Position </strong>
                            {definition.posFullName}
                          </p>
                          {getWord.definitions
                            .filter(
                              (def) =>
                                def.posFullName === definition.posFullName,
                            )
                            .map((def, idx) => (
                              <div key={`${definition.posFullName}-${idx}`}>
                                {def.englishExample && (
                                  <p className="flex items-center gap-2">
                                    <span className="p-[2px] w-[1px] h-[10px] bg-zinc-500"></span>

                                    {def.englishExample}
                                  </p>
                                )}
                              </div>
                            ))}
                        </div>,
                      );
                    }
                    return acc;
                  },
                  [],
                )}
              </div>
              <div className="text-sm text-gray-600  px-4 py-2">
                {getWord.definitions[0]?.chineseTraditionalDefinition && (
                  <p className="gap-2">
                    <strong>Chinese Traditional:</strong>
                    {getWord.definitions[0]?.chineseTraditionalDefinition}
                  </p>
                )}
                {getWord.definitions[0]?.chineseSimplifiedDefinition && (
                  <p className="gap-2">
                    <strong>Chinese Simplified:</strong>
                    {getWord.definitions[0]?.chineseSimplifiedDefinition}
                  </p>
                )}
                {getWord.definitions[0]?.japaneseDefinition && (
                  <p className="gap-2">
                    <strong>Japanese:</strong>{' '}
                    {getWord.definitions[0]?.japaneseDefinition}
                  </p>
                )}
                {getWord.definitions[0]?.vietnameseDefinition && (
                  <p className="gap-2">
                    <strong>Vietnamese:</strong>{' '}
                    {getWord.definitions[0]?.vietnameseDefinition}
                  </p>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Wordcomponent;

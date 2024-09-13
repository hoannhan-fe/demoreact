'use client';
import { useParams } from 'next/navigation';
import { VideoOtherList, VideoVocabulary } from './widgets/vocab-videos';
import { usePostVideoVocabulary } from '../../api';
import { useState } from 'react';
import { usePostRecommendListVideo } from '../../api/UseCRUDListVideo';

export const VideosAndVocabulary = () => {
  const { id } = useParams<{ id: string }>();

  {
    /* Screen Video Vocabulary*/
  }
  const { data: listVocabWord } = usePostVideoVocabulary(id);
  const [numberDisplay, setNumberDisplay] = useState(10);
  {
    /* Screen Video Vocabulary*/
  }

  {
    /* Screen Video Recommend*/
  }
  const { data: listVideoRecommend } = usePostRecommendListVideo(id);
  {
    /* Screen Video Recommend*/
  }
  return (
    <div className="bg-[#f3f3f3] w-full h-auto pb-5">
      <div className="containe 2xl:max-w-[1980px] 2xl:w-11/12 xl:w-full lg:w-full mx-auto flex flex-wrap md:flex-nowrap md:max-w-[1024px]">
        <div className="w-full xl:w-7/12 lg:w-6/12 md:7/12 ms:w-8/12 md:mr-1 p-2 mr-5">
          <VideoVocabulary
            listVocabWord={listVocabWord}
            numberDisplay={numberDisplay}
            setNumberDisplay={setNumberDisplay}
          />
        </div>
        <div className="w-full xl:w-5/12 lg:w-5/12 md:5/12 md:p-0 ms:4/12 p-2 mt-6">
          <VideoOtherList listVideoRecommend={listVideoRecommend} />
        </div>
      </div>
    </div>
  );
};

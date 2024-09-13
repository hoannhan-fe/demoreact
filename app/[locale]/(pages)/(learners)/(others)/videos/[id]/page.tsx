'use client';
import React, { useEffect } from 'react';
import { NextPage } from 'next';
import { useSelector } from 'react-redux';
import { LoadingIndicator } from '@/app/[locale]/shared/components';
import { useAppDispatch } from '@/app/[locale]/shared/hook/redux.hook';
import { useParams } from 'next/navigation';
import LearnerVideoPlayerComponent from '@/app/[locale]/modules/learners/components/video-player/LearnerVideoPlayer';
import { VideosAndVocabulary } from '@/app/[locale]/modules/learners/components/video-player/VideosAndVocabulary';
import { getOptionVideoSlice } from '@/app/[locale]/modules/learners/store/slice/video-option';
import { RootState } from '@/app/[locale]/modules/learners/store';
import NotFound from '@/app/[locale]/shared/utils/not-found';

// interface VideoPlayerPageProps {
//   videoId: string;
// }

const VideoPlayerPage: NextPage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { data: videoDetailAndSub, status } = useSelector(
    (state: RootState) => state.videoOptionSlice,
  );

  useEffect(() => {
    if (id) {
      dispatch(getOptionVideoSlice({ idYtb: id as string }));
    }
  }, [dispatch, id]);
  if (status === 'loading' || !videoDetailAndSub) {
    return (
      <div>
        <LoadingIndicator />
      </div>
    );
  }

  if (status === 'failed') {
    return <NotFound />;
  }

  return (
    <>
      <LearnerVideoPlayerComponent />
      <VideosAndVocabulary />
    </>
  );
};
// export const getServerSideProps:GetServerSideProps = async (context) => {
//   const {id} = context.params as {id:string};

//   await store.dispatch(getOptionVideoSlice({idYtb:id}))
//   return{
//     props:{
//       videoId:id,
//       initialReduxState:store.getState(),
//     }
//   }
// }
export default VideoPlayerPage;

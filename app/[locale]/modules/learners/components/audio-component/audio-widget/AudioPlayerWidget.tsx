'use client';
import { IAudioDetail } from '../../../types';
import WaveSurferComp from './audio-support/waveSurfer';

export const AudioPlayerWidget = ({
  audioDetail,
}: {
  audioDetail: IAudioDetail;
}) => {
  console.log(audioDetail);
  return <WaveSurferComp urlAudio={audioDetail.audioSrc} />;
};

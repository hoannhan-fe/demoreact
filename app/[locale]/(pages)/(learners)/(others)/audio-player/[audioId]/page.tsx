import { AudioPlayerDetail } from '@/app/[locale]/modules/learners/components/audio-component';
import { IGetAudioDetailResponse } from '@/app/[locale]/modules/learners/types';
import { LEARNER_API_ROUTES } from '@/app/[locale]/modules/learners/utils';
import { NextPage } from 'next';
import { Metadata } from 'next';
// import { useParams } from "next/navigation";
type Props = {
  params: { audioId: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params }: Props,
  // parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const stringParams = params.audioId;
  const listSplit = stringParams.split('-');
  const audioId = listSplit[listSplit.length - 1];

  // fetch data
  const audioPlayer = await fetch(
    `${LEARNER_API_ROUTES.GET_AUDIO_DETAILD_BY_ID}/${audioId}`,
  ).then((res) => res.json());

  return {
    title: audioPlayer.data.name,
    // openGraph: {
    //   images: ['/some-specific-page-image.jpg', ...previousImages],
    // },
  };
}
const AudioPlayer: NextPage = async (params) => {
  const { audioId } = (params as Props).params;
  const listSplit = audioId.split('-');
  const audioIdConvert = listSplit[listSplit.length - 1];
  const audioPlayer = await fetch(
    `${LEARNER_API_ROUTES.GET_AUDIO_DETAILD_BY_ID}/${audioIdConvert}`,
  ).then((res) => res.json() as unknown as IGetAudioDetailResponse);
  return (
    <AudioPlayerDetail key={audioIdConvert} audioDetail={audioPlayer.data} />
  );
};
export default AudioPlayer;

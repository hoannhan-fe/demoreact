import ListAudioByIdChannel from '@/app/[locale]/modules/learners/components/audio-component/ListAudioByIdChannel';
// import { IListAudioResponse } from '@/app/[locale]/modules/learners/types';
import { LEARNER_API_ROUTES } from '@/app/[locale]/modules/learners/utils';
import { DEFAULT_PAGE, MAX_PAGE_SIZE } from '@/app/[locale]/shared/constants';
import { Metadata, NextPage } from 'next';

type Props = {
  params: { audio: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
export async function generateMetadata(
  { params }: Props,
  // parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const audioIdChannel = params.audio;
  // fetch data
  const audios = await fetch(
    LEARNER_API_ROUTES.POST_ALL_HELEN_SPEAKING_AUDIO_LIST_BY_ID,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        page: DEFAULT_PAGE,
        limit: MAX_PAGE_SIZE,
        channelId: Number(audioIdChannel),
      }),
    },
  ).then((res) => res.json());

  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || []

  return {
    title: audios.data.channelInfo.name,
    description: audios.data.channelInfo.description,
    // openGraph: {
    //   images: ['/some-specific-page-image.jpg', ...previousImages],
    // },
  };
}
const AudioPage: NextPage = () => {
  return <ListAudioByIdChannel />;
};
export default AudioPage;

'use client';
import { useParams } from 'next/navigation';
import { usePostListAudioById } from '../../api';
import { DEFAULT_PAGE, MAX_PAGE_SIZE } from '@/app/[locale]/shared/constants';
import { IAudio } from '../../types';

const ListAudioByIdChannel = () => {
  const { audio } = useParams<{ audio: string }>();
  // const router = useRouter();
  const { data: lstAudioByIdChannel } = usePostListAudioById({
    page: DEFAULT_PAGE,
    limit: MAX_PAGE_SIZE,
    channelId: Number(audio),
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 text-black">
      {lstAudioByIdChannel.map((audioItem: IAudio, index) => (
        <div
          key={index}
          onClick={() => {}}
          // onClick={() =>
          //   // router.push(`/audio-player/${audioItem.slug}-${audioItem.audioId}`)
          // }
          className="bg-white p-4 rounded-lg  bg-gradient-to-r from-violet-400/70 to-violet-500/70"
        >
          {audioItem.name}
        </div>
      ))}
    </div>
  );
};
export default ListAudioByIdChannel;

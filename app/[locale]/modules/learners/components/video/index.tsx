import { Button } from '@/app/[locale]/shared/components';
import { useRouter } from 'next/navigation';

const VideoComponent = () => {
  // const { data: listVideoData } = useGetAllHelenSpeaking();
  const router = useRouter();
  return (
    <div className="w-full flex justify-center py-8">
      {/* <pre className="w-full overflow-hidden whitespace-pre-wrap break-words">
        {JSON.stringify(listVideoData, null, '\t')}
      </pre> */}
      <Button
        onClick={() => router.push('/learners/video-player')}
        className="bg-yellow-400 hover:bg-yellow-500"
      >
        Demo
      </Button>
    </div>
  );
};

export default VideoComponent;

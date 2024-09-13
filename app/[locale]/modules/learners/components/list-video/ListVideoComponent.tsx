import {
  DEFAULT_PAGE,
  MAX_PAGE_SIZE,
} from '@/app/[locale]/shared/constants/DataTable.constants';
import { useGetAllListVideo } from '../../api/UseCRUDListVideo';
import { IGetAllListVideo } from '../../types/ListVideo.types';

import { youtube_parser } from '@/app/[locale]/shared/utils';
import { Filter } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useGetAllHelenSpeakingChannel } from '../../api/UseCRUDSideNav';
import CardListVideo from './CardListVideo';
// import { useEffect } from 'react';

const ListVideoComponent = () => {
  const { channel } = useParams<{ channel?: string }>();

  const { data: listAllVideo } = useGetAllListVideo({
    page: DEFAULT_PAGE,
    limit: MAX_PAGE_SIZE,
    channel: channel || '',
    search: '',
  });
  const { data: listChannels } = useGetAllHelenSpeakingChannel();
  let idx = -1;
  for (let i = 0; i < listChannels.length; i++) {
    if (listChannels[i].value == channel) {
      idx = i;
    }
  }

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-4 h-full min-h-screen auto-rows-min">
      {idx < 0 ? (
        <div className="col-span-full text-white p-2">
          <h1 className="font-semibold text-2xl mb-4">Channel not found!</h1>
          <p className="text-zinc-400 text-sm font-normal">
            The channel you are looking for is not available.
          </p>
        </div>
      ) : (
        <>
          <div className="col-span-full text-white p-2">
            <h1 className="font-semibold text-2xl mb-4">
              {listChannels[idx] && listChannels[idx].title}
            </h1>
            <p className="text-zinc-400 text-sm font-normal">
              This channel equips you with the skills necessary for business
              English and updates you on the latest international financial
              affairs.
            </p>
          </div>
          <div className="col-span-full p-2">
            <span className="flex items-center gap-3 text-zinc-400 text-sm font-normal">
              <Filter />
              <div>
                <span className="text-white">Filter</span> |{' '}
                <span>Published date</span>
              </div>
            </span>
          </div>
          {listAllVideo.map((item: IGetAllListVideo, index) => (
            <Link
              className="m-4"
              href={`/videos/${youtube_parser(item.youtubeUrl)}`}
              key={index}
            >
              <CardListVideo data={item} />
            </Link>
          ))}
        </>
      )}
    </div>
  );
};

export default ListVideoComponent;

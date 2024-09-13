import {
  DEFAULT_PAGE,
  MAX_PAGE_SIZE,
} from '@/app/[locale]/shared/constants/DataTable.constants';
import { useGetAllListVideo } from '../../api/UseCRUDListVideo';
import { IGetAllListVideo } from '../../types/ListVideo.types';

import { useRouter, useSearchParams } from 'next/navigation';
// import { useGetAllHelenSpeakingChannel } from '../../api/UseCRUDSideNav';

import { youtube_parser } from '@/app/[locale]/shared/utils';

import { Filter } from 'lucide-react';
import CardListVideo from '../list-video/CardListVideo';
import Image from 'next/image';
import Wordcomponent from '../word/Word.component';
import { useEffect, useState } from 'react';
// import { useEffect, useState } from 'react';

const SearchComponent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState<string | null>(null);

  const { data: listAllVideo, refetch } = useGetAllListVideo({
    page: DEFAULT_PAGE,
    limit: MAX_PAGE_SIZE,
    search: search || '',
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const searchQuery = params.get('search');
    setSearch(searchQuery);
  }, [searchParams]);
  useEffect(() => {
    refetch();
  }, [search]);
  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-4 h-full min-h-screen auto-rows-min">
      <Wordcomponent search={search || ''} />
      <div className="col-span-full text-white p-2">
        <h1 className="flex gap-4 text-2xl">
          Video found for
          <span className="text-purple-500"> {search}</span>
        </h1>
      </div>
      {listAllVideo && listAllVideo.length > 0 ? (
        <>
          <div className="col-span-full p-2">
            <span className="flex items-center gap-3 text-zinc-400 text-sm font-normal">
              <Filter />
              <div>
                <span className="text-white">Filter |</span>
                <span>Relevance</span>
              </div>
            </span>
          </div>
          {listAllVideo.map((item: IGetAllListVideo, index) =>
            search &&
            item.title.toLowerCase().includes(search.toLowerCase()) ? (
              <div
                className="m-4"
                onClick={() =>
                  router.push(`/videos/${youtube_parser(item.youtubeUrl)}`)
                }
                key={index}
              >
                <CardListVideo data={item} />
              </div>
            ) : null,
          )}
        </>
      ) : (
        <div className="col-span-full">
          <div className="text-white p-2 flex flex-col items-center justify-center ">
            <Image
              src={
                'https://vt-cdn.voicetube.com/assets/img/no-content/video-list.svg'
              }
              alt="Search not found"
              width={200}
              height={200}
            />
            <h1 className="flex gap-4">
              Video not found for
              <span className="text-purple-500"> {search}</span>
            </h1>
            <br />
            <span>Try the trending topics below.</span>
            <br />
            <span className="text-purple-400 hover:text-purple-800">Topic</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchComponent;

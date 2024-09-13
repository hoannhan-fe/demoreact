import { Filter } from 'lucide-react';
import React from 'react';
import { useGetAudioChannels } from '../../api/UseCRUDAudioChannels';
import { useParams } from 'next/navigation';

const ListAudioComponent = () => {
  const { audio } = useParams();

  const { data: listAudioChannels } = useGetAudioChannels();
  let idx = 0;
  for (let i = 0; i < listAudioChannels.length; i++) {
    if (listAudioChannels[i].slug == audio) {
      idx = i;
    }
  }

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-4 h-full min-h-screen auto-rows-min">
      <div className="col-span-full text-white p-2">
        <h1 className="font-semibold text-2xl mb-4">
          {' '}
          {listAudioChannels[idx] ? listAudioChannels[idx].name : ''}
        </h1>
        <p className="text-zinc-400 text-sm font-normal">
          {listAudioChannels[idx] ? listAudioChannels[idx].description : ''}
        </p>
      </div>
      {/* <div className="col-span-full text-white p-2">
    </div> */}
      <div className="col-span-full p-2">
        <span className="flex items-center gap-3 text-zinc-400 text-sm font-normal">
          <Filter />
          <div>
            <span className="text-white">Filter</span> |{' '}
            <span>Published date</span>
          </div>
        </span>
      </div>
    </div>
  );
};

export default ListAudioComponent;

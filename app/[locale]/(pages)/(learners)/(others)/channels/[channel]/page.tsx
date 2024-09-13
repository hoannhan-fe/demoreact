'use client';

import ListVideoComponent from '@/app/[locale]/modules/learners/components/list-video/ListVideoComponent';
import type { NextPage } from 'next';

const ChannelPage: NextPage = () => {
  return (
    <div className="w-full bg-[#18131d] py-10 px-8">
      <ListVideoComponent />
    </div>
  );
};

export default ChannelPage;

'use client';

import SearchComponent from '@/app/[locale]/modules/learners/components/header/SearchComponent';
import type { NextPage } from 'next';

const SearchPage: NextPage = () => {
  return (
    <div className="w-full bg-[#18131d] py-10 px-8">
      <SearchComponent />
    </div>
  );
};

export default SearchPage;

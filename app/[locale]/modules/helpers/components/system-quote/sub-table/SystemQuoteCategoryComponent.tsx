'use client';
import React, { useEffect, useState } from 'react';

import { Input } from '@/app/[locale]/shared/components/shacdn-ui/Input.components';
import { useGetSystemQuoteCategory } from '../../../api';
import { ISystemQuoteCategory } from '../../../types';
import { SystemQuoteCategoryTag } from './widgets';

import { DEBOUNCED_TIME } from '@/app/[locale]/shared/constants/Common.constants';
import {
  DEFAULT_PAGE,
  MAX_PAGE_SIZE,
} from '@/app/[locale]/shared/constants/DataTable.constants';
import { useDebounce } from '@/app/[locale]/shared/hook';
import { useNprogress } from '@/app/[locale]/shared/hook';

export const SystemQuoteCategoryComponent = () => {
  const [searchCategory, setSearchCategory] = useState<string>('');

  const debouncedValue = useDebounce<string>(searchCategory, DEBOUNCED_TIME);
  const {
    data: listFilterSystemQuoteCategory,
    isFetching,
    refetch,
  } = useGetSystemQuoteCategory({
    page: DEFAULT_PAGE,
    limit: MAX_PAGE_SIZE,
    category: debouncedValue,
  });

  useEffect(() => {
    refetch();
  }, [debouncedValue]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchCategory(event.target.value);
  };

  useNprogress(isFetching);

  return (
    <>
      <div className="flex flex-col gap-2 border-[1px]  rounded p-2 bg-white bg-opacity-35">
        <h1 className="text-2xl font-bold">Category</h1>
        <div className="flex items-center justify-between">
          <div className="flex p-2">
            <Input
              placeholder="Filter Category"
              value={searchCategory}
              onChange={handleInputChange}
              className="h-8"
            />
          </div>
        </div>
        <div className="grid grid-cols-10 gap-4">
          {listFilterSystemQuoteCategory.map(
            (item: ISystemQuoteCategory, index) => (
              <SystemQuoteCategoryTag key={index} data={item} />
            ),
          )}
        </div>
      </div>
    </>
  );
};

'use client';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/app/[locale]/shared/components';
import { Repeat } from 'lucide-react';
import React, { useState } from 'react';

interface RepeatSelectProps {
  repeat: number;
  setRepeat: React.Dispatch<React.SetStateAction<number>>;
}

const RepeatSelect = ({ repeat, setRepeat }: RepeatSelectProps) => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const repeatList = [2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
      <PopoverTrigger className="absolute left-5">
        <Repeat className="h-7 w-7 cursor-pointer" />
      </PopoverTrigger>
      <PopoverContent className="max-w-32 px-0 py-2">
        <div className="flex flex-col h-fit max-h-44 pl-2 overflow-y-auto">
          {repeatList.map((repVal: number, idx: number) => (
            <div
              className={`py-1 px-3 border-b hover:bg-zinc-300 text-center ${repVal == repeat ? 'bg-zinc-200' : ''}`}
              key={idx}
              onClick={() => {
                setRepeat(repVal);
                setPopoverOpen(false);
              }}
            >
              {repVal}
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default RepeatSelect;

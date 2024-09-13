import React from 'react';
import { Shortkey } from '../../data/Shortkeys.data';

export const CustomTable = ({ ShortkeyList }: { ShortkeyList: Shortkey[] }) => {
  return (
    <table className="w-full mt-[26px] mb-[16px] border-collapse align-middle text-left">
      <thead className="border-b-2 border-[#f3f3f3] border-solid">
        <tr className="h-12">
          <th className="text-base font-medium w-[15%] pl-6"></th>
          <th className="text-base font-medium w-[40%] pl-6">Shortcuts</th>
          <th className="text-base font-medium w-[45%] pl-6">Functions</th>
        </tr>
      </thead>
      <tbody>
        {ShortkeyList &&
          ShortkeyList.map((shortkey: Shortkey, idx: number) => (
            <tr
              className={`h-[40px] text-sm ${idx % 2 == 0 ? '' : 'bg-[#f3f3f3]'}`}
              key={idx}
            >
              <td className="pl-6">{idx + 1}</td>
              <td className="pl-6">{shortkey.shortcut}</td>
              <td className="pl-6">{shortkey.function}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

import React from 'react';

export const CefrLevelTag = ({ cefrLevel }: { cefrLevel: string }) => {
  return (
    <span
      className={`px-2 py-1 rounded font-semibold text-xs ${
        cefrLevel === 'B1'
          ? 'bg-yellow-500 text-white'
          : cefrLevel === 'B2'
            ? 'bg-orange-400 text-white'
            : 'bg-green-600 text-white'
      }`}
    >
      {cefrLevel}
    </span>
  );
};

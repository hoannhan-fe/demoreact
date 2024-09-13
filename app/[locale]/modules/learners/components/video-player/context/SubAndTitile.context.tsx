'use client';

import React, { createContext, useState } from 'react';
import { type VideoDetailAndSub } from '../../../types';

const useYoutubeDetailState = (initialYtbDetail: VideoDetailAndSub) =>
  useState<VideoDetailAndSub>(initialYtbDetail);

export const YoutubeDetailConText = createContext<ReturnType<
  typeof useYoutubeDetailState
> | null>(null);

export const useYoutubeDetail = () => {
  const youtubeDetail = React.useContext(YoutubeDetailConText);
  if (!youtubeDetail) {
    throw new Error(
      'useYoutubeDetail must be used within a Youtube Detail Provider',
    );
  }
  return youtubeDetail;
};

export const YoutubeDetailProvider = ({
  youtubeDetail: initialYtbDetail,
  children,
}: {
  youtubeDetail: VideoDetailAndSub;
  children: React.ReactNode;
}) => {
  const [youtubeDetail, setYoutubeDetail] =
    useYoutubeDetailState(initialYtbDetail);
  return (
    <YoutubeDetailConText.Provider value={[youtubeDetail, setYoutubeDetail]}>
      {children}
    </YoutubeDetailConText.Provider>
  );
};

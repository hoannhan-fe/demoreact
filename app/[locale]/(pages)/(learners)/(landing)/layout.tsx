'use client';

import '@fortawesome/fontawesome-free/css/all.min.css';
import React, { useState } from 'react';
import Header from '../../../modules/learners/components/header/Header';
import { CollapsedSideNav } from '../../../modules/learners/components/side-nav';

export default function LearnersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [openSideNav, setOpenSideNav] = useState(false);
  const [indexSelectedMenu, setIndexSelectedMenu] = useState(-1);

  return (
    <>
      <div className="col-span-2">
        <Header
          indexSelectedMenu={indexSelectedMenu}
          openSideNav={openSideNav}
          setOpenSideNav={setOpenSideNav}
          setIndexSelectedMenu={setIndexSelectedMenu}
        />
      </div>
      <div className="w-full h-full">
        <CollapsedSideNav
          setOpenSideNav={setOpenSideNav}
          setIndexSelectedMenu={setIndexSelectedMenu}
        />
      </div>

      <div className="">{children}</div>
    </>
  );
}

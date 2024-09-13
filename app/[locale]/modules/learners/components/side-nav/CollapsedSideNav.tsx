import React, { Dispatch, SetStateAction } from 'react';
import { MenuSide, listMenuSide } from '../../constants/sidenav';
import { Loadingcustom } from '@/app/[locale]/shared/components/loading';
import { MenuItemContent } from './menu-item';

interface CollapsedSideNavProps {
  setOpenSideNav: Dispatch<SetStateAction<boolean>>;
  setIndexSelectedMenu: Dispatch<SetStateAction<number>>;
}
export const CollapsedSideNav: React.FC<CollapsedSideNavProps> = ({
  setOpenSideNav,
  setIndexSelectedMenu,
}) => {
  const handleMenuClick = (index: number) => {
    setOpenSideNav(true);
    setIndexSelectedMenu(index);
  };
  return (
    <div className="bg-[#251633] text-white h-full">
      <ul className="flex flex-col pt-2 pb-14 w-[130px]">
        {listMenuSide.length <= 0 ? (<Loadingcustom title="Loading ..." />) : (
          listMenuSide.map((item: MenuSide) => (
            <MenuItemContent
              key={item.indexOf}
              onClick={() => handleMenuClick(item.indexOf)}
              icon={item.icon}
              label={item.label}
            />
          ))
        )}
      </ul>
    </div>
  );
};

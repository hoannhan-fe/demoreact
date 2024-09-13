'use client';

import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ChevronDownIcon, MenuIcon } from 'lucide-react';
import { PiBellSimpleFill } from 'react-icons/pi';

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/app/[locale]/shared/components/shacdn-ui';
import {
  APP_NAME,
  DEFAULT_LOCALE,
  SUPPORTED_LOCALES,
} from '@/app/[locale]/shared/constants';

import { ThemeSwitchButton } from './widgets/ThemeSwitchButton';
import Search from './Search';
import { SideNav } from '../side-nav';
import { GetLocaleFullname } from '../../utils/locale.util';
import {
  useGetAllHelenSpeakingAudio,
  useGetAllHelenSpeakingChannel,
} from '../../api/UseCRUDSideNav';
import { ISideNav, ISideNavAudio } from '../../types';

type HeaderProps = {
  indexSelectedMenu: number;
  setIndexSelectedMenu: Dispatch<SetStateAction<number>>;
  openSideNav: boolean;
  setOpenSideNav: Dispatch<SetStateAction<boolean>>;
};

const Header = ({
  indexSelectedMenu,
  setIndexSelectedMenu,
  openSideNav,
  setOpenSideNav,
}: HeaderProps) => {
  const [channels, setChannels] = useState<ISideNav[]>([]);
  const [audios, setAudios] = useState<ISideNavAudio[]>([]);

  const {
    data: resChannels,
    isFetchingChannel,
    isSuccessChannel,
  } = useGetAllHelenSpeakingChannel();
  const {
    data: resAudios,
    isFetchingAudio,
    isSuccessAudio,
  } = useGetAllHelenSpeakingAudio();

  useEffect(() => {
    if (isSuccessChannel && resChannels) {
      setChannels(resChannels);
    }
  }, [resChannels, isSuccessChannel]);
  useEffect(() => {
    if (isSuccessAudio && resAudios) {
      setAudios(resAudios);
    }
  }, [resAudios, isSuccessAudio]);

  return (
    <header className="sticky z-10 top-0 left-0 w-full h-20 px-6 bg-background text-foreground flex justify-between items-center">
      <div
        className={`fixed z-50 top-0 left-0 w-screen h-screen transition ease-in-out duration-300 bg-black  ${openSideNav ? ' bg-opacity-50 visible' : 'bg-opacity-0 invisible'} `}
        onClick={() => {
          setOpenSideNav(false);
          setIndexSelectedMenu(-1);
        }}
      ></div>
      <div
        style={{
          position: 'fixed',
          top: '0px',
          left: '0px',
        }}
        className={`z-50 duration-300 bg-[#251633] ${openSideNav ? 'translate-x-0' : '-translate-x-[350px]'}`}
      >
        <div className="w-full h-20 shadow-[0_3px_12px_0px_rgba(0,0,0,0.3)] bg-gradient-to-r from-[#210040] to-[#1d102b]"></div>
        <SideNav
          channels={channels}
          audios={audios}
          isFetchingChannel={isFetchingChannel}
          isFetchingAudio={isFetchingAudio}
          indexSelectedMenu={indexSelectedMenu}
          setIndexSelectedMenu={setIndexSelectedMenu}
        />
      </div>
      <div className="content-left w-fit h-full flex items-center">
        <div className="w-full z-[100] pr-0 flex gap-3 items-center">
          <MenuIcon
            className="h-7 w-7 cursor-pointer text-icon"
            onClick={() => setOpenSideNav(!openSideNav)}
          />
          <div className="flex gap-1.5">
            <Link
              href="/"
              className="flex gap-1.5 items-center text-lg font-semibold"
            >
              <Image
                src={'/images/rabito_english_logo.svg'}
                alt="Rabito English"
                width={38}
                height={38}
                style={{ width: 'auto' }}
                priority
              />
              <h1 className="text-sm font-bold w-[156px]">
                {APP_NAME.toUpperCase()}
              </h1>
            </Link>
          </div>
        </div>
        <div className="ml-9">
          <Search />
        </div>
      </div>
      <div className="flex items-center gap-4 h-fit">
        <ChangeLanguageComponent />
        <div className="w-[2px] h-7 bg-[#90A3BF] rounded-full"></div>
        <Button
          variant="outline"
          size="icon"
          className="h-11 w-11 rounded-full"
        >
          <PiBellSimpleFill className="h-7 w-7 text-[#555770] dark:text-white" />
        </Button>
        <ThemeSwitchButton />
        <div className="relative w-11 h-11 rounded-full p-[2px] bg-gradient-to-b from-[#D4FC79] to-[#96E6A1]">
          <Image
            src={'/images/default_avatar.webp'}
            alt="Avatar"
            width={200}
            height={200}
            className="rounded-full w-full h-full object-cover"
          />
        </div>
      </div>
    </header>
  );
};

const ChangeLanguageComponent = () => {
  const { push } = useRouter();
  const pathname = usePathname();
  let currentLocale = pathname.split('/')[1];
  if (!SUPPORTED_LOCALES.includes(currentLocale))
    currentLocale = DEFAULT_LOCALE;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex gap-2 items-center cursor-pointer self-stretch">
          <Image
            className="rounded-[4px] object-cover"
            src={`/images/${currentLocale}.svg`}
            alt="Tiếng Việt"
            width={32}
            height={24}
            style={{ height: '24px', width: '32px' }}
          />
          {GetLocaleFullname(currentLocale)}
          <ChevronDownIcon size={16} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className=" w-[180px] bg-background border-none p-2"
      >
        {SUPPORTED_LOCALES.map((locale) => (
          <DropdownMenuItem
            key={locale}
            onClick={() => push(`/${locale}`)}
            className={`rounded-[4px] ${currentLocale === locale ? 'bg-primary' : ''}`}
          >
            <Image
              className="rounded-full object-cover mr-2"
              src={`/images/${locale}.svg`}
              alt="locale flag"
              width={24}
              height={24}
              style={{ height: '24px' }}
            />
            {GetLocaleFullname(locale)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Header;

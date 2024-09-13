// import Image from 'next/image';
// import { FaFacebookSquare } from 'react-icons/fa';
// import { FaInstagram } from 'react-icons/fa6';
// import { FaTwitter } from 'react-icons/fa';
// import { FaLinkedin } from 'react-icons/fa';
// import { FaTiktok } from 'react-icons/fa';
import React from 'react';

import { ISideNav } from '../../types/SideNav.types';
import { useRouter } from 'next/navigation';
import { useGetAllHelenSpeakingChannel } from '../../api/UseCRUDSideNav';
import { listLevels } from '../../constants';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  const router = useRouter();
  const { data: listChannels } = useGetAllHelenSpeakingChannel();

  return (
    <div className=" w-full ">
      <div className="h-full pl-12">
        <Link
          className="flex text-black items-center gap-2 pl-20 pt-4"
          href={'/'}
        >
          <Image
            src={'/images/Rabit.svg'}
            alt="Rabito English"
            width={60}
            height={60}
            style={{
              filter:
                'invert(100%) sepia(100%) saturate(0%) hue-rotate(190deg) brightness(103%) contrast(103%)',
              width: 'auto',
            }}
            color="black"
          />
          <Image
            src={'/images/Rabito-English-Text.svg'}
            alt="Rabito English"
            width={200}
            height={200}
            style={{
              filter:
                'invert(100%) sepia(100%) saturate(0%) hue-rotate(190deg) brightness(103%) contrast(103%)',
              width: 'auto',
            }}
            priority
          />
        </Link>
      </div>
      <div className="w-full flex items-center justify-end pb-4">
        <div>
          <div className=" grid w-fit grid-cols-2 pr-10">
            <div className="mx-8">
              <h3 className=" text-lg font-bold"> Channels </h3>
              <ul>
                {listChannels.map((item: ISideNav) => (
                  <li
                    key={item.value}
                    className="w-full cursor-pointer py-2 hover:underline"
                    onClick={() => router.push(`/channels/${item.value}`)}
                  >
                    {item.title}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mx-6">
              <h3 className=" text-lg font-bold"> Levels </h3>
              <ul>
                {listLevels.map((item: ISideNav) => (
                  <li
                    key={item.value}
                    className="w-full cursor-pointer py-2 hover:underline"
                    // onClick={() => router.push(`/channels/${item.value}`)}
                  >
                    {item.title}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="p-12 flex justify-between items-center">
        <div className="p-2 flex gap-4">
          <div>
            <a
              href="#"
              className="inline-block bg-black text-white px-2 py-2 rounded-xl"
            >
              <span className="flex items-center">
                <img src="https://vt-cdn.voicetube.com/assets/img/download/app-store.svg" />
              </span>
            </a>
          </div>
          <div>
            <a
              href="#"
              className="inline-block bg-black text-white px-2 py-2 rounded-xl"
            >
              <span className="flex items-center">
                <img src="https://vt-cdn.voicetube.com/assets/img/download/google-play.svg" />
              </span>
            </a>
          </div>
        </div>
        <div className="flex items-center gap-4 mx-5">
          <FaFacebookSquare />
          <FaInstagram />
          <FaTwitter />
          <FaLinkedin />
          <FaTiktok />
        </div>
      </div> */}
    </div>
  );
};

export default Footer;

'use client';
import React, { useState, useEffect } from 'react';
import secureLocalStorage from 'react-secure-storage';
import Image from 'next/image';
import { useGoogleLogin } from '@react-oauth/google';
import Lottie from 'lottie-react';
import { redirect, useRouter } from 'next/navigation';

import LoadingLottie from '../../../../../../public/lottie/loading.json';

import { Button } from '../../../../shared/components';
import { useDeviceUUID } from '../../../../shared/hook';

import { authServices } from '../../services';
import { UserInfo } from '../../types';

const SignInForm = () => {
  const [loggedInUser, setLoggedInUser] = useState<UserInfo | null>(
    secureLocalStorage.getItem('UserInfo') as UserInfo,
  );
  const { push } = useRouter();
  const deviceUUID = useDeviceUUID();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function reloadAuth() {
      setLoggedInUser(secureLocalStorage.getItem('UserInfo') as UserInfo);
      if (loggedInUser == null) window.location.reload();
    }

    window.addEventListener('storage', reloadAuth);
    return () => {
      window.removeEventListener('storage', reloadAuth);
    };
  }, []);

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      // console.log(tokenResponse.access_token)
      if (tokenResponse.access_token != null) {
        setLoading(true);
        const res = await authServices.ssoLogin(
          tokenResponse.access_token,
          deviceUUID,
        );

        secureLocalStorage.setItem('UserInfo', res?.user as UserInfo);

        localStorage.setItem(
          'AccessToken',
          res?.authorization?.accessToken as string,
        );
        setLoggedInUser(secureLocalStorage.getItem('UserInfo') as UserInfo);

        setLoading(false);
        push('/');
      }
    },
  });

  useEffect(() => {
    if (loggedInUser != null) {
      redirect('/');
    }
  }, [loggedInUser]);

  return (
    <div
      className={`mx-auto h-screen border-gray-200 shadow-md`}
      style={{ backgroundColor: 'rgb(225, 250, 255)' }}
    >
      <div className="relative h-full w-full rounded-2xl">
        {loading && (
          <div className="absolute flex w-full items-center justify-center">
            <Lottie
              className="mx-auto w-20 scale-125"
              animationData={LoadingLottie}
            />
          </div>
        )}
        <div className="mx-auto w-fit pt-40">
          <Image
            src="/images/Helen-avatar-anime.jpg"
            alt="Google logo"
            className="mx-auto"
            width={200}
            height={200}
            style={{
              maxWidth: '100%',
              height: 'auto',
              objectFit: 'cover',
            }}
          />
        </div>
        <p className="mx-auto w-fit px-2 pb-3 text-3xl font-bold text-black">
          Helen
        </p>
        <div className="mx-auto w-72 py-5">
          <Button
            onClick={() => login()}
            className="primary-custom-btn flex w-full gap-2 py-5 border-[1px] border-blue-100 bg-white text-black hover:bg-gray-100"
          >
            <Image
              src="/images/logo_googleg_48dp.svg"
              alt="Google logo"
              className=""
              width={25}
              height={25}
              style={{
                maxWidth: '100%',
                height: 'auto',
                objectFit: 'cover',
              }}
            />
            <p className="text-base">Log in with Google</p>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;

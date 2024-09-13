import { createSharedPathnamesNavigation } from 'next-intl/navigation';

import { appConfig } from '../configs/appConfig';

export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({
    locales: appConfig.locales,
    localePrefix: appConfig.localePrefix,
  });

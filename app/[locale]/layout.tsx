import type { Metadata } from 'next';
import { Noto_Sans } from 'next/font/google';
import { unstable_setRequestLocale } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';

import './globals.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const notoSans = Noto_Sans({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});
export const metadata: Metadata = {
  title: 'EngWays',
  description: 'EngWays',
  icons: {
    icon: '/images/Helen-avatar-anime.jpg',
  },
};

type Props = {
  children: React.ReactNode;
  params: {
    locale: string;
  };
};

// Wrapper function to fetch messages based on locale
async function fetchMessages(locale: string) {
  const messages = await import(`../locales/${locale}.json`);
  return messages.default;
}

export default async function RootLayout({ children, params }: Props) {
  unstable_setRequestLocale(params.locale);

  // Fetch messages for the current locale
  const messages = await fetchMessages(params.locale);

  return (
    <html lang={params.locale}>
      <NextIntlClientProvider locale={params.locale} messages={messages}>
        <body className={notoSans.className}>{children}</body>
      </NextIntlClientProvider>
    </html>
  );
}

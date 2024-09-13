'use client';

import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { NextSeo } from 'next-seo';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'next-themes';
import { PersistGate } from 'redux-persist/integration/react';
import '@fortawesome/fontawesome-free/css/all.min.css';

import Footer from '../../modules/learners/components/header/Footer';
import { PopupContextProvider } from '../../shared/context/pop-up';
import store, { persistor } from '../../modules/learners/store';

export default function LearnersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 0,
      },
    },
  });

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider attribute="class">
          <QueryClientProvider client={queryClient}>
            <PopupContextProvider>
              <div>
                <NextSeo
                  title="MDD"
                  additionalMetaTags={[
                    {
                      property: 'keywords',
                      content:
                        'GiaDinhDev, Software Developer, Sofware Engineer, Developer, Portfolio, Devops, Cloud Native',
                    },
                  ]}
                />
                <div className="min-h-[100vh] w-full grid grid-cols-[auto_1fr] grid-rows-[auto_1fr] bg-gradient-to-r from-[#353535] to-[#282828]">
                  {children}
                </div>
                <div className="w-full h-fit">
                  <Footer />
                </div>
              </div>
            </PopupContextProvider>
          </QueryClientProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

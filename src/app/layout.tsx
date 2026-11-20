'use client';

import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/ThemeProvider';
import React, { useEffect, useState } from 'react';
import '../styles/globals.css';
import { getLocaleFromCookieClient } from '@/lib/client/locale';
import type { Locale } from '@/i18n-config';
import { i18n } from '@/i18n-config';
import Script from 'next/script';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [locale, setLocale] = useState<Locale>(i18n.defaultLocale);

  useEffect(() => {
    const savedLocale = getLocaleFromCookieClient();
    setLocale(savedLocale);
    document.documentElement.lang = savedLocale;
  }, []);

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <title>Leonardo Benicio Legal Documents</title>
        <meta
          name='description'
          content='View and navigate legal documents like Terms of Use and Privacy Policies.'
        />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover'
        />
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin='anonymous'
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'
          rel='stylesheet'
        />
      </head>
      <body className='font-body antialiased'>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
        {process.env.NODE_ENV === 'production' && (
          <Script id='google-analytics' strategy='afterInteractive'>
            {`(function () {
              var doNotTrack = navigator.doNotTrack || window.doNotTrack || navigator.msDoNotTrack;
              if (doNotTrack === '1' || doNotTrack === 'yes') return;

              window.dataLayer = window.dataLayer || [];
              window.gtag = function () { window.dataLayer.push(arguments); };
              window.gtag('js', new Date());
              window.gtag('config', 'G-8SW89VY8EN');

              var script = document.createElement('script');
              script.async = true;
              script.src = 'https://www.googletagmanager.com/gtag/js?id=G-8SW89VY8EN';
              document.head.appendChild(script);
            })();`}
          </Script>
        )}
      </body>
    </html>
  );
}

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
        <Script
          defer
          src='https://analytics.4686189.xyz/script.js'
          data-website-id='d7dc1e54-7494-409a-85a6-e51de15539ad'
        ></Script>
      </body>
    </html>
  );
}

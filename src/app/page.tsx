'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Footer } from '@/components/Footer';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { LocaleSwitcher } from '@/components/LocaleSwitcher';
import { getDictionary } from '@/get-dictionary';
import { getLocaleFromCookieClient } from '@/lib/client/locale';
import { getAllDocuments } from '@/lib/client/documents';
import { useEffect, useState } from 'react';
import type { LegalDocument } from '@/types/legal-document.type';
import { Skeleton } from '@/components/ui/skeleton';
import type { Locale } from '@/i18n-config';
import { i18n } from '@/i18n-config';

export default function LegalClarityPage() {
  const [locale, setLocale] = useState<Locale>(i18n.defaultLocale);
  const [dictionary, setDictionary] = useState<any>(null);
  const [documents, setDocuments] = useState<LegalDocument[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // This effect ensures we have the latest locale from the cookie when the component mounts
    // or when the cookie might change (though our switcher handles that explicitly).
    const currentLocale = getLocaleFromCookieClient();
    setLocale(currentLocale);
  }, []);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const dict = await getDictionary(locale);
        setDictionary(dict);
        const docs = await getAllDocuments(locale);
        setDocuments(docs);
      } catch (error) {
        console.error('Failed to fetch initial data:', error);
        // You might want to set an error state here
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [locale]); // Refetch data when locale changes

  if (isLoading || !dictionary || !documents) {
    return (
      <div className='bg-background font-body flex min-h-screen flex-col'>
        <header className='bg-card border-b p-4 shadow-sm sm:p-6'>
          <div className='container mx-auto flex items-center justify-between'>
            <Skeleton className='h-8 w-36' />
            <div className='flex items-center gap-2'>
              <Skeleton className='h-10 w-10 rounded-full' />
              <Skeleton className='h-10 w-10 rounded-full' />
            </div>
          </div>
        </header>
        <main className='container mx-auto flex-1 p-4 sm:p-6 md:p-8'>
          <Card>
            <CardHeader>
              <Skeleton className='h-9 w-1/2' />
            </CardHeader>
            <CardContent>
              <Skeleton className='mb-6 h-5 w-3/4' />
              <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
                {[...Array(3)].map((_, i) => (
                  <Card key={i}>
                    <CardHeader className='flex-row items-center gap-4'>
                      <Skeleton className='h-8 w-8 rounded-full' />
                      <Skeleton className='h-6 w-3/4' />
                    </CardHeader>
                    <CardContent>
                      <Skeleton className='h-4 w-full' />
                      <Skeleton className='mt-2 h-4 w-full' />
                      <Skeleton className='mt-2 h-4 w-2/3' />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className='bg-background font-body flex min-h-screen flex-col'>
      <header className='bg-card border-b p-4 shadow-sm sm:p-6'>
        <div className='container mx-auto flex items-center justify-between'>
          <h1 className='text-primary font-headline text-2xl font-bold'>
            Leonardo Benicio
          </h1>
          <div className='flex items-center gap-2'>
            <LocaleSwitcher />
            <ThemeSwitcher />
          </div>
        </div>
      </header>

      <main className='container mx-auto flex-1 p-4 sm:p-6 md:p-8'>
        <Card>
          <CardHeader>
            <CardTitle className='font-headline text-primary text-3xl'>
              {dictionary.page.home.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-foreground/80 mb-6'>
              {dictionary.page.home.description}
            </p>
            <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
              {documents.map((doc) => (
                <Link key={doc.id} href={`/docs/${doc.id}`} className='group'>
                  <Card className='group-hover:border-primary h-full transition-all duration-300 group-hover:shadow-lg'>
                    <CardHeader className='flex-row items-center gap-4'>
                      <doc.icon className='text-primary h-8 w-8' />
                      <CardTitle className='text-foreground group-hover:text-primary text-xl font-semibold'>
                        {doc.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className='text-muted-foreground line-clamp-3'>
                        {doc.summary}...
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}

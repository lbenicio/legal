'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { LegalDocument } from '@/types/legal-document.type';
import { Footer } from '@/components/Footer';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { LocaleSwitcher } from '@/components/LocaleSwitcher';
import { getDictionary } from '@/get-dictionary';
import { getLocaleFromCookieClient } from '@/lib/client/locale';
import { getAllDocuments, getDocumentBySlug } from '@/lib/client/documents';
import { Skeleton } from '@/components/ui/skeleton';
import type { Locale } from '@/i18n-config';
import { i18n } from '@/i18n-config';

export default function DocumentPageClient({
  params,
}: {
  params: { slug: string };
}) {
  const [locale, setLocale] = useState<Locale>(i18n.defaultLocale);
  const [dictionary, setDictionary] = useState<any>(null);
  const [documents, setDocuments] = useState<LegalDocument[] | null>(null);
  const [selectedDoc, setSelectedDoc] = useState<LegalDocument | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const currentLocale = getLocaleFromCookieClient();
    setLocale(currentLocale);
  }, []);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const dict = await getDictionary(locale);
        setDictionary(dict);

        const allDocs = await getAllDocuments(locale);
        setDocuments(allDocs);

        const doc = await getDocumentBySlug(locale, params.slug);
        if (doc) {
          setSelectedDoc(doc);
        } else {
          notFound();
        }
      } catch (error) {
        console.error('Failed to fetch document:', error);
        // Handle error appropriately
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [locale, params.slug]);

  if (isLoading || !dictionary || !documents || !selectedDoc) {
    return (
      <div className='bg-background font-body flex min-h-screen flex-col'>
        <header className='bg-card sticky top-0 z-10 border-b p-4 shadow-sm sm:p-6'>
          <div className='container mx-auto flex items-center justify-between'>
            <Skeleton className='h-8 w-36' />
            <div className='flex items-center gap-2'>
              <Skeleton className='h-10 w-10 rounded-full' />
              <Skeleton className='h-10 w-10 rounded-full' />
            </div>
          </div>
        </header>
        <div className='container mx-auto grid flex-1 gap-10 p-4 sm:p-6 md:grid-cols-[250px_1fr] md:p-8'>
          <aside className='h-fit md:sticky md:top-24'>
            <Skeleton className='mb-4 h-7 w-32' />
            <div className='flex flex-col gap-2'>
              <Skeleton className='h-12 w-full' />
              <Skeleton className='h-12 w-full' />
              <Skeleton className='h-12 w-full' />
            </div>
          </aside>
          <main>
            <Card>
              <CardHeader>
                <Skeleton className='h-10 w-3/4' />
              </CardHeader>
              <CardContent className='space-y-4'>
                <Skeleton className='h-4 w-full' />
                <Skeleton className='h-4 w-5/6' />
                <Skeleton className='h-4 w-full' />
                <Skeleton className='h-4 w-4/6' />
                <Skeleton className='h-4 w-full' />
              </CardContent>
            </Card>
          </main>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className='bg-background font-body flex min-h-screen flex-col'>
      <header className='bg-card sticky top-0 z-10 border-b p-4 shadow-sm sm:p-6'>
        <div className='container mx-auto flex items-center justify-between'>
          <Link
            href='/'
            className='text-primary font-headline text-2xl font-bold'
          >
            Leonardo Benicio
          </Link>
          <div className='flex items-center gap-2'>
            <LocaleSwitcher />
            <ThemeSwitcher />
          </div>
        </div>
      </header>

      <div className='container mx-auto grid flex-1 gap-10 p-4 sm:p-6 md:grid-cols-[250px_1fr] md:p-8'>
        <aside className='h-fit md:sticky md:top-24'>
          <h2 className='text-foreground mb-4 text-lg font-semibold'>
            {dictionary.page.docs.sidebarTitle}
          </h2>
          <nav className='flex flex-col gap-2'>
            {documents.map((doc: LegalDocument) => (
              <Button
                key={doc.id}
                variant={selectedDoc.id === doc.id ? 'default' : 'ghost'}
                className='hover:bg-accent h-auto justify-start gap-3 px-3 py-2 text-left text-base'
                asChild
              >
                <Link href={`/docs/${doc.id}`}>
                  <doc.icon className='h-5 w-5 shrink-0' />
                  <span className='truncate'>{doc.title}</span>
                </Link>
              </Button>
            ))}
          </nav>
        </aside>

        <main>
          <Card
            key={selectedDoc.id}
            className='animate-in fade-in-0 w-full duration-500'
          >
            <CardHeader>
              <CardTitle className='font-headline text-primary flex items-center gap-3 text-3xl'>
                <selectedDoc.icon className='h-8 w-8' />
                {selectedDoc.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className='prose dark:prose-invert text-foreground/90 max-w-none space-y-6 text-justify leading-relaxed'
                dangerouslySetInnerHTML={{ __html: selectedDoc.content || '' }}
              />
            </CardContent>
          </Card>
        </main>
      </div>
      <Footer />
    </div>
  );
}

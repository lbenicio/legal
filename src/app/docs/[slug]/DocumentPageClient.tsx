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
import {
  getAllDocuments,
  getDocumentBySlug,
} from '@/lib/client/documents';
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
      <div className="flex flex-col min-h-screen bg-background font-body">
        <header className="p-4 sm:p-6 border-b bg-card shadow-sm sticky top-0 z-10">
          <div className="container mx-auto flex items-center justify-between">
            <Skeleton className="h-8 w-36" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-10 w-10 rounded-full" />
            </div>
          </div>
        </header>
        <div className="flex-1 container mx-auto p-4 sm:p-6 md:p-8 grid md:grid-cols-[250px_1fr] gap-10">
          <aside className="md:sticky md:top-24 h-fit">
            <Skeleton className="h-7 w-32 mb-4" />
            <div className="flex flex-col gap-2">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </aside>
          <main>
            <Card>
              <CardHeader>
                <Skeleton className="h-10 w-3/4" />
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/6" />
                <Skeleton className="h-4 w-full" />
              </CardContent>
            </Card>
          </main>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background font-body">
      <header className="p-4 sm:p-6 border-b bg-card shadow-sm sticky top-0 z-10">
        <div className="container mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="text-2xl font-bold text-primary font-headline"
          >
            Legal Clarity
          </Link>
          <div className="flex items-center gap-2">
            <LocaleSwitcher />
            <ThemeSwitcher />
          </div>
        </div>
      </header>

      <div className="flex-1 container mx-auto p-4 sm:p-6 md:p-8 grid md:grid-cols-[250px_1fr] gap-10">
        <aside className="md:sticky md:top-24 h-fit">
          <h2 className="text-lg font-semibold mb-4 text-foreground">
            {dictionary.page.docs.sidebarTitle}
          </h2>
          <nav className="flex flex-col gap-2">
            {documents.map((doc: LegalDocument) => (
              <Button
                key={doc.id}
                variant={selectedDoc.id === doc.id ? 'default' : 'ghost'}
                className="justify-start gap-3 px-3 py-2 text-left h-auto text-base hover:bg-accent"
                asChild
              >
                <Link href={`/docs/${doc.id}`}>
                  <doc.icon className="h-5 w-5 shrink-0" />
                  <span className="truncate">{doc.title}</span>
                </Link>
              </Button>
            ))}
          </nav>
        </aside>

        <main>
          <Card
            key={selectedDoc.id}
            className="w-full animate-in fade-in-0 duration-500"
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-3xl font-headline text-primary">
                <selectedDoc.icon className="h-8 w-8" />
                {selectedDoc.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className="prose dark:prose-invert max-w-none text-foreground/90 leading-relaxed space-y-6 text-justify"
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

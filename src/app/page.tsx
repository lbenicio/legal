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
      <div className="flex flex-col min-h-screen bg-background font-body">
        <header className="p-4 sm:p-6 border-b bg-card shadow-sm">
          <div className="container mx-auto flex items-center justify-between">
            <Skeleton className="h-8 w-36" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-10 w-10 rounded-full" />
            </div>
          </div>
        </header>
        <main className="flex-1 container mx-auto p-4 sm:p-6 md:p-8">
          <Card>
            <CardHeader>
              <Skeleton className="h-9 w-1/2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-5 w-3/4 mb-6" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => (
                  <Card key={i}>
                    <CardHeader className="flex-row items-center gap-4">
                      <Skeleton className="h-8 w-8 rounded-full" />
                      <Skeleton className="h-6 w-3/4" />
                    </CardHeader>
                    <CardContent>
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full mt-2" />
                      <Skeleton className="h-4 w-2/3 mt-2" />
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
    <div className="flex flex-col min-h-screen bg-background font-body">
      <header className="p-4 sm:p-6 border-b bg-card shadow-sm">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary font-headline">Legal Clarity</h1>
          <div className="flex items-center gap-2">
            <LocaleSwitcher />
            <ThemeSwitcher />
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto p-4 sm:p-6 md:p-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-headline text-primary">
              {dictionary.page.home.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-6 text-foreground/80">
              {dictionary.page.home.description}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {documents.map((doc) => (
                <Link key={doc.id} href={`/docs/${doc.id}`} className="group">
                  <Card className="h-full transition-all duration-300 group-hover:shadow-lg group-hover:border-primary">
                    <CardHeader className="flex-row items-center gap-4">
                      <doc.icon className="h-8 w-8 text-primary" />
                      <CardTitle className="text-xl font-semibold text-foreground group-hover:text-primary">
                        {doc.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground line-clamp-3">
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

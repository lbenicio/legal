'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { getDictionary } from '@/get-dictionary';
import { getLocaleFromCookieClient } from '@/lib/client/locale';
import type { Locale } from '@/i18n-config';

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  const [dictionary, setDictionary] = useState<any>(null);
  
  useEffect(() => {
    const locale = getLocaleFromCookieClient();
    getDictionary(locale).then(setDictionary);
  }, []);

  useEffect(() => {
    console.error(error);
  }, [error]);

  if (!dictionary) return null;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-destructive">
            {dictionary.page.error.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>{dictionary.page.error.message}</p>
          <Button onClick={() => reset()}>
            {dictionary.page.error.retryButton}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

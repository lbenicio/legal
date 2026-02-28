'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getDictionary } from '@/get-dictionary';
import { getLocaleFromCookieClient } from '@/lib/client/locale';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function NotFound() {
  const [dictionary, setDictionary] = useState<any>(null);

  useEffect(() => {
    const locale = getLocaleFromCookieClient();
    getDictionary(locale).then(setDictionary);
  }, []);

  if (!dictionary) return null;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-primary">
            {dictionary.page.notFound.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-muted-foreground">
            {dictionary.page.notFound.message}
          </p>
          <Button asChild>
            <Link href="/">
              {dictionary.page.notFound.homeButton}
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

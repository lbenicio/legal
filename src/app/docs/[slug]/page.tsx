import { getContentSlugs } from '@/lib/server/documents';
import { i18n, type Locale } from '@/i18n-config';
import type { Metadata } from 'next';
import DocumentPageClient from './DocumentPageClient';

const markdownLocaleTitles = {
  en: 'English',
  es: 'Español',
  'pt-BR': 'Português (Brasil)',
} satisfies Record<Locale, string>;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  return {
    alternates: {
      types: {
        'text/markdown': i18n.locales.map((locale) => ({
          url: `/content/${locale}/${slug}.md`,
          title: markdownLocaleTitles[locale],
        })),
      },
    },
  };
}

export async function generateStaticParams() {
  const slugs = await getContentSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export default async function DocumentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  return <DocumentPageClient params={resolvedParams} />;
}

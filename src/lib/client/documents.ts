'use client';

import { remark } from 'remark';
import html from 'remark-html';
import matter from 'gray-matter';
import { FileText, Gavel, Shield, type LucideIcon } from 'lucide-react';
import type { LegalDocument } from '@/types/legal-document.type';
import type { Locale } from '@/i18n-config';

const ICONS: Record<string, LucideIcon> = {
  FileText,
  Gavel,
  Shield,
};

async function fetchContent(locale: Locale, slug: string): Promise<string> {
  const response = await fetch(`/content/${locale}/${slug}.md`);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${slug}.md for locale ${locale}`);
  }
  return response.text();
}

export async function getContentSlugs(): Promise<string[]> {
    // For a static site, we can't read the directory.
    // We have to know the file names in advance.
    return ['eula', 'privacy-policy', 'terms-of-service'];
}


export async function getAllDocuments(locale: Locale): Promise<LegalDocument[]> {
  const slugs = await getContentSlugs();

  const documents = await Promise.all(
    slugs.map(async (slug) => {
      const fileContents = await fetchContent(locale, slug);
      const matterResult = matter(fileContents);
      const { title, icon, summary } = matterResult.data;

      return {
        id: slug,
        title: title || 'Untitled',
        icon: ICONS[icon] || FileText,
        summary: summary || '',
      };
    })
  );

  return documents;
}

export async function getDocumentBySlug(
  locale: Locale,
  slug: string
): Promise<LegalDocument | null> {
  try {
    const fileContents = await fetchContent(locale, slug);
    const matterResult = matter(fileContents);
    const { title, icon, summary } = matterResult.data;

    const processedContent = await remark()
      .use(html)
      .process(matterResult.content);
    const content = processedContent.toString();

    return {
      id: slug,
      title,
      icon: ICONS[icon] || FileText,
      summary,
      content,
    };
  } catch (error) {
    console.error(`Error fetching document ${slug} for locale ${locale}:`, error);
    return null;
  }
}

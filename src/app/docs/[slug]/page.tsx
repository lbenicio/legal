import { getContentSlugs } from '@/lib/server/documents';
import DocumentPageClient from './DocumentPageClient';

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

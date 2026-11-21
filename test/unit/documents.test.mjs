import assert from 'node:assert/strict';
import { afterEach, test } from 'node:test';
import { FileText, Gavel, Shield } from 'lucide-react';
import {
  getAllDocuments,
  getContentSlugs,
  getDocumentBySlug,
} from '../../src/lib/client/documents.ts';

const originalFetch = globalThis.fetch;
const originalConsoleError = console.error;

afterEach(() => {
  globalThis.fetch = originalFetch;
  console.error = originalConsoleError;
});

test('getContentSlugs returns the published document slugs', async () => {
  assert.deepEqual(await getContentSlugs(), [
    'eula',
    'privacy-policy',
    'terms-of-service',
    'apps-and-support',
  ]);
});

test('getAllDocuments parses metadata and falls back for unknown or missing metadata', async () => {
  const requestedUrls = [];
  globalThis.fetch = async (url) => {
    requestedUrls.push(String(url));
    const slug = String(url).split('/').at(-1).replace(/\.md$/, '');

    if (slug === 'eula') {
      return new Response(
        '---\ntitle: End User License\nicon: Gavel\nsummary: License terms\n---\n'
      );
    }
    if (slug === 'privacy-policy') {
      return new Response(
        '---\ntitle: Privacy\nicon: UnknownIcon\nsummary: Privacy details\n---\n'
      );
    }
    return new Response('---\n---\n');
  };

  const documents = await getAllDocuments('en');

  assert.deepEqual(
    documents.map(({ id }) => id),
    ['eula', 'privacy-policy', 'terms-of-service', 'apps-and-support']
  );
  assert.deepEqual(
    requestedUrls,
    documents.map(({ id }) => `/content/en/${id}.md`)
  );
  assert.equal(documents[0].title, 'End User License');
  assert.equal(documents[0].icon, Gavel);
  assert.equal(documents[0].summary, 'License terms');
  assert.equal(documents[1].icon, FileText);
  assert.equal(documents[2].title, 'Untitled');
  assert.equal(documents[2].icon, FileText);
  assert.equal(documents[2].summary, '');
  assert.equal(documents[3].icon, FileText);
});

test('getDocumentBySlug converts Markdown and uses the configured icon', async () => {
  globalThis.fetch = async () =>
    new Response(
      '---\ntitle: Privacy\nicon: Shield\nsummary: How data is handled\n---\n# Privacy\n\nRead the [policy](https://example.com/policy).'
    );

  const document = await getDocumentBySlug('pt-BR', 'privacy-policy');

  assert.equal(document.id, 'privacy-policy');
  assert.equal(document.title, 'Privacy');
  assert.equal(document.icon, Shield);
  assert.equal(document.summary, 'How data is handled');
  assert.match(document.content, /<h1>Privacy<\/h1>/);
  assert.match(
    document.content,
    /<a href="https:\/\/example\.com\/policy">policy<\/a>/
  );
});

test('getDocumentBySlug returns null when the content request fails', async () => {
  const loggedErrors = [];
  console.error = (...args) => loggedErrors.push(args);
  globalThis.fetch = async () => new Response('Missing', { status: 404 });

  assert.equal(await getDocumentBySlug('en', 'missing'), null);
  assert.equal(loggedErrors.length, 1);
  assert.match(
    loggedErrors[0][0],
    /Error fetching document missing for locale en/
  );
});

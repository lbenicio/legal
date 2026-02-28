# Architecture Overview

This document provides a high-level overview of the architecture for the Legal Clarity application.

## Core Technology Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Content**: Markdown with gray-matter for frontmatter parsing

## Key Architectural Decisions

### 1. Static Site Generation (SSG) with Client-Side Rendering (CSR)

The application is configured for static export (`output: 'export'` in `next.config.ts`). This produces a set of static HTML, CSS, and JavaScript files in the `out/` directory, suitable for any static hosting provider (e.g., GitHub Pages, Vercel, Netlify).

To support multilingual content without language prefixes in the URL (e.g., `/en/`, `/es/`), the application operates as a Single-Page Application (SPA) after the initial load.

- **Initial Load**: The browser loads a static HTML shell.
- **Client-Side Logic**: All pages are designated as Client Components (`'use client';`).
- **Dynamic Content Fetching**: Upon loading, React components use `useEffect` hooks to:
    1.  Read the current language preference from a browser cookie (`NEXT_LOCALE`).
    2.  Fetch the appropriate dictionary file (e.g., `/dictionaries/en.json`).
    3.  Fetch the markdown content files for the selected language (e.g., `/content/en/terms-of-service.md`).
- **Rendering**: The components then render the page dynamically using the fetched content.

This "static SPA" or "shell" model provides the benefits of static hosting (fast, cheap, scalable) while enabling a dynamic, cookie-based user experience for language selection.

### 2. Content Management

All legal document content is managed as Markdown files located in `src/content/`.

- **Directory Structure**: Content is organized by locale:
  ```
  src/content/
  ├── en/
  │   ├── eula.md
  │   └── privacy-policy.md
  └── es/
      ├── eula.md
      └── privacy-policy.md
  ```
- **Frontmatter**: Each Markdown file uses YAML frontmatter to store metadata:
  - `title`: The document's title.
  - `icon`: The name of a `lucide-react` icon to associate with the document.
  - `summary`: A short description for display on the homepage.
- **Dynamic Loading**: Client-side logic fetches and parses these files to populate the document list on the homepage and render the full content on document pages.

### 3. User Interface Text (i18n)

Static UI text (e.g., button labels, page titles, error messages) is managed separately from the document content.

- **Dictionary Files**: JSON files in `src/dictionaries/` store key-value pairs for each supported language.
- **Client-Side Loading**: The `getDictionary` function fetches the appropriate JSON dictionary based on the locale cookie. Components use this dictionary to render UI text in the correct language.

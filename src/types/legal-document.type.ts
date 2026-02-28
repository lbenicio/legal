import type { ComponentType } from 'react';

export interface LegalDocument {
  id: string;
  title: string;
  icon: ComponentType<{ className?: string }>;
  summary: string;
  content?: string;
}

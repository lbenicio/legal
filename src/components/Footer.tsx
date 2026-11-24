import Link from 'next/link';
import { siGithub, siX } from 'simple-icons';
import { MessageCircle } from 'lucide-react';
import { Button } from './ui/button';

function BrandIcon({ path }: { path: string }) {
  return (
    <svg
      aria-hidden='true'
      className='h-5 w-5'
      fill='currentColor'
      viewBox='0 0 24 24'
    >
      <path d={path} />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className='bg-card mt-auto border-t'>
      <div className='container mx-auto flex items-center justify-between p-4 sm:p-6'>
        <p className='text-muted-foreground text-sm'>
          © {new Date().getFullYear()} Leonardo Benicio. All rights reserved.
        </p>
        <div className='flex items-center gap-2'>
          <Button variant='ghost' size='icon' asChild>
            <Link href='https://x.com/lbenicio_' aria-label='X'>
              <BrandIcon path={siX.path} />
            </Link>
          </Button>
          <Button variant='ghost' size='icon' asChild>
            <Link href='https://github.com/lbenicio' aria-label='GitHub'>
              <BrandIcon path={siGithub.path} />
            </Link>
          </Button>
          <Button variant='ghost' size='icon' asChild>
            <Link href='https://lbenicio.dev/contact/' aria-label='Contact'>
              <MessageCircle className='h-5 w-5' />
            </Link>
          </Button>
        </div>
      </div>
    </footer>
  );
}

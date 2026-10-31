import Link from 'next/link';
import { Github, Twitter, MessageCircle } from 'lucide-react';
import { Button } from './ui/button';

export function Footer() {
  return (
    <footer className='bg-card mt-auto border-t'>
      <div className='container mx-auto flex items-center justify-between p-4 sm:p-6'>
        <p className='text-muted-foreground text-sm'>
          © {new Date().getFullYear()} Leonardo Benicio. All rights reserved.
        </p>
        <div className='flex items-center gap-2'>
          <Button variant='ghost' size='icon' asChild>
            <Link href='https://twitter.com/lbenicio_' aria-label='Twitter'>
              <Twitter className='h-5 w-5' />
            </Link>
          </Button>
          <Button variant='ghost' size='icon' asChild>
            <Link href='https://github.com/lbenicio' aria-label='GitHub'>
              <Github className='h-5 w-5' />
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

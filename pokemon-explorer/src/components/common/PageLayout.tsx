import { ReactNode } from 'react';
import { Header } from '@/components/header/Header';
import { cn } from '@/lib/utils/formatting/cn';

interface PageLayoutProps {
  children: ReactNode;
  headerContent?: ReactNode;
  className?: string;
  mainClassName?: string;
}

export function PageLayout({ children, headerContent, className, mainClassName }: PageLayoutProps) {
  return (
    <div className={cn('min-h-screen bg-white', className)}>
      <div className="sticky top-0 z-40 bg-white">
        <Header />
        {headerContent && <div className="container mx-auto px-4 py-4">{headerContent}</div>}
      </div>

      <main className={cn('container mx-auto px-4 py-8 sm:py-12 md:py-16', mainClassName)}>{children}</main>
    </div>
  );
}

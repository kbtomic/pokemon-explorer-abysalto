import { cn } from '@/lib/utils/cn';

interface PaginationContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function PaginationContainer({ children, className }: PaginationContainerProps) {
  return (
    <div className={cn('flex items-center justify-center space-x-2 mt-12 sm:mt-10 md:mt-8 w-full max-w-full overflow-hidden', className)}>
      {children}
    </div>
  );
}

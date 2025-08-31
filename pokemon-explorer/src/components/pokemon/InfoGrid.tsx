import { ReactNode } from 'react';

interface InfoGridProps {
  children: ReactNode;
  className?: string;
}

export function InfoGrid({ children, className = '' }: InfoGridProps) {
  return (
    <div className={`grid grid-cols-2 gap-3 ${className}`}>
      {children}
    </div>
  );
}

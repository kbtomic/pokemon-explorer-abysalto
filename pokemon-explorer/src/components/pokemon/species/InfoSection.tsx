import { ReactNode } from 'react';

interface InfoSectionProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export function InfoSection({ title, children, className = '' }: InfoSectionProps) {
  return (
    <div className={className}>
      <h3 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2">{title}</h3>
      {children}
    </div>
  );
}

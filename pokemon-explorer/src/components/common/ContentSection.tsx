import { ReactNode } from 'react';

interface ContentSectionProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export function ContentSection({ title, children, className = '' }: ContentSectionProps) {
  return (
    <div className={`mb-6 ${className}`}>
      <h3 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">{title}</h3>
      {children}
    </div>
  );
}

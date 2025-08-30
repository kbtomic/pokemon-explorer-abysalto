import { ReactNode } from 'react';

interface ContentSectionProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export function ContentSection({ title, children, className = '' }: ContentSectionProps) {
  return (
    <div className={`mb-6 ${className}`}>
      <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
      {children}
    </div>
  );
}

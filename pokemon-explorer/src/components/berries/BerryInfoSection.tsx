import { ReactNode } from 'react';

interface BerryInfoSectionProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export function BerryInfoSection({ title, children, className = '' }: BerryInfoSectionProps) {
  return (
    <div className={className}>
      <h3 className="text-xl font-semibold mb-4 text-white">{title}</h3>
      {children}
    </div>
  );
}

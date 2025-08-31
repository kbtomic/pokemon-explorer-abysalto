import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'red' | 'pink' | 'yellow' | 'purple';
  className?: string;
}

export function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  const variantClasses = {
    default: 'bg-gray-100 text-gray-800 border-gray-200',
    red: 'bg-red-100 text-red-800 border-red-200',
    pink: 'bg-pink-100 text-pink-800 border-pink-200',
    yellow: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    purple: 'bg-purple-100 text-purple-800 border-purple-200',
  };

  return <span className={`px-3 py-1 text-sm rounded-full border ${variantClasses[variant]} ${className}`}>{children}</span>;
}

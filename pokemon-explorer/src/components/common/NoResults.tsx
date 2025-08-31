'use client';

import { Button } from '@/components/ui/button';
import { ButtonVariant } from '@/lib/constants/enums';
import { cn } from '@/lib/utils/formatting/cn';

interface NoResultsProps {
  icon?: string | React.ReactNode;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
  };
  className?: string;
}

export function NoResults({ icon = '🔍', title, description, action, className }: NoResultsProps) {
  return (
    <div className={cn('text-center py-12', className)}>
      <div className="text-4xl sm:text-6xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      {action && (
        <Button onClick={action.onClick} variant={ButtonVariant.OUTLINE} className="inline-flex items-center gap-2">
          {action.icon}
          {action.label}
        </Button>
      )}
    </div>
  );
}

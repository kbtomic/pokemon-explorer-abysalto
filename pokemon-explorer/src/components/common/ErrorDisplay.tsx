'use client';

import { Button } from '@/components/ui/button';
import { ButtonVariant } from '@/lib/constants/enums';

interface ErrorDisplayProps {
  title: string;
  message: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorDisplay({ title, message, onRetry, className }: ErrorDisplayProps) {
  return (
    <div className={`min-h-screen bg-white ${className || ''}`}>
      <div className="container mx-auto px-4 py-8 sm:py-12 md:py-16">
        <div className="text-center">
          <div className="text-4xl sm:text-6xl mb-4">⚠️</div>
          <h2 className="text-xl sm:text-2xl font-bold text-red-600 mb-2">{title}</h2>
          <p className="text-sm sm:text-base text-red-500 mb-4">{message}</p>
          {onRetry && (
            <Button
              onClick={onRetry}
              variant={ButtonVariant.DEFAULT}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              Try Again
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

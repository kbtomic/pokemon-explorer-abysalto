'use client';

import { ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils/formatting/cn';
import { useScrollToTop } from '@/lib/hooks/ui/useScrollToTop';

interface ScrollToTopButtonProps {
  className?: string;
  threshold?: number;
  smooth?: boolean;
}

export function ScrollToTopButton({ className, threshold = 300, smooth = true }: ScrollToTopButtonProps) {
  const { isVisible, scrollToTop } = useScrollToTop({ threshold, smooth });

  const handleClick = () => {
    scrollToTop();
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      scrollToTop();
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <button
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={cn(
        'fixed bottom-6 right-6',
        'w-12 h-12 rounded-full',
        'bg-gradient-to-r from-red-600 to-red-700 text-white',
        'shadow-lg hover:shadow-xl',
        'hover:from-red-700 hover:to-red-800',
        'transform hover:scale-105 active:scale-95',
        'transition-all duration-200 ease-in-out',
        'focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2',
        'flex items-center justify-center',
        className
      )}
      aria-label="Scroll to top"
      title="Scroll to top"
    >
      <ChevronUp className="w-6 h-6" />
    </button>
  );
}

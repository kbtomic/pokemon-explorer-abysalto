import { useState, useEffect, useCallback } from 'react';

interface UseScrollToTopOptions {
  threshold?: number;
  smooth?: boolean;
}

export function useScrollToTop(options: UseScrollToTopOptions = {}) {
  const { threshold = 300, smooth = true } = options;
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = useCallback(() => {
    if (smooth) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    } else {
      window.scrollTo(0, 0);
    }
  }, [smooth]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsVisible(scrollY > threshold);
    };

    // Add event listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Check initial scroll position
    handleScroll();

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [threshold]);

  return {
    isVisible,
    scrollToTop,
  };
}

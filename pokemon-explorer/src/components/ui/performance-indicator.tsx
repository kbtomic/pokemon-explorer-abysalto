'use client';

import { useState, useEffect } from 'react';
import { Zap } from 'lucide-react';

interface PerformanceIndicatorProps {
  isVirtualized: boolean;
  itemCount: number;
  threshold: number;
}

export function PerformanceIndicator({ isVirtualized, itemCount }: PerformanceIndicatorProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isVirtualized) {
      setIsVisible(true);
      const timer = setTimeout(() => setIsVisible(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isVirtualized]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-green-500 text-white px-3 py-2 rounded-lg shadow-lg z-50 animate-in slide-in-from-bottom-2 duration-300">
      <div className="flex items-center space-x-2">
        <Zap className="h-4 w-4" />
        <span className="text-sm font-medium">Performance mode active ({itemCount} items)</span>
      </div>
    </div>
  );
}

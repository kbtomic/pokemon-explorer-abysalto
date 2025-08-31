import { useState, useEffect } from 'react';

interface PerformanceConfig {
  useVirtualization: boolean;
  virtualizationThreshold: number;
  mobileVirtualizationThreshold: number;
}

export function usePerformanceOptimization(itemCount: number): PerformanceConfig {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Determine virtualization thresholds based on device type
  const virtualizationThreshold = isMobile ? 50 : isTablet ? 75 : 100;
  const mobileVirtualizationThreshold = 30;

  // Use virtualization when there are many items or on mobile devices
  const useVirtualization = itemCount > virtualizationThreshold || (isMobile && itemCount > mobileVirtualizationThreshold);

  return {
    useVirtualization,
    virtualizationThreshold,
    mobileVirtualizationThreshold,
  };
}

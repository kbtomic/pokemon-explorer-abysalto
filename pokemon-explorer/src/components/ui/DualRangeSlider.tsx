'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

interface DualRangeSliderProps {
  min: number;
  max: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  className?: string;
}

export function DualRangeSlider({ min, max, value, onChange, className = '' }: DualRangeSliderProps) {
  const [isDragging, setIsDragging] = useState<'min' | 'max' | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const getPercentage = (val: number) => ((val - min) / (max - min)) * 100;

  const handleMouseDown = (e: React.MouseEvent, handle: 'min' | 'max') => {
    e.preventDefault();
    setIsDragging(handle);
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging || !sliderRef.current) return;

      const rect = sliderRef.current.getBoundingClientRect();
      const percentage = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
      const newValue = Math.round((percentage / 100) * (max - min) + min);

      if (isDragging === 'min') {
        const newMin = Math.min(newValue, value[1] - 1);
        onChange([newMin, value[1]]);
      } else {
        const newMax = Math.max(newValue, value[0] + 1);
        onChange([value[0], newMax]);
      }
    },
    [isDragging, max, min, value, onChange]
  );

  const handleMouseUp = () => {
    setIsDragging(null);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, value]);

  const minPercentage = getPercentage(value[0]);
  const maxPercentage = getPercentage(value[1]);

  return (
    <div className={`relative ${className}`}>
      {/* Track */}
      <div ref={sliderRef} className="relative h-2 bg-gray-200 rounded-lg cursor-pointer">
        {/* Selected range */}
        <div
          className="absolute h-full bg-red-500 rounded-lg"
          style={{
            left: `${minPercentage}%`,
            width: `${maxPercentage - minPercentage}%`,
          }}
        />

        {/* Min handle */}
        <div
          className="absolute top-1/2 w-4 h-4 bg-white border-2 border-red-500 rounded-full cursor-pointer transform -translate-y-1/2 -translate-x-1/2 shadow-md hover:shadow-lg transition-shadow duration-200"
          style={{ left: `${minPercentage}%` }}
          onMouseDown={e => handleMouseDown(e, 'min')}
        />

        {/* Max handle */}
        <div
          className="absolute top-1/2 w-4 h-4 bg-white border-2 border-red-500 rounded-full cursor-pointer transform -translate-y-1/2 -translate-x-1/2 shadow-md hover:shadow-lg transition-shadow duration-200"
          style={{ left: `${maxPercentage}%` }}
          onMouseDown={e => handleMouseDown(e, 'max')}
        />
      </div>
    </div>
  );
}

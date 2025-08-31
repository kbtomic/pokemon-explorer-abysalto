import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils/formatting/cn';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  fallbackSrc?: string;
  fallbackAlt?: string;
  fallbackWidth?: number;
  fallbackHeight?: number;
  className?: string;
  fallbackClassName?: string;
  priority?: boolean;
  loading?: 'lazy' | 'eager';
  onError?: () => void;
}

export function ImageWithFallback({
  src,
  alt,
  width,
  height,
  fallbackSrc = '/favicon.svg',
  fallbackAlt = 'Pokemon Explorer',
  fallbackWidth,
  fallbackHeight,
  className,
  fallbackClassName = 'object-contain opacity-60',
  priority = false,
  loading = 'lazy',
  onError,
}: ImageWithFallbackProps) {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
    onError?.();
  };

  const shouldShowFallback = !src || imageError;

  const finalFallbackWidth = fallbackWidth || width * 0.6;
  const finalFallbackHeight = fallbackHeight || height * 0.6;

  return (
    <>
      {shouldShowFallback ? (
        <Image
          src={fallbackSrc}
          alt={fallbackAlt}
          width={finalFallbackWidth}
          height={finalFallbackHeight}
          className={cn(fallbackClassName)}
          priority={priority}
          {...(priority ? {} : { loading })}
        />
      ) : (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={cn(className)}
          priority={priority}
          {...(priority ? {} : { loading })}
          onError={handleImageError}
        />
      )}
    </>
  );
}

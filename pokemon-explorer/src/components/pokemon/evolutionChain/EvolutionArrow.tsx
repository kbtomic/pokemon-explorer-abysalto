import { cn } from '@/lib/utils';

interface EvolutionArrowProps {
  className?: string;
}

export function EvolutionArrow({ className = '' }: EvolutionArrowProps) {
  return <div className={cn('text-xs text-gray-500', className)}>↓</div>;
}

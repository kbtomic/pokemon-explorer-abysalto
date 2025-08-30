'use client';

import { Button } from '@/components/ui/button';
import { usePokemonStore } from '@/lib/stores/pokemonStore';
import { useActiveFilters } from '@/lib/hooks/useActiveFilters';
import { RotateCcw } from 'lucide-react';
import { ButtonSize, ButtonVariant } from '@/lib/constants/enums';

interface ClearAllButtonProps {
  size?: ButtonSize;
  variant?: ButtonVariant;
  className?: string;
  alwaysVisible?: boolean;
}

export function ClearAllButton({
  size = ButtonSize.SM,
  variant = ButtonVariant.OUTLINE,
  className = '',
  alwaysVisible = false,
}: ClearAllButtonProps) {
  const clearFilters = usePokemonStore(state => state.clearFilters);
  const hasActiveFilters = useActiveFilters();

  const baseClasses = 'flex items-center space-x-2 transition-opacity duration-200';
  const conditionalClasses = alwaysVisible ? '' : hasActiveFilters ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none';

  return (
    <Button variant={variant} size={size} onClick={clearFilters} className={`${baseClasses} ${conditionalClasses} ${className}`}>
      <RotateCcw className="h-4 w-4" />
      <span>Clear All</span>
    </Button>
  );
}

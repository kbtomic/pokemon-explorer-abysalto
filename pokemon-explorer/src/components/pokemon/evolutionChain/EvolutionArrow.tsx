interface EvolutionArrowProps {
  className?: string;
}

export function EvolutionArrow({ className = '' }: EvolutionArrowProps) {
  return <div className={`text-xs text-gray-500 dark:text-gray-400 ${className}`}>↓</div>;
}

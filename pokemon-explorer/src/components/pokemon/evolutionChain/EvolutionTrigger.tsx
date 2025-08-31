import { EvolutionDetail } from '@/types/pokemon/evolution';
import { formatEvolutionTrigger } from '@/lib/utils/pokemon/evolutionUtils';

interface EvolutionTriggerProps {
  detail: EvolutionDetail;
  className?: string;
}

export function EvolutionTrigger({ detail, className = '' }: EvolutionTriggerProps) {
  const triggerText = formatEvolutionTrigger(detail);

  return <div className={`text-xs text-gray-600 text-center ${className}`}>{triggerText}</div>;
}

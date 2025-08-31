import { useRef } from 'react';
import { Card } from '@/components/ui/card';
import { handleEnterOrSpace } from '@/lib/utils/interaction/keyboard';

interface PokemonCardContainerProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
}

export function PokemonCardContainer({ children, onClick, className = '' }: PokemonCardContainerProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <Card
      ref={cardRef}
      tabIndex={0}
      data-testid="pokemon-card"
      className={`group cursor-pointer transition-all duration-500 ease-out hover:scale-[1.03] hover:shadow-2xl bg-gradient-to-br from-red-500 to-red-600 border-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-inset relative overflow-hidden ${className}`}
      onClick={onClick}
      onKeyDown={event => handleEnterOrSpace(event, onClick)}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-red-400/20 via-red-300/10 to-red-200/30 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out" />
      <div className="absolute inset-0 bg-gradient-to-tl from-red-600/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out delay-100" />
      {children}
    </Card>
  );
}

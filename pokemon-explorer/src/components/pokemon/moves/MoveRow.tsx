import { PokemonMove, Move } from '@/types';
import { formatPokemonName } from '@/lib/utils';
import { useLearningInfo } from '@/lib/hooks/useLearningInfo';
import { MoveRowSkeleton } from '@/components/pokemon/moves/MoveRowSkeleton';
import { MoveNameCell } from '@/components/pokemon/moves/MoveNameCell';
import { MoveTypeCell } from '@/components/pokemon/moves/MoveTypeCell';
import { MoveValueCell } from '@/components/pokemon/moves/MoveValueCell';
import { LearningInfoCell } from '@/components/pokemon/moves/LearningInfoCell';
import { DamageClassCell } from '@/components/pokemon/moves/DamageClassCell';

interface MoveRowProps {
  pokemonMove: PokemonMove;
  moveData?: Move;
  isLoading: boolean;
}

export function MoveRow({ pokemonMove, moveData, isLoading }: MoveRowProps) {
  const moveName = formatPokemonName(pokemonMove.move.name);
  const learningInfo = useLearningInfo(pokemonMove);

  if (isLoading) {
    return <MoveRowSkeleton />;
  }

  return (
    <tr className="border-b border-gray-200">
      <MoveNameCell moveName={moveName} moveId={moveData?.id} />
      <MoveTypeCell typeName={moveData?.type?.name} />
      <MoveValueCell value={moveData?.power} fallback="—" />
      <MoveValueCell value={moveData?.accuracy} fallback="—" />
      <MoveValueCell value={moveData?.pp} fallback="???" />
      <LearningInfoCell learningInfo={learningInfo} />
      <DamageClassCell damageClassName={moveData?.damage_class?.name} />
    </tr>
  );
}

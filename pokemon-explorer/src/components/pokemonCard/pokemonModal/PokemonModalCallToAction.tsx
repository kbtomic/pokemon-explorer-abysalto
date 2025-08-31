import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ExternalLink, Info } from 'lucide-react';
import { Pokemon } from '@/types/pokemon/core';

interface PokemonModalCallToActionProps {
  pokemon: Pokemon;
  onClose: () => void;
}

export function PokemonModalCallToAction({ pokemon, onClose }: PokemonModalCallToActionProps) {
  return (
    <div className="bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/30 shadow-lg flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-white/20 rounded-full">
          <Info className="w-5 h-5 text-white" />
        </div>
        <span className="text-white font-medium">Want to see detailed information about this Pokemon?</span>
      </div>
      <Link href={`/pokemon/${pokemon.id}`}>
        <Button
          onClick={onClose}
          className="inline-flex items-center gap-3 bg-white text-red-600 hover:bg-red-50 font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          <span>View Details</span>
          <ExternalLink className="w-4 h-4" />
        </Button>
      </Link>
    </div>
  );
}

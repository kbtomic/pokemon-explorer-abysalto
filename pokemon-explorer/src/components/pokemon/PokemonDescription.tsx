interface PokemonDescriptionProps {
  description: string;
}

export function PokemonDescription({ description }: PokemonDescriptionProps) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
      <p className="text-lg text-gray-700 leading-relaxed italic border-l-4 border-red-200 pl-4">&ldquo;{description}&rdquo;</p>
    </div>
  );
}

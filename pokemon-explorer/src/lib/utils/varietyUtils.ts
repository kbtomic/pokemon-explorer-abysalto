export const getPokemonIdFromVarietyUrl = (url: string): number => {
  return parseInt(url.split('/').slice(-2)[0]);
};

export const isCurrentPokemon = (pokemonId: number, currentPokemonId: number): boolean => {
  return pokemonId === currentPokemonId;
};

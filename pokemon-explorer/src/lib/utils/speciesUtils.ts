export const formatGeneration = (generation: { name: string } | null): string => {
  if (!generation) return 'Unknown';
  return generation.name.replace('generation-', '').toUpperCase();
};

export const formatHabitat = (habitat: { name: string } | null): string => {
  if (!habitat) return 'Unknown';
  return habitat.name.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
};

export const formatShape = (shape: { name: string } | null): string => {
  if (!shape) return 'Unknown';
  return shape.name.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
};

export const formatColor = (color: { name: string } | null): string => {
  if (!color) return 'Unknown';
  return color.name.replace(/\b\w/g, l => l.toUpperCase());
};

export const formatGenderRate = (genderRate: number): string => {
  if (genderRate === -1) return 'Genderless';
  const femalePercentage = (genderRate / 8) * 100;
  const malePercentage = 100 - femalePercentage;
  return `${malePercentage.toFixed(1)}% Male, ${femalePercentage.toFixed(1)}% Female`;
};

export const formatEggGroup = (eggGroupName: string): string => {
  return eggGroupName.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
};

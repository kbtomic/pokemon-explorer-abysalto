import type { BerryBasic } from '@/types/pokemon';

// Filter berries by search term
export function filterBerriesBySearch(berries: BerryBasic[], searchTerm: string): BerryBasic[] {
  if (!searchTerm.trim()) return berries;

  const term = searchTerm.toLowerCase().trim();
  return berries.filter(berry => berry.name.toLowerCase().includes(term));
}

// Get berry image URL
export function getBerryImageUrl(berryName: string): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${berryName}-berry.png`;
}

// Format berry name for display
export function formatBerryName(name: string): string {
  return name.replace(/-/g, ' ');
}

// Get flavor icon based on flavor name
export function getFlavorIcon(flavorName: string): string {
  const flavorIcons: Record<string, string> = {
    spicy: '🔥',
    sweet: '💖',
    sour: '💧',
    bitter: '🛡️',
    dry: '⚡',
  };

  return flavorIcons[flavorName] || '🌿';
}

// Calculate berries needed for pagination
export function calculateBerriesNeeded(currentBerries: number, currentPage: number, itemsPerPage: number): number {
  const totalPagesNeeded = Math.ceil((currentPage * itemsPerPage) / itemsPerPage);
  return totalPagesNeeded * itemsPerPage;
}

// Check if more berries are needed for current page
export function needsMoreBerries(currentBerries: number, currentPage: number, itemsPerPage: number, totalPagesNeeded: number): boolean {
  const berriesNeeded = totalPagesNeeded * itemsPerPage;
  return berriesNeeded > currentBerries;
}

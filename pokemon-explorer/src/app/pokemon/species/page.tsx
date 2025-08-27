'use client';

import { useState, useEffect } from 'react';
import {
  usePokemonSpeciesListPaginated,
  usePokemonSpeciesBatchChunked,
  usePokemonHabitats,
  usePokemonShapes,
  usePokemonColors,
} from '@/lib/hooks/use-pokemon-species';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { formatPokemonName } from '@/lib/utils';
import { pokeAPI } from '@/lib/api/pokeapi';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown, Loader2 } from 'lucide-react';

const BATCH_SIZE = 50;

interface SpeciesCardProps {
  species: {
    name: string;
    url?: string;
    id?: number;
    habitat?: {
      name: string;
    };
    shape?: {
      name: string;
    };
    color?: {
      name: string;
    };
  };
}

function SpeciesCard({ species }: SpeciesCardProps) {
  const [pokemonId, setPokemonId] = useState<number | null>(null);

  // Extract Pokemon ID from URL or use direct ID
  useEffect(() => {
    if (species.id) {
      setPokemonId(species.id);
    } else if (species.url) {
      const id = pokeAPI.extractIdFromUrl(species.url);
      setPokemonId(id);
    }
  }, [species.url, species.id]);

  if (!pokemonId || !species.name) return null;

  return (
    <Link href={`/pokemon/${pokemonId}`}>
      <Card className="cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border-gray-200 dark:border-gray-700">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded-full">
              #{pokemonId.toString().padStart(3, '0')}
            </span>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex flex-col items-center space-y-4">
            {/* Pokemon Image */}
            <div className="relative w-28 h-28 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-full p-2 shadow-inner">
              <Image
                src={pokeAPI.getPokemonImageUrl(pokemonId)}
                alt={`${species.name} official artwork`}
                width={112}
                height={112}
                className="object-contain drop-shadow-sm"
                loading="lazy"
              />
            </div>

            {/* Pokemon Name */}
            <div className="text-center">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white capitalize tracking-wide">
                {formatPokemonName(species.name)}
              </h3>

              {/* Species Details */}
              <div className="mt-2 space-y-1">
                {species.habitat && (
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    <span className="font-medium">Habitat:</span> {species.habitat.name}
                  </div>
                )}
                {species.shape && (
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    <span className="font-medium">Shape:</span> {species.shape.name}
                  </div>
                )}
                {species.color && (
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    <span className="font-medium">Color:</span> {species.color.name}
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export default function PokemonSpeciesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedHabitat, setSelectedHabitat] = useState<string>('');
  const [selectedShape, setSelectedShape] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('id');
  const [loadedSpecies, setLoadedSpecies] = useState<any[]>([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Fetch paginated species list
  const {
    data: speciesListResponse,
    isLoading: isLoadingList,
    error: listError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = usePokemonSpeciesListPaginated(BATCH_SIZE);

  // Extract all species names from paginated data
  const allSpeciesNames = speciesListResponse?.pages.flatMap(page => page.results.map(s => s.name)) || [];

  // Load species details in chunks
  const {
    data: speciesData,
    isLoading: isLoadingSpecies,
    error: speciesError,
  } = usePokemonSpeciesBatchChunked(allSpeciesNames, BATCH_SIZE);

  // Update loaded species when new data arrives
  useEffect(() => {
    if (speciesData) {
      setLoadedSpecies(speciesData);
    }
  }, [speciesData]);

  // Fetch filter data
  const { data: habitats } = usePokemonHabitats();
  const { data: shapes } = usePokemonShapes();
  const { data: colors } = usePokemonColors();

  // Load more species
  const handleLoadMore = async () => {
    if (hasNextPage && !isFetchingNextPage) {
      setIsLoadingMore(true);
      await fetchNextPage();
      setIsLoadingMore(false);
    }
  };

  // Filter species based on search and filters
  const filteredSpecies = loadedSpecies.filter(species => {
    // Search filter
    const matchesSearch = species.name.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;

    // Habitat filter
    if (selectedHabitat && species.habitat?.name !== selectedHabitat) {
      return false;
    }

    // Shape filter
    if (selectedShape && species.shape?.name !== selectedShape) {
      return false;
    }

    // Color filter
    if (selectedColor && species.color?.name !== selectedColor) {
      return false;
    }

    return true;
  });

  // Sort filtered species
  const sortedSpecies = [...filteredSpecies].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'name-desc':
        return b.name.localeCompare(a.name);
      case 'id':
        return a.id - b.id;
      case 'id-desc':
        return b.id - a.id;
      case 'habitat':
        return (a.habitat?.name || '').localeCompare(b.habitat?.name || '');
      case 'shape':
        return (a.shape?.name || '').localeCompare(b.shape?.name || '');
      case 'color':
        return (a.color?.name || '').localeCompare(b.color?.name || '');
      default:
        return a.id - b.id;
    }
  });

  const isLoading = isLoadingList || isLoadingSpecies || isFetchingNextPage;
  const error = listError || speciesError;

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Pokemon Species</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{error instanceof Error ? error.message : 'An unknown error occurred'}</p>
          <button onClick={() => window.location.reload()} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Pokemon Species Database</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Explore {speciesListResponse?.pages[0]?.count || 0} Pokemon species with detailed information about their habitats, shapes, and
          characteristics.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Search Pokemon species..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 text-sm"
            >
              <option value="id">Sort by ID</option>
              <option value="id-desc">Sort by ID (Desc)</option>
              <option value="name">Sort by Name (A-Z)</option>
              <option value="name-desc">Sort by Name (Z-A)</option>
              <option value="habitat">Sort by Habitat</option>
              <option value="shape">Sort by Shape</option>
              <option value="color">Sort by Color</option>
            </select>
            {(searchQuery || selectedHabitat || selectedShape || selectedColor) && (
              <Button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedHabitat('');
                  setSelectedShape('');
                  setSelectedColor('');
                }}
                variant="outline"
                className="whitespace-nowrap"
              >
                Clear Filters
              </Button>
            )}
          </div>
        </div>

        {/* Filter Summary */}
        {(searchQuery || selectedHabitat || selectedShape || selectedColor) && (
          <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
            <div className="flex items-center gap-2 text-sm text-blue-800 dark:text-blue-200">
              <span className="font-medium">Active Filters:</span>
              {searchQuery && <span className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded text-xs">Search: "{searchQuery}"</span>}
              {selectedHabitat && (
                <span className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded text-xs">Habitat: {selectedHabitat}</span>
              )}
              {selectedShape && <span className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded text-xs">Shape: {selectedShape}</span>}
              {selectedColor && <span className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded text-xs">Color: {selectedColor}</span>}
            </div>
          </div>
        )}

        {/* Filter Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Habitat</label>
            <select
              value={selectedHabitat}
              onChange={e => setSelectedHabitat(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600"
            >
              <option value="">All Habitats</option>
              {habitats?.results.map(habitat => (
                <option key={habitat.name} value={habitat.name}>
                  {habitat.name.charAt(0).toUpperCase() + habitat.name.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Shape</label>
            <select
              value={selectedShape}
              onChange={e => setSelectedShape(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600"
            >
              <option value="">All Shapes</option>
              {shapes?.results.map(shape => (
                <option key={shape.name} value={shape.name}>
                  {shape.name.charAt(0).toUpperCase() + shape.name.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Color</label>
            <select
              value={selectedColor}
              onChange={e => setSelectedColor(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600"
            >
              <option value="">All Colors</option>
              {colors?.results.map(color => (
                <option key={color.name} value={color.name}>
                  {color.name.charAt(0).toUpperCase() + color.name.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading Pokemon species...</p>
        </div>
      )}

      {/* Results */}
      {!isLoading && (
        <div>
          <div className="mb-4">
            <div className="flex items-center justify-between">
              <p className="text-gray-600 dark:text-gray-400">
                {isLoading ? 'Loading...' : `${sortedSpecies.length} species found`}
                {speciesListResponse && (
                  <span className="ml-2 text-xs">
                    (Loaded {allSpeciesNames.length} of {speciesListResponse.pages[0]?.count || 0})
                  </span>
                )}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {sortedSpecies.map(species => (
              <SpeciesCard key={species.name} species={species} />
            ))}
          </div>

          {/* Load More Button */}
          {hasNextPage && (
            <div className="mt-8 text-center">
              <Button
                onClick={handleLoadMore}
                disabled={isFetchingNextPage || isLoadingMore}
                className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isFetchingNextPage || isLoadingMore ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Loading...
                  </>
                ) : (
                  <>
                    Load More Species
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          )}

          {sortedSpecies.length === 0 && !isLoading && (
            <div className="text-center py-8">
              <p className="text-gray-600 dark:text-gray-400">No Pokemon species found matching your criteria.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

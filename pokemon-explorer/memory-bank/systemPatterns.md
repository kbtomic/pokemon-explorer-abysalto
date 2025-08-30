# System Patterns - Pokemon Explorer

## Architecture Overview

### **Modern React/Next.js Application Architecture**

The Pokemon Explorer follows a **component-based, feature-driven architecture** with clear separation of concerns and modern React patterns.

## Core Architecture Patterns

### **1. App Router Architecture (Next.js 15)**

```
app/
├── (auth)/                    # Route groups for organization
├── (dashboard)/
├── api/                       # API routes
├── components/                # Shared components
├── lib/                       # Utilities and configurations
├── types/                     # TypeScript type definitions
├── globals.css               # Global styles
├── layout.tsx                # Root layout
└── page.tsx                  # Home page
```

**Key Patterns:**

- **File-based routing** with app directory
- **Server and Client Components** separation
- **Layout composition** for shared UI
- **Route groups** for logical organization

### **2. Component Architecture**

#### **Atomic Design Pattern**

```
components/
├── ui/                        # Atomic components (Button, Input, Card)
│   ├── button.tsx
│   ├── input.tsx
│   ├── card.tsx
│   └── modal.tsx
├── pokemon/                   # Feature-specific components
│   ├── pokemon-card.tsx
│   ├── pokemon-grid.tsx
│   ├── pokemon-modal.tsx
│   └── filters-bar.tsx
└── layout/                    # Layout components
    ├── header.tsx
    └── footer.tsx
```

#### **Component Composition Pattern**

```typescript
// Parent component composes child components
<PokemonGrid>
  <PokemonCard />
  <PokemonCard />
  <PokemonCard />
</PokemonGrid>
```

### **3. State Management Architecture**

#### **Zustand Store Pattern**

```typescript
// Centralized state management
interface PokemonStore {
  pokemonList: Pokemon[];
  filters: FilterState;
  sort: SortState;
  selectedPokemon: Pokemon | null;
  loading: boolean;
  error: string | null;

  // Actions
  setPokemonList: (pokemon: Pokemon[]) => void;
  setFilters: (filters: FilterState) => void;
  setSort: (sort: SortState) => void;
  setSelectedPokemon: (pokemon: Pokemon | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}
```

#### **URL Synchronization Pattern (NEW)**

```typescript
// URL sync callback type
type URLSyncCallback = (filters: PokemonFilters, sort: SortOption) => void;

// Store with URL sync integration
interface PokemonStore {
  // ... existing state
  urlSyncCallback: URLSyncCallback | null;

  // URL sync actions
  setURLSyncCallback: (callback: URLSyncCallback | null) => void;
}

// Filter actions with URL sync
setSearch: search =>
  set(state => {
    const newState = {
      filters: { ...state.filters, search },
      pagination: { ...state.pagination, currentPage: 1 },
    };

    // Trigger URL sync if callback is set
    if (state.urlSyncCallback) {
      state.urlSyncCallback(newState.filters, state.sort);
    }

    return newState;
  }),
```

### **4. Data Fetching Architecture**

#### **All Pokemon Caching Pattern (NEW)**

```typescript
// Single request to fetch all Pokemon with comprehensive caching
export function useAllPokemon() {
  return useQuery({
    queryKey: ['pokemon', 'all'],
    queryFn: () => pokeAPI.getAllPokemonDetails(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}

// Zustand store integration for instant access
const { setPokemonList, pokemonList } = usePokemonStore();

useEffect(() => {
  if (allPokemon) {
    setPokemonList(allPokemon); // Cache all Pokemon in store
  }
}, [allPokemon, setPokemonList]);
```

#### **Chunked Data Loading Pattern (Legacy - For Other Endpoints)**

```typescript
// Handle large datasets efficiently for other endpoints
export function usePokemonSpeciesBatchChunked(speciesNames: string[], batchSize: number) {
  return useQuery({
    queryKey: ['pokemon-species', 'batch', speciesNames],
    queryFn: () => loadSpeciesInChunks(speciesNames, batchSize),
    enabled: speciesNames.length > 0,
  });
}
```

### **5. Image Handling Architecture (NEW)**

#### **Null-Safe Image Pattern**

```typescript
// Updated getPokemonImageUrl function
export function getPokemonImageUrl(
  pokemonOrId: Pokemon | number,
  variant: PokemonImageVariant = PokemonImageVariant.DEFAULT
): string | null {
  // ... logic to get image URL
  return artwork.front_default || pokemon.sprites.front_default || null;
}

// Component with null checking
export function PokemonImage({ pokemon, size = 112, className }: PokemonImageProps) {
  const [imageError, setImageError] = useState(false);
  const imageUrl = getPokemonImageUrl(pokemon);

  // Show fallback if no image URL is available or if there was an error
  const shouldShowFallback = !imageUrl || imageError;

  return (
    <div className={cn('relative bg-gradient-to-br from-gray-100 to-gray-200 rounded-full p-2', className)}>
      {shouldShowFallback ? (
        <div className="flex items-center justify-center w-full h-full">
          <Image src="/favicon.svg" alt="Pokemon Explorer" width={size * 0.6} height={size * 0.6} className="object-contain opacity-60" />
        </div>
      ) : (
        <Image
          src={imageUrl}
          alt={`${pokemon.name} official artwork`}
          width={size}
          height={size}
          className="object-contain drop-shadow-sm"
          onError={handleImageError}
        />
      )}
    </div>
  );
}
```

### **6. URL Management Architecture (NEW)**

#### **URL Synchronization Pattern**

```typescript
// URL sync utilities
export function updateURLWithFilters(
  searchParams: URLSearchParams,
  filters: PokemonFilters,
  sort: SortOption,
  router: AppRouterInstance
): void {
  const newSearchParams = new URLSearchParams(searchParams);

  // Update filter parameters
  if (filters.search) {
    newSearchParams.set('search', filters.search);
  } else {
    newSearchParams.delete('search');
  }

  // ... handle other filters

  // Reset page to 1 when filters change
  newSearchParams.set('page', '1');

  // Update URL without triggering a page reload
  router.push(`/explorer?${newSearchParams.toString()}`, { scroll: false });
}

// URL parsing utilities
export function parseURLFilters(searchParams: URLSearchParams): {
  filters: Partial<PokemonFilters>;
  sort: Partial<SortOption>;
  page: number;
  itemsPerPage: number;
} {
  // Parse URL parameters back to filter state
  // ... implementation
}
```

#### **Explorer Page Integration Pattern**

```typescript
// Set up URL sync callback
useEffect(() => {
  const urlSyncCallback = (filters: PokemonFilters, sort: SortOption) => {
    updateURLWithFilters(searchParams, filters, sort, router);
  };

  setURLSyncCallback(urlSyncCallback);

  return () => setURLSyncCallback(null);
}, [searchParams, router, setURLSyncCallback]);

// Handle URL parameters for pagination and filters
useEffect(() => {
  const { page, itemsPerPage } = parseURLFilters(searchParams);

  if (page && page > 0 && page !== pagination.currentPage) {
    setCurrentPage(page);
  }

  if (itemsPerPage && itemsPerPage > 0 && itemsPerPage !== pagination.itemsPerPage) {
    setItemsPerPage(itemsPerPage);
  }
}, [searchParams, pagination.currentPage, pagination.itemsPerPage, setCurrentPage, setItemsPerPage]);
```

### **7. Filtering and Sorting Architecture**

#### **Filter Chain Pattern**

```typescript
// Composable filter functions
export function filterPokemon(
  pokemonList: Pokemon[],
  filters: PokemonFilters,
  getGenerationFromIdFn: (id: number) => number | null
): Pokemon[] {
  return pokemonList.filter(pokemon => {
    // Search filter
    if (filters.search && !pokemon.name.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }

    // Type filter
    if (filters.types.length > 0) {
      const pokemonTypes = pokemon.types.map(t => t.type.name);
      if (!filters.types.some(type => pokemonTypes.includes(type))) {
        return false;
      }
    }

    // ... other filters

    return true;
  });
}
```

#### **Sort Pattern**

```typescript
// Flexible sorting system
export function sortPokemon(pokemonList: Pokemon[], sort: SortOption, getGenerationFromIdFn: (id: number) => number | null): Pokemon[] {
  return [...pokemonList].sort((a, b) => {
    let aValue: string | number;
    let bValue: string | number;

    switch (sort.field) {
      case SortField.NAME:
        aValue = a.name;
        bValue = b.name;
        break;
      case SortField.ID:
        aValue = a.id;
        bValue = b.id;
        break;
      // ... other sort fields
    }

    const comparison = aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    return sort.direction === SortDirection.ASC ? comparison : -comparison;
  });
}
```

### **8. Performance Optimization Patterns**

#### **All Pokemon Caching Strategy (NEW)**

```typescript
// Performance optimization with complete data caching
const filteredAndSortedPokemon = useMemo(() => {
  if (!pokemonList.length) return [];

  const filtered = filterPokemon(pokemonList, filters, getGenerationFromId);
  return sortPokemon(filtered, sort, getGenerationFromId);
}, [pokemonList, filters, sort, getGenerationFromId]);

const paginatedResults = useMemo(() => {
  return paginateItems(filteredAndSortedPokemon, pagination.currentPage, pagination.itemsPerPage);
}, [filteredAndSortedPokemon, pagination.currentPage, pagination.itemsPerPage]);
```

#### **Virtual Scrolling Pattern (For Large Lists)**

```typescript
// Performance optimization hook for large datasets
export function usePerformanceOptimization(itemCount: number) {
  const useVirtualization = itemCount > VIRTUALIZATION_THRESHOLD;
  const virtualizationThreshold = VIRTUALIZATION_THRESHOLD;

  return { useVirtualization, virtualizationThreshold };
}
```

### **9. Error Handling Architecture**

#### **Error Boundary Pattern**

```typescript
// Comprehensive error handling
export function ErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary
      fallback={<ErrorFallback />}
      onError={(error, errorInfo) => {
        console.error('Error caught by boundary:', error, errorInfo);
      }}
    >
      {children}
    </ErrorBoundary>
  );
}
```

#### **API Error Handling Pattern**

```typescript
// Consistent API error handling
class PokeAPIError extends Error {
  constructor(
    message: string,
    public status?: number
  ) {
    super(message);
    this.name = 'PokeAPIError';
  }
}

async function fetchAPI<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`);

  if (!response.ok) {
    throw new PokeAPIError(`API request failed: ${response.statusText}`, response.status);
  }

  return response.json();
}
```

### **10. Type Safety Patterns**

#### **Strict TypeScript Configuration**

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

#### **Type-Safe API Patterns**

```typescript
// Complete type definitions for all API responses
export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  sprites: {
    front_default: string;
    front_shiny: string;
    other: {
      'official-artwork': {
        front_default: string;
        front_shiny: string;
      };
    };
  };
  types: PokemonType[];
  stats: PokemonStat[];
  abilities: PokemonAbility[];
  // ... other properties
}
```

## Design Patterns Summary

### **Key Architectural Principles:**

1. **Separation of Concerns**: Clear boundaries between data, logic, and presentation
2. **Single Responsibility**: Each component and function has one clear purpose
3. **Composition over Inheritance**: Reusable components composed together
4. **Type Safety**: Full TypeScript coverage with strict configuration
5. **Performance First**: Optimized rendering and data fetching
6. **User Experience**: Smooth interactions and proper error handling
7. **URL State Management**: Filter state preserved in URL for sharing
8. **Image Fallback**: Graceful handling of unavailable images

### **Pattern Benefits:**

- **Maintainability**: Clean, organized code structure
- **Scalability**: Easy to add new features and components
- **Performance**: Optimized rendering and data handling
- **User Experience**: Smooth, responsive interactions
- **Developer Experience**: Type safety and clear patterns
- **Reliability**: Comprehensive error handling and fallbacks

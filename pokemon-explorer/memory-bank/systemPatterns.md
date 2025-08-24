# System Patterns - Pokemon Explorer Architecture

## Application Architecture

### High-Level Structure

```
Pokemon Explorer App
├── Presentation Layer (React Components)
├── State Management Layer (Zustand)
├── Data Access Layer (React Query + API)
├── Business Logic Layer (Hooks & Utils)
└── Infrastructure Layer (Next.js App Router)
```

### Component Architecture Pattern

- **Atomic Design**: Components organized by complexity (atoms, molecules, organisms)
- **Feature-Based**: Components grouped by feature domains
- **Composition Pattern**: Flexible component composition over inheritance
- **Container/Presenter**: Separation of data logic from presentation

## Key Design Patterns

### State Management Pattern

```typescript
// Zustand store pattern
interface PokemonStore {
  // State
  pokemon: Pokemon[];
  filters: FilterState;
  sorting: SortState;
  loading: boolean;

  // Actions
  setPokemon: (pokemon: Pokemon[]) => void;
  updateFilters: (filters: Partial<FilterState>) => void;
  updateSorting: (sorting: SortState) => void;
  resetFilters: () => void;
}
```

### Data Fetching Pattern

```typescript
// React Query pattern for Pokemon data
const usePokemonList = (filters: FilterState) => {
  return useQuery({
    queryKey: ["pokemon", filters],
    queryFn: () => fetchPokemon(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });
};
```

### Component Composition Pattern

```typescript
// Flexible component composition
<PokemonGrid>
  <PokemonGrid.Header>
    <SearchBar />
    <FilterControls />
    <SortControls />
  </PokemonGrid.Header>
  <PokemonGrid.Content>
    <PokemonCard />
  </PokemonGrid.Content>
  <PokemonGrid.Footer>
    <Pagination />
  </PokemonGrid.Footer>
</PokemonGrid>
```

## Directory Structure

### App Router Structure

```
src/app/
├── (pokemon)/                 # Route group for Pokemon features
│   ├── layout.tsx            # Pokemon layout with filters
│   ├── page.tsx              # Pokemon grid page
│   └── [id]/                 # Dynamic Pokemon detail routes
│       └── page.tsx
├── api/                      # API routes
│   └── pokemon/
│       └── route.ts
├── components/               # Shared components
│   ├── ui/                   # Base UI components
│   ├── pokemon/              # Pokemon-specific components
│   └── layout/               # Layout components
├── lib/                      # Utilities and configurations
│   ├── api/                  # API client and types
│   ├── stores/               # Zustand stores
│   ├── hooks/                # Custom hooks
│   └── utils/                # Utility functions
├── types/                    # TypeScript type definitions
└── styles/                   # Global styles
```

### Component Organization

```
components/
├── ui/                       # Atomic components
│   ├── Button/
│   ├── Input/
│   ├── Modal/
│   └── Card/
├── pokemon/                  # Pokemon domain components
│   ├── PokemonCard/
│   ├── PokemonGrid/
│   ├── PokemonModal/
│   └── PokemonFilters/
└── layout/                   # Layout components
    ├── Header/
    ├── Navigation/
    └── Footer/
```

## Data Flow Architecture

### Unidirectional Data Flow

```
User Interaction → Component → Store Action → API Call → Store Update → Component Re-render
```

### State Management Flow

1. **User Action**: User interacts with filter/sort controls
2. **Store Update**: Zustand store updates filter/sort state
3. **Query Invalidation**: React Query re-fetches data based on new parameters
4. **Component Update**: Components re-render with new data
5. **UI Feedback**: Loading states and results update

### Error Handling Flow

```
API Error → React Query Error State → Error Boundary → User Feedback
```

## Performance Patterns

### Optimization Strategies

- **Virtual Scrolling**: For large Pokemon lists
- **Image Optimization**: Next.js Image component with lazy loading
- **Code Splitting**: Dynamic imports for modal components
- **Memoization**: React.memo for expensive components
- **Debounced Search**: Prevent excessive API calls

### Caching Strategy

```typescript
// Multi-level caching approach
1. Browser Cache (HTTP headers)
2. React Query Cache (in-memory)
3. Service Worker Cache (offline support)
4. CDN Cache (static assets)
```

### Loading Patterns

- **Skeleton Loading**: For initial page load
- **Progressive Loading**: Load critical content first
- **Optimistic Updates**: Immediate UI feedback
- **Background Refetching**: Keep data fresh

## API Integration Patterns

### PokeAPI Integration

```typescript
// Centralized API client
class PokemonAPI {
  private baseURL = "https://pokeapi.co/api/v2";

  async getPokemon(id: number): Promise<Pokemon> {
    // Implementation with error handling
  }

  async getPokemonList(limit: number, offset: number): Promise<PokemonList> {
    // Implementation with pagination
  }
}
```

### Data Transformation Pattern

```typescript
// Transform API data to app format
const transformPokemonData = (apiData: PokeAPIResponse): Pokemon => {
  return {
    id: apiData.id,
    name: apiData.name,
    types: apiData.types.map((t) => t.type.name),
    stats: transformStats(apiData.stats),
    sprites: transformSprites(apiData.sprites),
  };
};
```

## Component Patterns

### Custom Hook Pattern

```typescript
// Encapsulate complex logic in custom hooks
const usePokemonFilters = () => {
  const [filters, setFilters] = useState<FilterState>(initialFilters);

  const updateFilter = useCallback((key: string, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(initialFilters);
  }, []);

  return { filters, updateFilter, resetFilters };
};
```

### Compound Component Pattern

```typescript
// Flexible component composition
const PokemonCard = ({ children, pokemon }) => {
  return <div className="pokemon-card">{children}</div>;
};

PokemonCard.Image = ({ pokemon }) => <img src={pokemon.sprite} />;
PokemonCard.Name = ({ pokemon }) => <h3>{pokemon.name}</h3>;
PokemonCard.Types = ({ pokemon }) => <TypeBadges types={pokemon.types} />;
```

### Render Props Pattern

```typescript
// Flexible data sharing
const PokemonProvider = ({ children }) => {
  const pokemon = usePokemonData();

  return children({ pokemon, loading, error });
};

// Usage
<PokemonProvider>
  {({ pokemon, loading, error }) => (
    <PokemonGrid pokemon={pokemon} loading={loading} />
  )}
</PokemonProvider>;
```

## Testing Patterns

### Component Testing Strategy

- **Unit Tests**: Individual component behavior
- **Integration Tests**: Component interactions
- **E2E Tests**: Complete user workflows
- **Visual Regression Tests**: UI consistency

### Mock Patterns

```typescript
// API mocking for tests
const mockPokemonAPI = {
  getPokemon: jest.fn().mockResolvedValue(mockPokemon),
  getPokemonList: jest.fn().mockResolvedValue(mockPokemonList),
};
```

## Security Patterns

### Input Validation

- **Client-side**: Immediate user feedback
- **Server-side**: Security validation
- **Type Safety**: TypeScript compile-time checks

### API Security

- **Rate Limiting**: Prevent API abuse
- **Error Handling**: Don't expose sensitive information
- **CORS Configuration**: Proper cross-origin setup

## Deployment Patterns

### Build Optimization

- **Static Generation**: Pre-render Pokemon pages
- **Incremental Static Regeneration**: Update data periodically
- **Edge Functions**: Fast API responses
- **CDN Distribution**: Global content delivery

### Environment Configuration

```typescript
// Environment-specific configurations
const config = {
  development: {
    apiUrl: "http://localhost:3000/api",
    logLevel: "debug",
  },
  production: {
    apiUrl: "https://pokemon-explorer.com/api",
    logLevel: "error",
  },
};
```

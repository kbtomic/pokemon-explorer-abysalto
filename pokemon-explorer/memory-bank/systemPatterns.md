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

#### **React Query Integration**

```typescript
// Optimized data fetching with caching
const { data, isLoading, error } = usePokemonList();
const { data: pokemon } = usePokemon(nameOrId);
```

### **4. Data Flow Architecture**

#### **Unidirectional Data Flow**

```
API → React Query → Zustand Store → Components → UI
```

#### **Event-Driven Updates**

```
User Action → Component → Store Action → State Update → UI Re-render
```

## Feature-Specific Patterns

### **1. Pokemon Exploration Pattern**

#### **Progressive Information Disclosure**

```
Pokemon Grid → Pokemon Card → Modal Overview → Detail Page
```

#### **Filtering and Sorting Pattern**

```typescript
// Composable filter system
const filteredPokemon = useMemo(() => {
  return pokemonList
    .filter(pokemon => matchesTypeFilter(pokemon, filters.types))
    .filter(pokemon => matchesGenerationFilter(pokemon, filters.generations))
    .filter(pokemon => matchesStatsFilter(pokemon, filters.stats))
    .filter(pokemon => matchesSearchFilter(pokemon, filters.search))
    .sort((a, b) => sortPokemon(a, b, sort));
}, [pokemonList, filters, sort]);
```

### **2. API Integration Pattern**

#### **React Query Hooks Pattern**

```typescript
// Custom hooks for API operations
export function usePokemonList(limit?: number, offset: number = 0) {
  return useQuery({
    queryKey: ['pokemon-list', limit, offset],
    queryFn: () => pokeAPI.getPokemonList(limit, offset),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}
```

#### **Error Handling Pattern**

```typescript
// Comprehensive error handling
if (error) {
  return (
    <ErrorBoundary>
      <ErrorMessage error={error} onRetry={refetch} />
    </ErrorBoundary>
  );
}
```

### **3. Performance Optimization Patterns**

#### **Virtual Scrolling Pattern**

```typescript
// Efficient rendering for large lists
const { useVirtualization, virtualizationThreshold } = usePerformanceOptimization(pokemonList.length);

if (useVirtualization) {
  return <VirtualizedPokemonGrid pokemonList={pokemonList} />;
}
```

#### **Image Optimization Pattern**

```typescript
// Next.js Image component with optimization
<Image
  src={pokemonImageUrl}
  alt={`${pokemon.name} official artwork`}
  width={200}
  height={200}
  priority={false}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>
```

### **4. Accessibility Patterns**

#### **WCAG Compliance Pattern**

```typescript
// Comprehensive accessibility implementation
<button
  aria-label={`View details for ${pokemon.name}`}
  aria-expanded={isModalOpen}
  aria-controls="pokemon-modal"
  onClick={handlePokemonClick}
>
  <PokemonCard pokemon={pokemon} />
</button>
```

#### **Keyboard Navigation Pattern**

```typescript
// Full keyboard navigation support
const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    handlePokemonClick();
  }
};
```

## Data Architecture Patterns

### **1. TypeScript Type System**

#### **Comprehensive Type Definitions**

```typescript
// Complete Pokemon type system
export interface Pokemon {
  id: number;
  name: string;
  types: PokemonType[];
  stats: PokemonStat[];
  abilities: PokemonAbility[];
  moves: PokemonMove[];
  sprites: PokemonSprites;
  // ... comprehensive type definitions
}
```

#### **API Response Types**

```typescript
// Type-safe API responses
export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: { name: string; url: string }[];
}
```

### **2. Data Transformation Patterns**

#### **Utility Functions Pattern**

```typescript
// Pure functions for data transformation
export function filterPokemon(pokemonList: Pokemon[], filters: FilterState): Pokemon[] {
  return pokemonList.filter(pokemon => {
    const matchesSearch = pokemon.name.toLowerCase().includes(filters.search.toLowerCase());
    const matchesTypes = filters.types.length === 0 || pokemon.types.some(type => filters.types.includes(type.type.name));
    // ... additional filter logic
    return matchesSearch && matchesTypes;
  });
}
```

#### **Memoization Pattern**

```typescript
// Performance optimization with useMemo
const filteredPokemon = useMemo(() => {
  return filterPokemon(pokemonList, filters);
}, [pokemonList, filters]);
```

## Styling Architecture Patterns

### **1. Tailwind CSS Utility-First Pattern**

#### **Component Styling**

```typescript
// Utility-first approach with component composition
const buttonClasses = "px-4 py-2 rounded-md font-medium transition-colors duration-200";

<button className={`${buttonClasses} bg-blue-600 text-white hover:bg-blue-700`}>
  Primary Button
</button>
```

#### **Responsive Design Pattern**

```typescript
// Mobile-first responsive design
<div className="
  w-full p-4
  sm:w-auto sm:p-6
  md:flex md:items-center
  lg:justify-between
">
```

### **2. Dark Mode Pattern**

#### **Theme Switching**

```typescript
// Dark mode support with Tailwind
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
    Pokemon Explorer
  </h1>
</div>
```

## Testing Architecture Patterns

### **1. Component Testing Pattern**

#### **React Testing Library Pattern**

```typescript
// Component testing with user-centric approach
describe('PokemonCard', () => {
  it('renders pokemon information correctly', () => {
    render(<PokemonCard pokemon={mockPokemon} />);
    expect(screen.getByText(mockPokemon.name)).toBeInTheDocument();
    expect(screen.getByAltText(`${mockPokemon.name} official artwork`)).toBeInTheDocument();
  });
});
```

### **2. Integration Testing Pattern**

#### **API Integration Testing**

```typescript
// Testing API integration
describe('Pokemon API Integration', () => {
  it('fetches pokemon list successfully', async () => {
    const { result } = renderHook(() => usePokemonList());
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.data).toBeDefined();
  });
});
```

## Error Handling Patterns

### **1. Error Boundary Pattern**

#### **Component Error Boundaries**

```typescript
// Graceful error handling
class PokemonErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback onReset={() => this.setState({ hasError: false })} />;
    }
    return this.props.children;
  }
}
```

### **2. API Error Handling Pattern**

#### **Comprehensive Error States**

```typescript
// Multiple error handling strategies
if (error) {
  if (error.status === 404) {
    return <NotFoundError />;
  }
  if (error.status === 500) {
    return <ServerError onRetry={refetch} />;
  }
  return <GenericError error={error} />;
}
```

## Performance Patterns

### **1. Code Splitting Pattern**

#### **Dynamic Imports**

```typescript
// Lazy loading for performance
const PokemonModal = dynamic(() => import('./PokemonModal'), {
  loading: () => <ModalSkeleton />,
  ssr: false,
});
```

### **2. Caching Pattern**

#### **React Query Caching Strategy**

```typescript
// Optimized caching configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: 3,
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
  },
});
```

## Security Patterns

### **1. Input Validation Pattern**

#### **Zod Schema Validation**

```typescript
// Type-safe input validation
const pokemonSchema = z.object({
  id: z.number().positive(),
  name: z.string().min(1).max(50),
  types: z.array(z.string()).min(1).max(2),
});

const validatedData = pokemonSchema.parse(inputData);
```

### **2. XSS Prevention Pattern**

#### **Safe Data Rendering**

```typescript
// Preventing XSS attacks
const sanitizedName = DOMPurify.sanitize(pokemon.name);
return <span dangerouslySetInnerHTML={{ __html: sanitizedName }} />;
```

## Deployment Patterns

### **1. Environment Configuration Pattern**

#### **Environment Variables**

```typescript
// Environment-specific configuration
export const config = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'https://pokeapi.co/api/v2',
  environment: process.env.NODE_ENV || 'development',
  isProduction: process.env.NODE_ENV === 'production',
};
```

### **2. Build Optimization Pattern**

#### **Next.js Build Configuration**

```typescript
// Optimized build configuration
const nextConfig: NextConfig = {
  output: 'standalone',
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  images: {
    domains: ['raw.githubusercontent.com'],
    formats: ['image/webp', 'image/avif'],
  },
};
```

## Summary

The Pokemon Explorer follows **modern React/Next.js best practices** with:

- **Component-based architecture** with clear separation of concerns
- **State management** with Zustand and React Query
- **Type safety** with comprehensive TypeScript integration
- **Performance optimization** with virtual scrolling and image optimization
- **Accessibility** with WCAG compliance and keyboard navigation
- **Error handling** with comprehensive error boundaries and states
- **Testing** with React Testing Library and Jest
- **Styling** with Tailwind CSS utility-first approach
- **Security** with input validation and XSS prevention
- **Deployment** with optimized build configuration

This architecture provides a **scalable, maintainable, and performant** foundation for the Pokemon Explorer application.

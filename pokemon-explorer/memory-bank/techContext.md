# Technical Context - Pokemon Explorer

## Technology Stack

### Core Framework

- **Next.js 15**: Latest version with App Router, Turbopack, and React 19
- **React 19**: Latest React with concurrent features and improved performance
- **TypeScript 5**: Full type safety and modern language features
- **Tailwind CSS 4**: Latest version with improved performance and new features

### State Management & Data Fetching

- **Zustand**: Lightweight state management for client-side state
- **TanStack Query (React Query)**: Server state management and caching
- **React Hook Form**: Form state management and validation
- **Zod**: Runtime type validation and schema validation

### Development Tools

- **ESLint**: Code linting with Next.js configuration
- **Prettier**: Code formatting (to be configured)
- **Husky**: Git hooks for code quality (to be added)
- **Lint-staged**: Run linters on staged files (to be added)

### Testing Framework (To Be Added)

- **Jest**: Unit testing framework
- **React Testing Library**: Component testing utilities
- **Playwright**: End-to-end testing
- **MSW**: API mocking for tests

## Current Project Setup

### Package.json Analysis

```json
{
  "name": "pokemon-explorer",
  "version": "0.1.0",
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build --turbopack",
    "start": "next start",
    "lint": "eslint"
  },
  "dependencies": {
    "react": "19.1.0",
    "react-dom": "19.1.0",
    "next": "15.5.0"
  },
  "devDependencies": {
    "typescript": "^5",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "@tailwindcss/postcss": "^4",
    "tailwindcss": "^4",
    "eslint": "^9",
    "eslint-config-next": "15.5.0",
    "@eslint/eslintrc": "^3"
  }
}
```

### Required Dependencies to Add

```json
{
  "dependencies": {
    "zustand": "^4.4.7",
    "@tanstack/react-query": "^5.17.0",
    "react-hook-form": "^7.48.2",
    "zod": "^3.22.4",
    "clsx": "^2.0.0",
    "tailwind-merge": "^2.2.0"
  },
  "devDependencies": {
    "prettier": "^3.1.1",
    "@types/jest": "^29.5.8",
    "jest": "^29.7.0",
    "jest-environment-jsdom": "^29.7.0",
    "@testing-library/react": "^14.1.2",
    "@testing-library/jest-dom": "^6.1.5",
    "@playwright/test": "^1.40.1",
    "msw": "^2.0.11"
  }
}
```

## API Integration

### PokeAPI Endpoints

- **Base URL**: `https://pokeapi.co/api/v2/`
- **Pokemon List**: `/pokemon?limit=20&offset=0`
- **Pokemon Details**: `/pokemon/{id or name}`
- **Pokemon Types**: `/type/{id or name}`
- **Pokemon Generations**: `/generation/{id or name}`
- **Pokemon Abilities**: `/ability/{id or name}`

### API Response Structure

```typescript
// Pokemon List Response
interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    name: string;
    url: string;
  }[];
}

// Pokemon Details Response
interface PokemonResponse {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
  stats: {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }[];
  sprites: {
    front_default: string;
    front_shiny: string;
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
  abilities: {
    ability: {
      name: string;
      url: string;
    };
    is_hidden: boolean;
    slot: number;
  }[];
}
```

## Development Environment

### Node.js Requirements

- **Node.js**: Version 18.17+ or 20.0+
- **Package Manager**: pnpm (currently used)
- **Development Server**: Next.js dev server with Turbopack

### Build Configuration

- **Next.js Config**: TypeScript configuration with Turbopack
- **TypeScript Config**: Strict mode enabled
- **Tailwind Config**: PostCSS integration
- **ESLint Config**: Next.js recommended rules

### Environment Variables (To Be Configured)

```env
# Development
NEXT_PUBLIC_API_URL=https://pokeapi.co/api/v2
NEXT_PUBLIC_APP_ENV=development

# Production
NEXT_PUBLIC_API_URL=https://pokeapi.co/api/v2
NEXT_PUBLIC_APP_ENV=production
```

## Performance Considerations

### Next.js Optimizations

- **Turbopack**: Faster development builds
- **App Router**: Improved routing and layouts
- **Image Optimization**: Built-in image optimization
- **Font Optimization**: Automatic font optimization
- **Bundle Analysis**: Built-in bundle analyzer

### React Query Configuration

```typescript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
  },
});
```

### Caching Strategy

- **Browser Cache**: HTTP cache headers
- **React Query Cache**: In-memory caching
- **Next.js Cache**: Static generation and ISR
- **CDN Cache**: Static asset caching

## Security Configuration

### Content Security Policy

```typescript
const securityHeaders = [
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
];
```

### API Security

- **Rate Limiting**: Client-side request throttling
- **Error Handling**: Sanitized error messages
- **Input Validation**: Zod schema validation
- **CORS**: Proper cross-origin configuration

## Build and Deployment

### Build Process

1. **Type Checking**: TypeScript compilation
2. **Linting**: ESLint code quality checks
3. **Testing**: Jest unit tests and Playwright E2E
4. **Building**: Next.js production build
5. **Optimization**: Bundle optimization and tree shaking

### Deployment Targets

- **Vercel**: Recommended deployment platform
- **Netlify**: Alternative deployment option
- **Docker**: Containerized deployment
- **Static Export**: Static site generation

### CI/CD Pipeline (To Be Configured)

```yaml
# GitHub Actions workflow
name: CI/CD
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: pnpm install
      - run: pnpm lint
      - run: pnpm test
      - run: pnpm build
```

## Development Workflow

### Code Quality Tools

- **Pre-commit Hooks**: Husky + lint-staged
- **Code Formatting**: Prettier with consistent rules
- **Import Sorting**: Automatic import organization
- **Type Checking**: Continuous TypeScript checking

### Testing Strategy

- **Unit Tests**: Component and utility function tests
- **Integration Tests**: Feature workflow tests
- **E2E Tests**: Complete user journey tests
- **Visual Tests**: Component visual regression tests

### Development Commands

```bash
# Development
pnpm dev              # Start development server
pnpm build            # Build for production
pnpm start            # Start production server
pnpm lint             # Run ESLint
pnpm test             # Run tests
pnpm test:e2e         # Run E2E tests
```

## Browser Support

### Target Browsers

- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+
- **Mobile Safari**: 14+
- **Chrome Mobile**: 90+

### Progressive Enhancement

- **Core Functionality**: Works without JavaScript
- **Enhanced Experience**: Full interactivity with JavaScript
- **Offline Support**: Service worker caching (future enhancement)

## Monitoring and Analytics

### Performance Monitoring (To Be Added)

- **Web Vitals**: Core Web Vitals tracking
- **Bundle Analysis**: Bundle size monitoring
- **Error Tracking**: Runtime error monitoring
- **Performance Metrics**: Load time and interaction metrics

### Development Tools

- **React DevTools**: Component debugging
- **React Query DevTools**: Query state inspection
- **Next.js DevTools**: Framework-specific debugging
- **Browser DevTools**: Performance profiling

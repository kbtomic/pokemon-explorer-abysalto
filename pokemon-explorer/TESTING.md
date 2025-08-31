# Testing Strategy for Pokemon Explorer

This document outlines the comprehensive testing strategy implemented for the Pokemon Explorer application.

## Testing Overview

The Pokemon Explorer project implements a multi-layered testing approach with:

- **Unit Tests**: Jest + React Testing Library for component and utility testing
- **Integration Tests**: API and store testing with mocked dependencies
- **E2E Tests**: Playwright for end-to-end user journey testing

## Test Coverage

### Current Status (Updated)

- **Unit Tests**: 59 passing, 4 failing (93.7% pass rate)
- **Integration Tests**: 59 passing, 4 failing (93.7% pass rate)
- **E2E Tests**: 30+ comprehensive test scenarios
- **Overall Coverage**: 10.93% (target: 70%+)

## Unit Tests

### Test Files Structure

```
src/
├── components/
│   └── pokemon/
│       └── __tests__/
│           └── pokemon-card.test.tsx ✅
├── lib/
│   ├── api/
│   │   └── __tests__/
│   │       └── pokeapi.test.ts ⚠️ (4 failing)
│   ├── stores/
│   │   └── __tests__/
│   │       └── pokemon-store.test.ts ✅
│   └── utils/
│       └── __tests__/
│           ├── pokemon.test.ts ✅
│           └── generationMapping.test.ts ✅
```

### Test Categories

#### ✅ **Component Tests**

- **PokemonCard**: 13 tests covering rendering, interactions, accessibility
- **Test Coverage**: 100% for PokemonCard components

#### ✅ **Utility Tests**

- **Pokemon Utilities**: 18 tests covering image URLs, stats, filtering, sorting
- **Generation Mapping**: 3 tests covering generation ID mapping
- **Test Coverage**: 63.26% for pokemon.ts utilities

#### ✅ **Store Tests**

- **Pokemon Store**: 17 tests covering state management, filters, modals
- **Test Coverage**: 66.66% for pokemonStore.ts

#### ⚠️ **API Tests** (4 failing)

- **PokeAPI Client**: 19 tests covering API endpoints, error handling
- **Issues**: Mock interference between tests, retry logic complexity
- **Test Coverage**: 11.79% for pokeapi.ts

## Integration Tests

### API Integration

- Tests PokeAPI client functionality
- Mocks external API calls
- Tests error handling and retry logic
- Tests URL construction and response validation

### Store Integration

- Tests Zustand store state management
- Tests filter and sort functionality
- Tests modal state management
- Tests persistence across renders

## E2E Tests

### Test Structure

```
e2e/
├── homepage.spec.ts      # Homepage functionality
├── explorer.spec.ts      # Pokemon Explorer page
└── navigation.spec.ts    # Cross-page navigation
```

### Test Coverage

#### **Homepage Tests** (8 scenarios)

- Page loading and display
- Navigation link functionality
- Hero section and call-to-action
- Feature cards and technology badges
- Responsive design testing
- Accessibility compliance
- Loading state handling

#### **Explorer Tests** (10 scenarios)

- Pokemon grid loading and display
- Search functionality
- Filter and sort operations
- Pagination controls
- Modal interactions
- Keyboard navigation
- Mobile responsiveness
- Loading and error states
- Accessibility features

#### **Navigation Tests** (10 scenarios)

- Cross-page navigation
- URL state management
- Browser back/forward
- Mobile menu functionality
- Keyboard navigation
- Search parameter handling
- Error page handling
- Scroll position management
- Loading state navigation
- Header consistency

### Browser Coverage

- **Desktop**: Chrome, Firefox, Safari
- **Mobile**: Chrome (Pixel 5), Safari (iPhone 12)
- **Parallel Execution**: Yes
- **Retry Logic**: 2 retries on CI

## Test Commands

### Unit Tests

```bash
# Run all unit tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run tests for CI
npm run test:ci
```

### E2E Tests

```bash
# Run all E2E tests
npm run test:e2e

# Run E2E tests with UI
npm run test:e2e:ui

# Run E2E tests in headed mode
npm run test:e2e:headed

# Run E2E tests in debug mode
npm run test:e2e:debug

# Install Playwright browsers
npm run test:e2e:install

# Show E2E test report
npm run test:e2e:report
```

### Combined Testing

```bash
# Run all tests (unit + E2E)
npm run test:all
```

## Test Configuration

### Jest Configuration

- **Environment**: jsdom
- **Coverage Thresholds**: 70% (statements, branches, lines, functions)
- **Test Framework**: Jest + React Testing Library
- **Mocking**: MSW for API mocking

### Playwright Configuration

- **Base URL**: http://localhost:3000
- **Web Server**: Auto-starts dev server
- **Parallel Execution**: Enabled
- **Retries**: 2 on CI
- **Reporters**: HTML, JSON, JUnit

## Known Issues

### Unit Test Issues

1. **API Tests**: 4 failing tests due to mock interference
   - `getAbilities` test receives wrong mock data
   - `getAbility` test receives wrong mock data
   - Error handling tests affected by mock state
   - URL construction tests affected by mock state

### Coverage Gaps

- **Components**: Most components lack unit tests
- **Hooks**: Custom hooks have minimal test coverage
- **Pages**: Page components not tested
- **Utils**: Many utility functions untested

## Improvement Plan

### Short Term (Next Sprint)

1. **Fix API Tests**: Resolve mock interference issues
2. **Add Component Tests**: Test key components (filters, modals, pagination)
3. **Add Hook Tests**: Test custom hooks (usePokemon, useFilters)
4. **Improve Coverage**: Target 50% overall coverage

### Medium Term (Next Month)

1. **Page Tests**: Add tests for all page components
2. **Integration Tests**: Add more comprehensive integration tests
3. **Performance Tests**: Add performance testing
4. **Accessibility Tests**: Add automated accessibility testing

### Long Term (Next Quarter)

1. **Visual Regression Tests**: Add visual testing with Playwright
2. **Load Testing**: Add load testing for API endpoints
3. **Security Tests**: Add security testing
4. **Cross-browser Testing**: Expand browser coverage

## Best Practices

### Unit Testing

- Test component behavior, not implementation
- Use meaningful test descriptions
- Mock external dependencies
- Test error states and edge cases
- Maintain test isolation

### E2E Testing

- Test user journeys, not technical implementation
- Use data-testid attributes for reliable selectors
- Test accessibility features
- Test responsive design
- Handle loading states appropriately

### Test Maintenance

- Keep tests up to date with code changes
- Refactor tests when code is refactored
- Monitor test performance and flakiness
- Regular test review and cleanup

## Continuous Integration

### GitHub Actions

- Run unit tests on every push
- Run E2E tests on pull requests
- Generate coverage reports
- Upload test artifacts

### Quality Gates

- Minimum 70% test coverage
- All tests must pass
- No flaky tests
- E2E tests must pass on all browsers

## Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

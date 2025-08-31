import { renderHook } from '@testing-library/react';
import { useSearchParams } from 'next/navigation';
import { useURLSync } from '@/lib/hooks/useExplorerURLSync';
import { usePokemonStore } from '@/lib/stores/pokemonStore';
import { useURLStore } from '@/lib/stores/urlStore';
import { StatName } from '@/lib/constants/enums';

// Mock Next.js navigation
jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(),
}));

// Mock stores
jest.mock('@/lib/stores/pokemonStore');
jest.mock('@/lib/stores/urlStore');

const mockUseSearchParams = useSearchParams as jest.MockedFunction<typeof useSearchParams>;
const mockUsePokemonStore = usePokemonStore as jest.MockedFunction<typeof usePokemonStore>;
const mockUseURLStore = useURLStore as jest.MockedFunction<typeof useURLStore>;

describe('useURLSync', () => {
  const mockSetSearch = jest.fn();
  const mockSetTypes = jest.fn();
  const mockSetGenerations = jest.fn();
  const mockSetAbilities = jest.fn();
  const mockSetStatRange = jest.fn();
  const mockSetSort = jest.fn();
  const mockSetCurrentPage = jest.fn();
  const mockSetItemsPerPage = jest.fn();
  const mockInitialize = jest.fn();

  const mockGetFiltersFromURL = jest.fn();
  const mockGetSortFromURL = jest.fn();
  const mockGetPaginationFromURL = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    // Mock Pokemon store
    mockUsePokemonStore.mockReturnValue({
      filters: {
        search: '',
        types: [],
        generations: [],
        abilities: [],
        stats: {
          [StatName.HP]: [0, 0],
          [StatName.ATTACK]: [0, 0],
          [StatName.DEFENSE]: [0, 0],
          [StatName.SPEED]: [0, 0],
          [StatName.SPECIAL_ATTACK]: [0, 0],
          [StatName.SPECIAL_DEFENSE]: [0, 0],
        },
      },
      sort: { field: 'id', direction: 'asc' },
      pagination: { currentPage: 1, itemsPerPage: 50 },
      pokemonList: [],
      setSearch: mockSetSearch,
      setTypes: mockSetTypes,
      setGenerations: mockSetGenerations,
      setAbilities: mockSetAbilities,
      setStatRange: mockSetStatRange,
      setSort: mockSetSort,
      setCurrentPage: mockSetCurrentPage,
      setItemsPerPage: mockSetItemsPerPage,
    });

    // Mock URL store
    mockUseURLStore.mockReturnValue({
      initialize: mockInitialize,
      getFiltersFromURL: mockGetFiltersFromURL,
      getSortFromURL: mockGetSortFromURL,
      getPaginationFromURL: mockGetPaginationFromURL,
    });

    // Mock search params
    mockUseSearchParams.mockReturnValue({
      toString: () => '',
      get: () => null,
      getAll: () => [],
      has: () => false,
      forEach: () => {},
      entries: () => [],
      keys: () => [],
      values: () => [],
    } as unknown as ReturnType<typeof useSearchParams>);
  });

  it('should initialize URL store on mount', () => {
    renderHook(() => useURLSync());

    expect(mockInitialize).toHaveBeenCalled();
  });

  it('should sync URL filters to store when search params change', () => {
    const urlFilters = {
      search: 'pikachu',
      types: ['electric'],
      generations: [1],
      abilities: ['static'],
      stats: {
        [StatName.HP]: [0, 0],
        [StatName.ATTACK]: [0, 0],
        [StatName.DEFENSE]: [0, 0],
        [StatName.SPEED]: [50, 100],
        [StatName.SPECIAL_ATTACK]: [0, 0],
        [StatName.SPECIAL_DEFENSE]: [0, 0],
      },
    };

    mockGetFiltersFromURL.mockReturnValue(urlFilters);
    mockGetSortFromURL.mockReturnValue({ field: 'name', direction: 'desc' });
    mockGetPaginationFromURL.mockReturnValue({ page: 2, itemsPerPage: 25 });

    // Mock search params with different values to trigger sync
    mockUseSearchParams.mockReturnValue({
      toString: () => 'search=pikachu&types=electric',
      get: () => null,
      getAll: () => [],
      has: () => false,
      forEach: () => {},
      entries: () => [],
      keys: () => [],
      values: () => [],
    } as unknown as ReturnType<typeof useSearchParams>);

    renderHook(() => useURLSync());

    expect(mockSetSearch).toHaveBeenCalledWith('pikachu');
    expect(mockSetTypes).toHaveBeenCalledWith(['electric']);
    expect(mockSetGenerations).toHaveBeenCalledWith([1]);
    expect(mockSetAbilities).toHaveBeenCalledWith(['static']);
    expect(mockSetSort).toHaveBeenCalledWith({ field: 'name', direction: 'desc' });
    expect(mockSetCurrentPage).toHaveBeenCalledWith(2);
    expect(mockSetItemsPerPage).toHaveBeenCalledWith(25);
  });

  it('should not sync when search params have not changed', () => {
    mockGetFiltersFromURL.mockReturnValue({
      search: '',
      types: [],
      generations: [],
      abilities: [],
      stats: {
        [StatName.HP]: [0, 0],
        [StatName.ATTACK]: [0, 0],
        [StatName.DEFENSE]: [0, 0],
        [StatName.SPEED]: [0, 0],
        [StatName.SPECIAL_ATTACK]: [0, 0],
        [StatName.SPECIAL_DEFENSE]: [0, 0],
      },
    });
    mockGetSortFromURL.mockReturnValue({ field: 'id', direction: 'asc' });
    mockGetPaginationFromURL.mockReturnValue({ page: 1, itemsPerPage: 50 });

    const { rerender } = renderHook(() => useURLSync());

    // Clear calls from initial render
    jest.clearAllMocks();

    // Re-render with same search params
    rerender();

    // Should not call any setter functions
    expect(mockSetSearch).not.toHaveBeenCalled();
    expect(mockSetTypes).not.toHaveBeenCalled();
    expect(mockSetGenerations).not.toHaveBeenCalled();
    expect(mockSetAbilities).not.toHaveBeenCalled();
    expect(mockSetStatRange).not.toHaveBeenCalled();
    expect(mockSetSort).not.toHaveBeenCalled();
    expect(mockSetCurrentPage).not.toHaveBeenCalled();
    expect(mockSetItemsPerPage).not.toHaveBeenCalled();
  });

  it('should return isUpdatingFromURL flag', () => {
    mockGetFiltersFromURL.mockReturnValue({
      search: '',
      types: [],
      generations: [],
      abilities: [],
      stats: {
        [StatName.HP]: [0, 0],
        [StatName.ATTACK]: [0, 0],
        [StatName.DEFENSE]: [0, 0],
        [StatName.SPEED]: [0, 0],
        [StatName.SPECIAL_ATTACK]: [0, 0],
        [StatName.SPECIAL_DEFENSE]: [0, 0],
      },
    });
    mockGetSortFromURL.mockReturnValue({ field: 'id', direction: 'asc' });
    mockGetPaginationFromURL.mockReturnValue({ page: 1, itemsPerPage: 50 });

    const { result } = renderHook(() => useURLSync());

    expect(result.current).toHaveProperty('isUpdatingFromURL');
    expect(typeof result.current.isUpdatingFromURL).toBe('boolean');
  });
});

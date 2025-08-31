import React from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { usePokemonTypes } from '../usePokemonTypes';
import { pokeAPI } from '@/lib/api/pokeapi';

// Mock the PokeAPI
jest.mock('@/lib/api/pokeapi', () => ({
  pokeAPI: {
    getTypes: jest.fn(),
  },
}));

const mockPokeAPI = pokeAPI as jest.Mocked<typeof pokeAPI>;

// Create a wrapper with QueryClient
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  return ({ children }: { children: React.ReactNode }) => {
    return React.createElement(QueryClientProvider, { client: queryClient }, children);
  };
};

describe('usePokemonTypes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch Pokemon types successfully', async () => {
    const mockTypes = [
      { id: 1, name: 'normal', names: [{ language: { name: 'en' }, name: 'Normal' }] },
      { id: 2, name: 'fire', names: [{ language: { name: 'en' }, name: 'Fire' }] },
      { id: 3, name: 'water', names: [{ language: { name: 'en' }, name: 'Water' }] },
    ];

    mockPokeAPI.getTypes.mockResolvedValue(mockTypes);

    const { result } = renderHook(() => usePokemonTypes(), { wrapper: createWrapper() });

    await waitFor(() => {
      expect(result.current.data).toEqual(mockTypes);
    });

    expect(mockPokeAPI.getTypes).toHaveBeenCalledTimes(1);
  });

  it('should handle loading state', () => {
    mockPokeAPI.getTypes.mockImplementation(() => new Promise(() => {}));

    const { result } = renderHook(() => usePokemonTypes(), { wrapper: createWrapper() });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeUndefined();
  });

  it('should handle error state', async () => {
    const mockError = new Error('Failed to fetch types');
    mockPokeAPI.getTypes.mockRejectedValue(mockError);

    const { result } = renderHook(() => usePokemonTypes(), { wrapper: createWrapper() });

    await waitFor(() => {
      expect(result.current.error).toBeDefined();
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
    expect(result.current.data).toBeUndefined();
  });

  it('should return empty array when no data', async () => {
    mockPokeAPI.getTypes.mockResolvedValue([]);

    const { result } = renderHook(() => usePokemonTypes(), { wrapper: createWrapper() });

    await waitFor(() => {
      expect(result.current.data).toEqual([]);
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should handle API errors gracefully', async () => {
    const mockError = new Error('Network error');
    mockPokeAPI.getTypes.mockRejectedValue(mockError);

    const { result } = renderHook(() => usePokemonTypes(), { wrapper: createWrapper() });

    await waitFor(() => {
      expect(result.current.error).toEqual(mockError);
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toBeUndefined();
  });
});

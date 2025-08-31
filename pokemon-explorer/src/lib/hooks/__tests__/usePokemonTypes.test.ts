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
  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    return React.createElement(QueryClientProvider, { client: queryClient }, children);
  };
  Wrapper.displayName = 'QueryClientWrapper';
  return Wrapper;
};

describe('usePokemonTypes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch Pokemon types successfully', async () => {
    const mockTypes = {
      count: 3,
      results: [
        { name: 'normal', url: 'https://pokeapi.co/api/v2/type/1/' },
        { name: 'fire', url: 'https://pokeapi.co/api/v2/type/2/' },
        { name: 'water', url: 'https://pokeapi.co/api/v2/type/3/' },
      ],
    };

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
    mockPokeAPI.getTypes.mockResolvedValue({ count: 0, results: [] });

    const { result } = renderHook(() => usePokemonTypes(), { wrapper: createWrapper() });

    await waitFor(() => {
      expect(result.current.data).toEqual({ count: 0, results: [] });
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

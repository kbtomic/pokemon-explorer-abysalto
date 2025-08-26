import { renderHook, act } from '@testing-library/react';
import { usePokemonStore } from '../pokemon-store';

describe('Pokemon Store', () => {
  beforeEach(() => {
    // Clear any existing state by setting default values
    const { result } = renderHook(() => usePokemonStore());
    act(() => {
      result.current.clearFilters();
      result.current.setSort({ field: 'id', direction: 'asc' });
      if (result.current.isModalOpen) {
        result.current.closeModal();
      }
    });
  });

  describe('Initial State', () => {
    it('should have correct initial state', () => {
      const { result } = renderHook(() => usePokemonStore());

      expect(result.current.filters).toEqual({
        search: '',
        types: [],
        generations: [],
        abilities: [],
        stats: {
          hp: [0, 255],
          attack: [0, 255],
          defense: [0, 255],
          speed: [0, 255],
          'special-attack': [0, 255],
          'special-defense': [0, 255],
        },
      });

      expect(result.current.sort).toEqual({
        field: 'id',
        direction: 'asc',
      });

      expect(result.current.isModalOpen).toBe(false);
      expect(result.current.selectedPokemon).toBe(null);
    });
  });

  describe('Filter Actions', () => {
    it('should set search filter', () => {
      const { result } = renderHook(() => usePokemonStore());

      act(() => {
        result.current.setSearch('bulbasaur');
      });

      expect(result.current.filters.search).toBe('bulbasaur');
    });

    it('should set types filter', () => {
      const { result } = renderHook(() => usePokemonStore());

      act(() => {
        result.current.setTypes(['grass', 'fire']);
      });

      expect(result.current.filters.types).toEqual(['grass', 'fire']);
    });

    it('should set generations filter', () => {
      const { result } = renderHook(() => usePokemonStore());

      act(() => {
        result.current.setGenerations([1, 2]);
      });

      expect(result.current.filters.generations).toEqual([1, 2]);
    });

    it('should set abilities filter', () => {
      const { result } = renderHook(() => usePokemonStore());

      act(() => {
        result.current.setAbilities(['overgrow', 'chlorophyll']);
      });

      expect(result.current.filters.abilities).toEqual(['overgrow', 'chlorophyll']);
    });

    it('should set stat range', () => {
      const { result } = renderHook(() => usePokemonStore());

      act(() => {
        result.current.setStatRange('hp', [50, 100]);
      });

      expect(result.current.filters.stats.hp).toEqual([50, 100]);
    });

    it('should clear all filters', () => {
      const { result } = renderHook(() => usePokemonStore());

      // Set some filters first
      act(() => {
        result.current.setSearch('test');
        result.current.setTypes(['grass']);
        result.current.setGenerations([1]);
        result.current.setAbilities(['overgrow']);
        result.current.setStatRange('hp', [50, 100]);
      });

      // Clear all filters
      act(() => {
        result.current.clearFilters();
      });

      expect(result.current.filters.search).toBe('');
      expect(result.current.filters.types).toEqual([]);
      expect(result.current.filters.generations).toEqual([]);
      expect(result.current.filters.abilities).toEqual([]);
      expect(result.current.filters.stats.hp).toEqual([0, 255]);
    });
  });

  describe('Sort Actions', () => {
    it('should set sort', () => {
      const { result } = renderHook(() => usePokemonStore());

      act(() => {
        result.current.setSort({ field: 'total-stats', direction: 'desc' });
      });

      expect(result.current.sort).toEqual({
        field: 'total-stats',
        direction: 'desc',
      });
    });

    it('should set sort field and direction', () => {
      const { result } = renderHook(() => usePokemonStore());

      act(() => {
        result.current.setSort({ field: 'name', direction: 'desc' });
      });

      expect(result.current.sort.field).toBe('name');
      expect(result.current.sort.direction).toBe('desc');
    });
  });

  describe('Modal Actions', () => {
    it('should open modal with selected Pokemon', () => {
      const { result } = renderHook(() => usePokemonStore());

      act(() => {
        result.current.openModal(1);
      });

      expect(result.current.isModalOpen).toBe(true);
      expect(result.current.selectedPokemon).toBe(1);
    });

    it('should close modal', () => {
      const { result } = renderHook(() => usePokemonStore());

      // Open modal first
      act(() => {
        result.current.openModal(1);
      });

      // Close modal
      act(() => {
        result.current.closeModal();
      });

      expect(result.current.isModalOpen).toBe(false);
      expect(result.current.selectedPokemon).toBe(null);
    });
  });

  describe('Store State Management', () => {
    it('should clear filters and reset to initial state', () => {
      const { result } = renderHook(() => usePokemonStore());

      // Modify state
      act(() => {
        result.current.setSearch('test');
        result.current.setTypes(['grass']);
        result.current.setSort({ field: 'name', direction: 'desc' });
        result.current.openModal(1);
      });

      // Clear filters and reset
      act(() => {
        result.current.clearFilters();
        result.current.setSort({ field: 'id', direction: 'asc' });
        result.current.closeModal();
      });

      expect(result.current.filters.search).toBe('');
      expect(result.current.filters.types).toEqual([]);
      expect(result.current.sort).toEqual({ field: 'id', direction: 'asc' });
      expect(result.current.isModalOpen).toBe(false);
      expect(result.current.selectedPokemon).toBe(null);
    });
  });

  describe('Filter State Management', () => {
    it('should manage filter state correctly', () => {
      const { result } = renderHook(() => usePokemonStore());

      // Initially no active filters
      expect(result.current.filters.search).toBe('');
      expect(result.current.filters.types).toEqual([]);

      // Add search filter
      act(() => {
        result.current.setSearch('test');
      });
      expect(result.current.filters.search).toBe('test');

      // Add type filter
      act(() => {
        result.current.setTypes(['grass']);
      });
      expect(result.current.filters.types).toEqual(['grass']);

      // Clear all filters
      act(() => {
        result.current.clearFilters();
      });
      expect(result.current.filters.search).toBe('');
      expect(result.current.filters.types).toEqual([]);
    });
  });

  describe('State Persistence', () => {
    it('should persist state across renders', () => {
      const { result: result1 } = renderHook(() => usePokemonStore());

      act(() => {
        result1.current.setSearch('persistent');
        result1.current.setTypes(['grass']);
      });

      const { result: result2 } = renderHook(() => usePokemonStore());

      expect(result2.current.filters.search).toBe('persistent');
      expect(result2.current.filters.types).toEqual(['grass']);
    });
  });
});

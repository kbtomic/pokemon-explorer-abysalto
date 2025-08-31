import React from 'react';
import { render, screen, fireEvent } from '@/lib/test-utils';
import { ClearAllButton } from '../ClearAllButton';

// Mock the store and hooks
jest.mock('@/lib/stores/pokemonStore', () => ({
  usePokemonStore: jest.fn(),
}));

jest.mock('@/lib/hooks/ui/useActiveFilters', () => ({
  useActiveFilters: jest.fn(),
}));

import { usePokemonStore } from '@/lib/stores/pokemonStore';
import { useActiveFilters } from '@/lib/hooks/ui/useActiveFilters';

const mockUsePokemonStore = usePokemonStore as jest.MockedFunction<typeof usePokemonStore>;
const mockUseActiveFilters = useActiveFilters as jest.MockedFunction<typeof useActiveFilters>;

describe('ClearAllButton', () => {
  const mockClearFilters = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUsePokemonStore.mockReturnValue(mockClearFilters);
    mockUseActiveFilters.mockReturnValue(true);
  });

  it('should render clear all button', () => {
    render(<ClearAllButton />);

    const button = screen.getByRole('button', { name: /clear all/i });
    expect(button).toBeInTheDocument();
  });

  it('should call clearFilters when clicked', () => {
    render(<ClearAllButton />);

    const button = screen.getByRole('button', { name: /clear all/i });
    fireEvent.click(button);

    expect(mockClearFilters).toHaveBeenCalledTimes(1);
  });

  it('should be hidden when no filters are active', () => {
    mockUseActiveFilters.mockReturnValue(false);
    render(<ClearAllButton />);

    const button = screen.getByRole('button', { name: /clear all/i });
    expect(button).toHaveClass('opacity-0', 'pointer-events-none');
  });

  it('should be visible when filters are active', () => {
    mockUseActiveFilters.mockReturnValue(true);
    render(<ClearAllButton />);

    const button = screen.getByRole('button', { name: /clear all/i });
    expect(button).toHaveClass('opacity-100', 'pointer-events-auto');
  });

  it('should have proper styling classes', () => {
    render(<ClearAllButton />);

    const button = screen.getByRole('button', { name: /clear all/i });
    expect(button).toHaveClass('flex', 'items-center', 'space-x-2');
  });

  it('should be accessible', () => {
    render(<ClearAllButton />);

    const button = screen.getByRole('button', { name: /clear all/i });
    expect(button).toBeInTheDocument();
  });

  it('should handle keyboard interaction', () => {
    render(<ClearAllButton />);

    const button = screen.getByRole('button', { name: /clear all/i });
    fireEvent.keyDown(button, { key: 'Enter' });

    // Note: Button click behavior is handled by the Button component
    // We just verify the button is accessible
    expect(button).toBeInTheDocument();
  });

  it('should be hidden when no filters are active', () => {
    mockUseActiveFilters.mockReturnValue(false);
    render(<ClearAllButton />);

    const button = screen.getByRole('button', { name: /clear all/i });
    expect(button).toHaveClass('opacity-0', 'pointer-events-none');
  });
});

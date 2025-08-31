import React from 'react';
import { render, screen, fireEvent } from '@/lib/test-utils';
import { PokemonCard } from '../../pokemonCard/PokemonCard';
import { mockPokemon } from '@/lib/test-utils';

describe('PokemonCard', () => {
  const mockOnClick = jest.fn();

  beforeEach(() => {
    mockOnClick.mockClear();
  });

  it('should render Pokemon information correctly', () => {
    render(<PokemonCard pokemon={mockPokemon} onClick={mockOnClick} />);

    expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('#001')).toBeInTheDocument();
    expect(screen.getByText('318')).toBeInTheDocument();
    expect(screen.getByText('grass')).toBeInTheDocument();
    expect(screen.getByText('poison')).toBeInTheDocument();
    expect(screen.getByText('45')).toBeInTheDocument(); // HP
    expect(screen.getAllByText('49')).toHaveLength(2); // ATK and DEF
  });

  it('should display Pokemon image with correct alt text', () => {
    render(<PokemonCard pokemon={mockPokemon} onClick={mockOnClick} />);

    const image = screen.getByAltText('bulbasaur official artwork');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', expect.stringContaining('official-artwork/1.png'));
  });

  it('should call onClick when card is clicked', () => {
    render(<PokemonCard pokemon={mockPokemon} onClick={mockOnClick} />);

    const card = screen.getByTestId('pokemon-card');
    fireEvent.click(card);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('should call onClick when Enter key is pressed', () => {
    render(<PokemonCard pokemon={mockPokemon} onClick={mockOnClick} />);

    const card = screen.getByTestId('pokemon-card');
    fireEvent.keyDown(card, { key: 'Enter' });

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('should call onClick when Space key is pressed', () => {
    render(<PokemonCard pokemon={mockPokemon} onClick={mockOnClick} />);

    const card = screen.getByTestId('pokemon-card');
    fireEvent.keyDown(card, { key: ' ' });

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('should not call onClick for other keys', () => {
    render(<PokemonCard pokemon={mockPokemon} onClick={mockOnClick} />);

    const card = screen.getByTestId('pokemon-card');
    fireEvent.keyDown(card, { key: 'Tab' });

    expect(mockOnClick).not.toHaveBeenCalled();
  });

  it('should have proper ARIA attributes', () => {
    render(<PokemonCard pokemon={mockPokemon} onClick={mockOnClick} />);

    const card = screen.getByTestId('pokemon-card');
    expect(card).toHaveAttribute('tabIndex', '0');
  });

  it('should have proper semantic structure for types', () => {
    render(<PokemonCard pokemon={mockPokemon} onClick={mockOnClick} />);

    // Check that type badges are rendered
    expect(screen.getByText('grass')).toBeInTheDocument();
    expect(screen.getByText('poison')).toBeInTheDocument();
  });

  it('should have proper semantic structure for stats', () => {
    render(<PokemonCard pokemon={mockPokemon} onClick={mockOnClick} />);

    // Check that stats are rendered
    expect(screen.getByText('HP')).toBeInTheDocument();
    expect(screen.getByText('ATK')).toBeInTheDocument();
    expect(screen.getByText('DEF')).toBeInTheDocument();
    expect(screen.getByText('45')).toBeInTheDocument(); // HP value
    expect(screen.getAllByText('49')).toHaveLength(2); // ATK and DEF values
  });

  it('should handle Pokemon with single type', () => {
    const singleTypePokemon = {
      ...mockPokemon,
      types: [mockPokemon.types[0]], // Only grass type
    };

    render(<PokemonCard pokemon={singleTypePokemon} onClick={mockOnClick} />);

    expect(screen.getByText('grass')).toBeInTheDocument();
    expect(screen.queryByText('poison')).not.toBeInTheDocument();
  });

  it('should handle Pokemon with no stats', () => {
    const pokemonWithoutStats = {
      ...mockPokemon,
      stats: [],
    };

    render(<PokemonCard pokemon={pokemonWithoutStats} onClick={mockOnClick} />);

    // Should show 0 for all stats (including total stats)
    expect(screen.getAllByText('0')).toHaveLength(4); // Total stats + HP, ATK, DEF
  });

  it('should be focusable', () => {
    render(<PokemonCard pokemon={mockPokemon} onClick={mockOnClick} />);

    const card = screen.getByTestId('pokemon-card');
    card.focus();

    expect(card).toHaveFocus();
  });

  it('should have proper styling classes', () => {
    render(<PokemonCard pokemon={mockPokemon} onClick={mockOnClick} />);

    const card = screen.getByTestId('pokemon-card');
    expect(card).toHaveClass('cursor-pointer', 'hover:scale-[1.03]', 'hover:shadow-2xl');
  });
});

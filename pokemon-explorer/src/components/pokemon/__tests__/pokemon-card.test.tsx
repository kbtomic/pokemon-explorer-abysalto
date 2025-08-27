import React from 'react';
import { render, screen, fireEvent } from '@/lib/test-utils';
import { PokemonCard } from '../pokemon-card';
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

    const card = screen.getByRole('button');
    fireEvent.click(card);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('should call onClick when Enter key is pressed', () => {
    render(<PokemonCard pokemon={mockPokemon} onClick={mockOnClick} />);

    const card = screen.getByRole('button');
    fireEvent.keyDown(card, { key: 'Enter' });

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('should call onClick when Space key is pressed', () => {
    render(<PokemonCard pokemon={mockPokemon} onClick={mockOnClick} />);

    const card = screen.getByRole('button');
    fireEvent.keyDown(card, { key: ' ' });

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('should not call onClick for other keys', () => {
    render(<PokemonCard pokemon={mockPokemon} onClick={mockOnClick} />);

    const card = screen.getByRole('button');
    fireEvent.keyDown(card, { key: 'Tab' });

    expect(mockOnClick).not.toHaveBeenCalled();
  });

  it('should have proper ARIA attributes', () => {
    render(<PokemonCard pokemon={mockPokemon} onClick={mockOnClick} />);

    const card = screen.getByRole('button');
    expect(card).toHaveAttribute('aria-label', 'View details for bulbasaur');
    expect(card).toHaveAttribute('aria-describedby');
    expect(card).toHaveAttribute('tabIndex', '0');
  });

  it('should have screen reader description', () => {
    render(<PokemonCard pokemon={mockPokemon} onClick={mockOnClick} />);

    const card = screen.getByRole('button');
    const descriptionId = card.getAttribute('aria-describedby');
    const description = document.getElementById(descriptionId!);

    expect(description).toBeInTheDocument();
    expect(description).toHaveClass('sr-only');
    expect(description).toHaveTextContent('bulbasaur, grass and poison type Pokemon');
  });

  it('should have proper semantic structure for types', () => {
    render(<PokemonCard pokemon={mockPokemon} onClick={mockOnClick} />);

    const typesList = screen.getByRole('list', { name: 'Pokemon types' });
    expect(typesList).toBeInTheDocument();

    const typeItems = typesList.querySelectorAll('[role="listitem"]');
    expect(typeItems).toHaveLength(2);
  });

  it('should have proper semantic structure for stats', () => {
    render(<PokemonCard pokemon={mockPokemon} onClick={mockOnClick} />);

    const statsList = screen.getByRole('list', { name: 'Base stats' });
    expect(statsList).toBeInTheDocument();

    const statItems = statsList.querySelectorAll('[role="listitem"]');
    expect(statItems).toHaveLength(3); // HP, ATK, DEF
  });

  it('should have proper ARIA labels for stats', () => {
    render(<PokemonCard pokemon={mockPokemon} onClick={mockOnClick} />);

    const hpStat = screen.getByText('45');
    expect(hpStat).toHaveAttribute('aria-label', 'Health Points: 45');

    const attackStats = screen.getAllByText('49');
    expect(attackStats[0]).toHaveAttribute('aria-label', 'Attack: 49');
    expect(attackStats[1]).toHaveAttribute('aria-label', 'Defense: 49');
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

    expect(screen.getAllByText('0')).toHaveLength(4); // Total stats + HP, ATK, DEF
  });

  it('should be focusable', () => {
    render(<PokemonCard pokemon={mockPokemon} onClick={mockOnClick} />);

    const card = screen.getByRole('button');
    card.focus();

    expect(card).toHaveFocus();
  });

  it('should have proper styling classes', () => {
    render(<PokemonCard pokemon={mockPokemon} onClick={mockOnClick} />);

    const card = screen.getByRole('button');
    expect(card).toHaveClass('cursor-pointer', 'hover:scale-[1.02]', 'hover:shadow-xl');
  });
});

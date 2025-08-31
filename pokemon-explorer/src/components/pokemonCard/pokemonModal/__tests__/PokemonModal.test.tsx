import React from 'react';
import { render, screen } from '@/lib/test-utils';
import { PokemonModal } from '../PokemonModal';
import { usePokemonStore } from '@/lib/stores/pokemonStore';

// Mock the Pokemon store
jest.mock('@/lib/stores/pokemonStore', () => ({
  usePokemonStore: jest.fn(),
}));

const mockUsePokemonStore = usePokemonStore as jest.MockedFunction<typeof usePokemonStore>;

describe('PokemonModal', () => {
  const mockPokemon = {
    id: 1,
    name: 'bulbasaur',
    height: 7,
    weight: 69,
    base_experience: 64,
    abilities: [
      {
        ability: { name: 'overgrow', url: 'https://pokeapi.co/api/v2/ability/65/' },
        is_hidden: false,
        slot: 1,
      },
    ],
    moves: [],
    species: { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon-species/1/' },
    sprites: {
      front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
      front_shiny: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/1.png',
      other: {
        dream_world: { front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg' },
        'official-artwork': {
          front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
          front_shiny: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/1.png',
        },
      },
    },
    stats: [
      { base_stat: 45, effort: 0, stat: { name: 'hp', url: 'https://pokeapi.co/api/v2/stat/1/' } },
      { base_stat: 49, effort: 0, stat: { name: 'attack', url: 'https://pokeapi.co/api/v2/stat/2/' } },
      { base_stat: 49, effort: 0, stat: { name: 'defense', url: 'https://pokeapi.co/api/v2/stat/3/' } },
      { base_stat: 65, effort: 1, stat: { name: 'special-attack', url: 'https://pokeapi.co/api/v2/stat/4/' } },
      { base_stat: 65, effort: 0, stat: { name: 'special-defense', url: 'https://pokeapi.co/api/v2/stat/5/' } },
      { base_stat: 45, effort: 0, stat: { name: 'speed', url: 'https://pokeapi.co/api/v2/stat/6/' } },
    ],
    types: [
      { slot: 1, type: { name: 'grass', url: 'https://pokeapi.co/api/v2/type/12/' } },
      { slot: 2, type: { name: 'poison', url: 'https://pokeapi.co/api/v2/type/4/' } },
    ],
  };

  const mockCloseModal = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUsePokemonStore.mockReturnValue({
      isModalOpen: true,
      selectedPokemon: mockPokemon,
      closeModal: mockCloseModal,
    } as any);
  });

  it('should render Pokemon name', () => {
    render(<PokemonModal />);

    // Check for the name in the header (h2 element)
    const headerName = screen.getByRole('heading', { level: 2, name: 'Bulbasaur' });
    expect(headerName).toBeInTheDocument();
  });

  it('should render Pokemon ID', () => {
    render(<PokemonModal />);

    expect(screen.getByText('#001')).toBeInTheDocument();
  });

  it('should render Pokemon height and weight', () => {
    render(<PokemonModal />);

    expect(screen.getByText('0.7 m')).toBeInTheDocument();
    expect(screen.getByText('6.9 kg')).toBeInTheDocument();
  });

  it('should render Pokemon base experience', () => {
    render(<PokemonModal />);

    expect(screen.getByText('64')).toBeInTheDocument();
  });

  it('should render type badges', () => {
    render(<PokemonModal />);

    expect(screen.getByText('grass')).toBeInTheDocument();
    expect(screen.getByText('poison')).toBeInTheDocument();
  });

  it('should render Pokemon image', () => {
    render(<PokemonModal />);

    const image = screen.getByAltText('bulbasaur official artwork');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      'src',
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png'
    );
  });

  it('should render close button', () => {
    render(<PokemonModal />);

    const closeButton = screen.getByRole('button', { name: '×' });
    expect(closeButton).toBeInTheDocument();
  });

  it('should call closeModal when close button is clicked', () => {
    render(<PokemonModal />);

    const closeButton = screen.getByRole('button', { name: '×' });
    closeButton.click();

    expect(mockCloseModal).toHaveBeenCalled();
  });

  it('should handle Pokemon with missing data gracefully', () => {
    const pokemonWithMissingData = {
      ...mockPokemon,
      base_experience: null,
      height: null,
      weight: null,
    };

    mockUsePokemonStore.mockReturnValue({
      isModalOpen: true,
      selectedPokemon: pokemonWithMissingData,
      closeModal: mockCloseModal,
    } as any);

    render(<PokemonModal />);

    // Should still render the Pokemon name in the header
    const headerName = screen.getByRole('heading', { level: 2, name: 'Bulbasaur' });
    expect(headerName).toBeInTheDocument();
  });

  it('should render type badges with correct styling', () => {
    render(<PokemonModal />);

    const grassBadge = screen.getByText('grass');
    const poisonBadge = screen.getByText('poison');

    // Check that badges have the expected styling classes
    expect(grassBadge).toHaveClass('px-3');
    expect(grassBadge).toHaveClass('py-1.5');
    expect(grassBadge).toHaveClass('text-xs');
    expect(grassBadge).toHaveClass('font-bold');
    expect(grassBadge).toHaveClass('text-white');
    expect(grassBadge).toHaveClass('rounded-full');
    expect(grassBadge).toHaveClass('capitalize');
  });

  it('should format Pokemon name correctly', () => {
    const pokemonWithHyphen = {
      ...mockPokemon,
      name: 'mew-two',
    };

    mockUsePokemonStore.mockReturnValue({
      isModalOpen: true,
      selectedPokemon: pokemonWithHyphen,
      closeModal: mockCloseModal,
    } as any);

    render(<PokemonModal />);

    // Check for the formatted name in the header (h2 element)
    const headerName = screen.getByRole('heading', { level: 2, name: 'Mew-two' });
    expect(headerName).toBeInTheDocument();
  });

  it('should have proper modal structure', () => {
    render(<PokemonModal />);

    // Check that the modal is rendered with proper structure
    // The modal should contain the Pokemon name in the header
    const headerName = screen.getByRole('heading', { level: 2, name: 'Bulbasaur' });
    expect(headerName).toBeInTheDocument();

    // The modal should contain the Pokemon image
    const pokemonImage = screen.getByAltText('bulbasaur official artwork');
    expect(pokemonImage).toBeInTheDocument();

    // The modal should contain type badges
    const grassBadge = screen.getByText('grass');
    expect(grassBadge).toBeInTheDocument();
  });

  it('should render advanced stats section', () => {
    render(<PokemonModal />);

    // Check for advanced stats display
    expect(screen.getByText('Radar')).toBeInTheDocument();
    expect(screen.getByText('Bar')).toBeInTheDocument();
    expect(screen.getByText('Radial')).toBeInTheDocument();
  });

  it('should render call to action button', () => {
    render(<PokemonModal />);

    const viewDetailsButton = screen.getByRole('button', { name: 'View Details' });
    expect(viewDetailsButton).toBeInTheDocument();
  });

  it('should not render when modal is closed', () => {
    mockUsePokemonStore.mockReturnValue({
      isModalOpen: false,
      selectedPokemon: mockPokemon,
      closeModal: mockCloseModal,
    } as any);

    const { container } = render(<PokemonModal />);
    expect(container.firstChild).toBeNull();
  });

  it('should not render when no Pokemon is selected', () => {
    mockUsePokemonStore.mockReturnValue({
      isModalOpen: true,
      selectedPokemon: null,
      closeModal: mockCloseModal,
    } as any);

    const { container } = render(<PokemonModal />);
    expect(container.firstChild).toBeNull();
  });
});

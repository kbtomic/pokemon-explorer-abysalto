import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Pokemon } from '@/types/pokemon/core';

// Create a custom render function that includes providers
interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  queryClient?: QueryClient;
}

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },
      mutations: {
        retry: false,
      },
    },
  });

const AllTheProviders = ({ children, queryClient }: { children: React.ReactNode; queryClient?: QueryClient }) => {
  const testQueryClient = queryClient || createTestQueryClient();

  return <QueryClientProvider client={testQueryClient}>{children}</QueryClientProvider>;
};

const customRender = (ui: ReactElement, options: CustomRenderOptions = {}) => {
  const { queryClient, ...renderOptions } = options;

  return render(ui, {
    wrapper: ({ children }) => <AllTheProviders queryClient={queryClient}>{children}</AllTheProviders>,
    ...renderOptions,
  });
};

// Mock Pokemon data for testing
export const mockPokemon: Pokemon = {
  id: 1,
  name: 'bulbasaur',
  height: 7,
  weight: 69,
  base_experience: 64,
  sprites: {
    front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
    front_shiny: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/1.png',
    other: {
      'official-artwork': {
        front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
        front_shiny: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/1.png',
      },
      dream_world: {
        front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg',
      },
    },
  },
  types: [
    {
      slot: 1,
      type: {
        name: 'grass',
        url: 'https://pokeapi.co/api/v2/type/12/',
      },
    },
    {
      slot: 2,
      type: {
        name: 'poison',
        url: 'https://pokeapi.co/api/v2/type/4/',
      },
    },
  ],
  stats: [
    {
      base_stat: 45,
      effort: 0,
      stat: {
        name: 'hp',
        url: 'https://pokeapi.co/api/v2/stat/1/',
      },
    },
    {
      base_stat: 49,
      effort: 0,
      stat: {
        name: 'attack',
        url: 'https://pokeapi.co/api/v2/stat/2/',
      },
    },
    {
      base_stat: 49,
      effort: 0,
      stat: {
        name: 'defense',
        url: 'https://pokeapi.co/api/v2/stat/3/',
      },
    },
    {
      base_stat: 65,
      effort: 1,
      stat: {
        name: 'special-attack',
        url: 'https://pokeapi.co/api/v2/stat/4/',
      },
    },
    {
      base_stat: 65,
      effort: 0,
      stat: {
        name: 'special-defense',
        url: 'https://pokeapi.co/api/v2/stat/5/',
      },
    },
    {
      base_stat: 45,
      effort: 0,
      stat: {
        name: 'speed',
        url: 'https://pokeapi.co/api/v2/stat/6/',
      },
    },
  ],
  abilities: [
    {
      ability: {
        name: 'overgrow',
        url: 'https://pokeapi.co/api/v2/ability/65/',
      },
      is_hidden: false,
      slot: 1,
    },
    {
      ability: {
        name: 'chlorophyll',
        url: 'https://pokeapi.co/api/v2/ability/34/',
      },
      is_hidden: true,
      slot: 3,
    },
  ],
  species: {
    name: 'bulbasaur',
    url: 'https://pokeapi.co/api/v2/pokemon-species/1/',
  },
  moves: [
    {
      move: {
        name: 'razor-wind',
        url: 'https://pokeapi.co/api/v2/move/13/',
      },
      version_group_details: [
        {
          level_learned_at: 0,
          move_learn_method: {
            name: 'machine',
            url: 'https://pokeapi.co/api/v2/move-learn-method/4/',
          },
          version_group: {
            name: 'red-blue',
            url: 'https://pokeapi.co/api/v2/version-group/1/',
          },
        },
      ],
    },
  ],
};

export const mockPokemonList = [
  mockPokemon,
  {
    ...mockPokemon,
    id: 2,
    name: 'ivysaur',
  },
  {
    ...mockPokemon,
    id: 3,
    name: 'venusaur',
  },
];

// Mock API responses
export const mockApiResponses = {
  pokemonList: {
    count: 151,
    next: null,
    previous: null,
    results: [
      { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
      { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
      { name: 'venusaur', url: 'https://pokeapi.co/api/v2/pokemon/3/' },
    ],
  },
  types: {
    count: 18,
    results: [
      { name: 'normal', url: 'https://pokeapi.co/api/v2/type/1/' },
      { name: 'fighting', url: 'https://pokeapi.co/api/v2/type/2/' },
      { name: 'flying', url: 'https://pokeapi.co/api/v2/type/3/' },
      { name: 'poison', url: 'https://pokeapi.co/api/v2/type/4/' },
      { name: 'ground', url: 'https://pokeapi.co/api/v2/type/5/' },
      { name: 'rock', url: 'https://pokeapi.co/api/v2/type/6/' },
      { name: 'bug', url: 'https://pokeapi.co/api/v2/type/7/' },
      { name: 'ghost', url: 'https://pokeapi.co/api/v2/type/8/' },
      { name: 'steel', url: 'https://pokeapi.co/api/v2/type/9/' },
      { name: 'fire', url: 'https://pokeapi.co/api/v2/type/10/' },
      { name: 'water', url: 'https://pokeapi.co/api/v2/type/11/' },
      { name: 'grass', url: 'https://pokeapi.co/api/v2/type/12/' },
      { name: 'electric', url: 'https://pokeapi.co/api/v2/type/13/' },
      { name: 'psychic', url: 'https://pokeapi.co/api/v2/type/14/' },
      { name: 'ice', url: 'https://pokeapi.co/api/v2/type/15/' },
      { name: 'dragon', url: 'https://pokeapi.co/api/v2/type/16/' },
      { name: 'dark', url: 'https://pokeapi.co/api/v2/type/17/' },
      { name: 'fairy', url: 'https://pokeapi.co/api/v2/type/18/' },
    ],
  },
  abilities: {
    count: 327,
    results: [
      { name: 'stench', url: 'https://pokeapi.co/api/v2/ability/1/' },
      { name: 'drizzle', url: 'https://pokeapi.co/api/v2/ability/2/' },
      { name: 'speed-boost', url: 'https://pokeapi.co/api/v2/ability/3/' },
      { name: 'battle-armor', url: 'https://pokeapi.co/api/v2/ability/4/' },
      { name: 'sturdy', url: 'https://pokeapi.co/api/v2/ability/5/' },
    ],
  },
};

// Helper functions for testing
export const waitForLoadingToFinish = () => {
  return new Promise(resolve => setTimeout(resolve, 0));
};

export const mockFetch = (response: unknown) => {
  return jest.fn().mockResolvedValue({
    ok: true,
    json: async () => response,
  });
};

export const mockFetchError = (error: string) => {
  return jest.fn().mockRejectedValue(new Error(error));
};

// Re-export everything
export * from '@testing-library/react';
export { customRender as render };

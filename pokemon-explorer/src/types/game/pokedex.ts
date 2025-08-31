export interface Pokedex {
  id: number;
  name: string;
  is_main_series: boolean;
  descriptions: {
    description: string;
    language: {
      name: string;
      url: string;
    };
  }[];
  names: {
    name: string;
    language: {
      name: string;
      url: string;
    };
  }[];
  pokemon_entries: {
    entry_number: number;
    pokemon_species: {
      name: string;
      url: string;
    };
  }[];
  region: {
    name: string;
    url: string;
  } | null;
  version_groups: {
    name: string;
    url: string;
  }[];
}

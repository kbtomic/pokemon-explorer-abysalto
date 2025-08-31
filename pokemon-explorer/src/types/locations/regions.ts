export interface Region {
  id: number;
  name: string;
  locations: {
    name: string;
    url: string;
  }[];
  main_generation: {
    name: string;
    url: string;
  } | null;
  names: {
    name: string;
    language: {
      name: string;
      url: string;
    };
  }[];
  pokedexes: {
    name: string;
    url: string;
  }[];
  version_groups: {
    name: string;
    url: string;
  }[];
}

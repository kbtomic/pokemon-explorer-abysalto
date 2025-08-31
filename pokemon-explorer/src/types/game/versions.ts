export interface Version {
  id: number;
  name: string;
  names: {
    name: string;
    language: {
      name: string;
      url: string;
    };
  }[];
  version_group: {
    name: string;
    url: string;
  };
}

export interface VersionGroup {
  id: number;
  name: string;
  order: number;
  generation: {
    name: string;
    url: string;
  };
  move_learn_methods: {
    name: string;
    url: string;
  }[];
  pokedexes: {
    name: string;
    url: string;
  }[];
  regions: {
    name: string;
    url: string;
  }[];
  versions: {
    name: string;
    url: string;
  }[];
}

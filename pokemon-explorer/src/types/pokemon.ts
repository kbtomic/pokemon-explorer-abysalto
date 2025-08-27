export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  sprites: {
    front_default: string;
    front_shiny: string;
    other: {
      'official-artwork': {
        front_default: string;
        front_shiny: string;
      };
      dream_world: {
        front_default: string;
      };
    };
  };
  types: PokemonType[];
  stats: PokemonStat[];
  abilities: PokemonAbility[];
  species: {
    name: string;
    url: string;
  };
  moves: PokemonMove[];
}

export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface PokemonAbility {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

export interface PokemonMove {
  move: {
    name: string;
    url: string;
  };
  version_group_details: {
    level_learned_at: number;
    move_learn_method: {
      name: string;
      url: string;
    };
    version_group: {
      name: string;
      url: string;
    };
  }[];
}

export interface PokemonSpecies {
  id: number;
  name: string;
  order: number;
  gender_rate: number;
  capture_rate: number;
  base_happiness: number;
  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;
  hatch_counter: number;
  has_gender_differences: boolean;
  forms_switchable: boolean;
  growth_rate: {
    name: string;
    url: string;
  };
  pokedex_numbers: {
    entry_number: number;
    pokedex: {
      name: string;
      url: string;
    };
  }[];
  egg_groups: {
    name: string;
    url: string;
  }[];
  color: {
    name: string;
    url: string;
  };
  shape: {
    name: string;
    url: string;
  };
  evolves_from_species: {
    name: string;
    url: string;
  } | null;
  evolution_chain: {
    url: string;
  };
  habitat: {
    name: string;
    url: string;
  } | null;
  generation: {
    name: string;
    url: string;
  };
  names: {
    name: string;
    language: {
      name: string;
      url: string;
    };
  }[];
  flavor_text_entries: {
    flavor_text: string;
    language: {
      name: string;
      url: string;
    };
    version: {
      name: string;
      url: string;
    };
  }[];
  form_descriptions: {
    description: string;
    language: {
      name: string;
      url: string;
    };
  }[];
  genera: {
    genus: string;
    language: {
      name: string;
      url: string;
    };
  }[];
  varieties: {
    is_default: boolean;
    pokemon: {
      name: string;
      url: string;
    };
  }[];
}

export interface PokemonForm {
  id: number;
  name: string;
  order: number;
  form_order: number;
  is_default: boolean;
  is_battle_only: boolean;
  is_mega: boolean;
  form_name: string;
  pokemon: {
    name: string;
    url: string;
  };
  sprites: {
    front_default: string | null;
    front_shiny: string | null;
    back_default: string | null;
    back_shiny: string | null;
  };
  types: PokemonType[];
  version_group: {
    name: string;
    url: string;
  };
  names: {
    name: string;
    language: {
      name: string;
      url: string;
    };
  }[];
  form_names: {
    name: string;
    language: {
      name: string;
      url: string;
    };
  }[];
}

export interface PokemonHabitat {
  id: number;
  name: string;
  names: {
    name: string;
    language: {
      name: string;
      url: string;
    };
  }[];
  pokemon_species: {
    name: string;
    url: string;
  }[];
}

export interface PokemonShape {
  id: number;
  name: string;
  awesome_names: {
    awesome_name: string;
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
  pokemon_species: {
    name: string;
    url: string;
  }[];
}

export interface PokemonColor {
  id: number;
  name: string;
  names: {
    name: string;
    language: {
      name: string;
      url: string;
    };
  }[];
  pokemon_species: {
    name: string;
    url: string;
  }[];
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    name: string;
    url: string;
  }[];
}

export interface Type {
  id: number;
  name: string;
  damage_relations: {
    double_damage_from: { name: string; url: string }[];
    double_damage_to: { name: string; url: string }[];
    half_damage_from: { name: string; url: string }[];
    half_damage_to: { name: string; url: string }[];
    no_damage_from: { name: string; url: string }[];
    no_damage_to: { name: string; url: string }[];
  };
}

export interface Generation {
  id: number;
  name: string;
  main_region: {
    name: string;
    url: string;
  };
  pokemon_species: {
    name: string;
    url: string;
  }[];
}

export interface Ability {
  id: number;
  name: string;
  effect_entries: {
    effect: string;
    language: {
      name: string;
    };
  }[];
  flavor_text_entries: {
    flavor_text: string;
    language: {
      name: string;
    };
    version_group: {
      name: string;
    };
  }[];
}

export interface Move {
  id: number;
  name: string;
  accuracy: number | null;
  effect_chance: number | null;
  pp: number;
  priority: number;
  power: number | null;
  damage_class: {
    name: string;
    url: string;
  };
  effect_entries: {
    effect: string;
    language: {
      name: string;
    };
    short_effect: string;
  }[];
  flavor_text_entries: {
    flavor_text: string;
    language: {
      name: string;
    };
    version_group: {
      name: string;
    };
  }[];
  generation: {
    name: string;
    url: string;
  };
  meta: {
    ailment: {
      name: string;
      url: string;
    };
    ailment_chance: number;
    category: {
      name: string;
      url: string;
    };
    crit_rate: number;
    drain: number;
    flinch_chance: number;
    healing: number;
    max_hits: number | null;
    max_turns: number | null;
    min_hits: number | null;
    min_turns: number | null;
    stat_chance: number;
  } | null;
  names: {
    name: string;
    language: {
      name: string;
      url: string;
    };
  }[];
  past_values: unknown[];
  stat_changes: {
    change: number;
    stat: {
      name: string;
      url: string;
    };
  }[];
  super_contest_effect: {
    url: string;
  } | null;
  target: {
    name: string;
    url: string;
  };
  type: {
    name: string;
    url: string;
  };
}

export interface EvolutionChain {
  id: number;
  chain: EvolutionChainLink;
}

export interface Berry {
  id: number;
  name: string;
  growth_time: number;
  max_harvest: number;
  natural_gift_power: number;
  size: number;
  smoothness: number;
  soil_dryness: number;
  firmness: {
    name: string;
    url: string;
  };
  flavors: {
    potency: number;
    flavor: {
      name: string;
      url: string;
    };
  }[];
  item: {
    name: string;
    url: string;
  };
  natural_gift_type: {
    name: string;
    url: string;
  };
  names: {
    name: string;
    language: {
      name: string;
      url: string;
    };
  }[];
}

export interface BerryFirmness {
  id: number;
  name: string;
  berries: {
    name: string;
    url: string;
  }[];
  names: {
    name: string;
    language: {
      name: string;
      url: string;
    };
  }[];
}

export interface BerryFlavor {
  id: number;
  name: string;
  berries: {
    potency: number;
    berry: {
      name: string;
      url: string;
    };
  }[];
  contest_type: {
    name: string;
    url: string;
  };
  names: {
    name: string;
    language: {
      name: string;
      url: string;
    };
  }[];
}

export interface Item {
  id: number;
  name: string;
  cost: number;
  fling_power: number | null;
  fling_effect: {
    name: string;
    url: string;
  } | null;
  attributes: {
    name: string;
    url: string;
  }[];
  category: {
    name: string;
    url: string;
  };
  effect_entries: {
    effect: string;
    language: {
      name: string;
      url: string;
    };
    short_effect: string;
  }[];
  flavor_text_entries: {
    text: string;
    language: {
      name: string;
      url: string;
    };
    version_group: {
      name: string;
      url: string;
    };
  }[];
  game_indices: {
    game_index: number;
    generation: {
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
  sprites: {
    default: string;
  };
  held_by_pokemon: {
    pokemon: {
      name: string;
      url: string;
    };
    version_details: {
      rarity: number;
      version: {
        name: string;
        url: string;
      };
    }[];
  }[];
  baby_trigger_for: {
    url: string;
  } | null;
  machines: {
    machine: {
      url: string;
    };
    version_group: {
      name: string;
      url: string;
    };
  }[];
}

export interface ItemCategory {
  id: number;
  name: string;
  items: {
    name: string;
    url: string;
  }[];
  names: {
    name: string;
    language: {
      name: string;
      url: string;
    };
  }[];
  pocket: {
    name: string;
    url: string;
  };
}

export interface Machine {
  id: number;
  item: {
    name: string;
    url: string;
  };
  move: {
    name: string;
    url: string;
  };
  version_group: {
    name: string;
    url: string;
  };
}

export interface Location {
  id: number;
  name: string;
  region: {
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
  game_indices: {
    game_index: number;
    generation: {
      name: string;
      url: string;
    };
  }[];
  areas: {
    name: string;
    url: string;
  }[];
}

export interface LocationArea {
  id: number;
  name: string;
  game_index: number;
  encounter_method_rates: {
    encounter_method: {
      name: string;
      url: string;
    };
    version_details: {
      rate: number;
      version: {
        name: string;
        url: string;
      };
    }[];
  }[];
  location: {
    name: string;
    url: string;
  };
  names: {
    name: string;
    language: {
      name: string;
      url: string;
    };
  }[];
  pokemon_encounters: {
    pokemon: {
      name: string;
      url: string;
    };
    version_details: {
      encounter_details: {
        chance: number;
        condition_values: {
          name: string;
          url: string;
        }[];
        max_level: number;
        method: {
          name: string;
          url: string;
        };
        min_level: number;
      }[];
      max_chance: number;
      version: {
        name: string;
        url: string;
      };
    }[];
  }[];
}

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

export interface EncounterMethod {
  id: number;
  name: string;
  order: number;
  names: {
    name: string;
    language: {
      name: string;
      url: string;
    };
  }[];
}

export interface EncounterCondition {
  id: number;
  name: string;
  names: {
    name: string;
    language: {
      name: string;
      url: string;
    };
  }[];
  values: {
    name: string;
    url: string;
  }[];
}

export interface EvolutionTrigger {
  id: number;
  name: string;
  names: {
    name: string;
    language: {
      name: string;
      url: string;
    };
  }[];
  pokemon_species: {
    name: string;
    url: string;
  }[];
}

export interface EvolutionChainLink {
  evolution_details: EvolutionDetail[];
  evolves_to: EvolutionChainLink[];
  is_baby: boolean;
  species: {
    name: string;
    url: string;
  };
}

export interface EvolutionDetail {
  gender: number | null;
  held_item: {
    name: string;
    url: string;
  } | null;
  item: {
    name: string;
    url: string;
  } | null;
  known_move: {
    name: string;
    url: string;
  } | null;
  known_move_type: {
    name: string;
    url: string;
  } | null;
  location: {
    name: string;
    url: string;
  } | null;
  min_affection: number | null;
  min_beauty: number | null;
  min_happiness: number | null;
  min_level: number | null;
  needs_overworld_rain: boolean;
  party_species: {
    name: string;
    url: string;
  } | null;
  party_type: {
    name: string;
    url: string;
  } | null;
  relative_physical_stats: number | null;
  time_of_day: string;
  trade_species: {
    name: string;
    url: string;
  } | null;
  trigger: {
    name: string;
    url: string;
  };
  turn_upside_down: boolean;
}

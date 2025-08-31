// Basic item data from list API
export interface ItemBasic {
  name: string;
  url: string;
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

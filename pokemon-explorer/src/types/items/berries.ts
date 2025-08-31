// Basic berry data from list API
export interface BerryBasic {
  name: string;
  url: string;
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

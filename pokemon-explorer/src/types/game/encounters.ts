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

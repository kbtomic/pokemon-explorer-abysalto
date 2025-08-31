import { Berry } from '@/types/items/berries';
import { fetchAPI, getBatchChunked } from './core';

export const berriesAPI = {
  async getBerries(): Promise<{
    count: number;
    results: { name: string; url: string }[];
  }> {
    // First get the count, then fetch all berries
    const berryCount = await fetchAPI<{ count: number }>(`/berry?limit=1`);
    return fetchAPI<{ count: number; results: { name: string; url: string }[] }>(`/berry?limit=${berryCount.count}`);
  },

  async getBerry(nameOrId: string | number): Promise<Berry> {
    return fetchAPI<Berry>(`/berry/${nameOrId}`);
  },

  async getBerriesPaginated(
    limit: number = 50,
    offset: number = 0
  ): Promise<{
    count: number;
    next: string | null;
    previous: string | null;
    results: { name: string; url: string }[];
  }> {
    return fetchAPI(`/berry?limit=${limit}&offset=${offset}`);
  },

  async getAllBerriesDetails(): Promise<Berry[]> {
    // First get all berries names
    const allBerriesList = await this.getBerries();
    const allNames = allBerriesList.results.map(b => b.name);

    // Fetch all berry details with optimized parallel chunking
    return this.getBerriesBatchChunked(allNames, 50); // Smaller chunks for berries
  },

  async getBerriesBatchChunked(namesOrIds: (string | number)[], chunkSize: number = 25): Promise<Berry[]> {
    return getBatchChunked(namesOrIds, this.getBerry.bind(this), chunkSize, 4, 50);
  },
};

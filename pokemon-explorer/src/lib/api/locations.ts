import { Location } from '@/types/locations/locations';
import { measurePerformance } from '@/lib/utils/performance/performance';
import { fetchAPI, getBatchChunked } from './core';

export const locationsAPI = {
  async getLocations(): Promise<{
    count: number;
    results: { name: string; url: string }[];
  }> {
    // First get the count, then fetch all locations
    const locationCount = await fetchAPI<{ count: number }>(`/location?limit=1`);
    return fetchAPI<{ count: number; results: { name: string; url: string }[] }>(`/location?limit=${locationCount.count}`);
  },

  async getLocation(nameOrId: string | number): Promise<Location> {
    return fetchAPI<Location>(`/location/${nameOrId}`);
  },

  async getLocationsPaginated(
    limit: number = 50,
    offset: number = 0
  ): Promise<{
    count: number;
    next: string | null;
    previous: string | null;
    results: { name: string; url: string }[];
  }> {
    return fetchAPI(`/location?limit=${limit}&offset=${offset}`);
  },

  async getAllLocationsDetails(): Promise<Location[]> {
    return measurePerformance(async () => {
      // First get all locations with URLs
      const allLocationsList = await this.getLocations();

      // Extract IDs from URLs instead of using names (avoids special character issues)
      const allIds = allLocationsList.results
        .map(l => {
          const urlParts = l.url.split('/');
          return parseInt(urlParts[urlParts.length - 2]);
        })
        .filter(id => !isNaN(id));

      // Fetch all location details with optimized parallel chunking using IDs
      return this.getLocationsBatchChunked(allIds, 50); // Increase chunk size to speed up
    });
  },

  async getLocationsBatchChunked(namesOrIds: (string | number)[], chunkSize: number = 50): Promise<Location[]> {
    return getBatchChunked(namesOrIds, this.getLocation.bind(this), chunkSize);
  },
};

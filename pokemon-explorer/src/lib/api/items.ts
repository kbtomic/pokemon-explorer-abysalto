import { Item } from '@/types/items/items';
import { measurePerformance } from '@/lib/utils/performance/performance';
import { fetchAPI, getBatchChunked } from './core';

export const itemsAPI = {
  async getItems(): Promise<{
    count: number;
    results: { name: string; url: string }[];
  }> {
    // First get the count, then fetch all items
    const itemCount = await fetchAPI<{ count: number }>(`/item?limit=1`);
    return fetchAPI<{ count: number; results: { name: string; url: string }[] }>(`/item?limit=${itemCount.count}`);
  },

  async getItem(nameOrId: string | number): Promise<Item> {
    return fetchAPI<Item>(`/item/${nameOrId}`);
  },

  async getItemsPaginated(
    limit: number = 50,
    offset: number = 0
  ): Promise<{
    count: number;
    next: string | null;
    previous: string | null;
    results: { name: string; url: string }[];
  }> {
    return fetchAPI(`/item?limit=${limit}&offset=${offset}`);
  },

  async getAllItemsDetails(): Promise<Item[]> {
    return measurePerformance(async () => {
      // First get all items with URLs
      const allItemsList = await this.getItems();

      // Extract IDs from URLs instead of using names (avoids special character issues)
      const allIds = allItemsList.results
        .map(i => {
          const urlParts = i.url.split('/');
          return parseInt(urlParts[urlParts.length - 2]);
        })
        .filter(id => !isNaN(id));

      // Fetch all item details with optimized parallel chunking using IDs
      return this.getItemsBatchChunked(allIds, 50); // Increase chunk size to speed up
    });
  },

  async getItemsBatchChunked(namesOrIds: (string | number)[], chunkSize: number = 50): Promise<Item[]> {
    return getBatchChunked(namesOrIds, this.getItem.bind(this), chunkSize);
  },
};

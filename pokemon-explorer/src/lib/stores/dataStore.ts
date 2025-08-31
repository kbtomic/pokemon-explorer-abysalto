import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { SortOption } from '@/types/ui/filters';
import { SortDirection, SortField } from '@/lib/constants/pokemon/sorting';
import { DEFAULT_ITEMS_PER_PAGE } from '@/lib/constants/api/pagination';

interface DataFilters {
  search: string;
}

interface PaginationState {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
}

interface DataStore<T extends { id: number; name: string }> {
  itemList: T[];
  isLoading: boolean;
  error: string | null;
  filters: DataFilters;
  sort: SortOption;
  pagination: PaginationState;
  isModalOpen: boolean;
  selectedItem: T | null;

  // Actions (generic names)
  setItemList: (items: T[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  // Filter actions
  setSearch: (search: string) => void;
  clearFilters: () => void;

  // Sort actions
  setSort: (sort: SortOption) => void;

  // Pagination actions
  setCurrentPage: (page: number) => void;
  setItemsPerPage: (itemsPerPage: number) => void;
  resetPagination: () => void;

  // Modal actions
  openModal: (itemId: number) => void;
  closeModal: () => void;
  setSelectedItem: (item: T | null) => void;
}

const initialFilters: DataFilters = {
  search: '',
};

const initialSort: SortOption = {
  field: SortField.ID,
  direction: SortDirection.ASC,
};

const initialPagination: PaginationState = {
  currentPage: 1,
  itemsPerPage: DEFAULT_ITEMS_PER_PAGE,
  totalItems: 0,
};

export function createDataStore<T extends { id: number; name: string }>(storeName: string) {
  return create<DataStore<T>>()(
    devtools(
      set => ({
        // Initial state
        itemList: [],
        isLoading: false,
        error: null,
        filters: initialFilters,
        sort: initialSort,
        pagination: initialPagination,
        isModalOpen: false,
        selectedItem: null,

        // Item list actions
        setItemList: items =>
          set(state => ({
            itemList: items,
            pagination: {
              ...state.pagination,
              totalItems: items.length,
              currentPage: 1, // Reset to first page when new data is loaded
            },
          })),
        setLoading: loading => set({ isLoading: loading }),
        setError: error => set({ error }),

        // Filter actions
        setSearch: search =>
          set(state => ({
            filters: { ...state.filters, search },
            pagination: { ...state.pagination, currentPage: 1 }, // Reset to first page on filter change
          })),

        clearFilters: () =>
          set(state => ({
            filters: initialFilters,
            pagination: { ...state.pagination, currentPage: 1 },
          })),

        // Sort actions
        setSort: sort =>
          set(() => ({
            sort,
          })),

        // Pagination actions
        setCurrentPage: page => set(state => ({ pagination: { ...state.pagination, currentPage: page } })),
        setItemsPerPage: itemsPerPage => set(state => ({ pagination: { ...state.pagination, itemsPerPage } })),
        resetPagination: () => set(state => ({ pagination: { ...state.pagination, currentPage: 1 } })),

        // Modal actions
        openModal: itemId =>
          set(state => ({
            isModalOpen: true,
            selectedItem: state.itemList.find(item => item.id === itemId) || null,
          })),
        closeModal: () => set({ isModalOpen: false, selectedItem: null }),
        setSelectedItem: item => set({ selectedItem: item }),
      }),
      {
        name: storeName,
      }
    )
  );
}

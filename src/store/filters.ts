import { create } from 'zustand';
import { CharacterFilters } from '@/types/rick-morty';

interface FiltersState {
  filters: CharacterFilters;
  setFilters: (filters: CharacterFilters) => void;
  resetFilters: () => void;
}

export const useFiltersStore = create<FiltersState>((set) => ({
  filters: {
    status: undefined,
    gender: undefined,
    page: 1,
  },
  setFilters: (newFilters) =>
    set((state) => ({
      filters: {
        ...state.filters,
        ...newFilters,
      },
    })),
  resetFilters: () =>
    set({
      filters: {
        status: undefined,
        gender: undefined,
        page: 1,
      },
    }),
})); 
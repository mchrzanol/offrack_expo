// store/filterStore.ts
import { create } from 'zustand';

type FilterState = {
  brandIds: number[];
  priceRange: [number, number];
  sortBy: 'newest' | 'priceLow' | 'priceHigh' | 'popularity';
  setBrandIds: (ids: number[]) => void;
  setPriceRange: (range: [number, number]) => void;
  setSortBy: (sort: FilterState['sortBy']) => void;
  resetFilters: () => void;
};

export const useFilterStore = create<FilterState>((set) => ({
  brandIds: [],
  priceRange: [0, 1000],
  sortBy: 'newest',
  setBrandIds: (ids) => set({ brandIds: ids }),
  setPriceRange: (range) => set({ priceRange: range }),
  setSortBy: (sort) => set({ sortBy: sort }),
  resetFilters: () =>
    set({ brandIds: [], priceRange: [0, 1000], sortBy: 'newest' }),
}));

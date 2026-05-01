import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SearchesState {
  search: string[];
  addSearch: (query: string) => void;
  clearSearches: () => void;
}

export const useSearchStore = create<SearchesState>()(
  persist(
    (set, get) => ({
      search: [],

      addSearch: (query: string) => {
        const cleaned = query.trim().toLowerCase();
        if (!cleaned) return;

        const existing = get().search;

        const filtered = existing.filter((s) => s !== cleaned);

        // new list with latest search on top
        const updated = [cleaned, ...filtered].slice(0, 10); 

        set({ search: updated });
      },

      clearSearches: () => set({ search: [] }),
    }),
    {
      name: "recent-searches",
    }
  )
);

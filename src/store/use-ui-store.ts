import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UIState {
  viewMode: 'table' | 'grid';
  setViewMode: (mode: 'table' | 'grid') => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      viewMode: 'table',
      setViewMode: (mode) => set({ viewMode: mode }),
    }),
    {
      name: 'ui-storage',
    }
  )
);

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { dummyBatches, dummyLots } from "../data/mockData";

export const useManufacturingStore = create(
  persist(
    (set) => ({
      operator: null,
      batches: dummyBatches,
      lots: dummyLots,

      setOperator: (operator) => set({ operator }),

      updateBatch: (id, updates) =>
        set((state) => ({
          batches: state.batches.map((b) => (b.id === id ? { ...b, ...updates } : b)),
        })),

      addLot: (newLot) =>
        set((state) => ({
          lots: [...state.lots, newLot],
        })),

      logout: () => set({ operator: null }),
    }),
    {
      name: "manufacturing-storage",
      partialize: (state) => ({
        operator: state.operator,
      }),
    }
  )
);

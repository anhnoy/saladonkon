import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface PricingState {
  extraAdultPrice: number;
  extraChildPrice: number;
  childFreeAge: number;
  serviceFee: number;
  updatePricing: (pricing: Partial<PricingState>) => void;
}

export const usePricingStore = create<PricingState>()(
  persist(
    (set) => ({
      extraAdultPrice: 10,
      extraChildPrice: 10,
      childFreeAge: 6,
      serviceFee: 25,
      updatePricing: (pricing) => set((state) => ({ ...state, ...pricing })),
    }),
    {
      name: 'pricing-storage',
    }
  )
);
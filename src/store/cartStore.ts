import { create } from "zustand";
import { CartItemType, PlanType } from "../types/Cart";

interface CartStore {
  items: CartItemType[];
  addItem: (plan: PlanType, quantity?: number) => void;
  removeItem: (planId: string) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],

  addItem: (plan, quantity = 1) =>
    set((state) => {
      const existingItem = state.items.find((i) => i.plan.id === plan.id);
      if (existingItem) {
        return {
          items: state.items.map((i) =>
            i.plan.id === plan.id
              ? { ...i, quantity: i.quantity + quantity }
              : i
          ),
        };
      }
      return { items: [...state.items, { plan, quantity }] };
    }),

  removeItem: (planId) =>
    set((state) => ({
      items: state.items.filter((i) => i.plan.id !== planId),
    })),

  clearCart: () => set({ items: [] }),

  getTotalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

  getTotalPrice: () =>
    get().items.reduce((sum, i) => sum + i.plan.price * i.quantity, 0),
}));

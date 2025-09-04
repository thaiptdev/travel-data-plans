import { Plan } from "./Plan";

export interface CartItem {
  plan: Plan;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  addItem: (plan: Plan) => void;
  removeItem: (planId: string) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

export interface PlanType {
  id: string;
  country: string;
  region: string;
  dataAllowance: string;
  validity: number;
  price: number;
  currency: string;
  name?: string;
}

export interface CartItemType {
  plan: PlanType;
  quantity: number;
}

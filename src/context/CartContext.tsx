import React, { createContext, useContext, useCallback, useRef } from 'react';
import { CartState, CartItem } from '../types';

// ─── Zustand-style external store to bypass React tree re-renders ─────────────
// Components subscribe only to their specific cart slice via ref callbacks.

type Listener = () => void;

class CartStore {
  private state: CartState = { items: {}, totalCount: 0 };
  private listeners = new Set<Listener>();

  getState(): CartState {
    return this.state;
  }

  getTotalCount(): number {
    return this.state.totalCount;
  }

  getItemQuantity(id: string): number {
    return this.state.items[id]?.quantity ?? 0;
  }

  addItem(item: Omit<CartItem, 'quantity'>): void {
    const existing = this.state.items[item.id];
    const newItems = {
      ...this.state.items,
      [item.id]: {
        ...item,
        quantity: (existing?.quantity ?? 0) + 1,
      },
    };
    const totalCount = Object.values(newItems).reduce((acc, i) => acc + i.quantity, 0);
    this.state = { items: newItems, totalCount };
    this.notify();
  }

  private notify(): void {
    this.listeners.forEach((l) => l());
  }

  subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }
}

export const cartStore = new CartStore();

// Context carries only the store reference (stable), never raw state.
const CartStoreContext = createContext<CartStore>(cartStore);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <CartStoreContext.Provider value={cartStore}>{children}</CartStoreContext.Provider>
);

// Hook: subscribes only to totalCount changes — used by the header badge
export const useCartTotalCount = (): number => {
  const store = useContext(CartStoreContext);
  const [count, setCount] = React.useState(() => store.getTotalCount());

  React.useEffect(() => {
    const unsub = store.subscribe(() => {
      setCount(store.getTotalCount());
    });
    return unsub;
  }, [store]);

  return count;
};

// Hook: subscribes only to a single product's quantity — used by product cards
export const useProductQuantity = (id: string): number => {
  const store = useContext(CartStoreContext);
  const [qty, setQty] = React.useState(() => store.getItemQuantity(id));

  React.useEffect(() => {
    // Only re-renders when THIS product's quantity changes
    const unsub = store.subscribe(() => {
      const next = store.getItemQuantity(id);
      setQty((prev) => (prev !== next ? next : prev));
    });
    return unsub;
  }, [store, id]);

  return qty;
};

export const useCartStore = (): CartStore => useContext(CartStoreContext);

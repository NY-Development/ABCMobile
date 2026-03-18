import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CartItem, Product } from './cart.types';

interface CartStoreState {
  items: CartItem[];
  total: number;

  // Actions
  addItem: (product: Product, quantity: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
}

export const useCartStore = create<CartStoreState>()(
  persist(
    (set, get) => ({
      items: [],
      total: 0,

      addItem: (product, quantity) => {
        set((state) => {
          const existingItem = state.items.find((item) => item.id === product.id);
          let updatedItems: CartItem[];

          if (existingItem) {
            updatedItems = state.items.map((item) =>
              item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
            );
          } else {
            updatedItems = [...state.items, { ...product, quantity }];
          }

          const total = updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

          return { items: updatedItems, total };
        });
      },

      removeItem: (productId) => {
        set((state) => {
          const updatedItems = state.items.filter((item) => item.id !== productId);
          const total = updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
          return { items: updatedItems, total };
        });
      },

      updateQuantity: (productId, quantity) => {
        set((state) => {
          const updatedItems = state.items.map((item) =>
            item.id === productId ? { ...item, quantity } : item
          );
          const total = updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
          return { items: updatedItems, total };
        });
      },

      clearCart: () => {
        set({ items: [], total: 0 });
      },

      getTotalItems: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

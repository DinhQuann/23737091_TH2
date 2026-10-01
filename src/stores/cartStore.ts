import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STUDENT } from '../constants/student';

export interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

interface CartState {
    items: CartItem[];
    addItem: (product: { id: string; name: string; price: number }) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, delta: number) => void;
    getTotalQuantity: () => number;
    getTotalAmount: () => number;
    clearCart: () => void;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            addItem: (product: { id: string; name: string; price: number }) => {
                const { items } = get();
                const existing = items.find((i: CartItem) => i.id === product.id);
                if (existing) {
                    set({
                        items: items.map((i: CartItem) =>
                            i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
                        ),
                    });
                } else {
                    set({ items: [...items, { ...product, quantity: 1 }] });
                }
            },
            removeItem: (id: string) => set({ items: get().items.filter((i: CartItem) => i.id !== id) }),
            updateQuantity: (id: string, delta: number) => {
                const { items } = get();
                set({
                    items: items
                        .map((i: CartItem) => {
                            if (i.id === id) {
                                const newQty = i.quantity + delta;
                                return newQty > 0 ? { ...i, quantity: newQty } : null;
                            }
                            return i;
                        })
                        .filter(Boolean) as CartItem[],
                });
            },
            getTotalQuantity: () => get().items.reduce((acc: number, i: CartItem) => acc + i.quantity, 0),
            getTotalAmount: () => get().items.reduce((acc: number, i: CartItem) => acc + i.price * i.quantity, 0),
            clearCart: () => set({ items: [] }),
        }),
        {
            name: `ktxgo-cart-${STUDENT.mssv}`,
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);
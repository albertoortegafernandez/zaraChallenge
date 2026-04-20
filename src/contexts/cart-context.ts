import { createContext } from 'react';
import type { CartItem, ProductColor, ProductStorage } from '@/types';

export interface AddToCartInput {
  productId: string;
  name: string;
  brand: string;
  imageUrl: string;
  color: ProductColor;
  storage: ProductStorage;
  price: number;
}

export interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  totalPrice: number;
  addItem: (input: AddToCartInput) => void;
  removeItem: (lineId: string) => void;
  clear: () => void;
}

export const CartContext = createContext<CartContextValue | undefined>(undefined);

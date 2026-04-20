import { useCallback, useEffect, useMemo, useReducer, type ReactNode } from 'react';
import type { CartItem } from '@/types';
import { CartContext, type AddToCartInput, type CartContextValue } from './cart-context';

const STORAGE_KEY = 'zara-mobile-cart:v1';

type CartState = { items: CartItem[] };

type CartAction =
  | { type: 'HYDRATE'; items: CartItem[] }
  | { type: 'ADD'; item: CartItem }
  | { type: 'REMOVE'; lineId: string }
  | { type: 'CLEAR' };

const reducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'HYDRATE':
      return { items: action.items };
    case 'ADD':
      return { items: [...state.items, action.item] };
    case 'REMOVE':
      return { items: state.items.filter((item) => item.lineId !== action.lineId) };
    case 'CLEAR':
      return { items: [] };
    default:
      return state;
  }
};

const makeLineId = () =>
  `line_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;

const isBrowser = typeof window !== 'undefined';

const readFromStorage = (): CartItem[] => {
  if (!isBrowser) return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed as CartItem[];
  } catch {
    return [];
  }
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, { items: [] });

  useEffect(() => {
    dispatch({ type: 'HYDRATE', items: readFromStorage() });
  }, []);

  useEffect(() => {
    if (!isBrowser) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    } catch {
      /* storage unavailable */
    }
  }, [state.items]);

  const addItem = useCallback((input: AddToCartInput) => {
    dispatch({ type: 'ADD', item: { ...input, lineId: makeLineId() } });
  }, []);

  const removeItem = useCallback((lineId: string) => {
    dispatch({ type: 'REMOVE', lineId });
  }, []);

  const clear = useCallback(() => dispatch({ type: 'CLEAR' }), []);

  const value = useMemo<CartContextValue>(
    () => ({
      items: state.items,
      itemCount: state.items.length,
      totalPrice: state.items.reduce((sum, item) => sum + item.price, 0),
      addItem,
      removeItem,
      clear,
    }),
    [state.items, addItem, removeItem, clear],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

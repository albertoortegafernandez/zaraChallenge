import { useCallback, useEffect, useMemo, useReducer, useRef, type ReactNode } from 'react';
import type { CartItem } from '@/types';
import { CartContext, type AddToCartInput, type CartContextValue } from './cart-context';

const STORAGE_KEY = 'zara-mobile-cart:v1';

type CartState = { items: CartItem[] };

type CartAction =
  | { type: 'SET'; items: CartItem[] }
  | { type: 'ADD'; item: CartItem }
  | { type: 'REMOVE'; lineId: string }
  | { type: 'CLEAR' };

const reducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'SET':
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

const writeToStorage = (items: CartItem[]) => {
  if (!isBrowser) return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    /* storage unavailable (quota, private mode) */
  }
};

const initializer = (): CartState => ({ items: readFromStorage() });

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, undefined, initializer);
  const didMount = useRef(false);

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      return;
    }
    writeToStorage(state.items);
  }, [state.items]);

  useEffect(() => {
    if (!isBrowser) return;
    const handleStorage = (event: StorageEvent) => {
      if (event.key !== STORAGE_KEY) return;
      const next = readFromStorage();
      dispatch({ type: 'SET', items: next });
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

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

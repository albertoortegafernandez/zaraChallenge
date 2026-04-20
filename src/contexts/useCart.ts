import { useContext } from 'react';
import { CartContext, type CartContextValue } from './cart-context';

export const useCart = (): CartContextValue => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside a CartProvider');
  return ctx;
};

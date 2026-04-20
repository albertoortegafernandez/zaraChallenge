import { act, renderHook, waitFor } from '@testing-library/react';
import { CartProvider } from '@/contexts/CartContext';
import { useCart } from '@/contexts/useCart';
import type { ReactNode } from 'react';

const wrapper = ({ children }: { children: ReactNode }) => <CartProvider>{children}</CartProvider>;

const sampleItem = {
  productId: 'iphone-16',
  name: 'iPhone 16',
  brand: 'Apple',
  imageUrl: 'https://img/iphone.png',
  color: { name: 'Black', hexCode: '#000', imageUrl: 'https://img/iphone-black.png' },
  storage: { capacity: '256GB', price: 1199 },
  price: 1199,
};

describe('CartContext', () => {
  it('starts empty', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    expect(result.current.items).toHaveLength(0);
    expect(result.current.itemCount).toBe(0);
    expect(result.current.totalPrice).toBe(0);
  });

  it('adds items and computes totals', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => result.current.addItem(sampleItem));
    act(() => result.current.addItem({ ...sampleItem, price: 500 }));

    expect(result.current.items).toHaveLength(2);
    expect(result.current.itemCount).toBe(2);
    expect(result.current.totalPrice).toBe(1699);
  });

  it('removes items by lineId', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => result.current.addItem(sampleItem));
    const lineId = result.current.items[0].lineId;
    act(() => result.current.removeItem(lineId));

    expect(result.current.items).toHaveLength(0);
  });

  it('clears the cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => result.current.addItem(sampleItem));
    act(() => result.current.clear());
    expect(result.current.items).toHaveLength(0);
  });

  it('persists to localStorage', async () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => result.current.addItem(sampleItem));

    await waitFor(() => {
      const stored = window.localStorage.getItem('zara-mobile-cart:v1');
      expect(stored).not.toBeNull();
      const parsed = JSON.parse(stored ?? '[]');
      expect(parsed).toHaveLength(1);
      expect(parsed[0].name).toBe('iPhone 16');
    });
  });

  it('hydrates from localStorage on mount', async () => {
    const seed = [
      {
        lineId: 'seed_1',
        ...sampleItem,
      },
    ];
    window.localStorage.setItem('zara-mobile-cart:v1', JSON.stringify(seed));

    const { result } = renderHook(() => useCart(), { wrapper });

    await waitFor(() => {
      expect(result.current.items).toHaveLength(1);
      expect(result.current.items[0].lineId).toBe('seed_1');
    });
  });
});

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchProductById, fetchProducts } from '@/api/products';

const DISPLAY_LIMIT = 20;
const FETCH_LIMIT = 24;

export const useProducts = (search: string) => {
  const normalized = search.trim();
  return useQuery({
    queryKey: ['products', { search: normalized, limit: DISPLAY_LIMIT }],
    queryFn: async () => {
      const results = await fetchProducts({ search: normalized, limit: FETCH_LIMIT });
      return results.slice(0, DISPLAY_LIMIT);
    },
    placeholderData: keepPreviousData,
    staleTime: 60_000,
  });
};

export const useProduct = (id: string | undefined) =>
  useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProductById(id as string),
    enabled: Boolean(id),
    staleTime: 60_000,
  });

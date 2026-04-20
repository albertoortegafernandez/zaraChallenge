import type { ProductDetail, ProductSummary } from '@/types';
import { request } from './http';

type RawProductSummary = {
  id: string;
  brand: string;
  name: string;
  basePrice: number | string;
  imageUrl: string;
};

type RawColor = { name: string; hexCode: string; imageUrl: string };
type RawStorage = { capacity: string; price: number | string };

type RawProductDetail = RawProductSummary & {
  description?: string;
  rating?: number;
  colorOptions?: RawColor[] | null;
  storageOptions?: RawStorage[] | null;
  similarProducts?: RawProductSummary[] | null;
  [key: string]: unknown;
};

const toNumber = (value: number | string | undefined, fallback = 0): number => {
  if (typeof value === 'number') return value;
  if (typeof value === 'string') {
    const n = Number(value);
    return Number.isFinite(n) ? n : fallback;
  }
  return fallback;
};

const normalizeSummary = (raw: RawProductSummary): ProductSummary => ({
  id: String(raw.id),
  brand: raw.brand ?? '',
  name: raw.name ?? '',
  basePrice: toNumber(raw.basePrice),
  imageUrl: raw.imageUrl ?? '',
});

export const dedupeById = (items: ProductSummary[]): ProductSummary[] => {
  const seen = new Set<string>();
  const result: ProductSummary[] = [];
  for (const item of items) {
    if (seen.has(item.id)) continue;
    seen.add(item.id);
    result.push(item);
  }
  return result;
};

const SPEC_KEYS: Array<keyof RawProductDetail> = [
  'screen',
  'resolution',
  'processor',
  'mainCamera',
  'selfieCamera',
  'battery',
  'os',
  'screenRefreshRate',
];

const normalizeDetail = (raw: RawProductDetail): ProductDetail => {
  const specs: Record<string, string> = {};
  for (const key of SPEC_KEYS) {
    const value = raw[key];
    if (typeof value === 'string' && value.length > 0) {
      specs[key as string] = value;
    }
  }

  return {
    ...normalizeSummary(raw),
    description: typeof raw.description === 'string' ? raw.description : undefined,
    rating: typeof raw.rating === 'number' ? raw.rating : undefined,
    specs,
    colorOptions: Array.isArray(raw.colorOptions) ? raw.colorOptions : [],
    storageOptions: Array.isArray(raw.storageOptions)
      ? raw.storageOptions.map((s) => ({ capacity: s.capacity, price: toNumber(s.price) }))
      : [],
    similarProducts: Array.isArray(raw.similarProducts)
      ? dedupeById(raw.similarProducts.map(normalizeSummary))
      : [],
  };
};

export interface FetchProductsParams {
  search?: string;
  limit?: number;
  offset?: number;
}

export async function fetchProducts(params: FetchProductsParams = {}): Promise<ProductSummary[]> {
  const query = new URLSearchParams();
  if (params.search && params.search.trim().length > 0) query.set('search', params.search.trim());
  if (typeof params.limit === 'number') query.set('limit', String(params.limit));
  if (typeof params.offset === 'number') query.set('offset', String(params.offset));

  const suffix = query.toString() ? `?${query.toString()}` : '';
  const raw = await request<RawProductSummary[]>(`/products${suffix}`);
  return Array.isArray(raw) ? dedupeById(raw.map(normalizeSummary)) : [];
}

export async function fetchProductById(id: string): Promise<ProductDetail> {
  const raw = await request<RawProductDetail>(`/products/${encodeURIComponent(id)}`);
  return normalizeDetail(raw);
}

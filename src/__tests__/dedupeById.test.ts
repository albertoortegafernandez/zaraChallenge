import { dedupeById } from '@/api/products';
import type { ProductSummary } from '@/types';

const make = (id: string, name = id): ProductSummary => ({
  id,
  brand: 'Brand',
  name,
  basePrice: 100,
  imageUrl: '',
});

describe('dedupeById', () => {
  it('removes duplicate entries keeping first occurrence', () => {
    const items = [make('A', 'first-A'), make('B'), make('A', 'second-A'), make('C')];
    const result = dedupeById(items);
    expect(result.map((p) => p.id)).toEqual(['A', 'B', 'C']);
    expect(result[0].name).toBe('first-A');
  });

  it('returns the same list when all ids are unique', () => {
    const items = [make('X'), make('Y'), make('Z')];
    expect(dedupeById(items)).toHaveLength(3);
  });

  it('returns an empty array for an empty input', () => {
    expect(dedupeById([])).toEqual([]);
  });
});

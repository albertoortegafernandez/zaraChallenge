import { formatPrice } from '@/utils/format';

describe('formatPrice', () => {
  it('formats integer values in EUR', () => {
    const value = formatPrice(1199);
    expect(value).toMatch(/1[\s.]?199/);
    expect(value).toMatch(/€/);
  });

  it('handles non-finite values safely', () => {
    expect(formatPrice(Number.NaN)).toMatch(/0/);
  });
});

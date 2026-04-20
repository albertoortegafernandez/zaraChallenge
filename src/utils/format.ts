const priceFormatter = new Intl.NumberFormat('es-ES', {
  style: 'currency',
  currency: 'EUR',
  maximumFractionDigits: 0,
});

export const formatPrice = (value: number): string => {
  if (!Number.isFinite(value)) return priceFormatter.format(0);
  return priceFormatter.format(value);
};

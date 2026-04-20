import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/styles/theme';
import ProductCard from '@/components/ProductCard/ProductCard';

const product = {
  id: '42',
  brand: 'Samsung',
  name: 'Galaxy S24',
  basePrice: 899,
  imageUrl: 'https://img/galaxy.png',
};

const renderCard = () =>
  render(
    <MemoryRouter>
      <ThemeProvider theme={theme}>
        <ProductCard product={product} />
      </ThemeProvider>
    </MemoryRouter>,
  );

describe('ProductCard', () => {
  it('renders brand, name and price', () => {
    renderCard();
    expect(screen.getByText('Samsung')).toBeInTheDocument();
    expect(screen.getByText('Galaxy S24')).toBeInTheDocument();
    expect(screen.getByText(/899/)).toBeInTheDocument();
  });

  it('links to the detail page', () => {
    renderCard();
    const link = screen.getByRole('link', { name: /samsung galaxy s24/i });
    expect(link).toHaveAttribute('href', '/product/42');
  });
});

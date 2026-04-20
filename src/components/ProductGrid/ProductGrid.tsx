import styled from 'styled-components';
import type { ProductSummary } from '@/types';
import ProductCard from '@/components/ProductCard/ProductCard';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  border-left: 1px solid ${({ theme }) => theme.colors.border};

  > * {
    border-right: 1px solid ${({ theme }) => theme.colors.border};
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const Cell = styled.div`
  display: flex;
`;

interface Props {
  products: ProductSummary[];
}

const ProductGrid = ({ products }: Props) => (
  <Grid role="list">
    {products.map((p) => (
      <Cell role="listitem" key={p.id}>
        <ProductCard product={p} />
      </Cell>
    ))}
  </Grid>
);

export default ProductGrid;

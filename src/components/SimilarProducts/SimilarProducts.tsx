import styled from 'styled-components';
import type { ProductSummary } from '@/types';
import ProductCard from '@/components/ProductCard/ProductCard';

const Section = styled.section`
  margin-top: 64px;
`;

const Title = styled.h2`
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  font-weight: 600;
  margin: 0 0 24px;
  text-align: center;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 24px;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

interface Props {
  products: ProductSummary[];
}

const SimilarProducts = ({ products }: Props) => {
  if (!products.length) return null;
  return (
    <Section aria-labelledby="similar-title">
      <Title id="similar-title">Productos similares</Title>
      <Grid role="list">
        {products.slice(0, 4).map((p) => (
          <div role="listitem" key={p.id}>
            <ProductCard product={p} />
          </div>
        ))}
      </Grid>
    </Section>
  );
};

export default SimilarProducts;

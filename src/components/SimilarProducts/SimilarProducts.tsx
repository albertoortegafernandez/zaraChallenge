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
`;

const Scroller = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0 0 20px;
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: minmax(200px, 1fr);
  gap: 0;
  overflow-x: auto;
  overflow-y: hidden;
  scroll-snap-type: x proximity;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  border-left: 1px solid ${({ theme }) => theme.colors.border};

  scrollbar-width: thin;
  scrollbar-color: ${({ theme }) => theme.colors.text} ${({ theme }) => theme.colors.border};

  &::-webkit-scrollbar {
    height: 3px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.border};
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.text};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-auto-columns: minmax(220px, 1fr);
  }
`;

const Item = styled.li`
  scroll-snap-align: start;
  min-width: 0;
  display: flex;
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

interface Props {
  products: ProductSummary[];
}

const SimilarProducts = ({ products }: Props) => {
  if (!products.length) return null;
  return (
    <Section aria-labelledby="similar-title">
      <Title id="similar-title">Productos similares</Title>
      <Scroller aria-label="Productos similares">
        {products.map((p) => (
          <Item key={p.id}>
            <ProductCard product={p} />
          </Item>
        ))}
      </Scroller>
    </Section>
  );
};

export default SimilarProducts;

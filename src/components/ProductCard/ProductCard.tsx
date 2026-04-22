import { Link } from 'react-router-dom';
import styled from 'styled-components';
import type { ProductSummary } from '@/types';
import { formatPrice } from '@/utils/format';

const HOVER_TRANSITION = 'cubic-bezier(0.4, 0, 0.2, 1)';

const Card = styled(Link)`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 24px;
  color: inherit;
  background: ${({ theme }) => theme.colors.bg};
  -webkit-tap-highlight-color: transparent;
  transition:
    background 300ms ${HOVER_TRANSITION},
    color 300ms ${HOVER_TRANSITION};
  position: relative;
  overflow: hidden;
  isolation: isolate;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: ${({ theme }) => theme.colors.text};
    transform: translateY(100%);
    transition: transform 350ms ${HOVER_TRANSITION};
    z-index: -1;
    pointer-events: none;
  }

  &:hover::before {
    transform: translateY(0);
  }

  &:hover {
    color: ${({ theme }) => theme.colors.bg};
  }

  &:focus {
    outline: none;
  }

  &:focus-visible {
    outline: none;
  }

  &:focus-visible h3 {
    text-decoration: underline;
    text-underline-offset: 3px;
  }
`;

const ImageBox = styled.div`
  position: relative;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
  margin-bottom: 16px;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const Meta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 0 4px;
`;

const Brand = styled.span`
  font-size: 11px;
  color: currentColor;
  opacity: 0.6;
  text-transform: uppercase;
  letter-spacing: 0.2em;
`;

const NameRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 8px;
`;

const Name = styled.h3`
  margin: 0;
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: currentColor;
`;

const Price = styled.span`
  font-size: 14px;
  font-weight: 400;
  color: currentColor;
  white-space: nowrap;
  flex-shrink: 0;
`;

const Fallback = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #ddd, #f5f5f5);
`;

interface Props {
  product: ProductSummary;
}

const ProductCard = ({ product }: Props) => {
  return (
    <Card to={`/product/${product.id}`} aria-label={`${product.brand} ${product.name}`}>
      <ImageBox>
        {product.imageUrl ? (
          <img src={product.imageUrl} alt="" loading="lazy" />
        ) : (
          <Fallback aria-hidden="true" />
        )}
      </ImageBox>
      <Meta>
        <Brand>{product.brand}</Brand>
        <NameRow>
          <Name>{product.name}</Name>
          <Price>{formatPrice(product.basePrice)}</Price>
        </NameRow>
      </Meta>
    </Card>
  );
};

export default ProductCard;

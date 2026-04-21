import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Spinner from '@/components/Spinner/Spinner';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
import ColorSelector from '@/components/ColorSelector/ColorSelector';
import StorageSelector from '@/components/StorageSelector/StorageSelector';
import SpecsList from '@/components/SpecsList/SpecsList';
import SimilarProducts from '@/components/SimilarProducts/SimilarProducts';
import { useProduct } from '@/hooks/useProducts';
import { useCart } from '@/contexts/useCart';
import type { ProductColor, ProductStorage } from '@/types';
import { formatPrice } from '@/utils/format';

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.25em;
  font-weight: 500;
  margin-bottom: 40px;
  color: ${({ theme }) => theme.colors.text};

  &:hover {
    opacity: 0.6;
  }
`;

const BackArrow = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M15 18l-6-6 6-6" />
  </svg>
);

const Layout = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 64px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: 32px;
  }
`;

const ImageBox = styled.div`
  background: ${({ theme }) => theme.colors.bg};
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1;
  padding: 32px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const InfoColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

const Brand = styled.p`
  margin: 0;
  font-size: 12px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const Name = styled.h1`
  margin: 0;
  font-size: 28px;
  font-weight: 500;
`;

const Price = styled.p`
  margin: 0;
  font-size: 22px;
  font-weight: 600;
`;


const AddButton = styled.button`
  padding: 16px 24px;
  width: 100%;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.25em;
  background: ${({ theme }) => theme.colors.text};
  color: ${({ theme }) => theme.colors.bg};
  border: 1px solid ${({ theme }) => theme.colors.text};
  transition: opacity ${({ theme }) => theme.transitions.base};

  &:hover:not(:disabled) {
    opacity: 0.85;
  }

  &:disabled {
    background: transparent;
    color: ${({ theme }) => theme.colors.textMuted};
    border-color: ${({ theme }) => theme.colors.border};
    cursor: not-allowed;
  }
`;

const SpecsSection = styled.section`
  margin-top: 48px;
`;

const SpecsTitle = styled.h2`
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  font-weight: 600;
  margin: 0 0 24px;
`;

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isLoading, isError, refetch } = useProduct(id);
  const { addItem } = useCart();

  const [color, setColor] = useState<ProductColor | null>(null);
  const [storage, setStorage] = useState<ProductStorage | null>(null);

  useEffect(() => {
    setColor(null);
    setStorage(null);
  }, [id]);

  useEffect(() => {
    if (data?.name) document.title = `${data.brand} ${data.name} — Mobile Shop`;
  }, [data]);

  const currentPrice = useMemo(() => {
    if (!data) return 0;
    return storage ? storage.price : data.basePrice;
  }, [data, storage]);

  const currentImage =
    color?.imageUrl || data?.colorOptions?.[0]?.imageUrl || data?.imageUrl || '';

  const canAdd = Boolean(color && storage);

  const handleAdd = () => {
    if (!data || !color || !storage) return;
    addItem({
      productId: data.id,
      name: data.name,
      brand: data.brand,
      imageUrl: currentImage,
      color,
      storage,
      price: currentPrice,
    });
    navigate('/cart');
  };

  if (isLoading) return <Spinner label="Cargando producto" />;
  if (isError || !data)
    return (
      <ErrorMessage
        message="No hemos podido cargar el producto."
        onRetry={() => {
          void refetch();
        }}
      />
    );

  return (
    <article>
      <BackLink to="/" aria-label="Volver al catálogo">
        <BackArrow />
        Volver
      </BackLink>
      <Layout>
        <ImageBox>
          {currentImage ? (
            <img src={currentImage} alt={`${data.brand} ${data.name}`} />
          ) : (
            <div aria-hidden="true" style={{ width: '70%', height: '70%', background: '#eee' }} />
          )}
        </ImageBox>
        <InfoColumn>
          <div>
            <Brand>{data.brand}</Brand>
            <Name>{data.name}</Name>
          </div>
          <Price aria-label={`Precio ${formatPrice(currentPrice)}`}>
            {formatPrice(currentPrice)}
          </Price>
          <StorageSelector
            options={data.storageOptions}
            selected={storage}
            onSelect={setStorage}
          />
          <ColorSelector options={data.colorOptions} selected={color} onSelect={setColor} />
          <AddButton
            type="button"
            onClick={handleAdd}
            disabled={!canAdd}
            aria-disabled={!canAdd}
          >
            Añadir al carrito
          </AddButton>
        </InfoColumn>
      </Layout>

      <SpecsSection aria-labelledby="specs-title">
        <SpecsTitle id="specs-title">Especificaciones</SpecsTitle>
        <SpecsList specs={data.specs} />
      </SpecsSection>

      <SimilarProducts products={data.similarProducts} />
    </article>
  );
};

export default ProductDetail;

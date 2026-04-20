import { useEffect, useState } from 'react';
import styled from 'styled-components';
import SearchBar from '@/components/SearchBar/SearchBar';
import ProductGrid from '@/components/ProductGrid/ProductGrid';
import Spinner from '@/components/Spinner/Spinner';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
import { useProducts } from '@/hooks/useProducts';
import { useDebouncedValue } from '@/hooks/useDebouncedValue';

const Page = styled.section`
  display: flex;
  flex-direction: column;
`;

const Empty = styled.p`
  padding: 40px 0;
  text-align: center;
  color: ${({ theme }) => theme.colors.textMuted};
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 13px;
`;

const ProductsList = () => {
  const [search, setSearch] = useState('');
  const debounced = useDebouncedValue(search, 300);
  const { data, isLoading, isError, isFetching, refetch } = useProducts(debounced);

  useEffect(() => {
    document.title = 'Mobile Shop — Catálogo';
  }, []);

  const products = data ?? [];

  return (
    <Page aria-labelledby="catalog-title">
      <h1 id="catalog-title" className="sr-only">
        Catálogo de teléfonos móviles
      </h1>
      <SearchBar
        value={search}
        onChange={setSearch}
        resultsCount={products.length}
        isFetching={isFetching && !data}
      />
      {isLoading && <Spinner label="Cargando catálogo" />}
      {isError && (
        <ErrorMessage
          message="No hemos podido cargar el catálogo."
          onRetry={() => {
            void refetch();
          }}
        />
      )}
      {!isLoading && !isError && products.length === 0 && (
        <Empty>No se han encontrado resultados</Empty>
      )}
      {!isLoading && !isError && products.length > 0 && <ProductGrid products={products} />}
    </Page>
  );
};

export default ProductsList;

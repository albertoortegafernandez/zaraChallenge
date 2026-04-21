import styled from 'styled-components';
import type { ChangeEvent } from 'react';

const Wrapper = styled.div`
  position: sticky;
  top: ${({ theme }) => theme.sizes.navbarHeight};
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px 0;
  margin: -16px 0 16px;
  background: ${({ theme }) => theme.colors.bg};
`;

const InputRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.colors.text};
  padding: 10px 0;
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  padding: 4px 0;
  font-size: 16px;
  font-weight: 300;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.text};

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
    text-transform: uppercase;
    letter-spacing: 0.15em;
    font-weight: 300;
  }
`;

const Count = styled.span`
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const SearchIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
);

interface Props {
  value: string;
  onChange: (value: string) => void;
  resultsCount: number;
  isFetching?: boolean;
}

const SearchBar = ({ value, onChange, resultsCount, isFetching }: Props) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value);

  return (
    <Wrapper>
      <InputRow>
        <SearchIcon />
        <SearchInput
          type="search"
          placeholder="Buscar un teléfono…"
          value={value}
          onChange={handleChange}
          aria-label="Buscar teléfonos por nombre o marca"
        />
      </InputRow>
      <Count aria-live="polite" data-testid="results-count">
        {isFetching ? 'Cargando…' : `${resultsCount} Resultados`}
      </Count>
    </Wrapper>
  );
};

export default SearchBar;

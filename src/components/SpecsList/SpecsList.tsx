import styled from 'styled-components';
import type { ProductSpecs } from '@/types';

const List = styled.dl`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px 32px;
  margin: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding: 10px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const Term = styled.dt`
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const Value = styled.dd`
  margin: 0;
  font-size: 13px;
  text-align: right;
`;

const SPEC_LABELS: Record<string, string> = {
  screen: 'Pantalla',
  resolution: 'Resolución',
  processor: 'Procesador',
  mainCamera: 'Cámara principal',
  selfieCamera: 'Cámara frontal',
  battery: 'Batería',
  os: 'Sistema operativo',
  screenRefreshRate: 'Tasa de refresco',
};

interface Props {
  specs: ProductSpecs;
}

const SpecsList = ({ specs }: Props) => {
  const entries = Object.entries(specs).filter(([, v]) => typeof v === 'string' && v);
  if (entries.length === 0) return null;

  return (
    <List>
      {entries.map(([key, value]) => (
        <Row key={key}>
          <Term>{SPEC_LABELS[key] ?? key}</Term>
          <Value>{value}</Value>
        </Row>
      ))}
    </List>
  );
};

export default SpecsList;

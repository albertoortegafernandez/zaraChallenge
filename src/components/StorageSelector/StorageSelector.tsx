import styled from 'styled-components';
import type { ProductStorage } from '@/types';

const Group = styled.fieldset`
  border: none;
  margin: 0;
  padding: 0;
`;

const Legend = styled.legend`
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: 12px;
`;

const List = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const Option = styled.button<{ $selected: boolean }>`
  padding: 10px 18px;
  font-size: 13px;
  letter-spacing: 0.08em;
  border: 1px solid
    ${({ $selected, theme }) => ($selected ? theme.colors.text : theme.colors.border)};
  background: ${({ $selected, theme }) => ($selected ? theme.colors.text : 'transparent')};
  color: ${({ $selected, theme }) => ($selected ? theme.colors.bg : theme.colors.text)};
  cursor: pointer;
  transition:
    background ${({ theme }) => theme.transitions.base},
    color ${({ theme }) => theme.transitions.base};

  &:hover {
    border-color: ${({ theme }) => theme.colors.text};
  }
`;

interface Props {
  options: ProductStorage[];
  selected: ProductStorage | null;
  onSelect: (storage: ProductStorage) => void;
}

const StorageSelector = ({ options, selected, onSelect }: Props) => {
  if (options.length === 0) return null;

  return (
    <Group>
      <Legend>Almacenamiento. Selecciona una opción</Legend>
      <List role="radiogroup" aria-label="Almacenamiento">
        {options.map((opt) => {
          const isSelected = selected?.capacity === opt.capacity;
          return (
            <Option
              key={opt.capacity}
              type="button"
              role="radio"
              aria-checked={isSelected}
              $selected={isSelected}
              onClick={() => onSelect(opt)}
            >
              {opt.capacity}
            </Option>
          );
        })}
      </List>
    </Group>
  );
};

export default StorageSelector;

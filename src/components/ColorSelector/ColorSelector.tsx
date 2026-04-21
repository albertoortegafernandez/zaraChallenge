import styled from 'styled-components';
import type { ProductColor } from '@/types';

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

const Swatches = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

const SwatchButton = styled.button<{ $selected: boolean; $color: string }>`
  width: 28px;
  height: 28px;
  border-radius: 2px;
  padding: 0;
  background: ${({ $color }) => $color};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ $selected, theme }) =>
    $selected ? `0 0 0 2px ${theme.colors.bg}, 0 0 0 3px ${theme.colors.text}` : 'none'};
  cursor: pointer;
  transition: box-shadow ${({ theme }) => theme.transitions.base};

  &:hover {
    box-shadow: ${({ $selected, theme }) =>
      $selected
        ? `0 0 0 2px ${theme.colors.bg}, 0 0 0 3px ${theme.colors.text}`
        : `0 0 0 2px ${theme.colors.bg}, 0 0 0 3px ${theme.colors.border}`};
  }
`;

const SelectedLabel = styled.span`
  display: block;
  margin-top: 12px;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

interface Props {
  options: ProductColor[];
  selected: ProductColor | null;
  onSelect: (color: ProductColor) => void;
}

const ColorSelector = ({ options, selected, onSelect }: Props) => {
  if (options.length === 0) return null;

  return (
    <Group>
      <Legend>Color. Selecciona una opción</Legend>
      <Swatches role="radiogroup" aria-label="Color">
        {options.map((color) => {
          const isSelected = selected?.name === color.name;
          return (
            <SwatchButton
              key={color.name}
              type="button"
              role="radio"
              aria-checked={isSelected}
              aria-label={color.name}
              title={color.name}
              $color={color.hexCode}
              $selected={isSelected}
              onClick={() => onSelect(color)}
            />
          );
        })}
      </Swatches>
      {selected && <SelectedLabel>{selected.name}</SelectedLabel>}
    </Group>
  );
};

export default ColorSelector;

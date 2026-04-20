import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/styles/theme';
import StorageSelector from '@/components/StorageSelector/StorageSelector';

const options = [
  { capacity: '128GB', price: 999 },
  { capacity: '256GB', price: 1099 },
];

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);

describe('StorageSelector', () => {
  it('marks the selected option as checked', () => {
    renderWithTheme(
      <StorageSelector options={options} selected={options[1]} onSelect={jest.fn()} />,
    );
    const radios = screen.getAllByRole('radio');
    expect(radios[0]).toHaveAttribute('aria-checked', 'false');
    expect(radios[1]).toHaveAttribute('aria-checked', 'true');
  });

  it('calls onSelect when an option is chosen', async () => {
    const onSelect = jest.fn();
    renderWithTheme(<StorageSelector options={options} selected={null} onSelect={onSelect} />);
    await userEvent.click(screen.getAllByRole('radio')[0]);
    expect(onSelect).toHaveBeenCalledWith(options[0]);
  });
});

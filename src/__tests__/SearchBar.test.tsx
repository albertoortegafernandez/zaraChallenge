import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/styles/theme';
import SearchBar from '@/components/SearchBar/SearchBar';

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);

describe('SearchBar', () => {
  it('shows the results count', () => {
    renderWithTheme(<SearchBar value="" onChange={jest.fn()} resultsCount={7} />);
    expect(screen.getByTestId('results-count')).toHaveTextContent('7 Resultados');
  });

  it('shows loading indicator when fetching without data', () => {
    renderWithTheme(
      <SearchBar value="" onChange={jest.fn()} resultsCount={0} isFetching />,
    );
    expect(screen.getByTestId('results-count')).toHaveTextContent(/cargando/i);
  });

  it('calls onChange when typing', async () => {
    const onChange = jest.fn();
    renderWithTheme(<SearchBar value="" onChange={onChange} resultsCount={0} />);
    const input = screen.getByRole('searchbox', { name: /buscar teléfonos/i });
    await userEvent.type(input, 'apple');
    expect(onChange).toHaveBeenCalled();
    expect(onChange).toHaveBeenLastCalledWith('e');
  });
});

import styled from 'styled-components';

const Box = styled.div`
  padding: 24px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  text-align: center;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.danger};
`;

interface Props {
  message?: string;
  onRetry?: () => void;
}

const RetryButton = styled.button`
  margin-top: 12px;
  padding: 8px 16px;
  font-size: 12px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  border: 1px solid ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.text};
  color: ${({ theme }) => theme.colors.bg};

  &:hover {
    opacity: 0.85;
  }
`;

const ErrorMessage = ({ message = 'Se ha producido un error.', onRetry }: Props) => (
  <Box role="alert">
    {message}
    {onRetry && (
      <div>
        <RetryButton type="button" onClick={onRetry}>
          Reintentar
        </RetryButton>
      </div>
    )}
  </Box>
);

export default ErrorMessage;

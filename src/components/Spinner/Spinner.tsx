import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const Wrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 0;
`;

const Ring = styled.div`
  width: 28px;
  height: 28px;
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-top-color: ${({ theme }) => theme.colors.text};
  border-radius: 50%;
  animation: ${spin} 0.9s linear infinite;
`;

const Spinner = ({ label = 'Cargando' }: { label?: string }) => (
  <Wrap role="status" aria-live="polite" aria-label={label}>
    <Ring aria-hidden="true" />
    <span className="sr-only">{label}</span>
  </Wrap>
);

export default Spinner;

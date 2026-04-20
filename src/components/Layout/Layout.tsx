import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from '@/components/Navbar/Navbar';

const Main = styled.main`
  flex: 1;
  width: 100%;
  max-width: ${({ theme }) => theme.sizes.maxWidth};
  margin: 0 auto;
  padding: 32px 24px 64px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 20px 16px 48px;
  }
`;

const Footer = styled.footer`
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding: 20px 24px;
  font-size: 11px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
  text-align: center;
`;

const Layout = () => {
  return (
    <>
      <Navbar />
      <Main>
        <Outlet />
      </Main>
      <Footer>Mobile Shop — {new Date().getFullYear()}</Footer>
    </>
  );
};

export default Layout;

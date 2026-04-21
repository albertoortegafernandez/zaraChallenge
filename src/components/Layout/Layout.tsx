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

const Layout = () => (
  <>
    <Navbar />
    <Main>
      <Outlet />
    </Main>
  </>
);

export default Layout;

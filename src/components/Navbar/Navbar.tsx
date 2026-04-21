import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useCart } from '@/contexts/useCart';

const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: 20;
  background-color: ${({ theme }) => theme.colors.bg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const Inner = styled.div`
  max-width: ${({ theme }) => theme.sizes.maxWidth};
  height: ${({ theme }) => theme.sizes.navbarHeight};
  margin: 0 auto;
  padding: 0 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 0 16px;
  }
`;

const BrandLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  font-family: ${({ theme }) => theme.fonts.base};
  font-weight: 700;
  letter-spacing: 0.35em;
  font-size: 18px;
  text-transform: uppercase;
  line-height: 1;
  color: ${({ theme }) => theme.colors.text};

  &:hover {
    opacity: 0.75;
  }
`;

const CartLink = styled(Link)`
  position: relative;
  display: inline-flex;
  align-items: center;
  padding: 8px;
  color: ${({ theme }) => theme.colors.text};

  &:hover {
    opacity: 0.7;
  }
`;

const Badge = styled.span`
  position: absolute;
  top: -2px;
  right: -4px;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 9px;
  background: ${({ theme }) => theme.colors.text};
  color: ${({ theme }) => theme.colors.bg};
  font-size: 10px;
  font-weight: 700;
  line-height: 1;
`;

const CartIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);

const Navbar = () => {
  const { itemCount } = useCart();

  return (
    <Header>
      <Inner>
        <BrandLink to="/" aria-label="Ir al inicio">
          MOBILE
        </BrandLink>
        <nav aria-label="Navegación principal">
          <CartLink to="/cart" aria-label={`Carrito con ${itemCount} artículos`}>
            <CartIcon />
            {itemCount > 0 && (
              <Badge aria-hidden="true" data-testid="cart-badge">
                {itemCount}
              </Badge>
            )}
            <span className="sr-only" data-testid="cart-badge-sr">
              {itemCount}
            </span>
          </CartLink>
        </nav>
      </Inner>
    </Header>
  );
};

export default Navbar;

import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useCart } from '@/contexts/useCart';
import { formatPrice } from '@/utils/format';

const Title = styled.h1`
  font-size: 14px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  font-weight: 600;
  margin: 0 0 32px;
`;

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
`;

const Item = styled.li`
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 32px;
  padding: 24px 0;
  align-items: start;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 100px 1fr;
    gap: 16px;
  }
`;

const Thumb = styled.div`
  width: 100%;
  aspect-ratio: 1;
  background: ${({ theme }) => theme.colors.surface};
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    max-width: 80%;
    max-height: 80%;
    object-fit: contain;
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding-top: 4px;

  .name {
    font-size: 13px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: ${({ theme }) => theme.colors.text};
  }
  .variant {
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: ${({ theme }) => theme.colors.textMuted};
  }
  .price {
    font-size: 13px;
    font-weight: 500;
    margin-top: 2px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
`;

const RemoveButton = styled.button`
  align-self: flex-start;
  margin-top: 12px;
  background: none;
  border: none;
  padding: 0;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${({ theme }) => theme.colors.danger};
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }
`;

const BottomBar = styled.div<{ $hasItems: boolean }>`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 32px;
  background: ${({ theme }) => theme.colors.bg};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  gap: 16px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 12px 16px;
    gap: 12px;
    ${({ $hasItems }) =>
      $hasItems
        ? `
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-areas:
        "total total"
        "continue pay";
    `
        : `flex-direction: column; align-items: stretch;`}
  }
`;

const BottomSpacer = styled.div`
  height: 72px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    height: 140px;
  }
`;

const TotalBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  font-weight: 500;

  .amount {
    font-weight: 700;
    font-size: 13px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-area: total;
    justify-content: space-between;
    padding: 4px 0;
  }
`;

const ContinueButton = styled.button`
  padding: 14px 24px;
  font-size: 11px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid ${({ theme }) => theme.colors.text};
  cursor: pointer;
  white-space: nowrap;
  transition: opacity ${({ theme }) => theme.transitions.base};

  &:hover {
    opacity: 0.7;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-area: continue;
    padding: 14px 12px;
    font-size: 10px;
    letter-spacing: 0.15em;
  }
`;

const PayButton = styled.button`
  padding: 14px 48px;
  font-size: 11px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  background: ${({ theme }) => theme.colors.text};
  color: ${({ theme }) => theme.colors.bg};
  border: 1px solid ${({ theme }) => theme.colors.text};
  cursor: pointer;
  white-space: nowrap;
  transition: opacity ${({ theme }) => theme.transitions.base};

  &:hover {
    opacity: 0.85;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-area: pay;
    padding: 14px 12px;
  }
`;

const Cart = () => {
  const { items, totalPrice, removeItem } = useCart();
  const navigate = useNavigate();

  return (
    <>
      <section aria-labelledby="cart-title">
        <Title id="cart-title">Carrito ({items.length})</Title>

        {items.length > 0 && (
          <List>
            {items.map((item) => (
              <Item key={item.lineId}>
                <Thumb>
                  {item.imageUrl && (
                    <img src={item.imageUrl} alt={`${item.brand} ${item.name}`} />
                  )}
                </Thumb>
                <Info>
                  <Link to={`/product/${item.productId}`} className="name">
                    {item.brand} {item.name}
                  </Link>
                  <span className="variant">
                    {item.storage.capacity} | {item.color.name}
                  </span>
                  <span className="price">{formatPrice(item.price)}</span>
                  <RemoveButton
                    type="button"
                    onClick={() => removeItem(item.lineId)}
                    aria-label={`Eliminar ${item.brand} ${item.name} del carrito`}
                  >
                    Eliminar
                  </RemoveButton>
                </Info>
              </Item>
            ))}
          </List>
        )}

        <BottomSpacer />
      </section>

      <BottomBar $hasItems={items.length > 0}>
        <ContinueButton type="button" onClick={() => navigate('/')}>
          Continuar comprando
        </ContinueButton>
        {items.length > 0 && (
          <>
            <TotalBlock>
              <span>Total</span>
              <span className="amount" aria-live="polite">
                {formatPrice(totalPrice)}
              </span>
            </TotalBlock>
            <PayButton type="button" onClick={() => navigate('/checkout')}>
              Pagar
            </PayButton>
          </>
        )}
      </BottomBar>
    </>
  );
};

export default Cart;

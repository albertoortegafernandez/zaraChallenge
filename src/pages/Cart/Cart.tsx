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

const EmptyState = styled.div`
  padding: 80px 0;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;

  p {
    margin: 0;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    font-size: 13px;
    color: ${({ theme }) => theme.colors.textMuted};
  }
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
  grid-template-columns: 120px 1fr auto;
  gap: 24px;
  padding: 24px 0;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  align-items: center;

  &:last-child {
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 80px 1fr;
    grid-template-areas:
      'image info'
      'actions actions';
    gap: 16px;
  }
`;

const Thumb = styled.div`
  aspect-ratio: 1;
  background: ${({ theme }) => theme.colors.surface};
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    max-width: 70%;
    max-height: 70%;
    object-fit: contain;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-area: image;
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-area: info;
  }

  .brand {
    font-size: 11px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.textMuted};
  }
  .name {
    font-size: 15px;
    font-weight: 500;
  }
  .variant {
    font-size: 12px;
    color: ${({ theme }) => theme.colors.textMuted};
    letter-spacing: 0.05em;
  }
  .price {
    font-size: 14px;
    font-weight: 600;
    margin-top: 4px;
  }
`;

const RemoveButton = styled.button`
  justify-self: end;
  padding: 10px 16px;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: border-color ${({ theme }) => theme.transitions.base};

  &:hover {
    border-color: ${({ theme }) => theme.colors.text};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-area: actions;
    justify-self: stretch;
  }
`;

const Summary = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 32px;
  gap: 24px;
  flex-wrap: wrap;

  .total {
    font-size: 16px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.12em;
  }
`;

const Actions = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

const PrimaryButton = styled.button`
  padding: 14px 24px;
  font-size: 12px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  background: ${({ theme }) => theme.colors.text};
  color: ${({ theme }) => theme.colors.bg};
  border: 1px solid ${({ theme }) => theme.colors.text};
`;

const SecondaryButton = styled(PrimaryButton)`
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
`;

const Cart = () => {
  const { items, totalPrice, removeItem, clear } = useCart();
  const navigate = useNavigate();

  return (
    <section aria-labelledby="cart-title">
      <Title id="cart-title">Carrito · {items.length} artículo(s)</Title>

      {items.length === 0 ? (
        <EmptyState>
          <p>Tu carrito está vacío</p>
          <PrimaryButton type="button" onClick={() => navigate('/')}>
            Continuar comprando
          </PrimaryButton>
        </EmptyState>
      ) : (
        <>
          <List>
            {items.map((item) => (
              <Item key={item.lineId}>
                <Thumb>
                  {item.imageUrl && <img src={item.imageUrl} alt={`${item.brand} ${item.name}`} />}
                </Thumb>
                <Info>
                  <span className="brand">{item.brand}</span>
                  <Link to={`/product/${item.productId}`} className="name">
                    {item.name}
                  </Link>
                  <span className="variant">
                    {item.storage.capacity} · {item.color.name}
                  </span>
                  <span className="price">{formatPrice(item.price)}</span>
                </Info>
                <RemoveButton
                  type="button"
                  onClick={() => removeItem(item.lineId)}
                  aria-label={`Eliminar ${item.brand} ${item.name} del carrito`}
                >
                  Eliminar
                </RemoveButton>
              </Item>
            ))}
          </List>

          <Summary>
            <span className="total" aria-live="polite">
              Total {formatPrice(totalPrice)}
            </span>
            <Actions>
              <SecondaryButton type="button" onClick={clear}>
                Vaciar carrito
              </SecondaryButton>
              <Link to="/">
                <PrimaryButton type="button">Continuar comprando</PrimaryButton>
              </Link>
            </Actions>
          </Summary>
        </>
      )}
    </section>
  );
};

export default Cart;

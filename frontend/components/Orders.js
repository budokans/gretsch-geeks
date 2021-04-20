import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Loader from 'react-loader-spinner';
import Head from 'next/head';
import Link from 'next/link';
import styled from 'styled-components';
import formatMoney from '../lib/formatMoney';
import DisplayError from './ErrorMessage';
import { LoadingStyles } from './styles/LoadingStyles';
import OrderItemStyles from './styles/OrderItemStyles';
import { useUser } from './User';

export const USER_ORDERS_QUERY = gql`
  query USER_ORDERS_QUERY($id: ID!) {
    allOrders(where: { user: { id: $id } }) {
      id
      charge
      total
      user {
        id
        name
      }
      items {
        id
        name
        description
        price
        quantity
        photo {
          image {
            publicUrlTransformed
          }
          altText
        }
      }
    }
  }
`;

const OrdersUl = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  grid-gap: 4rem;
  padding-left: 0;

  @media (max-width: 600px) {
    grid-gap: 2rem;

    h2 {
      font-size: 1rem;
    }
  }
`;

function countOrderItems(order) {
  return order.items.reduce((tally, item) => tally + item.quantity, 0);
}

export default function Orders() {
  const me = useUser();

  const { data, error, loading } = useQuery(USER_ORDERS_QUERY, {
    variables: { id: me.id },
  });

  if (loading)
    return (
      <LoadingStyles>
        <Loader
          type="TailSpin"
          color="#ff0000"
          height={80}
          width={80}
          className="spinner"
        />
      </LoadingStyles>
    );

  if (error) return <DisplayError error={error} />;

  const { allOrders } = data;

  return (
    <div>
      <Head>
        <title>Sick Fits | Your Orders ({allOrders.length})</title>
      </Head>
      <h2>You have {allOrders.length} orders!</h2>
      <OrdersUl>
        {allOrders.map((order) => (
          <OrderItemStyles key={order.id}>
            <Link href={`/order/${order.id}`}>
              <a>
                <div className="order-meta">
                  <p>{countOrderItems(order)} items</p>
                  <p>
                    {`${order.items.length} product${
                      order.items.length > 1 ? 's' : ''
                    }
                  `}
                  </p>
                  <p>{formatMoney(order.total)}</p>
                </div>
                <div className="images">
                  {order.items.map((item) => (
                    <img
                      key={item.id}
                      src={item.photo.image.publicUrlTransformed}
                      alt={item.photo.altText}
                    />
                  ))}
                </div>
              </a>
            </Link>
          </OrderItemStyles>
        ))}
      </OrdersUl>
    </div>
  );
}

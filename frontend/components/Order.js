import { useQuery } from '@apollo/client';
import Loader from 'react-loader-spinner';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import Head from 'next/head';
import formatMoney from '../lib/formatMoney';
import DisplayError from './ErrorMessage';
import OrderStyles from './styles/OrderStyles';
import { LoadingStyles } from './styles/LoadingStyles';

const SINGLE_ORDER_QUERY = gql`
  query SINGLE_ORDER_QUERY($id: ID!) {
    order: Order(where: { id: $id }) {
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
            publicUrlTransformed(
              transformation: { crop: "limit", quality: "auto:good" }
            )
          }
          altText
        }
      }
    }
  }
`;

export default function Order({ id }) {
  const { data, error, loading } = useQuery(SINGLE_ORDER_QUERY, {
    variables: { id },
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

  const { order } = data;

  return (
    <OrderStyles>
      <Head>
        <title>Sick Fits | {order.user.name}'s Order</title>
      </Head>
      <p>
        <span>Order ID:</span>
        <span>{order.id}</span>
      </p>
      <p>
        <span>Item count:</span>
        <span>
          {order.items
            .map((item) => item.quantity)
            .reduce((tally, quantity) => tally + quantity)}
        </span>
      </p>
      <p>
        <span>Order total:</span>
        <span>{formatMoney(order.total)}</span>
      </p>

      <div className="items">
        {order.items.map((item) => (
          <div className="order-item" key={item.id}>
            <img
              src={item.photo.image.publicUrlTransformed}
              alt={item.photo.altText}
            />
            <div className="item-details">
              <h2>{item.name}</h2>
              <p>Qty: {item.quantity}</p>
              <p>Each: {formatMoney(item.price)}</p>
              <p>Subtotal: {formatMoney(item.price * item.quantity)}</p>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </OrderStyles>
  );
}

Order.propTypes = {
  id: PropTypes.string.isRequired,
};

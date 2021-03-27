import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import Head from 'next/head';
import styled from 'styled-components';
import DisplayError from './ErrorMessage';
import formatMoney from '../lib/formatMoney';

const ProductStyles = styled.div`
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  min-height: 800px;
  max-width: var(--max-width);
  justify-content: center;
  align-items: top;
  grid-gap: 2rem;

  img {
    width: 100%;
    object-fit: contain;
  }
`;

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    Product(where: { id: $id }) {
      name
      price
      description
      photo {
        image {
          publicUrlTransformed
        }
        altText
      }
    }
  }
`;

export default function SingleProduct({ id }) {
  const { data, error, loading } = useQuery(SINGLE_ITEM_QUERY, {
    variables: { id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <DisplayError error={error} />;

  const { Product: product } = data;

  return (
    <ProductStyles>
      <Head>
        <title>{product.name} | Sick Fits</title>
      </Head>
      <img
        src={product.photo.image.publicUrlTransformed}
        alt={product.photo.image.altText}
      />
      <div className="details">
        <h2>{product.name}</h2>
        <p>{formatMoney(product.price)}</p>
        <p>{product.description}</p>
      </div>
    </ProductStyles>
  );
}

SingleProduct.propTypes = {
  id: PropTypes.string.isRequired,
};

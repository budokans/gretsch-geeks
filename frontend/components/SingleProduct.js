import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import Head from 'next/head';
import DisplayError from './ErrorMessage';

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
    <>
      <Head>
        <title>{product.name} | Sick Fits</title>
      </Head>
      <img
        src={product.photo.image.publicUrlTransformed}
        alt={product.photo.image.altText}
      />
      <div className="details">
        <h2>{product.name}</h2>
        <p>{product.price}</p>
        <p>{product.description}</p>
      </div>
    </>
  );
}

SingleProduct.propTypes = {
  id: PropTypes.string.isRequired,
};

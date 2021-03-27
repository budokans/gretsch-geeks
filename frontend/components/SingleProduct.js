import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import DisplayError from './ErrorMessage';

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    Product(where: { id: $id }) {
      name
      price
      description
    }
  }
`;

export default function SingleProduct({ id }) {
  const { data, error, loading } = useQuery(SINGLE_ITEM_QUERY, {
    variables: { id },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <DisplayError error={error} />;

  return (
    <>
      <h2>{data.Product.name}</h2>
    </>
  );
}

SingleProduct.propTypes = {
  id: PropTypes.string.isRequired,
};

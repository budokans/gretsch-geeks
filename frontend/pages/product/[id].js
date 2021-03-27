import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    Product(where: { id: $id }) {
      name
      price
      description
    }
  }
`;

export default function SingleProduct({ query }) {
  const { data, error, loading } = useQuery(SINGLE_ITEM_QUERY, {
    variables: { id: query.id },
  });
  console.log({ data, error, loading });

  return <p>This is a single product: {query.id}</p>;
}

SingleProduct.propTypes = {
  query: PropTypes.object,
};

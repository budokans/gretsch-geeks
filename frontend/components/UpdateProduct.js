import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { useMutation, useQuery } from '@apollo/client';

const SINGLE_PRODUCT_QUERY = gql`
  query SINGLE_PRODUCT_QUERY($id: ID!) {
    Product(where: { id: $id }) {
      name
      description
      price
    }
  }
`;

const UPDATE_PRODUCT_MUTATION = gql`
  mutation UPDATE_PRODUCT_MUTATION(
    $id: ID!
    $name: String
    $description: String
    $price: Int
  ) {
    updateProduct(
      id: $id
      data: { id: $id, name: $name, description: $description, price: $price }
    ) {
      id
      name
      description
      price
    }
  }
`;

export default function UpdateProduct({ id }) {
  const { data, error, loading } = useQuery(SINGLE_PRODUCT_QUERY, {
    variables: { id },
  });

  const [
    updateProduct,
    { data: updateData, error: updateError, loading: updateLoading },
  ] = useMutation(UPDATE_PRODUCT_MUTATION, { variables: { id } });

  return <p>Update {id}</p>;
}

UpdateProduct.propTypes = {
  id: PropTypes.string.isRequired,
};

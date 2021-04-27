import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import Head from 'next/head';
import { useMutation, useQuery } from '@apollo/client';
import isEmpty from 'lodash.isempty';
import { useRouter } from 'next/router';
import Loader from 'react-loader-spinner';
import useForm from '../lib/useForm';
import DisplayError from './ErrorMessage';
import Form from './styles/Form';
import { LoadingStyles } from './styles/LoadingStyles';

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
      data: { name: $name, description: $description, price: $price }
    ) {
      id
      name
      description
      price
    }
  }
`;

export default function UpdateProduct({ id }) {
  const router = useRouter();

  const { data, error } = useQuery(SINGLE_PRODUCT_QUERY, {
    variables: { id },
  });

  const [
    updateProduct,
    { error: updateError, loading: updateLoading },
  ] = useMutation(UPDATE_PRODUCT_MUTATION, { variables: { id } });

  const { inputs, handleChange } = useForm(data?.Product);

  if (isEmpty(inputs))
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

  return (
    <>
      <Head>
        <title>Gretsch Geeks | Edit {inputs.name}</title>
      </Head>
      <Form
        onSubmit={async (e) => {
          e.preventDefault();
          await updateProduct({
            variables: {
              id,
              name: inputs.name,
              description: inputs.description,
              price: inputs.price,
            },
          }).catch((err) => console.error(err.message));
          router.push({ pathname: `product/${id}`, query: { isOwner: true } });
        }}
      >
        <DisplayError error={error || updateError} />

        <fieldset disabled={updateLoading} aria-busy={updateLoading}>
          <label htmlFor="name">
            Name
            <input
              required
              type="text"
              id="name"
              name="name"
              placeholder="name"
              value={inputs.name}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="price">
            Price
            <input
              required
              type="number"
              id="price"
              name="price"
              placeholder="Price"
              value={inputs.price}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="description">
            Description
            <textarea
              id="description"
              name="description"
              placeholder="Description"
              value={inputs.description}
              onChange={handleChange}
            />
          </label>

          <button type="submit">Update Product</button>
        </fieldset>
      </Form>
    </>
  );
}

UpdateProduct.propTypes = {
  id: PropTypes.string.isRequired,
};

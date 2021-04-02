import { useMutation } from '@apollo/client';
import Router from 'next/router';
import gql from 'graphql-tag';
import useForm from '../lib/useForm';
import Form from './styles/Form';
import DisplayError from './ErrorMessage';
import { ALL_PRODUCTS_QUERY } from './Products';
import { PAGINATION_QUERY } from './Pagination';

const CREATE_PRODUCT_MUTATION = gql`
  mutation CREATE_PRODUCT_MUTATION(
    $name: String!
    $price: Int!
    $description: String!
    $image: Upload!
  ) {
    createProduct(
      data: {
        name: $name
        price: $price
        description: $description
        status: "AVAILABLE"
        photo: { create: { image: $image, altText: $name } }
      }
    ) {
      id
    }
  }
`;

export default function CreateProduct() {
  const { inputs, handleChange, clearForm } = useForm({
    image: {},
    name: '',
    description: '',
    price: '',
  });

  const [createProduct, { error, loading }] = useMutation(
    CREATE_PRODUCT_MUTATION,
    {
      variables: inputs,
      update(cache, { data }) {
        const newProductFromResponse = data?.createProduct.Product;
        const existingProducts = cache.readQuery({ query: ALL_PRODUCTS_QUERY });

        if (existingProducts && newProductFromResponse) {
          cache.writeQuery({
            query: ALL_PRODUCTS_QUERY,
            data: {
              allProducts: [
                ...existingProducts?.allProducts,
                newProductFromResponse,
              ],
            },
          });
        }

        const prevProductsCount = cache.readQuery({ query: PAGINATION_QUERY });
        if (prevProductsCount) {
          cache.writeQuery({
            query: PAGINATION_QUERY,
            data: {
              _allProductsMeta: prevProductsCount + 1,
            },
          });
        }
      },
    }
  );

  return (
    <Form
      onSubmit={async (e) => {
        e.preventDefault();
        const res = await createProduct();
        clearForm();
        Router.push(`/product/${res.data.createProduct.id}`);
      }}
    >
      <DisplayError error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="image">
          Image
          <input
            required
            type="file"
            id="image"
            name="image"
            onChange={handleChange}
          />
        </label>
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
            min="500"
            max="2147483647"
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

        <button type="submit">+ Add Product</button>
      </fieldset>
    </Form>
  );
}

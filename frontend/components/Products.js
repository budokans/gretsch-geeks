import { useQuery } from '@apollo/client';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Router from 'next/router';
import Product from './Product';
import { perPage } from '../config';
import { PAGINATION_QUERY } from './Pagination';

export const ALL_PRODUCTS_QUERY = gql`
  query ALL_PRODUCTS_QUERY($skip: Int = 0, $first: Int) {
    allProducts(skip: $skip, first: $first) {
      id
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

const ProductsListStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
`;

export default function Products({ pageNum }) {
  const { data, error, loading } = useQuery(ALL_PRODUCTS_QUERY, {
    variables: { skip: pageNum * perPage - perPage, first: perPage },
  });

  const { data: countData } = useQuery(PAGINATION_QUERY);
  const productsCount = countData?._allProductsMeta.count;
  const pageCount = Math.ceil(productsCount / perPage);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Oh no! Error: {error.message}</p>;

  if (pageNum > pageCount) {
    Router.push(`/products/${pageCount}`);
  }

  return (
    <ProductsListStyles>
      {data?.allProducts.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </ProductsListStyles>
  );
}

Products.propTypes = {
  pageNum: PropTypes.number.isRequired,
};

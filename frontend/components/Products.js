import { useQuery } from '@apollo/client';
import Loader from 'react-loader-spinner';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Router from 'next/router';
import Product from './Product';
import { LoadingStyles } from './styles/LoadingStyles';
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
          publicUrlTransformed(
            transformation: {
              width: "400"
              crop: "limit"
              quality: "auto:best"
            }
          )
        }
        altText
      }
      user {
        id
      }
    }
  }
`;

const ProductsListStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
  margin-top: 2rem;
  margin-bottom: 2rem;
  text-align: center;

  @media (max-width: 600px) {
    display: flex;
    flex-direction: column;
    grid-gap: 0;
    width: 100%;
    margin-top: 0;
    margin-bottom: 0;
  }
`;

export default function ProductsSignedIn({ pageNum, user }) {
  const { data, error, loading } = useQuery(ALL_PRODUCTS_QUERY, {
    variables: { skip: pageNum * perPage - perPage, first: perPage },
  });

  const { data: countData } = useQuery(PAGINATION_QUERY);
  const productsCount = countData?._allProductsMeta.count;
  const pageCount = Math.ceil(productsCount / perPage);

  if (error) return <p>Oh no! Error: {error.message}</p>;

  if (pageNum > pageCount) {
    Router.push(`/products/${pageCount}`);
  }

  return (
    <>
      {loading && (
        <LoadingStyles>
          <Loader
            type="TailSpin"
            color="#ff0000"
            height={80}
            width={80}
            className="spinner"
          />
        </LoadingStyles>
      )}

      <ProductsListStyles>
        {data?.allProducts.map((product) => (
          <Product key={product.id} product={product} user={user} />
        ))}
      </ProductsListStyles>
    </>
  );
}

ProductsSignedIn.propTypes = {
  pageNum: PropTypes.number.isRequired,
  user: PropTypes.object,
};

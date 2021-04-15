import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import Head from 'next/head';
import styled from 'styled-components';
import Link from 'next/link';
import DisplayError from './ErrorMessage';
import formatMoney from '../lib/formatMoney';
import AddToCart from './AddToCart';
import DeleteProduct from './DeleteProduct';

const ProductStyles = styled.div`
  display: grid;
  padding: 2rem;
  border: 1px solid var(--lightGrey);
  grid-template-columns: 1fr 1fr;
  max-width: var(--maxWidth);
  margin: 0 auto;
  justify-content: center;
  align-items: top;
  grid-gap: 2rem;
  box-shadow: var(--bs);

  img {
    width: 100%;
    object-fit: contain;
  }

  .button-list {
    margin-top: 3rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    & > * {
      margin: 0.4rem 0;
      background: white;
      border: 2px solid var(--red);
      background-color: red;
      color: white;
      border-radius: 5px;
      font-size: 1.5rem;
      padding: 0.5rem 1rem;
      line-height: 1.3;
    }
    a {
      text-align: center;
    }
    a:hover {
      text-decoration: none;
    }
  }
`;

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    Product(where: { id: $id }) {
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

export default function SingleProduct({ id, isOwner, user }) {
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
        <div className="button-list">
          <AddToCart id={product.id} isSignedIn={!!user} />
          {user && !!isOwner && (
            <>
              <Link href={{ pathname: '/update', query: { id: product.id } }}>
                Edit
              </Link>
              <DeleteProduct id={product.id}>Delete</DeleteProduct>
            </>
          )}
        </div>
      </div>
    </ProductStyles>
  );
}

SingleProduct.propTypes = {
  id: PropTypes.string.isRequired,
  isOwner: PropTypes.bool,
  user: PropTypes.string,
};

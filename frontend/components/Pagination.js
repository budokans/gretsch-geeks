import PropTypes from 'prop-types';
import Head from 'next/head';
import Link from 'next/link';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import PaginationStyles from './styles/PaginationStyles';
import DisplayError from './ErrorMessage';
import { perPage } from '../config.js';

export const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    _allProductsMeta {
      count
    }
  }
`;

export default function Pagination({ pageNum }) {
  const { data, error, loading } = useQuery(PAGINATION_QUERY);

  if (error) return <DisplayError error={error} />;

  const productsCount = data?._allProductsMeta.count;
  const pageCount = Math.ceil(productsCount / perPage);

  return (
    <PaginationStyles>
      <Head>
        <title>
          Gretsch Geeks | Page {pageNum} of {loading ? '...' : pageCount}
        </title>
      </Head>
      <Link href={`/products/${pageNum - 1}`}>
        <a aria-disabled={loading || pageNum === 1}>← Previous</a>
      </Link>
      <p>
        Page {pageNum} of {loading ? '...' : pageCount}
      </p>
      <p>{loading ? '...' : productsCount} items total</p>
      <Link href={`/products/${pageNum + 1}`}>
        <a aria-disabled={loading || pageNum === pageCount}>Next →</a>
      </Link>
    </PaginationStyles>
  );
}

Pagination.propTypes = {
  pageNum: PropTypes.number.isRequired,
};

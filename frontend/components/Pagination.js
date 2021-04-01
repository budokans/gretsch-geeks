import PropTypes from 'prop-types';
import Head from 'next/head';
import Link from 'next/link';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import PaginationStyles from './styles/PaginationStyles';
import DisplayError from './ErrorMessage';

const PAGINATION_QUERY = gql`
  query {
    _allProductsMeta {
      count
    }
  }
`;

export default function Pagination({ page }) {
  const { data, error, loading } = useQuery(PAGINATION_QUERY);

  if (loading) return <p>"Loading..."</p>;
  if (error) return <DisplayError error={error} />;

  const productsCount = data._allProductsMeta.count;

  return (
    <PaginationStyles>
      <Head>
        <title>Sick Fits | Page {page}/___</title>
      </Head>
      <Link href="/">← Previous</Link>
      <p>Page {page} of ___</p>
      <p>{productsCount} items total</p>
      <Link href="/">Next →</Link>
    </PaginationStyles>
  );
}

Pagination.propTypes = {
  page: PropTypes.string.isRequired,
};

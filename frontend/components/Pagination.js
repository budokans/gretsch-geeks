import PropTypes from 'prop-types';
import Head from 'next/head';
import Link from 'next/link';
import PaginationStyles from './styles/PaginationStyles';

export default function Pagination({ page }) {
  return (
    <PaginationStyles>
      <Head>
        <title>Sick Fits | Page {page}/___</title>
      </Head>
      <Link href="/">← Previous</Link>
      <p>Page {page} of ___</p>
      <p>___ items total</p>
      <Link href="/">Next →</Link>
    </PaginationStyles>
  );
}

Pagination.propTypes = {
  page: PropTypes.string.isRequired,
};

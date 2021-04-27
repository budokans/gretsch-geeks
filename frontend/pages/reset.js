import PropTypes from 'prop-types';
import Head from 'next/head';
import styled from 'styled-components';
import RequestReset from '../components/RequestReset';
import Reset from '../components/Reset';

const Container = styled.div`
  max-width: 600px;
  margin: 2rem auto 0;
`;

export default function ResetPage({ query }) {
  return (
    <Container>
      <Head>
        <title>Gretsch Geeks | Password Reset</title>
      </Head>
      {!query?.token ? (
        <>
          <p>Sorry, your token has expired or was invalid. Please try again.</p>
          <RequestReset />
        </>
      ) : (
        <Reset token={query.token} />
      )}
    </Container>
  );
}

ResetPage.propTypes = {
  query: PropTypes.object,
};

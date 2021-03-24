import PropTypes from 'prop-types';
import Header from './Header';

export default function Page({ children }) {
  return (
    <>
      <Header />
      <h1>I'm the page component</h1>
      {children}
    </>
  );
}

Page.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

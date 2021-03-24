import PropTypes from 'prop-types';

export default function Page({ children }) {
  return (
    <>
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

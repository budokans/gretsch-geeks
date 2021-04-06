import styled from 'styled-components';
import PropTypes from 'prop-types';

const Dot = styled.div``;

export default function CartCount({ count }) {
  return <Dot>{count}</Dot>;
}

CartCount.propTypes = {
  count: PropTypes.number.isRequired,
};

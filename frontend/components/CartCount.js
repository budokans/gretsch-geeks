import styled from 'styled-components';
import PropTypes from 'prop-types';

const Dot = styled.div`
  background: var(--red);
  border-radius: 50%;
  padding: 0.5rem;
  color: white;
  margin-left: 0.5rem;
  /* Make digits same width */
  font-feature-settings: 'tnum';
  font-variant-numeric: tabular-nums;
`;

export default function CartCount({ count }) {
  return <Dot>{count}</Dot>;
}

CartCount.propTypes = {
  count: PropTypes.number.isRequired,
};

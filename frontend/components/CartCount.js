import styled from 'styled-components';
import PropTypes from 'prop-types';
// import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useEffect, useRef } from 'react';
import { useCartContext } from '../lib/cartState';

const Dot = styled.div`
  background: var(--red);
  border-radius: 50%;
  padding: 0.5rem;
  color: white;
  margin-left: 0.5rem;
  min-width: 3rem;
  /* Make digits same width */
  font-feature-settings: 'tnum';
  font-variant-numeric: tabular-nums;

  @media (max-width: 820px) {
    padding: 0.3rem;
    min-width: 2rem;
    font-size: 11px;
  }

  @media (max-width: 600px) {
    padding: 0.3rem;
    font-size: 8px;
    min-width: 1.5rem;
  }
`;

// const AnimationStyles = styled.span`
//   position: relative;

//   .count {
//     display: block;
//     position: relative;
//     transition: transform 0.4s;
//     backface-visibility: hidden;

//     @media (max-width: 600px) {
//       display: none;
//     }
//   }

//   .count-enter {
//     transform: scale(4) rotateY(0.5turn);
//   }

//   .count-enter-active {
//     transform: rotateX(0);
//   }

//   .count-exit {
//     top: 0;
//     position: absolute;
//   }
// `;

export default function CartCount({ count }) {
  const { openCart } = useCartContext();

  const initialRender = useRef(true);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else if (count > 0) {
      openCart();
    }
  }, [count]);

  return (
    // <AnimationStyles>
    //   <TransitionGroup>
    //     <CSSTransition
    //       unmountOnExit
    //       className="count"
    //       classNames="count"
    //       key={count}
    //       timeout={{ enter: 400, exit: 400 }}
    //     >
    <Dot>{count}</Dot>
    //     </CSSTransition>
    //   </TransitionGroup>
    // </AnimationStyles>
  );
}

CartCount.propTypes = {
  count: PropTypes.number.isRequired,
};

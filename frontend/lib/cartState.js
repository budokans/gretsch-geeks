import { createContext, useContext, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

export const LocalStateContext = createContext();
const LocalStateProvider = LocalStateContext.Provider;

export function CartContextProvider({ children }) {
  const node = useRef();
  const [cartOpen, setCartOpen] = useState(false);

  const handleClickOutside = (e) => {
    console.log('clicking anywhere');
    console.log(node.current.contains(e.target));
    if (node.current.contains(e.target)) {
      // inside click
      return;
    }
    // outside click
    setCartOpen(false);
  };

  useEffect(() => {
    if (cartOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [cartOpen]);

  function toggleCartOpen() {
    setCartOpen(!cartOpen);
  }

  function openCart() {
    setCartOpen(true);
  }

  function closeCart() {
    setCartOpen(false);
  }

  return (
    <LocalStateProvider
      value={{ cartOpen, toggleCartOpen, openCart, closeCart, node }}
    >
      {children}
    </LocalStateProvider>
  );
}

export function useCartContext() {
  return useContext(LocalStateContext);
}

CartContextProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

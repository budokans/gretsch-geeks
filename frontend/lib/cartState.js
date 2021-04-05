import { createContext, useContext } from 'react';
import PropTypes from 'prop-types';

export const LocalStateContext = createContext();
const LocalStateProvider = LocalStateContext.Provider;

export function CartContextProvider({ children }) {
  const cartOpen = true;

  return (
    <LocalStateProvider value={{ cartOpen }}>{children}</LocalStateProvider>
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

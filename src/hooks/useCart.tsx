import { useContext } from 'react';
import CartContext from '../context/CartProvider';
import { type UseCardContextType } from '../context/CartProvider';

const useCart = (): UseCardContextType => {
  return useContext(CartContext);
};

export default useCart;

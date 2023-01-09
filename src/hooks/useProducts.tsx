import { useContext } from 'react';
import ProductsContext, {
  type ProductStateType,
} from '../context/ProductProvider';

const useProducts = (): ProductStateType => {
  return useContext(ProductsContext);
};

export default useProducts;

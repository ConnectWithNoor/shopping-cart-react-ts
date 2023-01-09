import useCart from '../hooks/useCart';
import useProducts from '../hooks/useProducts';
import Product from './Product';

const ProductList = () => {
  const { dispatch, cart } = useCart();
  const { products } = useProducts();

  return (
    <main className='main main--products'>
      {products.length
        ? products.map((product) => {
            const inCart: boolean = cart.some(
              (item) => item.sku === product.sku
            );

            return (
              <Product
                key={product.sku}
                product={product}
                dispatch={dispatch}
                inCart={inCart}
              />
            );
          })
        : 'Loading...!'}
    </main>
  );
};

export default ProductList;

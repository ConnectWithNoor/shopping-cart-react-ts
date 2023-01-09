import React, { memo } from 'react';
import { ReducerAction, ReducerActionType } from '../context/CartProvider';
import { ProductType } from '../context/ProductProvider';

type ProductsType = {
  product: ProductType;
  dispatch: React.Dispatch<ReducerAction>;
  inCart: boolean;
};

const Product = ({
  dispatch,
  inCart,
  product,
}: ProductsType): React.ReactElement => {
  const img = new URL(`../images/${product.sku}.jpg`, import.meta.url).href;

  const onAddToCart = () =>
    dispatch({ type: 'ADD', payload: { ...product, quantity: 1 } });

  const itemInCart = inCart ? ' → Item in Cart: ✔️' : null;

  return (
    <article className='product'>
      <h3>{product.name}</h3>
      <img className='product__img' src={img} alt={product.name} />

      <p>
        {new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(product.price)}
        {itemInCart}
      </p>

      <button onClick={onAddToCart}>Add to Cart</button>
    </article>
  );
};

function areProductsEqual(
  { product: prevProduct, inCart: prevIncart }: ProductsType,
  { product: nextProduct, inCart: nextIncart }: ProductsType
) {
  return (
    Object.keys(prevProduct).every(
      (key) =>
        prevProduct[key as keyof ProductType] ===
        nextProduct[key as keyof ProductType]
    ) && prevIncart === nextIncart
  );
}

const MemorizedProduct = memo(Product, areProductsEqual);

export default MemorizedProduct;

import React, { useState } from 'react';
import useCart from '../hooks/useCart';
import CartLineItem from './CartLineItem';

const Cart = (): React.ReactElement => {
  const [confirm, setConfirm] = useState(false);
  const { cart, dispatch, totalItems, totalPrice } = useCart();

  const onSubmitOrder = () => {
    dispatch({
      type: 'SUBMIT',
    });
    setConfirm(true);
  };

  return confirm ? (
    <main className='main main--cart'>
      <h2>Thank you for the order</h2>
    </main>
  ) : (
    <main className='main main--cart'>
      <h2 className='offscreen'>Cart</h2>
      <ul className='cart'>
        {cart.map((item) => (
          <CartLineItem key={item.sku} item={item} dispatch={dispatch} />
        ))}
      </ul>
      <div className='cart_totals'>
        <p>Total Items: {totalItems}</p>
        <p>Total Price: {totalPrice}</p>
        <button
          className='cart__cubmit'
          disabled={!totalItems}
          onClick={onSubmitOrder}
        >
          Place Order
        </button>
      </div>
    </main>
  );
};

export default Cart;

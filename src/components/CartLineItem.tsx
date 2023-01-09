import React, { ChangeEvent, memo, useCallback } from 'react';
import { CartItemType, ReducerAction } from '../context/CartProvider';

type CartLineItemProps = {
  item: CartItemType;
  dispatch: React.Dispatch<ReducerAction>;
};

const CartLineItem = ({ dispatch, item }: CartLineItemProps) => {
  const img = new URL(`../images/${item.sku}.jpg`, import.meta.url).href;

  const lineTotal = item.quantity * item.price;
  const highestQuantity = 20 > item.quantity ? 20 : item.quantity;

  const optionValues = [...Array(highestQuantity).keys()].map((i) => i + 1);

  const options = optionValues.map((val) => (
    <option key={`opt${val}`} value={val}>
      {val}
    </option>
  ));

  const onChangeQuantity = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    dispatch({
      type: 'QUANTITY',
      payload: { ...item, quantity: Number(e.target.value) },
    });
  }, []);

  const onRemoveFromCart = () => dispatch({ type: 'REMOVE', payload: item });

  return (
    <li className='cart__item'>
      <img src={img} alt={item.name} className='cart__img' />
      <div aria-label='Item Name'>{item.name}</div>
      <div aria-label='Price Per Item'>
        {new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(item.price)}
      </div>

      <label htmlFor='itemQuantity' className='offscreen'>
        Item Quantity
      </label>
      <select
        name='itemQuantity'
        id='itemQuantity'
        className='cart__select'
        value={item.quantity}
        aria-label='Item Quantity'
        onChange={onChangeQuantity}
      >
        {options}
      </select>

      <div className='cart__item-subtotal'>
        {new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(lineTotal)}
      </div>

      <button className='cart__button' onClick={onRemoveFromCart}>
        Remove Item
      </button>
    </li>
  );
};

function areItemsEqual(
  { item: prevItem }: CartLineItemProps,
  { item: nextItem }: CartLineItemProps
) {
  return Object.keys(prevItem).every(
    (key) =>
      prevItem[key as keyof CartItemType] ===
      nextItem[key as keyof CartItemType]
  );
}

const MemoizedCartLineItem = memo(CartLineItem, areItemsEqual);

export default MemoizedCartLineItem;

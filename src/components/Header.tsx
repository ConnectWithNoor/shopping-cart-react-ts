import React from 'react';
import useCart from '../hooks/useCart';
import Nav from './Nav';

type HeaderProps = {
  viewCart: boolean;
  setViewCart: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header = ({ setViewCart, viewCart }: HeaderProps) => {
  const { totalItems, totalPrice } = useCart();

  return (
    <header className='header'>
      <div className='header__title-bar'>
        <h1>Acme Co.</h1>
        <div className='header__price-box'>
          <p>Total Items: ${totalItems}</p>
          <p>Total Price: ${totalPrice}</p>
        </div>
        <Nav setViewCart={setViewCart} viewCart={viewCart} />
      </div>
    </header>
  );
};

export default Header;

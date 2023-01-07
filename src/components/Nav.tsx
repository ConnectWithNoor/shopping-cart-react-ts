import React from 'react';

type NavProps = {
  viewCart: boolean;
  setViewCart: React.Dispatch<React.SetStateAction<boolean>>;
};

const Nav = ({ setViewCart, viewCart }: NavProps) => {
  const button = viewCart ? (
    <button onClick={() => setViewCart(false)}>View Products</button>
  ) : (
    <button onClick={() => setViewCart(true)}>View Cart</button>
  );
  return <nav className='nav'>{button}</nav>;
};

export default Nav;

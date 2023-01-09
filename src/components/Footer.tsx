import useCart from '../hooks/useCart';

type FooterProps = {
  viewCart: boolean;
};

const Footer = ({ viewCart }: FooterProps) => {
  const { totalItems, totalPrice } = useCart();
  const year = new Date().getFullYear();

  const PageContent = viewCart ? (
    <p>Shopping Cart &copy; {year}</p>
  ) : (
    <>
      <p>Total Items: {totalItems}</p>
      <p>Total Price: {totalPrice}</p>
      <p>Shopping Cart &copy; {year}</p>
    </>
  );

  return <footer className='footer'>{PageContent}</footer>;
};

export default Footer;

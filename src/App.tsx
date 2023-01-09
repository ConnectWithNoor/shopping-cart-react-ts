import { useState } from 'react';
import Cart from './components/Cart';
import Footer from './components/Footer';
import Header from './components/Header';
import ProductList from './components/ProductList';

function App() {
  const [viewCart, setViewCart] = useState(false);

  const PageContent = viewCart ? <Cart /> : <ProductList />;

  return (
    <>
      <Header viewCart={viewCart} setViewCart={setViewCart} />
      {PageContent}
      <Footer viewCart={viewCart} />
    </>
  );
}

export default App;

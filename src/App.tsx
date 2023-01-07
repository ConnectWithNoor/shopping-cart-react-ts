import { useState } from 'react';
import Cart from './components/Cart';
import Footer from './components/Footer';
import Header from './components/Header';
import ProductList from './components/ProductList';

function App() {
  const [viewCart, setViewCart] = useState(false);

  const PageContent = viewCart ? Cart : ProductList;

  return (
    <div className='App'>
      <Header viewCart={viewCart} setViewCart={setViewCart} />
      <PageContent />
      <Footer viewCart={viewCart} />
    </div>
  );
}

export default App;

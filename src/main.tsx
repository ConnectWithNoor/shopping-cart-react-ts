import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ProductProvider } from './context/ProductProvider';
import { CartProvider } from './context/CartProvider';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ProductProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </ProductProvider>
  </React.StrictMode>
);

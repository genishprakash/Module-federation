import './App.css';
import React, { Suspense } from 'react';

const ProductPage = React.lazy(() => import('products/ProductPage'));
const CartPage = React.lazy(() => import('cart/CartPage'));

export default function App() {
  return (
    <div>
      <h1>Host Application</h1>

      <Suspense fallback={<div>Loading Remote...</div>}>
        <ProductPage />
      </Suspense>

      <Suspense fallback={<div>Loading Cart...</div>}>
        <CartPage />
      </Suspense>
    </div>
  );
}

import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './components/pages/HomePage';
import CategoryPage from './components/pages/CategoryPage';
import CartDrawer from './components/cart/CartDrawer';
import Toast from './components/cart/Toast';
import { useCart } from './context/CartContext';

function App() {
  const location = useLocation();
  const { toast, hideToast } = useCart();

  // Scroll to top on route change
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/category/:id" element={<CategoryPage />} />
      </Routes>
      
      {/* Cart Drawer - Global Component */}
      <CartDrawer />
      
      {/* Toast Notification - Global Component */}
      {toast && <Toast message={toast} onClose={hideToast} />}
    </>
  );
}

export default App;

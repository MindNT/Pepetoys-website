import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './components/pages/HomePage';
import CategoryPage from './components/pages/CategoryPage';

function App() {
  const location = useLocation();

  // Scroll to top on route change
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/category/:id" element={<CategoryPage />} />
    </Routes>
  );
}

export default App;

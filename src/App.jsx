import React from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import Collections from './components/sections/Collections';
import NewHomePromo from './components/sections/NewHomePromo';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="relative">
        <Hero />
        <Collections />
        <NewHomePromo />
      </main>
      <Footer />
    </div>
  );
}

export default App;



import React from 'react';
import Header from './components/layout/Header';
import Hero from './components/sections/Hero';
import Collections from './components/sections/Collections';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="relative">
        <Hero />
        <Collections />
      </main>
    </div>
  );
}

export default App;



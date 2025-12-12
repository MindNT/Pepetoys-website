import React from 'react';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import Hero from '../sections/Hero';
import Collections from '../sections/Collections';
import NewHomePromo from '../sections/NewHomePromo';

const HomePage = () => {
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
};

export default HomePage;

import React from 'react';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import CategoryBanner from '../sections/CategoryBanner';
import Collections from '../sections/Collections';
import NewHomePromo from '../sections/NewHomePromo';

const HomePage = () => {
    return (
        <div className="min-h-screen bg-white">
            <CategoryBanner />
            <Header />
            <main className="relative">
                <Collections />
                <NewHomePromo />
            </main>
            <Footer />
        </div>
    );
};

export default HomePage;

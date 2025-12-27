import React from 'react';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import CategoryBanner from '../sections/CategoryBanner';
import Collections from '../sections/Collections';
import NewHomePromo from '../sections/NewHomePromo';

const HomePage = () => {
    return (
        <div className="min-h-screen bg-white">
            {/* Banner superior con imágenes en diagonal */}
            <CategoryBanner />
            
            {/* Header con logo, loro y botones */}
            <Header />
            
            {/* Main Content */}
            <main className="relative">
                {/* Collections incluye BirdSpeechSection internamente */}
                <Collections />
                
                {/* Banner "Un nuevo hogar está esperando" */}
                <NewHomePromo />
            </main>
            
            {/* Footer */}
            <Footer />
        </div>
    );
};

export default HomePage;

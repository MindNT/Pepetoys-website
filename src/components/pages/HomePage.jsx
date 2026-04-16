import React from 'react';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import CategoryBanner from '../sections/CategoryBanner';
import Collections from '../sections/Collections';
import HeroJungleSection from '../sections/HeroJungleSection';

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
                
                <HeroJungleSection />
            </main>
            
            {/* Footer */}
            <Footer />
        </div>
    );
};

export default HomePage;

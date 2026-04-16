import React from 'react';
import Button from '../common/Button';
import { MessageCircle } from 'lucide-react';

import heroVideo from '../../assets/hero-video.mp4';

const CategoryHero = () => {
    // Assets from public folder
    const bgImage = `${import.meta.env.BASE_URL}77ff67b37e5c7e80d2b273048467c66a82be04b2.jpg`;
    const logoImage = `${import.meta.env.BASE_URL}9a56523df5887e32ef435d833bbd7b4e5b4f94e4.png`;

    return (
        <section className="relative h-[350px] md:h-[407px] w-full overflow-hidden bg-gray-900 mt-0">
            {/* Background Video */}
            <div className="absolute inset-0 w-full h-full overflow-hidden">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    poster={bgImage}
                    className="w-full h-full object-cover object-top"
                >
                    <source src={heroVideo} type="video/mp4" />
                    Tu navegador no soporta el tag de video.
                </video>
                {/* Overlay to ensure text readability - slightly lighter for internal page if needed, but keeping consistent */}
                <div className="absolute inset-0 bg-black/30" />
            </div>

            {/* Dark overlay on bottom section - Desktop */}
            <div className="hidden md:block absolute left-0 right-0 top-0 bottom-0 bg-black/60" />

            {/* Dark overlay - Mobile (full) */}
            <div className="md:hidden absolute inset-0 bg-black/50" />

            {/* Content */}
            <div className="relative h-full max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between pt-8 md:pt-[60px]">

                {/* Logo - Centered on Mobile, Left on Desktop */}
                <div className="flex-shrink-0 mb-6 md:mb-0">
                    <img
                        src={logoImage}
                        alt="Pepe's Toys Logo"
                        className="w-[140px] h-[120px] md:w-[250px] md:h-[220px] object-contain drop-shadow-2xl"
                    />
                </div>

                {/* Texto y CTA - DERECHA */}
                <div className="w-full md:max-w-[650px] text-center md:text-right space-y-4 md:space-y-6 pb-8">
                    {/* Title */}
                    <h1 className="text-2xl md:text-[40px] font-bold md:leading-tight text-white uppercase tracking-wide drop-shadow-md">
                        Transporta a tu ave a su <br className="hidden md:block" />
                        propio hábitat
                    </h1>

                    {/* CTA Button */}
                    <div className="pt-2 md:pt-4 flex justify-center md:justify-end">
                        <Button
                            variant="whatsapp"
                            icon={MessageCircle}
                            className="w-auto px-8 h-[50px] md:h-[60px] text-base font-semibold shadow-lg hover:shadow-green-900/30"
                        >
                            Cotizar Aviario
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CategoryHero;

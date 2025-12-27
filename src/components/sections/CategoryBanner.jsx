import React from 'react';

// Background Images - usando las existentes como placeholders
import bgLoros from '../../assets/Eclectus Macho.jpg';
import bgAlimentos from '../../assets/Cockatiel.jpg';
import bgJuguetes from '../../assets/Eclectus parrot female.jpg';
import bgAviarios from '../../assets/Sun Conure.jpg';

const BANNER_IMAGES = [
    { id: 1, src: bgLoros, alt: 'Loro 1' },
    { id: 2, src: bgAlimentos, alt: 'Loro 2' },
    { id: 3, src: bgJuguetes, alt: 'Loro 3' },
    { id: 4, src: bgAviarios, alt: 'Loro 4' },
];

const CategoryBanner = () => {
    return (
        <section className="relative w-full h-[140px] md:h-[180px] bg-white overflow-hidden">
            
            {/* Imagen 1 - termina en la línea blanca 1 */}
            <div 
                className="absolute inset-0 w-full h-full"
                style={{ clipPath: 'polygon(0 0, 23% 0, 18% 100%, 0 100%)' }}
            >
                <img src={BANNER_IMAGES[0].src} alt={BANNER_IMAGES[0].alt} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/30"></div>
            </div>

            {/* Imagen 2 - empieza después de línea 1, termina en línea 2 */}
            <div 
                className="absolute inset-0 w-full h-full"
                style={{ clipPath: 'polygon(24% 0, 48% 0, 43% 100%, 19% 100%)' }}
            >
                <img src={BANNER_IMAGES[1].src} alt={BANNER_IMAGES[1].alt} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/30"></div>
            </div>

            {/* Imagen 3 - empieza después de línea 2, termina en línea 3 */}
            <div 
                className="absolute inset-0 w-full h-full"
                style={{ clipPath: 'polygon(49% 0, 73% 0, 68% 100%, 44% 100%)' }}
            >
                <img src={BANNER_IMAGES[2].src} alt={BANNER_IMAGES[2].alt} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/30"></div>
            </div>

            {/* Imagen 4 - empieza después de línea 3, termina en 100% */}
            <div 
                className="absolute inset-0 w-full h-full"
                style={{ clipPath: 'polygon(74% 0, 100% 0, 100% 100%, 69% 100%)' }}
            >
                <img src={BANNER_IMAGES[3].src} alt={BANNER_IMAGES[3].alt} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/30"></div>
            </div>
            
            {/* Logo Pepe's Toys - esquina superior derecha */}
            <div className="absolute top-3 right-3 md:top-4 md:right-6 z-20">
                <img
                    src={`${import.meta.env.BASE_URL}9a56523df5887e32ef435d833bbd7b4e5b4f94e4.png`}
                    alt="Pepe's Toys Logo"
                    className="h-[40px] md:h-[60px] w-auto object-contain drop-shadow-lg"
                />
            </div>
        </section>
    );
};

export default CategoryBanner;

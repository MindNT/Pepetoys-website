import React from 'react';

// Imágenes de portada
import portada1 from '../../assets/portada/1000863838.jpg';
import portada2 from '../../assets/portada/1000863839.jpg';
import portada3 from '../../assets/portada/1000863840.jpg';
import portada4 from '../../assets/portada/1000863841.jpg';

const BANNER_IMAGES = [
    { id: 1, src: portada2, alt: 'Loro gris' },        // 1000863839 - African Grey
    { id: 2, src: portada3, alt: 'Agapornis' },        // 1000863840 - Agapornis amarillos
    { id: 3, src: portada1, alt: 'Loro verde' },       // 1000863838 - Loro verde con campana
    { id: 4, src: portada4, alt: 'Lorikeet' },         // 1000863841 - Lorikeet colorido
];

const CategoryBanner = () => {
    return (
        <section className="relative w-full h-[140px] md:h-[180px] bg-white overflow-hidden">
            
            {/* Imagen 1 */}
            <div 
                className="absolute top-0 left-0 h-full"
                style={{ 
                    width: '28%',
                    clipPath: 'polygon(0 0, 82% 0, 64% 100%, 0 100%)' 
                }}
            >
                <img src={BANNER_IMAGES[0].src} alt={BANNER_IMAGES[0].alt} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/30"></div>
            </div>

            {/* Imagen 2 */}
            <div 
                className="absolute top-0 h-full"
                style={{ 
                    left: '19%',
                    width: '30%',
                    clipPath: 'polygon(17% 0, 97% 0, 80% 100%, 0 100%)' 
                }}
            >
                <img src={BANNER_IMAGES[1].src} alt={BANNER_IMAGES[1].alt} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/30"></div>
            </div>

            {/* Imagen 3 */}
            <div 
                className="absolute top-0 h-full"
                style={{ 
                    left: '44%',
                    width: '30%',
                    clipPath: 'polygon(17% 0, 97% 0, 80% 100%, 0 100%)' 
                }}
            >
                <img src={BANNER_IMAGES[2].src} alt={BANNER_IMAGES[2].alt} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/30"></div>
            </div>

            {/* Imagen 4 */}
            <div 
                className="absolute top-0 right-0 h-full"
                style={{ 
                    width: '32%',
                    clipPath: 'polygon(16% 0, 100% 0, 100% 100%, 0 100%)' 
                }}
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

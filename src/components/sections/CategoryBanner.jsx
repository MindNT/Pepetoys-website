import React, { useState, useEffect } from 'react';
import portada1 from '../../assets/arriba/foto6.jpg'; // Loro verde tercera
import portada2 from '../../assets/arriba/foto1.jpg'; // African Grey primera
import portada3 from '../../assets/arriba/foto3.jpg'; // Agapornis segunda
import portada4 from '../../assets/arriba/foto8.jpg'; // Lorikeet cuarta

const CategoryBanner = () => {
    // ESTADO PARA DETECTAR MÓVIL
    const [isMobile, setIsMobile] = useState(() => {
        if (typeof window !== 'undefined') {
            return window.innerWidth < 768;
        }
        return false; // Default para SSR
    });

    useEffect(() => {
        // Verificar móvil después de que el componente se monte
        const checkMobile = () => {
            try {
                if (typeof window !== 'undefined' && window.innerWidth !== undefined) {
                    setIsMobile(window.innerWidth < 768);
                }
            } catch (error) {
                console.error('Error checking mobile:', error);
                // Default a móvil si hay error
                setIsMobile(true);
            }
        };

        // Verificar después de un pequeño delay para asegurar que window está listo
        const timeoutId = setTimeout(checkMobile, 0);

        // Y también en resize
        const handleResize = () => {
            checkMobile();
        };

        // También verificar en orientationchange para móviles
        const handleOrientationChange = () => {
            setTimeout(checkMobile, 100);
        };

        if (typeof window !== 'undefined') {
            window.addEventListener('resize', handleResize);
            window.addEventListener('orientationchange', handleOrientationChange);
        }

        return () => {
            clearTimeout(timeoutId);
            if (typeof window !== 'undefined') {
                window.removeEventListener('resize', handleResize);
                window.removeEventListener('orientationchange', handleOrientationChange);
            }
        };
    }, []);

    // CONFIGURACIÓN DINÁMICA
    // 1. Skew: Subimos a 12deg en móvil para que se note la diagonal.
    const SKEW_DEG = isMobile ? 12 : 15;

    // 2. Borde: 2px en móvil es suficiente.
    const BORDER_WIDTH = isMobile ? '2px' : '4px';

    // 3. Escala: En móvil necesitamos más zoom (1.25) para cubrir la inclinación sin huecos.
    const BASE_SCALE = isMobile ? 1.25 : 1.15;

    // 4. Capa oscura: Activar o desactivar la capa de negro al 10% sobre las imágenes
    const ENABLE_BLACK_OVERLAY = true;

    return (
        // AJUSTE DE ALTURA: Bajamos a h-[85px] en móvil. ¡Mucho más fino!
        <div className="relative w-full h-[85px] md:h-[135px] bg-white overflow-hidden shadow-sm">

            {/* Contenedor ancho */}
            <div className="flex h-full w-[105%] -ml-[2.5%]">

                {/* --- FOTO 1: African Grey --- */}
                <div
                    className="relative flex-1 overflow-hidden border-white"
                    style={{
                        transform: `skewX(-${SKEW_DEG}deg)`,
                        borderRightWidth: BORDER_WIDTH
                    }}
                >
                    <img
                        src={portada2}
                        alt="African Grey"
                        className="w-full h-full object-cover transition-transform duration-1000 ease-out hover:scale-[1.3]"
                        style={{
                            transform: `skewX(${SKEW_DEG}deg) scale(${BASE_SCALE})`,
                            // En móvil subimos el foco (5%) para ver la cabeza en la cinta estrecha
                            objectPosition: isMobile ? '65% 5%' : '65% 10%'
                        }}
                    />
                    {ENABLE_BLACK_OVERLAY && <div className="absolute inset-0 bg-black/10 pointer-events-none z-10" />}
                </div>

                {/* --- FOTO 2: Agapornis --- */}
                <div
                    className="relative flex-1 overflow-hidden border-white"
                    style={{
                        transform: `skewX(-${SKEW_DEG}deg)`,
                        borderRightWidth: BORDER_WIDTH
                    }}
                >
                    <img
                        src={portada3}
                        alt="Agapornis"
                        className="w-full h-full object-cover transition-transform duration-1000 ease-out hover:scale-[1.3]"
                        style={{
                            transform: `skewX(${SKEW_DEG}deg) scale(${BASE_SCALE})`,
                            objectPosition: 'center center'
                        }}
                    />
                    {ENABLE_BLACK_OVERLAY && <div className="absolute inset-0 bg-black/10 pointer-events-none z-10" />}
                </div>

                {/* --- FOTO 3: Loro Verde --- */}
                <div
                    className="relative flex-1 overflow-hidden border-white"
                    style={{
                        transform: `skewX(-${SKEW_DEG}deg)`,
                        borderRightWidth: BORDER_WIDTH
                    }}
                >
                    <img
                        src={portada1}
                        alt="Loro verde"
                        className="w-full h-full object-cover transition-transform duration-1000 ease-out hover:scale-[1.3]"
                        style={{
                            transform: `skewX(${SKEW_DEG}deg) scale(${BASE_SCALE})`,
                            objectPosition: 'center 20%'
                        }}
                    />
                    {ENABLE_BLACK_OVERLAY && <div className="absolute inset-0 bg-black/10 pointer-events-none z-10" />}
                </div>

                {/* --- FOTO 4: Lorikeet --- */}
                <div
                    className="relative flex-1 overflow-hidden"
                    style={{
                        transform: `skewX(-${SKEW_DEG}deg)`
                    }}
                >
                    <img
                        src={portada4}
                        alt="Lorikeet"
                        className="w-full h-full object-cover transition-transform duration-1000 ease-out hover:scale-[1.3]"
                        style={{
                            transform: `skewX(${SKEW_DEG}deg) scale(${BASE_SCALE})`,
                            // Ajuste para ver color en la cinta estrecha
                            objectPosition: isMobile ? '30% 50%' : '25% 60%'
                        }}
                    />
                    {ENABLE_BLACK_OVERLAY && <div className="absolute inset-0 bg-black/10 pointer-events-none z-10" />}
                </div>

            </div>

            {/* Logo Flotante: Reducido a 35px para la nueva altura */}
            <div className="absolute top-2 right-3 md:top-3 md:right-8 z-30 pointer-events-none">
                <img
                    src={`${import.meta.env.BASE_URL}9a56523df5887e32ef435d833bbd7b4e5b4f94e4.png`}
                    alt="Pepe's Toys Logo"
                    className="h-[35px] md:h-[55px] w-auto drop-shadow-xl"
                />
            </div>
        </div>
    );
};

export default CategoryBanner;
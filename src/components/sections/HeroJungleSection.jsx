import React, { useState } from 'react';
import AgendaVisitaButton from '../common/AgendaVisitaButton';
import VoladerasModal from '../common/VoladerasModal';
import MiVoladeraGalleryModal from '../common/MiVoladeraGalleryModal';

const HeroJungleSection = () => {
    const [isVoladerasModalOpen, setIsVoladerasModalOpen] = useState(false);
    const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);

    return (
        <section
            className="w-full min-h-screen md:h-screen bg-cover bg-center bg-no-repeat relative flex flex-col md:block"
            style={{ backgroundImage: `url('${import.meta.env.BASE_URL}bg1.png')` }}
        >
            {/* Opcional: overlay oscuro para que destaque el texto si se agrega luego */}
            <div className="absolute inset-0 bg-black/20 pointer-events-none"></div>

            {/* VISTA MÓVIL (celulares) */}
            <div className="md:hidden relative z-10 flex flex-col items-center justify-start w-full pt-12 pb-16 px-4 gap-12">
                {/* En el título de la sección (arriba) el botón de agendar */}
                <div className="w-full flex justify-center mb-6">
                    <div className="scale-110 sm:scale-125 transform origin-center transition-transform duration-300">
                        <AgendaVisitaButton />
                    </div>
                </div>

                <img
                    src={`${import.meta.env.BASE_URL}cuadro1.png`}
                    alt="Cuadro 1"
                    onClick={() => setIsVoladerasModalOpen(true)}
                    className="w-[95%] max-w-[420px] object-contain cursor-pointer transition-transform duration-300 active:scale-95"
                />

                <img
                    src={`${import.meta.env.BASE_URL}cuadro2.png`}
                    alt="Cuadro 2"
                    className="w-[95%] max-w-[420px] object-contain"
                />

                <img
                    src={`${import.meta.env.BASE_URL}cuadro3.png`}
                    alt="Cuadro 3"
                    onClick={() => setIsGalleryModalOpen(true)}
                    className="w-[95%] max-w-[420px] object-contain cursor-pointer transition-transform duration-300 active:scale-95"
                />

                <img
                    src={`${import.meta.env.BASE_URL}cuadrov.png`}
                    alt="Cuadro Video"
                    onClick={() => window.open('https://vt.tiktok.com/ZSH7xYGug/', '_blank')}
                    className="w-[95%] max-w-[420px] object-contain mt-2 cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95"
                />
            </div>

            {/* VISTA PC (Escritorio) */}
            <div className="hidden md:block w-full h-full relative z-10">
                {/* Esquina superior izquierda */}
                <img
                    src={`${import.meta.env.BASE_URL}cuadro1.png`}
                    alt="Cuadro Top Left"
                    onClick={() => setIsVoladerasModalOpen(true)}
                    className="absolute top-10 left-10 z-10 w-[28%] max-w-[320px] lg:max-w-[360px] object-contain cursor-pointer hover:scale-105 transition-transform duration-300"
                />

                {/* Esquina superior derecha */}
                <img
                    src={`${import.meta.env.BASE_URL}cuadro2.png`}
                    alt="Cuadro Top Right"
                    className="absolute top-10 right-10 z-10 w-[28%] max-w-[320px] lg:max-w-[360px] object-contain"
                />

                {/* Esquina inferior derecha */}
                <img
                    src={`${import.meta.env.BASE_URL}cuadro3.png`}
                    alt="Cuadro Bottom Right"
                    onClick={() => setIsGalleryModalOpen(true)}
                    className="absolute bottom-10 right-10 z-10 w-[28%] max-w-[320px] lg:max-w-[360px] object-contain cursor-pointer hover:scale-105 transition-transform duration-300"
                />

                {/* Centro */}
                <img
                    src={`${import.meta.env.BASE_URL}cuadrov.png`}
                    alt="Cuadro Center"
                    onClick={() => window.open('https://vt.tiktok.com/ZSH7xYGug/', '_blank')}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 w-[35%] max-w-[400px] lg:max-w-[450px] object-contain cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95"
                />

                {/* Botón Agenda tu visita en la esquina inferior izquierda */}
                <AgendaVisitaButton className="absolute bottom-10 left-10 z-30" />
            </div>

            {/* Modal de Voladeras */}
            <VoladerasModal 
                isOpen={isVoladerasModalOpen} 
                onClose={() => setIsVoladerasModalOpen(false)} 
            />

            {/* Modal de Galería Mi Voladera */}
            <MiVoladeraGalleryModal
                isOpen={isGalleryModalOpen}
                onClose={() => setIsGalleryModalOpen(false)}
            />
        </section>
    );
};

export default HeroJungleSection;

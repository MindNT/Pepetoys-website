import React from 'react';
import Button from '../common/Button';

import heroVideo from '../../assets/hero-video.mp4';

const Hero = () => {
  return (
    <section className="relative h-[500px] md:h-[407px] w-full overflow-hidden bg-gray-900">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster={`${import.meta.env.BASE_URL}77ff67b37e5c7e80d2b273048467c66a82be04b2.jpg`}
          className="w-full h-full object-cover object-top"
        >
          <source src={heroVideo} type="video/mp4" />
          Tu navegador no soporta el tag de video.
        </video>
        {/* Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Dark overlay on bottom section - Desktop */}
      <div className="hidden md:block absolute left-0 right-0 top-[98px] bottom-0 bg-black/60" />

      {/* Dark overlay - Mobile (full) */}
      <div className="md:hidden absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative h-full max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between pt-16 md:pt-[98px]">

        {/* Logo - Centered on Mobile, Left on Desktop */}
        <div className="flex-shrink-0 mt-8 md:mt-[30px] mb-6 md:mb-0">
          <img
            src={`${import.meta.env.BASE_URL}9a56523df5887e32ef435d833bbd7b4e5b4f94e4.png`}
            alt="Pepe's Toys Logo"
            className="w-[180px] h-[160px] md:w-[250px] md:h-[220px] object-contain"
          />
        </div>

        {/* Texto y CTA - DERECHA (Below logo on mobile, right on desktop) */}
        <div className="w-full md:max-w-[637px] text-center md:text-right space-y-3 md:space-y-6 pb-8">
          {/* Title */}
          <h1 className="text-2xl md:text-[36px] font-light md:w-[637px] md:h-[88px] flex flex-col items-center md:items-end justify-center">
            <span className="md:leading-[44px] text-white">Alegría natural</span>
            <span className="md:text-[36px] font-light md:leading-[100%] md:tracking-[0%] text-[#008F24]">para tus aves</span>
          </h1>

          {/* Subtitle */}
          <p className="text-white text-sm md:text-base font-light leading-relaxed md:leading-[19px] px-4 md:px-0">
            Productos diseñados con precisión, creados con amor. Cada pieza inspira el instinto natural.
          </p>

          {/* CTA Button - Centered on mobile, right-aligned on desktop */}
          <div className="pt-2 md:pt-6 flex justify-center md:justify-end">
            <Button variant="primary" className="w-[250px] h-[60px] text-base">
              Explorar colecciones
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

import React from 'react';
import { Gift, Snowflake } from 'lucide-react';

// Colores de los botonitos (luces navideñas)
const LIGHT_COLORS = ['#ff5252', '#ffd700', '#4caf50', '#ffffff'];

// Arrow Icon — mismo diseño que CollectionCard pero con color configurable
const ArrowIcon = ({ size = 26, color = 'white' }) => (
  <svg width={size} height={size} viewBox="0 0 27 26" fill="none" xmlns="http://www.w3.org/2000/svg" transform="rotate(-45)">
    <path d="M12 3L21 12L12 21" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 12H3" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M18.5 12H12" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M14 7L18.5 12L14 17" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Hilera de botonitos navideños para el marco
const LightsRow = ({ className }) => (
  <div className={`absolute left-2.5 right-2.5 flex justify-between z-20 pointer-events-none ${className}`}>
    {Array.from({ length: 8 }).map((_, i) => (
      <span
        key={i}
        className="w-[5px] h-[5px] sm:w-[6px] sm:h-[6px] rounded-full animate-pulse"
        style={{
          backgroundColor: LIGHT_COLORS[i % LIGHT_COLORS.length],
          boxShadow: `0 0 5px 1px ${LIGHT_COLORS[i % LIGHT_COLORS.length]}`,
          animationDelay: `${(i % 4) * 0.35}s`,
        }}
      />
    ))}
  </div>
);

/**
 * CollectionCardNavidenos
 * Tarjeta de categoría tematizada de Navidad (solo para la categoría
 * "Navideños"): marco rojo con botonitos de luces, copos de nieve,
 * etiqueta roja con borde dorado y botón dorado.
 */
const CollectionCardNavidenos = ({ name, image, mobile = false, onClick }) => {
  const cardSize = mobile ? 'w-full aspect-square' : 'w-[225px] h-[225px]';
  const containerWidth = 'w-full';
  const buttonSize = 'w-[40px] h-[40px] sm:w-[44px] sm:h-[44px] md:w-[52px] md:h-[52px]';
  const fontSize = 'text-lg sm:text-xl md:text-2xl';
  const iconSize = mobile ? 22 : 30;

  return (
    <div className="group cursor-pointer relative w-full" onClick={onClick ? onClick : undefined}>
      {/* Image Container — marco navideño */}
      <div className={`relative ${cardSize} mb-2 sm:mb-3 md:mb-4 bg-gradient-to-b from-[#fffdf5] to-[#fdeeda] rounded-[10px] border-[3px] border-[#A81212] shadow-[0_0_18px_rgba(168,18,18,0.35)] group-hover:shadow-[0_0_26px_rgba(255,215,0,0.5)] transition-shadow duration-300`}>
        {/* Botonitos de luces en el marco */}
        <LightsRow className="-top-[8px]" />
        <LightsRow className="-bottom-[8px]" />

        {/* Copos de nieve decorativos */}
        <Snowflake size={16} className="absolute top-2 left-2 text-[#A81212]/30 z-10 pointer-events-none" />
        <Snowflake size={12} className="absolute bottom-2 right-2 text-[#A81212]/25 z-10 pointer-events-none animate-pulse" />

        {/* Background Image */}
        <img
          src={image}
          alt={name}
          className="absolute inset-0 w-full h-full rounded-[7px] object-contain p-2 group-hover:scale-105 transition-transform duration-300"
        />

        {/* Badge Navideño */}
        <span className="absolute top-2 right-2 z-10 inline-flex items-center gap-1 bg-[#A81212] text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shadow-md">
          <Gift size={10} />
          Navidad
        </span>
      </div>

      {/* Bottom Section - Label + Arrow Button */}
      <div className={`${containerWidth} flex items-center justify-between gap-1 sm:gap-2`}>
        {/* Label Button — rojo navideño con borde dorado */}
        <div className="bg-gradient-to-r from-[#A81212] to-[#7a0d0d] border-2 border-[#FFD700]/70 rounded-full h-[40px] sm:h-[44px] md:h-[52px] flex-1 min-w-0 flex items-center justify-center gap-1.5 px-3 sm:px-4 shadow-md group-hover:shadow-[0_0_15px_rgba(255,215,0,0.45)] transition-shadow duration-300">
          <Snowflake size={14} className="text-[#FFD700] flex-shrink-0 hidden sm:block" />
          <span className={`text-white font-sans font-semibold ${fontSize} truncate`}>
            {name}
          </span>
        </div>

        {/* Arrow Circle Button — dorado */}
        <div className={`bg-[#FFD700] rounded-full ${buttonSize} flex-shrink-0 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}>
          <ArrowIcon size={iconSize} color="#7a0d0d" />
        </div>
      </div>
    </div>
  );
};

export default CollectionCardNavidenos;

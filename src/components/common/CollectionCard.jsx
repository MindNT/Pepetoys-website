import React from 'react';

// Arrow Icon Component
const ArrowIcon = ({ size = 26 }) => (
  <svg width={size} height={size} viewBox="0 0 27 26" fill="none" xmlns="http://www.w3.org/2000/svg" transform="rotate(-45)">
    <path d="M12 3L21 12L12 21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 12H3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M18.5 12H12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M14 7L18.5 12L14 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CollectionCard = ({ name, image, mobile = false, onClick }) => {
  // Responsive sizing based on mobile prop
  const cardSize = mobile ? 'w-full aspect-square' : 'w-[225px] h-[225px]';
  const containerWidth = 'w-full';
  const buttonSize = 'w-[24px] h-[24px] sm:w-[28px] sm:h-[28px] md:w-[40px] md:h-[40px]';
  const fontSize = 'text-[10px] sm:text-xs md:text-base';
  const iconSize = mobile ? 14 : 26;

  return (
    <div className="group cursor-pointer relative w-full" onClick={onClick ? onClick : undefined}>
      {/* Image Container */}
      <div className={`relative ${cardSize} mb-2 sm:mb-3 md:mb-4`}>
        {/* Background Image */}
        <img
          src={image}
          alt={name}
          className="absolute inset-0 w-full h-full rounded-[10px] object-cover"
        />

        {/* Dark Overlay - rgba(0, 0, 0, 0.4) */}
        <div className="absolute inset-0 bg-black/40 rounded-[10px] group-hover:bg-black/30 transition-colors duration-300" />
      </div>

      {/* Bottom Section - Label + Arrow Button */}
      <div className={`${containerWidth} flex items-center justify-between gap-1 sm:gap-2`}>
        {/* Label Button - Verde con texto "Voladeras" */}
        <div className="bg-[#008F24] rounded-full h-[24px] sm:h-[28px] md:h-[36px] flex-1 min-w-0 flex items-center justify-center px-2 sm:px-3 md:px-4">
          <span className={`text-white font-sans font-light ${fontSize} truncate`}>
            {name}
          </span>
        </div>

        {/* Arrow Circle Button - Negro */}
        <div className={`bg-black rounded-full ${buttonSize} flex-shrink-0 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
          <ArrowIcon size={iconSize} />
        </div>
      </div>
    </div>
  );
};

export default CollectionCard;

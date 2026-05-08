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
  const cardSize = mobile ? 'w-full aspect-square' : 'w-[225px] h-[225px]';
  const containerWidth = 'w-full';
  const buttonSize = 'w-[40px] h-[40px] sm:w-[44px] sm:h-[44px] md:w-[52px] md:h-[52px]';
  const fontSize = 'text-lg sm:text-xl md:text-2xl';
  const iconSize = mobile ? 22 : 30;

  return (
    <div className="group cursor-pointer relative w-full" onClick={onClick ? onClick : undefined}>
      {/* Image Container */}
      <div className={`relative ${cardSize} mb-2 sm:mb-3 md:mb-4 bg-[#F8F8F8] rounded-[10px]`}>
        {/* Background Image */}
        <img
          src={image}
          alt={name}
          className="absolute inset-0 w-full h-full rounded-[10px] object-contain p-2"
        />

      </div>

      {/* Bottom Section - Label + Arrow Button */}
      <div className={`${containerWidth} flex items-center justify-between gap-1 sm:gap-2`}>
        {/* Label Button - Verde con texto "Voladeras" */}
        <div className="bg-[#008F24] rounded-full h-[40px] sm:h-[44px] md:h-[52px] flex-1 min-w-0 flex items-center justify-center px-3 sm:px-4">
          <span className={`text-white font-sans font-semibold ${fontSize} truncate`}>
            {name}
          </span>
        </div>

        {/* Arrow Circle Button - Negro */}
        <div className={`bg-black rounded-full ${buttonSize} flex-shrink-0 flex items-center justify-center`}>
          <ArrowIcon size={iconSize} />
        </div>
      </div>
    </div>
  );
};

export default CollectionCard;

import React from 'react';

// Arrow Icon Component
const ArrowIcon = () => (
  <svg width="26" height="25" viewBox="0 0 27 26" fill="none" xmlns="http://www.w3.org/2000/svg" transform="rotate(-45)">
    <path d="M12 3L21 12L12 21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 12H3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M18.5 12H12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M14 7L18.5 12L14 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CollectionCard = ({ name, image, mobile = false, onClick }) => {
  const cardSize = mobile ? 'w-full aspect-square' : 'w-[225px] h-[225px]';
  const containerWidth = mobile ? 'w-full' : 'w-[225px]';
  // Removed fixed labelWidth to allow flex behavior to take over
  const buttonSize = mobile ? 'w-[28px] h-[28px]' : 'w-[40px] h-[40px]';
  const fontSize = mobile ? 'text-xs' : 'text-base';
  const iconSize = mobile ? "18" : "26";

  // Arrow Icon Component with dynamic size
  const DynamicArrowIcon = () => (
    <svg width={iconSize} height={iconSize} viewBox="0 0 27 26" fill="none" xmlns="http://www.w3.org/2000/svg" transform="rotate(-45)">
      <path d="M12 3L21 12L12 21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 12H3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18.5 12H12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 7L18.5 12L14 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  return (
    <div className="group cursor-pointer relative w-full" onClick={onClick ? onClick : undefined}>
      {/* Image Container */}
      <div className={`relative ${cardSize} mb-2 md:mb-4`}>
        {/* Background Image */}
        <img
          src={image}
          alt={name}
          className={`absolute inset-0 w-full h-full rounded-[10px] object-cover opacity-100`}
        />

        {/* Dark Overlay - rgba(0, 0, 0, 0.4) */}
        <div className="absolute inset-0 bg-black/40 rounded-[10px]" />
      </div>

      {/* Bottom Section */}
      <div className={`${containerWidth} h-[40.337px] flex items-center justify-between gap-2`}>
        {/* Label Button */}
        <div className={`bg-[#008F24] rounded-[30px] h-[32px] flex-1 min-w-0 flex items-center px-2 md:px-4`}>
          <span className={`text-white font-light ${fontSize} truncate w-full text-center md:text-left`}>{name}</span>
        </div>

        {/* Arrow Circle Button */}
        <div className={`bg-gray-800 rounded-full ${buttonSize} flex-shrink-0 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
          <DynamicArrowIcon />
        </div>
      </div>
    </div>
  );
};

export default CollectionCard;


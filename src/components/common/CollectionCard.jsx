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

const CollectionCard = ({ name, image, mobile = false }) => {
  const cardSize = mobile ? 'w-[160px] h-[160px]' : 'w-[225px] h-[225px]';
  const containerWidth = mobile ? 'w-[160px]' : 'w-[225px]';
  const labelWidth = mobile ? 'w-[125px]' : 'w-[176px]';
  const buttonSize = mobile ? 'w-[32px] h-[32px]' : 'w-[40px] h-[40px]';
  const fontSize = mobile ? 'text-sm' : 'text-base';

  return (
    <div className="group cursor-pointer relative">
      {/* Image Container */}
      <div className={`relative ${cardSize} mb-3 md:mb-4`}>
        {/* Background Image */}
        <img
          src={image}
          alt={name}
          className={`absolute inset-0 ${cardSize} rounded-[10px] object-cover opacity-100`}
        />

        {/* Dark Overlay - rgba(0, 0, 0, 0.4) */}
        <div className="absolute inset-0 bg-black/40 rounded-[10px]" />
      </div>

      {/* Bottom Section */}
      <div className={`${containerWidth} h-[40.337px] flex items-center justify-between`}>
        {/* Label Button */}
        <div className={`bg-[#008F24] rounded-[30px] h-[32px] ${labelWidth} flex items-center px-3 md:px-4`}>
          <span className={`text-white font-light ${fontSize} truncate`}>{name}</span>
        </div>

        {/* Arrow Circle Button */}
        <div className={`bg-[#005114] rounded-full ${buttonSize} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
          <ArrowIcon />
        </div>
      </div>
    </div>
  );
};

export default CollectionCard;


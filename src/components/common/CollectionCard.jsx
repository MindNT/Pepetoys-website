import React from 'react';

// Arrow Icon Component
const ArrowIcon = () => (
  <svg width="26" height="25" viewBox="0 0 27 26" fill="none" xmlns="http://www.w3.org/2000/svg" transform="rotate(-45)">
    <path d="M12 3L21 12L12 21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 12H3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M18.5 12H12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14 7L18.5 12L14 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CollectionCard = ({ name, image }) => {
  return (
    <div className="group cursor-pointer relative">
      {/* Image Container - 225x225, border-radius: 10px, opacity: 1 */}
      <div className="relative w-[225px] h-[225px] mb-4">
        {/* Background Image */}
        <img 
          src={image}
          alt={name}
          className="absolute inset-0 w-[225px] h-[225px] rounded-[10px] object-cover opacity-100"
        />
        
        {/* Dark Overlay - rgba(0, 0, 0, 0.4) */}
        <div className="absolute inset-0 bg-black/40 rounded-[10px]" />
      </div>
      
      {/* Bottom Section - 225x40.337 with spacing from image */}
      <div className="w-[225px] h-[40.337px] flex items-center justify-between">
        {/* Label Button */}
        <div className="bg-[#008F24] rounded-[30px] h-[32px] w-[176px] flex items-center px-4">
          <span className="text-white font-light text-base">{name}</span>
        </div>
        
        {/* Arrow Circle Button */}
        <div className="bg-[#005114] rounded-full w-[40px] h-[40px] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <ArrowIcon />
        </div>
      </div>
    </div>
  );
};

export default CollectionCard;


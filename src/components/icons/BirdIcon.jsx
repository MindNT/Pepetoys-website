import React from 'react';

// Bird icon - Use the actual image from public folder
const BirdIcon = ({ className = "w-full h-full" }) => (
  <div className={`${className} flex items-center justify-center opacity-100`}>
    <img
      src={`${import.meta.env.BASE_URL}bird-icon.png`}
      alt="Bird Icon"
      className="w-full h-full object-contain"
      onError={(e) => {
        // Fallback to emoji if image not found
        e.target.style.display = 'none';
        e.target.parentElement.innerHTML = '<span style="font-size: 30px;">🦜</span>';
      }}
    />
  </div>
);

export default BirdIcon;


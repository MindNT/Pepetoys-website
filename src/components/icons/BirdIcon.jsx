import React from 'react';

// Bird icon - Use the actual image from public folder
const BirdIcon = () => (
  <div className="w-[50px] h-[50px] flex items-center justify-center opacity-100">
    <img 
      src="/bird-icon.png" 
      alt="Bird Icon" 
      className="w-full h-full object-contain"
      onError={(e) => {
        // Fallback to emoji if image not found
        e.target.style.display = 'none';
        e.target.parentElement.innerHTML = '<span style="font-size: 40px;">🦜</span>';
      }}
    />
  </div>
);

export default BirdIcon;


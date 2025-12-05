import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  icon: Icon, 
  onClick, 
  className = '' 
}) => {
  const variants = {
    primary: 'bg-[#008F24] hover:bg-[#007520] text-white',
    magenta: 'bg-[#A41262] hover:bg-[#8a1050] text-white w-[136px]',
    whatsapp: 'bg-[#008F24] hover:bg-[#007520] text-white w-[137px]',
  };

  return (
    <button
      onClick={onClick}
      className={`
        flex items-center justify-center gap-2 px-4 rounded-[30px]
        font-light text-sm transition-all duration-300
        hover:shadow-lg transform hover:scale-105
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
      {Icon && <Icon size={20} />}
    </button>
  );
};

export default Button;


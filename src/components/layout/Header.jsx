import React from 'react';
import { ShoppingCart, User } from 'lucide-react';
import africanGrey from '../../assets/african_grey_pointing.png';
import logoLetra from '../../assets/logo letra.jpg';
import { useCart } from '../../context/CartContext';

const Header = () => {
  const { openCart, getTotalItems } = useCart();
  const totalItems = getTotalItems();

  return (
    <header className="relative z-50 bg-white shadow-sm">
      <div className="max-w-[1440px] mx-auto h-[100px] md:h-[130px] px-4 md:px-8 lg:px-12 flex items-center justify-between">
        
        {/* Logo Section - LEFT (Logo de letras grande) */}
        <div className="flex items-center">
          <img
            src={logoLetra}
            alt="Pepe's Toys Logo"
            className="h-[60px] md:h-[90px] lg:h-[100px] w-auto object-contain"
          />
        </div>

        {/* Center Section - African Grey Character */}
        <div className="hidden md:flex items-center justify-center flex-1">
          <img
            src={africanGrey}
            alt="Loro guía"
            className="h-[80px] lg:h-[100px] w-auto object-contain"
          />
        </div>

        {/* Right Actions - Buttons */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* Quienes somos Button - Verde */}
          <button className="flex items-center justify-center gap-2 bg-[#008F24] hover:bg-[#007520] text-white px-4 md:px-6 py-2 md:py-3 rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105">
            <span className="font-sans text-sm md:text-base lg:text-xl font-semibold whitespace-nowrap">
              Quienes somos
            </span>
            <User size={18} className="md:w-5 md:h-5" />
          </button>

          {/* Mi carrito Button - Magenta/Rojo con Badge */}
          <button 
            onClick={openCart}
            className="relative flex items-center justify-center gap-2 bg-[#E11D48] hover:bg-[#BE123C] text-white px-4 md:px-6 py-2 md:py-3 rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105"
          >
            <ShoppingCart size={18} className="md:w-5 md:h-5" />
            <span className="font-sans text-sm md:text-base lg:text-xl font-semibold whitespace-nowrap">
              Mi carrito
            </span>
            
            {/* Badge - Contador de items */}
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 w-6 h-6 bg-[#FFD700] text-[#1A237E] text-xs font-bold rounded-full flex items-center justify-center shadow-lg border-2 border-white animate-pulse">
                {totalItems > 9 ? '9+' : totalItems}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Divider line */}
      <div className="w-full h-[1px] bg-gray-200"></div>
    </header>
  );
};

export default Header;

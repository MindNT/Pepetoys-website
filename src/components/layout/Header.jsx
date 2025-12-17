import React from 'react';
import { ShoppingCart, Phone } from 'lucide-react';
import Button from '../common/Button';
import africanGrey from '../../assets/african_grey_pointing.png';

const Header = ({ simple = false }) => {

  return (
    <>
      <header className={`relative z-50 h-[80px] md:h-[110px] bg-white border-b border-gray-200 shadow-sm`}>
        <div className="max-w-[1440px] mx-auto h-full px-4 md:px-6 lg:px-[60px] flex items-center justify-between">

          {/* Logo Section - LEFT */}
          <div className="flex items-center gap-4">
            {/* Logo Image */}
            <img
              src={`${import.meta.env.BASE_URL}9a56523df5887e32ef435d833bbd7b4e5b4f94e4.png`}
              alt="Pepe's Toys Logo"
              className="h-[60px] md:h-[90px] w-auto object-contain"
            />
          </div>

          {/* Central Actions (Visible on Mobile now) */}
          <div className="flex items-center gap-2 lg:gap-6 relative">
            {/* Character Guide: African Grey Pointing (Desktop only) */}
            <img
              src={africanGrey}
              alt="Loro guía"
              className="hidden lg:block absolute -left-[75px] -bottom-[12px] h-[80px] w-auto object-contain z-10 pointer-events-none mix-blend-multiply"
            />

            {/* Quiénes somos Button */}
            <Button variant="whatsapp" className="!bg-[#008F24] text-white px-3 h-[32px] text-xs lg:px-8 lg:h-[44px] lg:text-lg font-medium rounded-full shadow-md hover:scale-105 transition-transform whitespace-nowrap">
              Quiénes Somos
            </Button>
          </div>

          {/* Right Actions: Cart & Contact */}
          <div className="flex items-center gap-3 md:gap-6">
            {/* Desktop Cart & Contact */}
            <div className="hidden lg:flex items-center gap-4">
              <Button variant="magenta" icon={ShoppingCart} className="h-[44px] px-6 rounded-[10px]">
                Mi carrito
              </Button>
            </div>

            {/* Mobile Cart Button */}
            <div className="flex lg:hidden items-center gap-2">
              <button className="w-10 h-10 bg-magenta-dark rounded-full flex items-center justify-center hover:opacity-90 transition-opacity">
                <ShoppingCart size={20} className="text-white" />
              </button>
            </div>
          </div>

        </div>
      </header>
    </>
  );
};

export default Header;

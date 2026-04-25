import React, { useState } from 'react';
import { ShoppingCart, User } from 'lucide-react';
import africanGrey from '../../assets/african_grey_pointing.png';
import logoLetra from '../../assets/logo letra.jpg';
import { useCart } from '../../context/CartContext';
import ConocenosModal from '../common/ConocenosModal';

const Header = () => {
  const { openCart, getTotalItems } = useCart();
  const totalItems = getTotalItems();
  const [isConocenosOpen, setIsConocenosOpen] = useState(false);

  return (
    <header className="relative z-50 bg-white shadow-sm">
      {/* ── MOBILE layout: 2 rows ── DESKTOP layout: single row (unchanged) ── */}

      {/* Desktop row — hidden on mobile */}
      <div className="hidden md:flex max-w-[1440px] mx-auto h-[190px] px-8 lg:px-12 items-center justify-between">

        {/* Logo - LEFT */}
        <div className="flex items-center">
          <img src={logoLetra} alt="Pepe's Toys Logo" className="h-[165px] lg:h-[180px] w-auto object-contain" />
        </div>

        {/* Parrot - CENTER */}
        <div className="flex items-center justify-center flex-1">
          <img src={africanGrey} alt="Loro guía" className="h-[80px] lg:h-[100px] w-auto object-contain" />
        </div>

        {/* Buttons - RIGHT */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsConocenosOpen(true)}
            className="flex items-center justify-center gap-2 bg-[#008F24] hover:bg-[#007520] text-white px-6 py-3 rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105"
          >
            <span className="font-sans text-base lg:text-xl font-semibold whitespace-nowrap">Quienes somos</span>
            <User size={18} className="w-5 h-5" />
          </button>

          <button onClick={openCart} className="relative flex items-center justify-center gap-2 bg-[#E11D48] hover:bg-[#BE123C] text-white px-6 py-3 rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105">
            <ShoppingCart size={18} className="w-5 h-5" />
            <span className="font-sans text-base lg:text-xl font-semibold whitespace-nowrap">Mi carrito</span>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 w-6 h-6 bg-[#FFD700] text-[#1A237E] text-xs font-bold rounded-full flex items-center justify-center shadow-lg border-2 border-white animate-pulse">
                {totalItems > 9 ? '9+' : totalItems}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile layout: 2 rows — hidden on md+ */}
      <div className="flex md:hidden flex-col items-center py-3 px-4 gap-3">

        {/* Row 1: Logo + Parrot */}
        <div className="flex items-center justify-center gap-4">
          <img src={logoLetra} alt="Pepe's Toys Logo" className="h-[90px] w-auto object-contain" />
          <img src={africanGrey} alt="Loro guía" className="h-[70px] w-auto object-contain" />
        </div>

        {/* Row 2: Buttons */}
        <div className="flex items-center justify-center gap-3">
          <button 
            onClick={() => setIsConocenosOpen(true)}
            className="flex items-center justify-center gap-2 bg-[#008F24] hover:bg-[#007520] text-white px-4 py-2 rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105"
          >
            <span className="font-sans text-sm font-semibold whitespace-nowrap">Quienes somos</span>
            <User size={16} />
          </button>

          <button onClick={openCart} className="relative flex items-center justify-center gap-2 bg-[#E11D48] hover:bg-[#BE123C] text-white px-4 py-2 rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105">
            <ShoppingCart size={16} />
            <span className="font-sans text-sm font-semibold whitespace-nowrap">Mi carrito</span>
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

      <ConocenosModal isOpen={isConocenosOpen} onClose={() => setIsConocenosOpen(false)} />
    </header>
  );
};

export default Header;

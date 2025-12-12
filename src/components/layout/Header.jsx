import React, { useState } from 'react';
import { ShoppingCart, Menu, X, Phone } from 'lucide-react';
import Button from '../common/Button';



const NAV_ITEMS = ['LOROS', 'ALIMENTOS', 'JUGUETES', 'AVIARIOS'];

const Header = ({ simple = false }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className={`absolute top-0 left-0 right-0 z-50 h-[60px] md:h-[98px] transition-all ${simple ? 'bg-transparent border-none' : 'bg-black/60 border-b border-gray-500/50'}`}>
        <div className="max-w-[1440px] mx-auto h-full relative">
          <div className="flex items-center justify-between h-full px-4 md:px-6 lg:px-[122px]">

            {/* Mobile Hamburger Menu - LEFT */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className={`text-white p-2 ${simple ? '' : 'lg:hidden'}`}
              aria-label="Abrir menú"
            >
              <Menu size={24} />
            </button>

            {/* Navigation - LEFT (Desktop) */}
            {!simple && (
              <nav className="hidden lg:flex items-center gap-[70px]">
                {NAV_ITEMS.map((item, index) => (
                  <span
                    key={index}
                    className="text-white font-normal text-base cursor-pointer hover:text-green-400 transition-colors"
                  >
                    {item}
                  </span>
                ))}
              </nav>
            )}

            {/* Spacer for mobile to center buttons */}
            <div className={simple ? 'hidden' : 'lg:hidden flex-1'}></div>

            {/* Actions - RIGHT - Desktop */}
            <div className="hidden lg:flex items-center gap-[42px] absolute right-[81px] top-[31px]">
              <Button variant="magenta" icon={ShoppingCart} className="h-[35px]">
                Mi carrito
              </Button>
              <Button variant="contact" icon={Phone} className="h-[35px]">
                Contactar
              </Button>
            </div>

            {/* Mobile buttons - RIGHT */}
            <div className="flex lg:hidden items-center gap-2">
              <button className="w-10 h-10 bg-magenta-dark rounded-full flex items-center justify-center hover:opacity-90 transition-opacity">
                <ShoppingCart size={20} className="text-white" />
              </button>
              <button className="w-10 h-10 bg-brand-green rounded-full flex items-center justify-center hover:opacity-90 transition-opacity">
                <Phone size={20} className="text-white" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Menu */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop - only covers area to the right of sidebar */}
          <div
            className="fixed top-0 left-64 right-0 bottom-0 bg-black/40 z-[99] lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          ></div>

          {/* Sidebar */}
          <div
            className="fixed top-[60px] md:top-[98px] left-0 bottom-0 w-64 bg-black/80 backdrop-blur-sm shadow-xl z-[100] lg:hidden"
          >
            {/* Close Button */}
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-4 right-4 text-white p-2 hover:bg-white/10 rounded-full transition-colors"
              aria-label="Cerrar menú"
            >
              <X size={24} />
            </button>

            {/* Menu Items */}
            <nav className="flex flex-col pt-16 px-6">
              {NAV_ITEMS.map((item, index) => (
                <a
                  key={index}
                  href="#"
                  className="text-white font-normal text-lg py-4 border-b border-white/20 hover:text-brand-green transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>
        </>
      )}
    </>
  );
};

export default Header;

import React, { useEffect } from 'react';
import { CheckCircle, X } from 'lucide-react';

const Toast = ({ message, onClose, duration = 4000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className="fixed top-4 left-4 right-4 md:left-auto md:right-4 md:max-w-[380px] z-[60] animate-slide-in px-2 md:px-0">
      <div className="bg-white shadow-2xl rounded-xl p-4 md:p-5 flex items-center gap-3 md:gap-4 border-l-[6px] border-[#008F24]">
        {/* Icono más grande para móvil */}
        <div className="w-10 h-10 md:w-12 md:h-12 bg-[#008F24] rounded-full flex items-center justify-center flex-shrink-0">
          <CheckCircle className="text-white" size={24} strokeWidth={2.5} />
        </div>
        
        {/* Texto más grande y legible */}
        <span className="flex-1 text-gray-800 font-semibold text-base md:text-lg leading-snug">
          {message}
        </span>
        
        {/* Botón X más grande para táctil */}
        <button 
          onClick={onClose}
          className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
          aria-label="Cerrar notificación"
        >
          <X size={22} strokeWidth={2} />
        </button>
      </div>
    </div>
  );
};

export default Toast;


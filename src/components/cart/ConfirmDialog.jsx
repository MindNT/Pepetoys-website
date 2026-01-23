import React from 'react';
import { AlertCircle, X } from 'lucide-react';

const ConfirmDialog = ({ isOpen, onConfirm, onCancel, productName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onCancel}
      />

      {/* Dialog */}
      <div className="relative bg-white rounded-2xl w-full max-w-md shadow-2xl animate-scale-in">
        {/* Header con icono de alerta */}
        <div className="p-6 pb-4">
          <div className="flex items-start gap-4">
            {/* Icono de alerta amarillo/naranja */}
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
              <AlertCircle className="text-yellow-600" size={28} strokeWidth={2.5} />
            </div>
            
            <div className="flex-1 pt-1">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                ¿Eliminar producto?
              </h3>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                ¿Estás seguro de que deseas eliminar{' '}
                <span className="font-semibold text-gray-900">"{productName}"</span>{' '}
                del carrito?
              </p>
            </div>
          </div>
        </div>

        {/* Botones de acción - MÁS GRANDES para móvil */}
        <div className="p-6 pt-2 flex flex-col-reverse sm:flex-row gap-3">
          {/* Botón Cancelar */}
          <button
            onClick={onCancel}
            className="flex-1 h-14 md:h-16 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-lg rounded-xl transition-colors active:scale-95"
          >
            Cancelar
          </button>
          
          {/* Botón Eliminar */}
          <button
            onClick={onConfirm}
            className="flex-1 h-14 md:h-16 bg-red-500 hover:bg-red-600 text-white font-bold text-lg rounded-xl transition-colors active:scale-95 shadow-lg"
          >
            Sí, eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;


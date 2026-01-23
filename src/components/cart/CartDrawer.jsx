import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import ConfirmDialog from './ConfirmDialog';

const BASE_URL = import.meta.env.BASE_URL;

const CartDrawer = () => {
  const { 
    isCartOpen, 
    closeCart, 
    cartItems, 
    updateQuantity, 
    removeFromCart,
    getTotalItems,
    getTotalPrice 
  } = useCart();

  const [confirmDelete, setConfirmDelete] = useState(null); // { id, name }

  const handleCheckout = () => {
    alert('Procesando compra... Esta funcionalidad se implementará próximamente.');
    // Aquí irá la lógica de checkout
  };

  const handleDeleteClick = (item) => {
    setConfirmDelete({ id: item.id, name: item.name });
  };

  const handleConfirmDelete = () => {
    if (confirmDelete) {
      removeFromCart(confirmDelete.id);
      setConfirmDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setConfirmDelete(null);
  };

  return (
    <>
      {/* Backdrop/Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeCart}
      />

      {/* Drawer Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[450px] bg-white shadow-2xl z-50 flex flex-col transition-transform duration-300 ease-out ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="bg-[#1A237E] text-white px-6 py-5 flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-3">
            <ShoppingBag size={24} strokeWidth={2.5} />
            <h2 className="text-2xl font-bold">Tu Carrito</h2>
          </div>
          <button
            onClick={closeCart}
            className="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            aria-label="Cerrar carrito"
          >
            <X size={24} strokeWidth={2.5} />
          </button>
        </div>

        {/* Body - Lista de Productos */}
        <div className="flex-1 overflow-y-auto px-4 md:px-6 py-4">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4 px-4">
              <ShoppingBag size={64} className="text-gray-300" strokeWidth={1.5} />
              <div>
                <p className="text-xl md:text-2xl font-semibold text-gray-600 mb-2">
                  Tu carrito está vacío
                </p>
                <p className="text-base md:text-sm text-gray-500">
                  Agrega productos para comenzar tu compra
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-3 md:space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-gray-50 rounded-xl p-4 md:p-4 flex gap-3 md:gap-4 shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* Imagen - Más grande en móvil */}
                  <div className="w-24 h-24 md:w-20 md:h-20 flex-shrink-0 bg-white rounded-xl overflow-hidden flex items-center justify-center">
                    <img
                      src={item.image || `${BASE_URL}shopping.jpg`}
                      alt={item.name}
                      className="w-full h-full object-contain p-2"
                    />
                  </div>

                  {/* Info del Producto */}
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    {/* Nombre y Precio - Texto más grande */}
                    <div>
                      <h3 className="font-semibold text-base md:text-sm text-gray-800 line-clamp-2 mb-1.5">
                        {item.name}
                      </h3>
                      <p className="text-xl md:text-lg font-bold text-[#008F24]">
                        ${(item.priceNumber || 0).toFixed(2)} MXN
                      </p>
                    </div>

                    {/* Controles de Cantidad y Eliminar */}
                    <div className="flex items-center justify-between mt-2 gap-2">
                      {/* Controles de Cantidad - MÁS GRANDES para móvil */}
                      <div className="flex items-center gap-2 md:gap-1.5 bg-white rounded-full px-1.5 py-1.5 md:px-1 md:py-1 shadow-sm border border-gray-200">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          disabled={item.quantity <= 1}
                          className={`w-9 h-9 md:w-8 md:h-8 flex items-center justify-center rounded-full transition-colors ${
                            item.quantity <= 1
                              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                              : 'bg-[#008F24] text-white hover:bg-[#007520] active:scale-95'
                          }`}
                          aria-label="Disminuir cantidad"
                        >
                          <Minus size={16} strokeWidth={3} />
                        </button>
                        
                        <span className="w-10 md:w-8 text-center font-bold text-base md:text-sm text-gray-800">
                          {item.quantity}
                        </span>
                        
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-9 h-9 md:w-8 md:h-8 flex items-center justify-center bg-[#008F24] text-white rounded-full hover:bg-[#007520] transition-colors active:scale-95"
                          aria-label="Aumentar cantidad"
                        >
                          <Plus size={16} strokeWidth={3} />
                        </button>
                      </div>

                      {/* Botón Eliminar - MÁS GRANDE para táctil */}
                      <button
                        onClick={() => handleDeleteClick(item)}
                        className="w-10 h-10 md:w-9 md:h-9 flex items-center justify-center text-red-500 hover:bg-red-50 rounded-full transition-colors"
                        aria-label="Eliminar producto"
                      >
                        <Trash2 size={20} strokeWidth={2} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer - Total y Checkout */}
        {cartItems.length > 0 && (
          <div className="border-t border-gray-200 px-4 md:px-6 py-5 md:py-5 bg-gray-50">
            {/* Subtotal */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-base md:text-sm text-gray-600">Subtotal:</span>
              <span className="text-xl md:text-lg font-semibold text-gray-800">
                ${getTotalPrice().toFixed(2)} MXN
              </span>
            </div>

            {/* Total Items */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-base md:text-sm text-gray-600">Total de items:</span>
              <span className="text-base md:text-sm font-medium text-gray-700">
                {getTotalItems()} {getTotalItems() === 1 ? 'producto' : 'productos'}
              </span>
            </div>

            {/* Total Grande */}
            <div className="flex items-center justify-between mb-5 py-3 border-t border-gray-300">
              <span className="text-2xl md:text-xl font-bold text-[#1A237E]">Total:</span>
              <span className="text-3xl md:text-2xl font-bold text-[#1A237E]">
                ${getTotalPrice().toFixed(2)} MXN
              </span>
            </div>

            {/* Botón de Checkout - MÁS GRANDE en móvil */}
            <button
              onClick={handleCheckout}
              className="w-full h-16 md:h-14 bg-[#008F24] hover:bg-[#007520] text-white font-bold text-xl md:text-lg rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3"
            >
              <ShoppingBag size={24} strokeWidth={2.5} />
              Finalizar Compra
            </button>
          </div>
        )}
      </div>

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        isOpen={!!confirmDelete}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        productName={confirmDelete?.name || ''}
      />
    </>
  );
};

export default CartDrawer;


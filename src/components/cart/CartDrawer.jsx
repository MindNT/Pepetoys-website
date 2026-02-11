import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, Loader2, MapPin, Store, Truck } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import ConfirmDialog from './ConfirmDialog';
import OrderSuccessModal from './OrderSuccessModal';
import { saveOrder, verifyCustomerPhone, addCustomer } from '../../services/api';

const BASE_URL = import.meta.env.BASE_URL;

const CartDrawer = () => {
  const {
    isCartOpen,
    closeCart,
    cartItems,
    updateQuantity,
    removeFromCart,
    getTotalItems,
    getTotalPrice,
    clearCart
  } = useCart();

  const [confirmDelete, setConfirmDelete] = useState(null); // { id, name }
  const [showPhoneDialog, setShowPhoneDialog] = useState(false);
  const [showNameDialog, setShowNameDialog] = useState(false);
  const [showDeliveryDialog, setShowDeliveryDialog] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [phone, setPhone] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [deliveryOption, setDeliveryOption] = useState(''); // 'pickup', 'merida', 'exterior'
  const [mapsUrl, setMapsUrl] = useState(null);
  const [locationError, setLocationError] = useState('');
  const [orderSuccessData, setOrderSuccessData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('Tu carrito está vacío');
      return;
    }
    setShowPhoneDialog(true);
  };

  // Función para enviar el pedido (extraída para reutilización)
  const submitOrder = async (phoneDigits) => {
    try {
      // Formatear items: {id: quantity}
      const items = {};
      cartItems.forEach(item => {
        items[String(item.id)] = item.quantity;
      });

      // Preparar datos del pedido
      const totalAmount = parseFloat(getTotalPrice().toFixed(2));

      const orderData = {
        phone: phoneDigits,
        items: items,
        total_amount: totalAmount,
        promotions: {},
        // Solo Pickup no envía ubicación, Mérida y Exterior sí
        maps_url: (deliveryOption === 'merida' || deliveryOption === 'exterior') ? mapsUrl : null
      };

      console.log('Enviando pedido:', JSON.stringify(orderData, null, 2));

      // Enviar pedido al backend
      const response = await saveOrder(orderData);

      if (response) {
        // Preparar datos para el modal de éxito
        const successData = {
          orderCode: orderData.code_order || response.order_code || response.data?.order_code || `ORD-${Date.now()}`,
          phone: phoneDigits,
          items: cartItems,
          totalAmount: totalAmount,
          customerName: customerName || response.customer_name || response.data?.customer_name
        };

        // Guardar datos del pedido exitoso
        setOrderSuccessData(successData);

        // Limpiar carrito y estados
        clearCart();
        setShowPhoneDialog(false);
        setShowNameDialog(false);
        setShowDeliveryDialog(false);
        setDeliveryOption('');
        setMapsUrl(null);
        closeCart();

        // Mostrar modal de éxito
        setShowSuccessModal(true);
      } else {
        throw new Error('No se recibió respuesta del servidor');
      }
    } catch (error) {
      console.error('Error al procesar el pedido:', error);
      let errorMessage = 'Error al procesar el pedido. Por favor intenta de nuevo.';

      if (error.message) {
        errorMessage = error.message;
      }

      alert(errorMessage);
      throw error;
    }
  };

  const handlePhoneSubmit = async (e) => {
    e.preventDefault();

    if (!phone || phone.trim() === '') {
      alert('Por favor ingresa tu número de teléfono');
      return;
    }

    // Validar formato básico de teléfono (solo números, mínimo 10 dígitos)
    const phoneDigits = phone.replace(/\D/g, '');
    if (phoneDigits.length < 10) {
      alert('Por favor ingresa un número de teléfono válido (mínimo 10 dígitos)');
      return;
    }

    setIsVerifying(true);

    try {
      // Verificar si el cliente existe
      const verificationResponse = await verifyCustomerPhone(phoneDigits);

      console.log('Respuesta de verificación:', verificationResponse);

      // Verificar si el cliente existe basado en la respuesta
      // La respuesta es:
      // Si NO existe: {status: "success", phone: "7471234567", exists: 0}
      // Si SÍ existe: {status: "success", phone: "9993661475", exists: 1, name: "Adrian Carmona"}

      const customerExists = verificationResponse?.exists === 1;

      console.log('Cliente existe:', customerExists);

      if (customerExists) {
        // Cliente existe, proceder con selección de entrega
        setIsVerifying(false);
        setShowPhoneDialog(false);
        setShowDeliveryDialog(true);
      } else {
        // Cliente no existe, solicitar nombre
        setIsVerifying(false);
        setShowPhoneDialog(false);
        setShowNameDialog(true);
      }
    } catch (error) {
      console.error('Error al verificar el teléfono:', error);
      setIsVerifying(false);

      // Si hay error en la verificación, asumir que el cliente no existe
      // y pedir el nombre para registrarlo
      setShowPhoneDialog(false);
      setShowNameDialog(true);
    }
  };

  const handleNameSubmit = async (e) => {
    e.preventDefault();

    if (!customerName || customerName.trim() === '') {
      alert('Por favor ingresa tu nombre');
      return;
    }

    const phoneDigits = phone.replace(/\D/g, '');
    setIsSubmitting(true);

    try {
      // Registrar nuevo cliente
      console.log('Registrando cliente:', customerName, phoneDigits);
      await addCustomer(customerName, phoneDigits);

      // Cliente registrado exitosamente, proceder con selección de entrega
      setIsSubmitting(false);
      setShowNameDialog(false);
      setShowDeliveryDialog(true);
    } catch (error) {
      console.error('Error al registrar el cliente:', error);
      alert('Error al registrar el cliente. Por favor intenta de nuevo.');
      setIsSubmitting(false);
    }
  };

  // Función para solicitar geolocalización
  const requestLocation = async () => {
    if (!navigator.geolocation) {
      setLocationError('Tu navegador no soporta geolocalización');
      return false;
    }

    setIsGettingLocation(true);
    setLocationError('');

    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
          setMapsUrl(url);
          setIsGettingLocation(false);
          resolve(true);
        },
        (error) => {
          let errorMsg = 'No se pudo obtener tu ubicación';
          if (error.code === 1) {
            errorMsg = 'Permiso de ubicación denegado. Por favor permite el acceso a tu ubicación.';
          } else if (error.code === 2) {
            errorMsg = 'Ubicación no disponible. Verifica tu conexión.';
          }
          setLocationError(errorMsg);
          setIsGettingLocation(false);
          resolve(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    });
  };

  // Manejar selección de opción de entrega
  const handleDeliveryOptionChange = async (option) => {
    setDeliveryOption(option);
    setLocationError('');

    // Si selecciona Mérida o Exterior, solicitar ubicación inmediatamente
    // Solo Pickup no requiere ubicación
    if (option === 'merida' || option === 'exterior') {
      await requestLocation();
    } else {
      setMapsUrl(null);
    }
  };

  // Validar y confirmar opción de entrega
  const handleDeliveryConfirm = async () => {
    const total = getTotalPrice();

    // Validar que se haya seleccionado una opción
    if (!deliveryOption) {
      alert('Por favor selecciona un método de entrega');
      return;
    }

    // Validar mínimo para Mérida (debe ser >= 1000)
    if (deliveryOption === 'merida' && total < 1000) {
      alert('El pedido mínimo para envío a Mérida es de $1,000 MXN');
      return;
    }

    // Validar ubicación para Mérida y Exterior
    if ((deliveryOption === 'merida' || deliveryOption === 'exterior') && !mapsUrl) {
      alert('Debes permitir el acceso a tu ubicación para este método de entrega');
      return;
    }

    // Proceder con el pedido
    const phoneDigits = phone.replace(/\D/g, '');
    setIsSubmitting(true);
    try {
      await submitOrder(phoneDigits);
    } catch (error) {
      // Error ya manejado en submitOrder
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePhoneCancel = () => {
    setShowPhoneDialog(false);
    setPhone('');
    setIsVerifying(false);
  };

  const handleNameCancel = () => {
    setShowNameDialog(false);
    setCustomerName('');
    // Volver al diálogo de teléfono
    setShowPhoneDialog(true);
  };

  const handleDeliveryCancel = () => {
    setShowDeliveryDialog(false);
    setDeliveryOption('');
    setMapsUrl(null);
    setLocationError('');
    // Volver al diálogo anterior (nombre o teléfono)
    if (customerName) {
      setShowNameDialog(true);
    } else {
      setShowPhoneDialog(true);
    }
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
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300 ${isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        onClick={closeCart}
      />

      {/* Drawer Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[450px] bg-white shadow-2xl z-50 flex flex-col transition-transform duration-300 ease-out ${isCartOpen ? 'translate-x-0' : 'translate-x-full'
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
                          className={`w-9 h-9 md:w-8 md:h-8 flex items-center justify-center rounded-full transition-colors ${item.quantity <= 1
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

      {/* Phone Dialog */}
      {showPhoneDialog && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 md:p-8">
            <h3 className="text-2xl font-bold text-[#1A237E] mb-2">
              Finalizar Compra
            </h3>
            <p className="text-gray-600 mb-6">
              Ingresa tu número de teléfono para completar tu pedido
            </p>

            <form onSubmit={handlePhoneSubmit}>
              <div className="mb-6">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Número de Teléfono
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="9991234567"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#008F24] focus:border-transparent text-lg"
                  required
                  disabled={isVerifying || isSubmitting}
                  autoFocus
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handlePhoneCancel}
                  disabled={isVerifying || isSubmitting}
                  className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isVerifying || isSubmitting}
                  className="flex-1 px-6 py-3 bg-[#008F24] text-white font-semibold rounded-lg hover:bg-[#007520] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isVerifying ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      Verificando...
                    </>
                  ) : isSubmitting ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      Procesando...
                    </>
                  ) : (
                    'Continuar'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Order Success Modal */}
      <OrderSuccessModal
        isOpen={showSuccessModal}
        onClose={() => {
          setShowSuccessModal(false);
          setOrderSuccessData(null);
          setPhone('');
          setCustomerName('');
        }}
        orderData={orderSuccessData}
      />

      {/* Delivery Options Dialog */}
      {showDeliveryDialog && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 md:p-8">
            <h3 className="text-2xl font-bold text-[#1A237E] mb-2">
              Método de Entrega
            </h3>
            <p className="text-gray-600 mb-6">
              Selecciona cómo deseas recibir tu pedido
            </p>

            {/* Delivery Options */}
            <div className="space-y-3 mb-6">
              {/* Pickup */}
              <label
                className={`flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${deliveryOption === 'pickup'
                  ? 'border-[#008F24] bg-[#008F24]/5'
                  : 'border-gray-200 hover:border-gray-300'
                  }`}
              >
                <input
                  type="radio"
                  name="delivery"
                  value="pickup"
                  checked={deliveryOption === 'pickup'}
                  onChange={() => handleDeliveryOptionChange('pickup')}
                  className="mt-1 w-5 h-5 text-[#008F24] focus:ring-[#008F24]"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Store size={20} className="text-[#1A237E]" />
                    <span className="font-semibold text-gray-900">Pickup en Tienda</span>
                  </div>
                  <p className="text-sm text-gray-600">Recoge tu pedido sin costo adicional</p>
                </div>
              </label>

              {/* Mérida */}
              <label
                className={`flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${deliveryOption === 'merida'
                  ? 'border-[#008F24] bg-[#008F24]/5'
                  : 'border-gray-200 hover:border-gray-300'
                  }`}
              >
                <input
                  type="radio"
                  name="delivery"
                  value="merida"
                  checked={deliveryOption === 'merida'}
                  onChange={() => handleDeliveryOptionChange('merida')}
                  disabled={isGettingLocation}
                  className="mt-1 w-5 h-5 text-[#008F24] focus:ring-[#008F24]"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Truck size={20} className="text-[#1A237E]" />
                    <span className="font-semibold text-gray-900">Envío a Mérida</span>
                  </div>
                  <p className="text-sm text-gray-600">Pedido mínimo: $1,000 MXN</p>
                  {deliveryOption === 'merida' && getTotalPrice() < 1000 && (
                    <p className="text-sm text-red-600 mt-1">
                      ⚠️ Total actual: ${getTotalPrice().toFixed(2)} MXN
                    </p>
                  )}
                  {isGettingLocation && deliveryOption === 'merida' && (
                    <p className="text-sm text-blue-600 mt-1 flex items-center gap-2">
                      <Loader2 size={14} className="animate-spin" />
                      Obteniendo ubicación...
                    </p>
                  )}
                  {deliveryOption === 'merida' && mapsUrl && (
                    <p className="text-sm text-green-600 mt-1">
                      ✓ Ubicación obtenida
                    </p>
                  )}
                </div>
              </label>

              {/* Exterior */}
              <label
                className={`flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${deliveryOption === 'exterior'
                  ? 'border-[#008F24] bg-[#008F24]/5'
                  : 'border-gray-200 hover:border-gray-300'
                  }`}
              >
                <input
                  type="radio"
                  name="delivery"
                  value="exterior"
                  checked={deliveryOption === 'exterior'}
                  onChange={() => handleDeliveryOptionChange('exterior')}
                  disabled={isGettingLocation}
                  className="mt-1 w-5 h-5 text-[#008F24] focus:ring-[#008F24]"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <MapPin size={20} className="text-[#1A237E]" />
                    <span className="font-semibold text-gray-900">Envío a Exterior</span>
                  </div>
                  <p className="text-sm text-gray-600">Costo por calcular</p>
                  {isGettingLocation && (
                    <p className="text-sm text-blue-600 mt-1 flex items-center gap-2">
                      <Loader2 size={14} className="animate-spin" />
                      Obteniendo ubicación...
                    </p>
                  )}
                  {deliveryOption === 'exterior' && mapsUrl && (
                    <p className="text-sm text-green-600 mt-1">
                      ✓ Ubicación obtenida
                    </p>
                  )}
                </div>
              </label>
            </div>

            {/* Error Message */}
            {locationError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-800">{locationError}</p>
              </div>
            )}

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleDeliveryCancel}
                disabled={isSubmitting || isGettingLocation}
                className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50"
              >
                Atrás
              </button>
              <button
                type="button"
                onClick={handleDeliveryConfirm}
                disabled={isSubmitting || isGettingLocation || !deliveryOption}
                className="flex-1 px-6 py-3 bg-[#008F24] text-white font-semibold rounded-lg hover:bg-[#007520] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    Procesando...
                  </>
                ) : (
                  'Confirmar Pedido'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Name Dialog - For New Customers */}
      {showNameDialog && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 md:p-8">
            <h3 className="text-2xl font-bold text-[#1A237E] mb-2">
              Registro de Cliente
            </h3>
            <p className="text-gray-600 mb-6">
              No encontramos tu número en nuestro sistema. Por favor ingresa tu nombre para completar el registro.
            </p>

            <form onSubmit={handleNameSubmit}>
              <div className="mb-4">
                <label htmlFor="customer-phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Teléfono
                </label>
                <input
                  type="tel"
                  id="customer-phone"
                  value={phone}
                  disabled
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 text-lg"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="customer-name" className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  id="customer-name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Ej: Juan Pérez"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#008F24] focus:border-transparent text-lg"
                  required
                  disabled={isSubmitting}
                  autoFocus
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleNameCancel}
                  disabled={isSubmitting}
                  className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50"
                >
                  Atrás
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-6 py-3 bg-[#008F24] text-white font-semibold rounded-lg hover:bg-[#007520] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      Registrando...
                    </>
                  ) : (
                    'Confirmar Pedido'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CartDrawer;


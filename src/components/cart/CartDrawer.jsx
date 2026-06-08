import React, { useState, useEffect, useRef } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, Loader2, MapPin, Store, CreditCard, Download, AlertCircle, CheckCircle2, ChevronLeft, Lock } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import ConfirmDialog from './ConfirmDialog';
import OrderSuccessModal from './OrderSuccessModal';
import { saveOrder, verifyCustomerPhone, addCustomer, getCategories, processCardPayment } from '../../services/api';

const BASE_URL = import.meta.env.BASE_URL;

// VARIABLE DE DESCUENTO GLOBAL (ej: 0.15 = 15%). Pon 0 para desactivar.
const GLOBAL_DISCOUNT_RATE = 0.0;

// ARTÍCULOS QUE REQUIEREN COTIZACIÓN DE ENVÍO MANUAL
const RESTRICTED_ITEMS = [123, 122, 124];
const EXCLUSIVE_CATEGORY = 23;

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
  const [deliveryOption, setDeliveryOption] = useState(''); // 'pickup', 'exterior'
  const [paymentMethod, setPaymentMethod] = useState(''); // 'Efectivo', 'Tarjeta', 'Transferencia', 'Mercado Pago'
  const [orderSuccessData, setOrderSuccessData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [waCheckoutUrl, setWaCheckoutUrl] = useState(null);

  // Card payment flow
  const [showCardFlow, setShowCardFlow] = useState(false); // true = mostrar flujo de tarjeta
  const [cardFlowStep, setCardFlowStep] = useState('detail'); // 'detail' | 'form' | 'processing'
  const [pendingOrderCode, setPendingOrderCode] = useState(null);
  const [cardError, setCardError] = useState(null);
  const [cardData, setCardData] = useState({
    cardNumber: '',
    expirationMonth: '',
    expirationYear: '',
    cvc: '',
    cardholderName: '',
    cardType: 'visa', // 'visa' | 'debvisa' | 'master' | 'debmaster'
    payerEmail: '',
    payerFirstName: '',
    payerLastName: '',
  });

  // Address form fields
  const [addressData, setAddressData] = useState({
    recipientName: '',
    street: '',
    number: '',
    crossStreet: '',
    neighborhood: '',
    facadeColor: '',
    postalCode: '',
    deliveryPhone: ''
  });

  const [voladerasIds, setVoladerasIds] = useState([EXCLUSIVE_CATEGORY]);

  useEffect(() => {
    const fetchVoladerasCategories = async () => {
      try {
        const catsResponse = await getCategories();
        if (catsResponse.status === 'success' && catsResponse.data) {
          // Filtrar como en VoladerasModal: por nombre de la categoría
          const dynamicIds = catsResponse.data
            .filter(cat => cat.name.toLowerCase().includes('voladera'))
            .map(cat => cat.id);

          if (dynamicIds.length > 0) {
            // Combinar el ID 23 por defecto con los que encontremos por nombre
            setVoladerasIds(prev => [...new Set([...prev, ...dynamicIds])]);
          }
        }
      } catch (error) {
        console.error('Error fetching categories for voladeras:', error);
      }
    };

    if (isCartOpen) {
      fetchVoladerasCategories();
    }
  }, [isCartOpen]);

  // --- Cálculos de Totales ---
  const itemsTotal = getTotalPrice(); // Total antes de promociones
  const discountAmount = itemsTotal * GLOBAL_DISCOUNT_RATE;
  const netItemsTotal = itemsTotal - discountAmount;

  const hasRestrictedItem = cartItems.some(item => RESTRICTED_ITEMS.includes(Number(item.id)));
  const hasExclusiveCategory = cartItems.some(item => {
    // Revisar si algún ID de las categorías dinámicas (o el 23) coincide
    if (Array.isArray(item.category_ids)) {
      return item.category_ids.some(id => voladerasIds.includes(Number(id)));
    }
    return voladerasIds.includes(Number(item.category_id));
  });

  let calculatedShipping = 230;
  if (hasExclusiveCategory) {
    calculatedShipping = 700;
  } else {
    if (itemsTotal <= 1000) {
      calculatedShipping = 230;
    } else if (itemsTotal <= 3000) {
      calculatedShipping = 250;
    } else if (itemsTotal <= 4000) {
      calculatedShipping = 300;
    } else {
      calculatedShipping = 350; // Para mayores a 4000 (incluyendo 5000 en adelante)
    }
  }

  const isShippingPending = deliveryOption === 'exterior' && hasRestrictedItem;

  const shippingCost = (deliveryOption === 'exterior' && !isShippingPending) ? calculatedShipping : 0;
  const finalTotal = netItemsTotal + shippingCost;

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('Tu carrito está vacío');
      return;
    }
    setShowPhoneDialog(true);
  };

  // Helper para construir el payload de pago con tarjeta
  const buildCardPaymentPayload = (code) => {
    const firstName = cardData.payerFirstName.trim();
    const lastName = cardData.payerLastName.trim();
    const fullName = cardData.cardholderName.trim() || `${firstName} ${lastName}`;
    return {
      transaction_amount: parseFloat(finalTotal.toFixed(2)),
      card_number: cardData.cardNumber.replace(/\s/g, ''),
      expiration_month: parseInt(cardData.expirationMonth, 10),
      expiration_year: parseInt(cardData.expirationYear, 10),
      cvc: cardData.cvc,
      cardholder_name: fullName,
      payment_method_id: cardData.cardType,
      payer: {
        email: cardData.payerEmail,
        first_name: firstName,
        last_name: lastName,
      },
      description: `Pago de Orden #${code} - KIKOI`,
      installments: 1,
      external_reference: `ORDEN-${code}`,
      metadata: { origen: 'Web KIKOI' },
    };
  };

  // Confirmar pago con tarjeta
  const handleCardPaymentSubmit = async (e) => {
    e.preventDefault();
    setCardError(null);
    setIsSubmitting(true);
    setCardFlowStep('processing');

    try {
      const payload = buildCardPaymentPayload(pendingOrderCode);
      console.log('Payload de pago:', JSON.stringify(payload, null, 2));
      const payResponse = await processCardPayment(payload);

      console.log('Respuesta de pago:', payResponse);

      if (payResponse?.status === 'approved') {
        // Guardar la orden en el backend KIKOI
        const phoneDigits = phone.replace(/\D/g, '');
        await submitOrder(phoneDigits, pendingOrderCode, true);
      } else {
        // Pago rechazado o error
        const detail = payResponse?.status_detail || 'Error desconocido';
        setCardError(`Pago rechazado: ${detail}. Por favor verifica tus datos e intenta de nuevo.`);
        setCardFlowStep('form');
        setIsSubmitting(false);
      }
    } catch (err) {
      console.error('Error en pago con tarjeta:', err);
      setCardError('Ocurrió un error al procesar el pago. Por favor intenta de nuevo.');
      setCardFlowStep('form');
      setIsSubmitting(false);
    }
  };

  // Función para enviar el pedido al backend KIKOI
  const submitOrder = async (phoneDigits, codeOverride = null, fromCardPayment = false) => {
    try {
      // Formatear items: {id: quantity}
      const items = {};
      cartItems.forEach(item => {
        items[String(item.id)] = item.quantity;
      });

      const totalAmount = parseFloat(finalTotal.toFixed(2));

      // Construir string de dirección si no es pickup
      let addressString = null;
      if (deliveryOption === 'exterior') {
        addressString = `Envio Exterior - Nombre: ${addressData.recipientName}, Calle: ${addressData.street}, Número: ${addressData.number}, Entre calle: ${addressData.crossStreet}, Colonia: ${addressData.neighborhood}, Color fachada: ${addressData.facadeColor}, Código postal: ${addressData.postalCode}, Teléfono: ${addressData.deliveryPhone}`;
      }

      const generatedCode = codeOverride || `ORD-${Date.now()}`;
      const generatedCustomerName = customerName || 'Cliente';

      // Construir mensaje de WhatsApp
      const itemsText = cartItems.map(item => `- ${item.quantity}x ${item.name} ($${(item.priceNumber || 0).toFixed(2)} c/u)`).join('\n');
      const deliveryText = deliveryOption === 'pickup'
        ? 'PickUp en Tienda'
        : `Envío Exterior\nDirección:\n${addressString ? addressString.replace('Envio Exterior - ', '') : ''}`;

      const waMessage = `¡Hola! Acabo de realizar un pedido.\n\n*Código de Pedido:* ${generatedCode}\n*Cliente:* ${generatedCustomerName}\n*Teléfono:* ${phoneDigits}\n*Entrega:* ${deliveryText}\n*Método de Pago:* ${paymentMethod}\n\n*Resumen del Pedido:*\n${itemsText}${GLOBAL_DISCOUNT_RATE > 0 ? `\n\n*Subtotal Artículos:* $${itemsTotal.toFixed(2)}\n*Descuento (${(GLOBAL_DISCOUNT_RATE * 100).toFixed(0)}%):* -$${discountAmount.toFixed(2)}` : ''}${deliveryOption === 'exterior' ? `\n*Costo de Envío:* ${isShippingPending ? 'Pendiente' : `$${shippingCost.toFixed(2)}`}` : ''}\n\n*Total a Pagar:* $${finalTotal.toFixed(2)} MXN${isShippingPending ? ' (Envío pendiente de cotización)' : ''}`;

      const orderData = {
        phone: phoneDigits,
        items,
        total_amount: totalAmount,
        promotions: {},
        maps_url: waMessage,
        payment_method: paymentMethod,
      };

      console.log('Enviando pedido:', JSON.stringify(orderData, null, 2));
      const response = await saveOrder(orderData);

      if (response) {
        const waUrl = `https://wa.me/525578343150?text=${encodeURIComponent(waMessage)}`;

        // Cerrar todos los diálogos
        setShowPhoneDialog(false);
        setShowNameDialog(false);
        setShowDeliveryDialog(false);
        setShowCardFlow(false);
        closeCart();
        clearCart();

        setWaCheckoutUrl(waUrl);

        // Mostrar success modal siempre
        setOrderSuccessData({
          orderCode: generatedCode,
          customerName: generatedCustomerName,
          phone: phoneDigits,
          items: cartItems,
          totalAmount: finalTotal,
          waUrl: waUrl,
          paidByCard: fromCardPayment,
        });
        setShowSuccessModal(true);
      } else {
        throw new Error('No se recibió respuesta del servidor');
      }
    } catch (error) {
      console.error('Error al procesar el pedido:', error);
      const errorMessage = error.message || 'Error al procesar el pedido. Por favor intenta de nuevo.';
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

  // Manejar selección de opción de entrega
  const handleDeliveryOptionChange = (option) => {
    setDeliveryOption(option);
    // Si es exterior, forzar Mercado Pago
    if (option === 'exterior') {
      setPaymentMethod('Mercado Pago');
    } else {
      setPaymentMethod('');
    }
    // Limpiar datos de dirección si cambia de opción
    if (option === 'pickup') {
      setAddressData({
        recipientName: '',
        street: '',
        number: '',
        crossStreet: '',
        neighborhood: '',
        facadeColor: '',
        postalCode: '',
        deliveryPhone: ''
      });
    }
  };

  // Manejar cambios en los campos de dirección
  const handleAddressChange = (field, value) => {
    setAddressData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Validar y confirmar opción de entrega
  const handleDeliveryConfirm = async () => {
    if (!deliveryOption) {
      alert('Por favor selecciona un método de entrega');
      return;
    }
    if (!paymentMethod) {
      alert('Por favor selecciona un método de pago');
      return;
    }

    if (deliveryOption === 'exterior') {
      const requiredFields = [
        { field: 'recipientName', label: 'Nombre de quien recibe' },
        { field: 'street', label: 'Calle' },
        { field: 'number', label: 'Número' },
        { field: 'crossStreet', label: 'Entre calle' },
        { field: 'neighborhood', label: 'Colonia' },
        { field: 'facadeColor', label: 'Color fachada' },
        { field: 'postalCode', label: 'Código postal' },
        { field: 'deliveryPhone', label: 'Teléfono' },
      ];
      for (const { field, label } of requiredFields) {
        if (!addressData[field] || addressData[field].trim() === '') {
          alert(`Por favor completa el campo: ${label}`);
          return;
        }
      }
    }

    // Si el método es Tarjeta o Mercado Pago → abrir flujo de pago con tarjeta
    const isCardPayment = paymentMethod === 'Tarjeta' || paymentMethod === 'Mercado Pago';
    if (isCardPayment) {
      const newCode = `ORD-${Date.now()}`;
      setPendingOrderCode(newCode);
      setCardFlowStep('detail');
      setCardError(null);
      setShowDeliveryDialog(false);
      setShowCardFlow(true);
      return;
    }

    // Para otros métodos (Efectivo, Transferencia) → guardar orden directamente
    setIsSubmitting(true);
    try {
      const phoneDigits = phone.replace(/\D/g, '');
      await submitOrder(phoneDigits);
      setIsSubmitting(false);
    } catch (error) {
      console.error('Error al procesar el pedido:', error);
      setIsSubmitting(false);
    }
  };

  const handleCardFormChange = (field, value) => {
    setCardData(prev => ({ ...prev, [field]: value }));
  };

  const handleCloseCardFlow = () => {
    setShowCardFlow(false);
    setCardFlowStep('detail');
    setCardError(null);
    setCardData({
      cardNumber: '',
      expirationMonth: '',
      expirationYear: '',
      cvc: '',
      cardholderName: '',
      cardType: 'visa',
      payerEmail: '',
      payerFirstName: '',
      payerLastName: '',
    });
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
    setPaymentMethod('');
    setAddressData({
      recipientName: '',
      street: '',
      number: '',
      crossStreet: '',
      neighborhood: '',
      facadeColor: '',
      postalCode: '',
      deliveryPhone: ''
    });
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
            {/* Subtotal de artículos */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-base md:text-sm text-gray-600">Subtotal de artículos:</span>
              <span className="text-xl md:text-lg font-semibold text-gray-800">
                ${itemsTotal.toFixed(2)} MXN
              </span>
            </div>

            {/* Discount (if applicable) */}
            {GLOBAL_DISCOUNT_RATE > 0 && (
              <div className="flex items-center justify-between mb-2 text-green-600">
                <span className="text-base md:text-sm">Descuento ({(GLOBAL_DISCOUNT_RATE * 100).toFixed(0)}%):</span>
                <span className="text-xl md:text-lg font-semibold">
                  -${discountAmount.toFixed(2)} MXN
                </span>
              </div>
            )}

            {/* Shipping (if exterior) */}
            {deliveryOption === 'exterior' && (
              <div className="flex items-center justify-between mb-2">
                <span className="text-base md:text-sm text-gray-600">Costo de Envío:</span>
                <span className="text-xl md:text-lg font-semibold text-gray-800">
                  {isShippingPending ? 'Pendiente' : `$${shippingCost.toFixed(2)} MXN`}
                </span>
              </div>
            )}

            {/* Total Items */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-base md:text-sm text-gray-600">Total de items:</span>
              <span className="text-base md:text-sm font-medium text-gray-700">
                {getTotalItems()} {getTotalItems() === 1 ? 'producto' : 'productos'}
              </span>
            </div>

            {/* Total Grande */}
            <div className="flex items-center justify-between mb-5 py-3 border-t border-gray-300">
              <span className="text-2xl md:text-xl font-bold text-[#1A237E]">Total a Pagar:</span>
              <span className="text-3xl md:text-2xl font-bold text-[#1A237E] flex flex-col items-end">
                <span>${finalTotal.toFixed(2)} MXN</span>
                {isShippingPending && <span className="text-sm font-normal text-orange-600">Envío no incluido</span>}
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
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 md:p-8 max-h-[90vh] overflow-y-auto">
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
                  className="mt-1 w-5 h-5 text-[#008F24] focus:ring-[#008F24]"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <MapPin size={20} className="text-[#1A237E]" />
                    <span className="font-semibold text-gray-900">Envío a Exterior</span>
                  </div>
                  <p className="text-sm text-gray-600">Costo de envío: {hasRestrictedItem ? 'Pendiente' : `$${calculatedShipping.toFixed(2)} MXN`}</p>
                </div>
              </label>
            </div>

            {/* Payment Options */}
            {deliveryOption === 'pickup' && (
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-[#1A237E] mb-3">Método de Pago</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {['Efectivo', 'Tarjeta', 'Transferencia'].map((method) => (
                    <label
                      key={method}
                      className={`flex items-center justify-center py-3 px-4 border-2 rounded-lg cursor-pointer transition-all ${paymentMethod === method
                        ? 'border-[#008F24] bg-[#008F24]/5 text-[#008F24] font-semibold'
                        : 'border-gray-200 text-gray-600 hover:border-gray-300'
                        }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={method}
                        checked={paymentMethod === method}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="hidden"
                      />
                      <span>{method}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {deliveryOption === 'exterior' && (
              <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100 flex items-center gap-3">
                <div className="text-blue-700">
                  <p className="font-semibold text-sm">Método de pago para envíos:</p>
                  <p className="text-sm">El pago se realizará de forma segura mediante tarjeta (procesado por Mercado Pago).</p>
                </div>
              </div>
            )}

            {/* Address Form - Only show when Exterior is selected */}
            {(deliveryOption === 'exterior') && (
              <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h4 className="text-lg font-semibold text-[#1A237E] mb-4">Datos de Entrega</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Nombre de quien recibe */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nombre de quien recibe *
                    </label>
                    <input
                      type="text"
                      value={addressData.recipientName}
                      onChange={(e) => handleAddressChange('recipientName', e.target.value)}
                      placeholder="Ej: Juan Pérez"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#008F24] focus:border-transparent"
                    />
                  </div>

                  {/* Calle */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Calle *
                    </label>
                    <input
                      type="text"
                      value={addressData.street}
                      onChange={(e) => handleAddressChange('street', e.target.value)}
                      placeholder="Ej: Calle 60"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#008F24] focus:border-transparent"
                    />
                  </div>

                  {/* Número */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Número *
                    </label>
                    <input
                      type="text"
                      value={addressData.number}
                      onChange={(e) => handleAddressChange('number', e.target.value)}
                      placeholder="Ej: 123"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#008F24] focus:border-transparent"
                    />
                  </div>

                  {/* Entre calle */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Entre calle *
                    </label>
                    <input
                      type="text"
                      value={addressData.crossStreet}
                      onChange={(e) => handleAddressChange('crossStreet', e.target.value)}
                      placeholder="Ej: Calle 61 y 63"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#008F24] focus:border-transparent"
                    />
                  </div>

                  {/* Colonia */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Colonia *
                    </label>
                    <input
                      type="text"
                      value={addressData.neighborhood}
                      onChange={(e) => handleAddressChange('neighborhood', e.target.value)}
                      placeholder="Ej: Centro"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#008F24] focus:border-transparent"
                    />
                  </div>

                  {/* Color fachada */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Color fachada *
                    </label>
                    <input
                      type="text"
                      value={addressData.facadeColor}
                      onChange={(e) => handleAddressChange('facadeColor', e.target.value)}
                      placeholder="Ej: Blanco"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#008F24] focus:border-transparent"
                    />
                  </div>

                  {/* Código postal */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Código postal *
                    </label>
                    <input
                      type="text"
                      value={addressData.postalCode}
                      onChange={(e) => handleAddressChange('postalCode', e.target.value)}
                      placeholder="Ej: 97000"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#008F24] focus:border-transparent"
                    />
                  </div>

                  {/* Teléfono */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Teléfono *
                    </label>
                    <input
                      type="tel"
                      value={addressData.deliveryPhone}
                      onChange={(e) => handleAddressChange('deliveryPhone', e.target.value)}
                      placeholder="Ej: 9991234567"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#008F24] focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleDeliveryCancel}
                disabled={isSubmitting}
                className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50"
              >
                Atrás
              </button>
              <button
                type="button"
                onClick={handleDeliveryConfirm}
                disabled={isSubmitting || !deliveryOption}
                className="flex-1 px-6 py-3 bg-[#008F24] text-white font-semibold rounded-lg hover:bg-[#007520] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    Procesando...
                  </>
                ) : (
                  'Ir a Pagar'
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

      {/* ====== CARD PAYMENT FLOW MODAL ====== */}
      {showCardFlow && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[70] flex items-center justify-center p-3 sm:p-6">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl flex flex-col overflow-hidden max-h-[95vh] animate-in fade-in zoom-in duration-300">

            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 bg-gradient-to-r from-[#1A237E] to-[#283593]">
              <div className="flex items-center gap-3">
                {cardFlowStep === 'form' && (
                  <button
                    onClick={() => { setCardFlowStep('detail'); setCardError(null); }}
                    className="w-8 h-8 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                  >
                    <ChevronLeft size={20} />
                  </button>
                )}
                <CreditCard size={22} className="text-white" />
                <h3 className="text-lg font-bold text-white">
                  {cardFlowStep === 'detail' && 'Detalle de Compra'}
                  {cardFlowStep === 'form' && 'Datos de Tarjeta'}
                  {cardFlowStep === 'processing' && 'Procesando Pago...'}
                </h3>
              </div>
              {cardFlowStep !== 'processing' && (
                <button
                  onClick={handleCloseCardFlow}
                  className="w-9 h-9 flex items-center justify-center bg-white/10 hover:bg-white/25 text-white rounded-full transition-colors"
                  aria-label="Cerrar"
                >
                  <X size={20} strokeWidth={2.5} />
                </button>
              )}
            </div>

            {/* STEP 1: Order Detail */}
            {cardFlowStep === 'detail' && (
              <div className="flex-1 overflow-y-auto p-5 sm:p-7 bg-gray-50">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6 mb-5">
                  <h4 className="text-lg font-bold text-[#1A237E] mb-4 pb-3 border-b border-gray-100">Resumen de tu Pedido</h4>

                  <div className="space-y-3 mb-5">
                    {cartItems.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <span className="inline-flex items-center justify-center w-6 h-6 bg-[#1A237E]/10 text-[#1A237E] rounded-full text-xs font-bold flex-shrink-0">{item.quantity}</span>
                          <span className="text-sm text-gray-700 truncate">{item.name}</span>
                        </div>
                        <span className="text-sm font-semibold text-gray-800 flex-shrink-0">${((item.priceNumber || 0) * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gray-100 pt-4 space-y-2">
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>Subtotal artículos:</span>
                      <span>${itemsTotal.toFixed(2)}</span>
                    </div>
                    {GLOBAL_DISCOUNT_RATE > 0 && (
                      <div className="flex justify-between text-sm text-green-600 font-medium">
                        <span>Descuento ({(GLOBAL_DISCOUNT_RATE * 100).toFixed(0)}%):</span>
                        <span>-${discountAmount.toFixed(2)}</span>
                      </div>
                    )}
                    {deliveryOption === 'exterior' && (
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>Envío:</span>
                        <span>{isShippingPending ? 'Pendiente' : `$${shippingCost.toFixed(2)}`}</span>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 pt-4 border-t-2 border-gray-200 flex justify-between items-center">
                    <span className="text-xl font-black text-[#1A237E]">Total a Pagar</span>
                    <div className="text-right">
                      <span className="text-3xl font-black text-[#008F24]">${finalTotal.toFixed(2)}</span>
                      <span className="text-base font-semibold text-gray-500 ml-1">MXN</span>
                      {isShippingPending && <div className="text-xs text-orange-600 mt-0.5">Envío pendiente de cotización</div>}
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleCloseCardFlow}
                    className="flex-1 py-3.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition-all flex items-center justify-center gap-2"
                  >
                    <ChevronLeft size={18} />
                    Regresar
                  </button>
                  <button
                    onClick={() => setCardFlowStep('form')}
                    className="flex-1 py-3.5 bg-[#1A237E] hover:bg-[#151c6a] text-white font-bold rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    <CreditCard size={18} />
                    Confirmar y Pagar
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Card Form */}
            {cardFlowStep === 'form' && (
              <form onSubmit={handleCardPaymentSubmit} className="flex-1 overflow-y-auto p-5 sm:p-7 bg-gray-50">
                {/* Error Alert */}
                {cardError && (
                  <div className="mb-5 flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl p-4">
                    <AlertCircle size={20} className="text-red-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-700">{cardError}</p>
                  </div>
                )}

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6 mb-5 space-y-4">
                  <h4 className="text-base font-bold text-[#1A237E] pb-2 border-b border-gray-100 flex items-center gap-2">
                    <Lock size={16} className="text-[#008F24]" />
                    Datos de Tarjeta
                  </h4>

                  {/* Tipo de tarjeta */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Tipo de Tarjeta</label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { id: 'visa', label: 'Visa Crédito' },
                        { id: 'debvisa', label: 'Visa Débito' },
                        { id: 'master', label: 'Mastercard Crédito' },
                        { id: 'debmaster', label: 'Mastercard Débito' },
                      ].map(({ id, label }) => (
                        <label
                          key={id}
                          className={`flex items-center gap-2 p-2.5 border-2 rounded-lg cursor-pointer transition-all text-sm font-medium ${
                            cardData.cardType === id
                              ? 'border-[#1A237E] bg-[#1A237E]/5 text-[#1A237E]'
                              : 'border-gray-200 text-gray-600 hover:border-gray-300'
                          }`}
                        >
                          <input
                            type="radio"
                            name="cardType"
                            value={id}
                            checked={cardData.cardType === id}
                            onChange={() => handleCardFormChange('cardType', id)}
                            className="hidden"
                          />
                          <span className={`w-3.5 h-3.5 rounded-full border-2 flex-shrink-0 ${
                            cardData.cardType === id ? 'border-[#1A237E] bg-[#1A237E]' : 'border-gray-300'
                          }`} />
                          {label}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Número de tarjeta */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Número de Tarjeta *</label>
                    <input
                      type="text"
                      inputMode="numeric"
                      maxLength={19}
                      value={cardData.cardNumber}
                      onChange={e => {
                        const raw = e.target.value.replace(/\D/g, '').slice(0, 16);
                        const formatted = raw.match(/.{1,4}/g)?.join(' ') || raw;
                        handleCardFormChange('cardNumber', formatted);
                      }}
                      placeholder="0000 0000 0000 0000"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1A237E] focus:border-transparent text-base tracking-widest font-mono"
                      required
                    />
                  </div>

                  {/* Nombre en tarjeta */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Nombre del Titular *</label>
                    <input
                      type="text"
                      value={cardData.cardholderName}
                      onChange={e => handleCardFormChange('cardholderName', e.target.value.toUpperCase())}
                      placeholder="NOMBRE COMO APARECE EN LA TARJETA"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1A237E] focus:border-transparent text-base uppercase"
                      required
                    />
                  </div>

                  {/* Vencimiento + CVC */}
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Mes *</label>
                      <input
                        type="text"
                        inputMode="numeric"
                        maxLength={2}
                        value={cardData.expirationMonth}
                        onChange={e => handleCardFormChange('expirationMonth', e.target.value.replace(/\D/g, '').slice(0, 2))}
                        placeholder="MM"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1A237E] focus:border-transparent text-base text-center"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Año *</label>
                      <input
                        type="text"
                        inputMode="numeric"
                        maxLength={4}
                        value={cardData.expirationYear}
                        onChange={e => handleCardFormChange('expirationYear', e.target.value.replace(/\D/g, '').slice(0, 4))}
                        placeholder="AAAA"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1A237E] focus:border-transparent text-base text-center"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">CVC *</label>
                      <input
                        type="text"
                        inputMode="numeric"
                        maxLength={4}
                        value={cardData.cvc}
                        onChange={e => handleCardFormChange('cvc', e.target.value.replace(/\D/g, '').slice(0, 4))}
                        placeholder="***"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1A237E] focus:border-transparent text-base text-center"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Datos del Titular (Pagador) */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6 mb-5 space-y-4">
                  <h4 className="text-base font-bold text-[#1A237E] pb-2 border-b border-gray-100">Datos del Pagador</h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Nombre *</label>
                      <input
                        type="text"
                        value={cardData.payerFirstName}
                        onChange={e => handleCardFormChange('payerFirstName', e.target.value)}
                        placeholder="Juan"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1A237E] focus:border-transparent text-base"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Apellido *</label>
                      <input
                        type="text"
                        value={cardData.payerLastName}
                        onChange={e => handleCardFormChange('payerLastName', e.target.value)}
                        placeholder="Pérez"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1A237E] focus:border-transparent text-base"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Correo Electrónico *</label>
                    <input
                      type="email"
                      value={cardData.payerEmail}
                      onChange={e => handleCardFormChange('payerEmail', e.target.value)}
                      placeholder="correo@ejemplo.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1A237E] focus:border-transparent text-base"
                      required
                    />
                  </div>
                </div>

                {/* Total reminder */}
                <div className="bg-[#1A237E]/5 border border-[#1A237E]/20 rounded-xl px-5 py-4 mb-5 flex justify-between items-center">
                  <span className="text-sm font-semibold text-[#1A237E]">Total a cobrar:</span>
                  <span className="text-2xl font-black text-[#008F24]">${finalTotal.toFixed(2)} <span className="text-sm font-semibold text-gray-500">MXN</span></span>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => { setCardFlowStep('detail'); setCardError(null); }}
                    className="flex-1 py-3.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition-all flex items-center justify-center gap-2"
                  >
                    <ChevronLeft size={18} />
                    Regresar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3.5 bg-[#008F24] hover:bg-[#007520] text-white font-bold rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    <Lock size={18} />
                    Pagar Ahora
                  </button>
                </div>

                <p className="text-xs text-gray-400 text-center mt-4 flex items-center justify-center gap-1">
                  <Lock size={11} /> Tus datos están protegidos con cifrado seguro
                </p>
              </form>
            )}

            {/* STEP 3: Processing */}
            {cardFlowStep === 'processing' && (
              <div className="flex-1 flex flex-col items-center justify-center p-10 gap-6 bg-gray-50">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-[#1A237E]/10 flex items-center justify-center">
                    <Loader2 size={40} className="text-[#1A237E] animate-spin" />
                  </div>
                </div>
                <div className="text-center">
                  <h4 className="text-xl font-bold text-[#1A237E] mb-2">Procesando tu pago...</h4>
                  <p className="text-gray-500 text-sm">Por favor no cierres esta ventana</p>
                </div>
              </div>
            )}

          </div>
        </div>
      )}
    </>
  );
};

export default CartDrawer;

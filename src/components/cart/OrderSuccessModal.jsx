import React from 'react';
import { CheckCircle, X, ShoppingBag, Package } from 'lucide-react';

const OrderSuccessModal = ({ isOpen, onClose, orderData }) => {
    if (!isOpen) return null;

    const { orderCode, phone, items, totalAmount, customerName } = orderData || {};

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal Container */}
            <div className="relative bg-white rounded-2xl md:rounded-[15px] w-full max-w-[600px] h-auto max-h-[90vh] overflow-y-auto shadow-[0px_4px_4px_rgba(0,0,0,0.25)] animate-in fade-in zoom-in duration-200">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 md:top-4 md:right-4 z-20 w-10 h-10 md:w-[30px] md:h-[30px] flex items-center justify-center bg-[#A41262] text-white hover:bg-[#8e1055] active:scale-95 rounded-full transition-all shadow-lg"
                    aria-label="Cerrar"
                >
                    <X size={20} strokeWidth={3} className="md:w-4 md:h-4" />
                </button>

                <div className="p-6 md:p-8 flex flex-col h-full font-['Inter']">

                    {/* Success Icon */}
                    <div className="w-full flex items-center justify-center mb-4">
                        <div className="w-20 h-20 md:w-24 md:h-24 bg-[#008F24]/10 rounded-full flex items-center justify-center">
                            <CheckCircle size={48} className="text-[#008F24] md:w-14 md:h-14" strokeWidth={2} />
                        </div>
                    </div>

                    {/* Header: Title */}
                    <h2 className="text-2xl md:text-[28px] font-bold text-[#008F24] mb-2 text-center leading-tight">
                        ¡Pedido Realizado con Éxito!
                    </h2>

                    <p className="text-center text-gray-600 text-sm md:text-base mb-6">
                        Gracias por tu compra. Te contactaremos pronto para confirmar tu pedido.
                    </p>

                    {/* Order Details Card */}
                    <div className="bg-gray-50 rounded-xl p-4 md:p-6 mb-6">
                        {/* Order Code */}
                        {orderCode && (
                            <div className="mb-4 pb-4 border-b border-gray-200">
                                <p className="text-xs md:text-sm text-gray-500 mb-1">Código de Pedido</p>
                                <p className="text-lg md:text-xl font-bold text-[#1A237E]">{orderCode}</p>
                            </div>
                        )}

                        {/* Customer Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 pb-4 border-b border-gray-200">
                            {customerName && (
                                <div>
                                    <p className="text-xs md:text-sm text-gray-500 mb-1">Nombre</p>
                                    <p className="text-sm md:text-base font-semibold text-gray-800">{customerName}</p>
                                </div>
                            )}
                            {phone && (
                                <div>
                                    <p className="text-xs md:text-sm text-gray-500 mb-1">Teléfono</p>
                                    <p className="text-sm md:text-base font-semibold text-gray-800">{phone}</p>
                                </div>
                            )}
                        </div>

                        {/* Order Items */}
                        {items && items.length > 0 && (
                            <div className="mb-4">
                                <div className="flex items-center gap-2 mb-3">
                                    <Package size={18} className="text-[#1A237E]" />
                                    <p className="text-sm md:text-base font-bold text-gray-800">Productos</p>
                                </div>
                                <div className="space-y-2">
                                    {items.map((item, index) => (
                                        <div key={index} className="flex justify-between items-center text-sm">
                                            <div className="flex-1">
                                                <p className="font-medium text-gray-700">{item.name}</p>
                                                <p className="text-xs text-gray-500">Cantidad: {item.quantity}</p>
                                            </div>
                                            <p className="font-semibold text-gray-800">
                                                ${(item.priceNumber * item.quantity).toFixed(2)} MXN
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Total */}
                        {totalAmount !== undefined && (
                            <div className="pt-4 border-t border-gray-300">
                                <div className="flex justify-between items-center">
                                    <p className="text-lg md:text-xl font-bold text-[#1A237E]">Total</p>
                                    <p className="text-2xl md:text-3xl font-bold text-[#008F24]">
                                        ${totalAmount.toFixed(2)} MXN
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Info Message */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                        <p className="text-sm text-blue-800 text-center">
                            <span className="font-semibold">Nota:</span> Nos pondremos en contacto contigo para confirmar los detalles de tu pedido y coordinar la entrega.
                        </p>
                    </div>

                    {/* Close Button */}
                    <div className="flex justify-center">
                        <button
                            onClick={onClose}
                            className="w-full md:w-[244px] h-14 md:h-[40px] bg-[#008F24] hover:bg-[#007520] text-white font-bold text-lg md:text-[16px] rounded-xl md:rounded-[10px] shadow-none flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                        >
                            <ShoppingBag size={20} />
                            Continuar Comprando
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default OrderSuccessModal;

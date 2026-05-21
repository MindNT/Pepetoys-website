import React from 'react';
import { CheckCircle, X, ShoppingBag, Package } from 'lucide-react';

const OrderSuccessModal = ({ isOpen, onClose, orderData }) => {
    if (!isOpen) return null;

    const { orderCode, phone, items, totalAmount, customerName, waUrl } = orderData || {};

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

                    {/* WhatsApp Action */}
                    {waUrl && (
                        <div className="mb-6 flex flex-col items-center gap-3">
                            <p className="text-sm text-gray-600 text-center">
                                ¿Quieres agilizar tu pedido? Envíanos un WhatsApp.
                            </p>
                            <a 
                                href={waUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="w-full md:w-[244px] h-12 md:h-10 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm md:text-base rounded-xl md:rounded-[10px] shadow-sm flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                                Enviar WhatsApp
                            </a>
                        </div>
                    )}

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

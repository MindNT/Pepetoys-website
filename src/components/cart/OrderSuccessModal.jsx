import React from 'react';
import { CheckCircle, X, ShoppingBag, Package, CreditCard, Sparkles } from 'lucide-react';

const OrderSuccessModal = ({ isOpen, onClose, orderData }) => {
    if (!isOpen) return null;

    const { orderCode, phone, items, totalAmount, customerName, waUrl, paidByCard, discountAmount, discountPercentage } = orderData || {};

    return (
        <div className="fixed inset-0 z-[80] flex items-center justify-center px-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal Container */}
            <div className="relative bg-white rounded-3xl w-full max-w-[560px] max-h-[92vh] overflow-y-auto shadow-2xl animate-in fade-in zoom-in duration-300">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-20 w-9 h-9 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-800 active:scale-95 rounded-full transition-all"
                    aria-label="Cerrar"
                >
                    <X size={18} strokeWidth={2.5} />
                </button>

                {/* Hero section with gradient */}
                <div className={`relative overflow-hidden px-6 pt-10 pb-8 text-center rounded-t-3xl ${paidByCard ? 'bg-gradient-to-br from-[#1A237E] via-[#283593] to-[#1565C0]' : 'bg-gradient-to-br from-[#008F24] via-[#007520] to-[#005a1a]'}`}>
                    {/* Decorative circles */}
                    <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/5" />
                    <div className="absolute -bottom-4 -left-8 w-24 h-24 rounded-full bg-white/5" />

                    {/* Success Icon */}
                    <div className="relative w-20 h-20 mx-auto mb-4">
                        <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30">
                            <CheckCircle size={40} className="text-white" strokeWidth={2} />
                        </div>
                        {paidByCard && (
                            <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-[#FFD700] rounded-full flex items-center justify-center shadow-lg">
                                <CreditCard size={13} className="text-[#1A237E]" />
                            </div>
                        )}
                    </div>

                    <h2 className="text-2xl font-black text-white mb-2 leading-tight">
                        ¡Pedido Realizado con Éxito!
                    </h2>
                    <p className="text-white/80 text-sm">
                        {paidByCard ? '¡Pago con tarjeta aprobado! Tu pedido está confirmado.' : 'Gracias por tu compra. Te contactaremos pronto.'}
                    </p>

                    {paidByCard && (
                        <div className="mt-4 inline-flex items-center gap-1.5 bg-white/20 border border-white/30 rounded-full px-4 py-1.5 text-xs font-bold text-white backdrop-blur-sm">
                            <Sparkles size={12} />
                            Pago aprobado ✓
                        </div>
                    )}
                </div>

                <div className="p-5 md:p-6 flex flex-col gap-4">

                    {/* Order Details Card */}
                    <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                        {/* Order Code */}
                        {orderCode && (
                            <div className="mb-3 pb-3 border-b border-gray-200">
                                <p className="text-xs text-gray-400 uppercase tracking-wider mb-1 font-semibold">Código de Pedido</p>
                                <p className="text-lg font-black text-[#1A237E] tracking-wide">{orderCode}</p>
                            </div>
                        )}

                        {/* Customer Info */}
                        <div className="grid grid-cols-2 gap-3 mb-3 pb-3 border-b border-gray-200">
                            {customerName && (
                                <div>
                                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-0.5 font-semibold">Nombre</p>
                                    <p className="text-sm font-bold text-gray-800">{customerName}</p>
                                </div>
                            )}
                            {phone && (
                                <div>
                                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-0.5 font-semibold">Teléfono</p>
                                    <p className="text-sm font-bold text-gray-800">{phone}</p>
                                </div>
                            )}
                        </div>

                        {/* Order Items */}
                        {items && items.length > 0 && (
                            <div className="mb-3 pb-3 border-b border-gray-200">
                                <div className="flex items-center gap-2 mb-2">
                                    <Package size={15} className="text-[#1A237E]" />
                                    <p className="text-xs font-bold text-gray-700 uppercase tracking-wider">Productos</p>
                                </div>
                                <div className="space-y-1.5">
                                    {items.map((item, index) => (
                                        <div key={index} className="flex justify-between items-center text-sm">
                                            <div className="flex items-center gap-2 flex-1 min-w-0">
                                                <span className="inline-flex items-center justify-center w-5 h-5 bg-[#1A237E]/10 text-[#1A237E] rounded-full text-xs font-bold flex-shrink-0">{item.quantity}</span>
                                                <p className="font-medium text-gray-700 truncate">{item.name}</p>
                                            </div>
                                            <p className="font-semibold text-gray-800 flex-shrink-0 ml-2">
                                                ${(item.priceNumber * item.quantity).toFixed(2)}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Descuento */}
                        {discountAmount > 0 && (
                            <div className="flex justify-between items-center mb-3 text-sm">
                                <p className="font-bold text-green-600">Descuento ({(discountPercentage * 100).toFixed(0)}%)</p>
                                <p className="font-black text-green-600">
                                    -${discountAmount.toFixed(2)}
                                </p>
                            </div>
                        )}

                        {/* Total */}
                        {totalAmount !== undefined && (
                            <div className="flex justify-between items-center">
                                <p className="text-base font-bold text-[#1A237E]">Total Pagado</p>
                                <p className="text-2xl font-black text-[#008F24]">
                                    ${totalAmount.toFixed(2)} <span className="text-sm font-semibold text-gray-500">MXN</span>
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Info Message */}
                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-3.5">
                        <p className="text-sm text-blue-800 text-center">
                            <span className="font-semibold">📦 Siguiente paso:</span> Nos pondremos en contacto contigo para confirmar los detalles y coordinar la entrega.
                        </p>
                    </div>

                    {/* WhatsApp Action */}
                    {waUrl && (
                        <a
                            href={waUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-3.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-base rounded-xl shadow-sm flex items-center justify-center gap-2 transition-all active:scale-[0.98] hover:shadow-md"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                            Enviar WhatsApp
                        </a>
                    )}

                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="w-full py-3.5 bg-[#1A237E] hover:bg-[#151c6a] text-white font-bold text-base rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] hover:shadow-md"
                    >
                        <ShoppingBag size={18} />
                        Continuar Comprando
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderSuccessModal;

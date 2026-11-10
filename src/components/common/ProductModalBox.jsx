import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Plus, Minus, ChevronLeft, ChevronRight, Snowflake, Gift, Sparkles } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import formatGoogleDriveUrl from '../../utils/formatGoogleDriveUrl';

const BASE_URL = import.meta.env.BASE_URL;

/**
 * ProductModalBox
 * Modal de producto tematizado de Navidad, usado para el artículo
 * destacado "Caja navideña" y para los artículos de la categoría
 * Navideños. Misma funcionalidad que ProductModal pero con diseño festivo.
 */
const ProductModalBox = ({ isOpen, onClose, product, loading }) => {
    const [quantity, setQuantity] = useState(1);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const { startDirectBuy } = useCart();

    // Reset state when product changes
    useEffect(() => {
        setQuantity(1);
        setSelectedImageIndex(0);
    }, [product?.id, isOpen]);

    if (!isOpen) return null;

    // Build images array from product.images or fallback to single image
    const allImages = (() => {
        if (Array.isArray(product?.images) && product.images.length > 0) {
            return product.images
                .filter(u => u && typeof u === 'string' && u.trim() && u.startsWith('http'))
                .map(u => formatGoogleDriveUrl(u));
        }
        // Fallback to single image
        const raw = product?.img_item || product?.image || `${BASE_URL}shopping.jpg`;
        return [raw.startsWith('http') ? formatGoogleDriveUrl(raw) : raw];
    })();

    const currentImage = allImages[selectedImageIndex] || allImages[0];
    const hasMultipleImages = allImages.length > 1;

    const prevImage = () => setSelectedImageIndex(i => (i === 0 ? allImages.length - 1 : i - 1));
    const nextImage = () => setSelectedImageIndex(i => (i === allImages.length - 1 ? 0 : i + 1));

    // Helper to get product attributes (atributo_1 and atributo_2)
    const getAttributes = () => {
        const attributes = [];
        if (product?.atributo_1) {
            attributes.push(product.atributo_1);
        }
        if (product?.atributo_2) {
            attributes.push(product.atributo_2);
        }
        return attributes;
    };

    const attributes = getAttributes();

    // Price logic
    const displayPrice = product?.price ? (typeof product.price === 'number' ? `$${product.price} MXN` : product.price) : "Consultar";

    // Portal al body: el modal (y su blur) queda por encima de TODO el homepage,
    // sin importar en qué sección se renderice (banner, CategoryPage, etc.)
    return createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-3 sm:px-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-[#1a0505]/70 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal Container */}
            <div className="relative bg-gradient-to-b from-[#A81212] via-[#8f1010] to-[#5c0a0a] rounded-2xl md:rounded-[15px] w-full max-w-[600px] h-auto max-h-[90vh] overflow-y-auto border-4 border-[#FFD700]/60 shadow-[0_0_40px_rgba(255,215,0,0.25),0px_4px_4px_rgba(0,0,0,0.25)] animate-in fade-in zoom-in duration-200 scrollbar-hide">

                {/* Decorative snowflakes */}
                <Snowflake size={28} className="absolute top-3 left-3 text-white/40 pointer-events-none" />
                <Snowflake size={18} className="absolute top-16 left-10 text-white/25 pointer-events-none animate-pulse" />
                <Snowflake size={22} className="absolute bottom-24 left-4 text-white/25 pointer-events-none" />
                <Snowflake size={16} className="absolute top-1/2 right-6 text-white/20 pointer-events-none animate-pulse" />
                <Snowflake size={24} className="absolute bottom-10 right-10 text-white/30 pointer-events-none" />

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 md:top-4 md:right-4 z-20 w-10 h-10 md:w-[30px] md:h-[30px] flex items-center justify-center bg-[#FFD700] text-[#7a0d0d] hover:bg-[#e6c200] active:scale-95 rounded-full transition-all shadow-lg"
                    aria-label="Cerrar"
                >
                    <X size={20} strokeWidth={3} className="md:w-4 md:h-4" />
                </button>

                <div className="p-4 sm:p-6 md:p-8 flex flex-col h-full font-['Inter'] relative z-10">

                    {/* Festive badge */}
                    <div className="flex justify-center mb-2">
                        <span className="inline-flex items-center gap-1.5 bg-[#FFD700] text-[#7a0d0d] text-[11px] md:text-[12px] font-bold uppercase tracking-widest px-4 py-1 rounded-full shadow-md">
                            <Sparkles size={13} />
                            Edición Navideña
                            <Sparkles size={13} />
                        </span>
                    </div>

                    {/* Header: Title */}
                    <h2 className="text-2xl md:text-[26px] font-bold text-white mb-4 md:mb-6 text-center leading-tight drop-shadow-[0_2px_2px_rgba(0,0,0,0.4)]">
                        {product?.name || "Cargando..."}
                    </h2>

                    {/* Image Gallery */}
                    <div className="w-full mb-4 md:mb-6">
                        {/* Main Image — white snow-style frame */}
                        <div className="relative w-full flex items-center justify-center">
                            {hasMultipleImages && (
                                <button
                                    onClick={prevImage}
                                    className="absolute left-1 z-10 w-8 h-8 bg-black/30 hover:bg-black/50 rounded-full flex items-center justify-center transition-colors"
                                    aria-label="Imagen anterior"
                                >
                                    <ChevronLeft size={18} className="text-white" />
                                </button>
                            )}

                            <div className="bg-white/95 rounded-2xl p-2.5 sm:p-3 shadow-[0_0_25px_rgba(255,255,255,0.35)]">
                                <img
                                    src={currentImage}
                                    alt={`${product?.name || "Producto"} ${selectedImageIndex + 1}`}
                                    className="w-full max-w-[200px] sm:max-w-[250px] md:max-w-[280px] max-h-[32vh] object-contain drop-shadow-md transform hover:scale-105 transition-transform duration-500"
                                />
                            </div>

                            {hasMultipleImages && (
                                <button
                                    onClick={nextImage}
                                    className="absolute right-1 z-10 w-8 h-8 bg-black/30 hover:bg-black/50 rounded-full flex items-center justify-center transition-colors"
                                    aria-label="Siguiente imagen"
                                >
                                    <ChevronRight size={18} className="text-white" />
                                </button>
                            )}
                        </div>

                        {/* Thumbnails */}
                        {hasMultipleImages && (
                            <div className="flex justify-center gap-2 mt-3 flex-wrap">
                                {allImages.map((img, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImageIndex(index)}
                                        className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-all duration-200 bg-white ${
                                            index === selectedImageIndex
                                                ? 'border-[#FFD700] shadow-[0_0_10px_rgba(255,215,0,0.6)] scale-110'
                                                : 'border-white/40 opacity-60 hover:opacity-100 hover:border-white'
                                        }`}
                                        aria-label={`Imagen ${index + 1}`}
                                    >
                                        <img
                                            src={img}
                                            alt={`thumb ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Dot indicators */}
                        {hasMultipleImages && allImages.length <= 8 && (
                            <div className="flex justify-center gap-1.5 mt-2">
                                {allImages.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImageIndex(index)}
                                        className={`w-2 h-2 rounded-full transition-all duration-200 ${
                                            index === selectedImageIndex
                                                ? 'bg-[#FFD700] w-4'
                                                : 'bg-white/40 hover:bg-white/70'
                                        }`}
                                        aria-label={`Imagen ${index + 1}`}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Attributes Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
                        {/* Left: Atributos */}
                        <div>
                            <h3 className="text-[14px] font-bold text-[#FFD700] mb-2 text-center md:text-left">Atributos</h3>
                            <div className="flex flex-wrap justify-center md:justify-start gap-2">
                                {loading ? (
                                    <span className="text-xs text-white/60 animate-pulse">Verificando...</span>
                                ) : attributes.length > 0 ? (
                                    attributes.map((attr, index) => (
                                        <span key={index} className="px-4 py-1.5 min-h-[32px] flex items-center justify-center bg-white/15 border border-[#FFD700]/50 text-white text-[12px] font-medium rounded-[15px] capitalize break-words max-w-full leading-snug text-center">
                                            {attr}
                                        </span>
                                    ))
                                ) : (
                                    <span className="px-4 h-[32px] flex items-center bg-white/10 text-white/70 text-[12px] font-medium rounded-[15px]">
                                        Sin atributos
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Right: Medidas (Hidden if no data, keeping grid structure) */}
                        <div className="hidden md:block">
                            {/* Placeholder for future measures */}
                        </div>
                    </div>

                    {/* Description */}
                    <div className="mb-4 md:mb-6 flex-grow text-center md:text-left">
                        <p className="text-white/90 text-[15px] leading-[22px] font-normal whitespace-pre-line">
                            {loading ? "Cargando descripción..." : (product?.description || "Sin descripción detallada.")}
                        </p>
                    </div>

                    {/* Bottom Grid: Price (left) | Quantity (right) */}
                    <div className="grid grid-cols-2 gap-3 sm:gap-6 mb-5 md:mb-8 items-center">

                        {/* Price (Left) */}
                        <div className="flex flex-col items-center md:items-start">
                            <h3 className="text-[12px] font-bold text-[#FFD700] mb-1">Precio</h3>
                            <span className="text-[24px] font-bold text-white drop-shadow-md">{displayPrice}</span>
                        </div>

                        {/* Quantity (Right) */}
                        <div className="flex flex-col items-center md:items-end">
                            <h3 className="text-sm md:text-[12px] font-bold text-[#FFD700] mb-2">Cantidad</h3>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="w-10 h-10 md:w-[30px] md:h-[30px] flex items-center justify-center bg-[#166534] text-white rounded-full hover:bg-[#14532d] active:scale-95 transition-all border border-[#FFD700]/40"
                                    aria-label="Disminuir cantidad"
                                >
                                    <Minus size={18} strokeWidth={2.5} />
                                </button>
                                <span className="w-10 md:w-6 text-center font-bold text-lg md:text-[14px] text-white">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="w-10 h-10 md:w-[30px] md:h-[30px] flex items-center justify-center bg-[#166534] text-white rounded-full hover:bg-[#14532d] active:scale-95 transition-all border border-[#FFD700]/40"
                                    aria-label="Aumentar cantidad"
                                >
                                    <Plus size={18} strokeWidth={2.5} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Footer Button - Centered (pago directo, sin carrito) */}
                    <div className="mt-auto flex justify-center">
                        <button
                            onClick={() => {
                                if (product) {
                                    // La Caja navideña se paga directamente: abre el flujo
                                    // de cobro (teléfono → entrega → pago) sin pasar por el carrito
                                    startDirectBuy(product, quantity);
                                    onClose();
                                }
                            }}
                            className="w-full md:w-[264px] h-16 md:h-[52px] bg-[#166534] hover:bg-[#14532d] disabled:bg-[#166534] disabled:opacity-75 text-white font-bold text-lg md:text-[16px] rounded-xl md:rounded-[10px] border-2 border-[#FFD700]/70 shadow-[0_0_18px_rgba(255,215,0,0.35)] flex items-center justify-center gap-2 transition-transform active:scale-[0.98]"
                        >
                            <Gift size={20} />
                            Comprar ahora
                        </button>
                    </div>

                </div>
            </div>
        </div>,
        document.body
    );
};

export default ProductModalBox;

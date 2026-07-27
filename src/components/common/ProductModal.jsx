import React, { useState, useEffect } from 'react';
import { X, Plus, Minus, ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react';
import Button from './Button';
import { useCart } from '../../context/CartContext';
import formatGoogleDriveUrl from '../../utils/formatGoogleDriveUrl';

const BASE_URL = import.meta.env.BASE_URL;

const ProductModal = ({ isOpen, onClose, product, loading }) => {
    const [quantity, setQuantity] = useState(1);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const { addToCart, openCart } = useCart();

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

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal Container */}
            <div className="relative bg-white rounded-2xl md:rounded-[15px] w-full max-w-[600px] h-auto max-h-[90vh] overflow-y-auto shadow-[0px_4px_4px_rgba(0,0,0,0.25)] animate-in fade-in zoom-in duration-200">

                {/* Close Button - MÁS GRANDE para móvil */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 md:top-4 md:right-4 z-20 w-10 h-10 md:w-[30px] md:h-[30px] flex items-center justify-center bg-[#A41262] text-white hover:bg-[#8e1055] active:scale-95 rounded-full transition-all shadow-lg"
                    aria-label="Cerrar"
                >
                    <X size={20} strokeWidth={3} className="md:w-4 md:h-4" />
                </button>

                <div className="p-6 md:p-8 flex flex-col h-full font-['Inter']">

                    {/* Header: Title - Más grande en móvil */}
                    <h2 className="text-2xl md:text-[24px] font-bold text-black mb-4 md:mb-6 text-center leading-tight">
                        {product?.name || "Cargando..."}
                    </h2>

                    {/* Image Gallery */}
                    <div className="w-full mb-6">
                        {/* Main Image */}
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

                            <img
                                src={currentImage}
                                alt={`${product?.name || "Producto"} ${selectedImageIndex + 1}`}
                                className="w-full max-w-[300px] object-contain drop-shadow-md transform hover:scale-105 transition-transform duration-500"
                            />

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
                                        className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                                            index === selectedImageIndex
                                                ? 'border-[#008F24] shadow-md scale-110'
                                                : 'border-gray-200 opacity-60 hover:opacity-100 hover:border-gray-400'
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

                        {/* Dot indicators (alternative to thumbnails for many images) */}
                        {hasMultipleImages && allImages.length <= 8 && (
                            <div className="flex justify-center gap-1.5 mt-2">
                                {allImages.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImageIndex(index)}
                                        className={`w-2 h-2 rounded-full transition-all duration-200 ${
                                            index === selectedImageIndex
                                                ? 'bg-[#008F24] w-4'
                                                : 'bg-gray-300 hover:bg-gray-400'
                                        }`}
                                        aria-label={`Imagen ${index + 1}`}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Attributes Row (Grid) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        {/* Left: Atributos */}
                        <div>
                            <h3 className="text-[14px] font-bold text-black mb-2 text-center md:text-left">Atributos</h3>
                            <div className="flex flex-wrap justify-center md:justify-start gap-2">
                                {loading ? (
                                    <span className="text-xs text-gray-400 animate-pulse">Verificando...</span>
                                ) : attributes.length > 0 ? (
                                    attributes.map((attr, index) => (
                                        <span key={index} className="px-4 h-[32px] flex items-center bg-[#A41262]/10 text-[#A41262] text-[12px] font-medium rounded-[15px] capitalize">
                                            {attr}
                                        </span>
                                    ))
                                ) : (
                                    <span className="px-4 h-[32px] flex items-center bg-gray-100 text-gray-500 text-[12px] font-medium rounded-[15px]">
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
                    <div className="mb-6 flex-grow text-center md:text-left">
                        <p className="text-[#494949] text-[15px] leading-[22px] font-normal whitespace-pre-line">
                            {loading ? "Cargando descripción..." : (product?.description || "Sin descripción detallada.")}
                        </p>
                    </div>

                    {/* Bottom Grid: Price (left) | Quantity (right) */}
                    <div className="grid grid-cols-2 gap-6 mb-8 items-center">

                        {/* Price (Left) */}
                        <div className="flex flex-col items-center md:items-start">
                            <h3 className="text-[12px] font-bold text-black mb-1">Precio</h3>
                            <span className="text-[24px] font-bold text-[#8A8A8A]">{displayPrice}</span>
                        </div>

                        {/* Quantity (Right) */}
                        <div className="flex flex-col items-center md:items-end">
                            <h3 className="text-sm md:text-[12px] font-bold text-black mb-2">Cantidad</h3>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="w-10 h-10 md:w-[30px] md:h-[30px] flex items-center justify-center bg-[#008F24] text-white rounded-full hover:bg-green-700 active:scale-95 transition-all"
                                    aria-label="Disminuir cantidad"
                                >
                                    <Minus size={18} strokeWidth={2.5} />
                                </button>
                                <span className="w-10 md:w-6 text-center font-bold text-lg md:text-[14px] text-black">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="w-10 h-10 md:w-[30px] md:h-[30px] flex items-center justify-center bg-[#008F24] text-white rounded-full hover:bg-green-700 active:scale-95 transition-all"
                                    aria-label="Aumentar cantidad"
                                >
                                    <Plus size={18} strokeWidth={2.5} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Footer Button - Centered */}
                    <div className="mt-auto flex justify-center">
                        <button
                            onClick={(e) => {
                                if (product) {
                                    addToCart(product, quantity);
                                    // Mostrar feedback visual breve
                                    const button = e.currentTarget;
                                    const originalText = button.innerHTML;
                                    button.innerHTML = '<svg class="w-5 h-5 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" /></svg> ¡Agregado!';
                                    button.disabled = true;
                                    button.classList.add('scale-95');

                                    setTimeout(() => {
                                        button.innerHTML = originalText;
                                        button.disabled = false;
                                        button.classList.remove('scale-95');
                                        // Cerrar modal SOLAMENTE (sin abrir carrito)
                                        onClose();
                                    }, 800);
                                }
                            }}
                            className="w-full md:w-[244px] h-16 md:h-[52px] bg-[#008F24] hover:bg-[#00741d] disabled:bg-[#008F24] disabled:opacity-75 text-white font-bold text-lg md:text-[16px] rounded-xl md:rounded-[10px] shadow-none flex items-center justify-center gap-2 transition-transform active:scale-[0.98]"
                        >
                            <ShoppingCart size={20} />
                            Agregar al Carrito
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ProductModal;

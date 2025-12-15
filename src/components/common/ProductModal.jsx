import React, { useState } from 'react';
import { X, Plus, Minus, ShoppingCart } from 'lucide-react';
import Button from './Button';

const BASE_URL = import.meta.env.BASE_URL;

const ProductModal = ({ isOpen, onClose, product, loading }) => {
    const [quantity, setQuantity] = useState(1);

    if (!isOpen) return null;

    // Helper to parse available days
    const getAvailableDays = () => {
        if (!product?.available_days) return [];
        try {
            let daysObj = product.available_days;
            if (typeof daysObj === 'string') {
                daysObj = JSON.parse(daysObj);
            }
            if (typeof daysObj === 'string') {
                daysObj = JSON.parse(daysObj);
            }

            return Object.entries(daysObj)
                .filter(([_, available]) => available)
                .map(([day]) => day);
        } catch (e) {
            console.error("Error parsing available days", e);
            return [];
        }
    };

    const availableDays = getAvailableDays();

    // Image logic
    const imageSrc = product?.img_item || product?.image || `${BASE_URL}shopping.jpg`;

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
            <div className="relative bg-white rounded-[15px] w-full max-w-[600px] h-auto max-h-[90vh] overflow-y-auto shadow-[0px_4px_4px_rgba(0,0,0,0.25)] animate-in fade-in zoom-in duration-200">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-20 w-[30px] h-[30px] flex items-center justify-center bg-[#A41262] text-white hover:bg-[#8e1055] rounded-full transition-colors shadow-sm"
                >
                    <X size={16} strokeWidth={3} />
                </button>

                <div className="p-8 flex flex-col h-full font-['Inter']">

                    {/* Header: Title */}
                    <h2 className="text-[24px] font-bold text-black mb-6 text-center leading-tight">
                        {product?.name || "Cargando..."}
                    </h2>

                    {/* Image - Centered */}
                    <div className="w-full flex items-center justify-center mb-6">
                        <img
                            src={imageSrc}
                            alt={product?.name || "Producto"}
                            className="w-full max-w-[300px] object-contain drop-shadow-md transform hover:scale-105 transition-transform duration-500"
                        />
                    </div>

                    {/* Attributes Row (Grid) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        {/* Left: Atributos / Disponibilidad */}
                        <div>
                            <h3 className="text-[14px] font-bold text-black mb-2 text-center md:text-left">Atributos</h3>
                            <div className="flex flex-wrap justify-center md:justify-start gap-2">
                                {loading ? (
                                    <span className="text-xs text-gray-400 animate-pulse">Verificando...</span>
                                ) : availableDays.length > 0 ? (
                                    availableDays.map(day => (
                                        <span key={day} className="px-4 h-[32px] flex items-center bg-[#A41262]/10 text-[#A41262] text-[12px] font-medium rounded-[15px] capitalize">
                                            {day}
                                        </span>
                                    ))
                                ) : (
                                    <span className="px-4 h-[32px] flex items-center bg-gray-100 text-gray-500 text-[12px] font-medium rounded-[15px]">
                                        Consultar
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
                        <p className="text-[#494949] text-[12px] leading-[15px] font-normal whitespace-pre-line">
                            {loading ? "Cargando descripción..." : (product?.description || "Sin descripción detallada.")}
                        </p>
                    </div>

                    {/* Bottom Grid: Recommendation | Price & Qty */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 items-end">

                        {/* Recommendation (Left) or spacing */}
                        <div>
                            {/* Recommendation Placeholder if needed */}
                        </div>

                        {/* Price & Qty (Right) */}
                        <div className="flex flex-col gap-4">
                            {/* Price */}
                            <div className="flex flex-col items-center md:items-end">
                                <h3 className="text-[12px] font-bold text-black mb-1">Precio</h3>
                                <span className="text-[24px] font-bold text-[#8A8A8A]">{displayPrice}</span>
                            </div>

                            {/* Quantity */}
                            <div className="flex flex-col items-center md:items-end">
                                <h3 className="text-[12px] font-bold text-black mb-2">Cantidad</h3>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="w-[30px] h-[30px] flex items-center justify-center bg-[#008F24] text-white rounded-full hover:bg-green-700 transition-colors"
                                    >
                                        <Minus size={16} />
                                    </button>
                                    <span className="w-6 text-center font-bold text-[14px] text-black">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="w-[30px] h-[30px] flex items-center justify-center bg-[#008F24] text-white rounded-full hover:bg-green-700 transition-colors"
                                    >
                                        <Plus size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer Button - Centered */}
                    <div className="mt-auto flex justify-center">
                        <button className="w-[244px] h-[40px] bg-[#008F24] hover:bg-[#00741d] text-white font-bold text-[16px] rounded-[10px] shadow-none flex items-center justify-center transition-transform active:scale-[0.98]">
                            Agregar
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ProductModal;

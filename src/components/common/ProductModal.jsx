import React from 'react';
import { X, Plus, Minus } from 'lucide-react';
import Button from './Button';

const BASE_URL = import.meta.env.BASE_URL;

const ProductModal = ({ isOpen, onClose, product, loading }) => {
    if (!isOpen) return null;

    // Helper to parse available days
    const getAvailableDays = () => {
        if (!product?.available_days) return [];
        try {
            // The API returns a stringified JSON inside a string: "{\"lunes\": true...}"
            // First parse: gets the object string. Second parse: gets the object.
            // Wait, if it's already an object in standard JSON response, it's fine.
            // User example: "{\"lunes\": true...}" which is a string.
            // Let's safe parse.
            let daysObj = product.available_days;
            if (typeof daysObj === 'string') {
                daysObj = JSON.parse(daysObj);
            }
            if (typeof daysObj === 'string') {
                daysObj = JSON.parse(daysObj); // Double parse might be needed if double escaped
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
            <div className="relative bg-white rounded-[20px] w-full max-w-[900px] h-[85vh] md:h-auto overflow-y-auto md:overflow-visible shadow-2xl flex flex-col md:flex-row animate-in fade-in zoom-in duration-200">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                >
                    <X size={24} />
                </button>

                {/* Left Side - Image */}
                <div className="w-full md:w-1/2 bg-gray-50 flex items-center justify-center p-8 md:p-12 relative overflow-hidden">
                    <img
                        src={imageSrc}
                        alt={product?.name || "Producto"}
                        className="w-full max-w-[350px] object-contain drop-shadow-xl transform hover:scale-105 transition-transform duration-500"
                    />
                </div>

                {/* Right Side - Details */}
                <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col bg-white">
                    <div className="mb-2">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                            {product?.name || "Cargando..."}
                        </h2>

                        {/* Availability Pills */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            {loading ? (
                                <span className="text-xs text-gray-400 animate-pulse">Verificando disponibilidad...</span>
                            ) : availableDays.length > 0 ? (
                                availableDays.map(day => (
                                    <span key={day} className="px-3 py-1 bg-green-50 text-green-700 text-xs font-semibold rounded-full uppercase tracking-wide">
                                        {day}
                                    </span>
                                ))
                            ) : (
                                <span className="px-3 py-1 bg-gray-100 text-gray-500 text-xs font-semibold rounded-full uppercase tracking-wide">
                                    Consultar disponibilidad
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="space-y-4 flex-grow">
                        <div>
                            <h3 className="text-sm font-bold text-black uppercase mb-1">Descripción</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                {loading ? "Cargando detalles..." : (product?.description || "Sin descripción detallada.")}
                            </p>
                        </div>

                        {/* Recommendation - Static for now or generic */}
                        {!loading && product?.category_id && (
                            <div>
                                <h3 className="text-sm font-bold text-black uppercase mb-1">Nota</h3>
                                <p className="bg-blue-50 text-blue-800 text-xs p-3 rounded-lg border border-blue-100 leading-relaxed">
                                    Pregunta por nuestros descuentos en compras por volumen.
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Price and Action */}
                    <div className="mt-6 pt-6 border-t border-gray-100 flex items-end justify-between gap-4">
                        <div className="flex flex-col">
                            <span className="text-xs text-gray-500 font-medium mb-1">Precio</span>
                            <span className="text-3xl font-bold text-gray-900">{displayPrice}</span>
                        </div>

                        <div className="flex flex-col items-end gap-3 flex-1">
                            {/* Quantity selector could go here, keeping simple for now */}
                            <button className="bg-brand-green hover:bg-brand-green-dark text-white font-semibold py-3 px-8 rounded-xl shadow-lg shadow-green-900/10 hover:shadow-xl hover:shadow-green-900/20 active:translate-y-0.5 transition-all w-full md:w-auto">
                                Solicitar / Comprar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductModal;

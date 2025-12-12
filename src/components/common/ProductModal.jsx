import React from 'react';
import { X, Plus, Minus } from 'lucide-react';
import Button from './Button';

const BASE_URL = import.meta.env.BASE_URL;

const ProductModal = ({ isOpen, onClose, product }) => {
    if (!isOpen) return null;

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
                    {/* Decorative pattern or background here if needed */}
                    <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 0H100V100H0V0Z" fill="url(#pattern)" />
                        </svg>
                    </div>

                    <img
                        src={`${BASE_URL}shopping.jpg`}
                        alt={product?.name || "Producto"}
                        className="w-full max-w-[350px] object-contain drop-shadow-xl transform hover:scale-105 transition-transform duration-500"
                    />
                </div>

                {/* Right Side - Details */}
                <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col bg-white">
                    <div className="mb-2">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                            Casa de madera
                        </h2>
                        <div className="flex flex-wrap gap-2 mb-4">
                            <span className="px-3 py-1 bg-pink-50 text-pink-primary text-xs font-semibold rounded-full uppercase tracking-wide">
                                Madera de pino
                            </span>
                            <span className="px-3 py-1 bg-pink-50 text-pink-primary text-xs font-semibold rounded-full uppercase tracking-wide">
                                PVC
                            </span>
                            <div className="flex items-center gap-2 ml-auto">
                                <span className="w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-500">CM</span>
                                <span className="w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-500">M</span>
                                <span className="w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-500">G</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4 flex-grow">
                        <div>
                            <h3 className="text-sm font-bold text-black uppercase mb-1">Descripción</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Casa de madera para loros. Refugio natural y seguro, fabricado en madera no tóxica, diseñado para ofrecer a tu loro un espacio cómodo y resistente. Ideal para enriquecer su entorno y estimular su instinto de anidación.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-sm font-bold text-black uppercase mb-1">Recomendación</h3>
                            <p className="bg-blue-50 text-blue-800 text-xs p-3 rounded-lg border border-blue-100 leading-relaxed">
                                Para evitar que tu loro muerda o dañe la casa de madera, usa juguetes seguros y materiales extra (como cartón o fibras naturales) para picar.
                            </p>
                        </div>
                    </div>

                    {/* Price and Action */}
                    <div className="mt-6 pt-6 border-t border-gray-100 flex items-end justify-between gap-4">
                        <div className="flex flex-col">
                            <span className="text-xs text-gray-500 font-medium mb-1">Precio</span>
                            <span className="text-3xl font-bold text-gray-900">$12 MXN</span>
                        </div>

                        <div className="flex flex-col items-end gap-3 flex-1">
                            <div className="flex items-center gap-3">
                                <span className="text-xs text-gray-500 font-medium">Cantidad</span>
                                <div className="flex items-center bg-gray-50 rounded-full border border-gray-200 p-1">
                                    <button className="w-6 h-6 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-600 hover:text-brand-green active:scale-95 transition-all">
                                        <Minus size={14} />
                                    </button>
                                    <span className="w-8 text-center text-sm font-bold text-gray-800">1</span>
                                    <button className="w-6 h-6 rounded-full bg-brand-green text-white shadow-sm flex items-center justify-center hover:bg-brand-green-dark active:scale-95 transition-all">
                                        <Plus size={14} />
                                    </button>
                                </div>
                            </div>

                            <button className="bg-brand-green hover:bg-brand-green-dark text-white font-semibold py-3 px-8 rounded-xl shadow-lg shadow-green-900/10 hover:shadow-xl hover:shadow-green-900/20 active:translate-y-0.5 transition-all w-full md:w-auto">
                                Agregar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductModal;

import React from 'react';
import { Plus, Info, Gift, Snowflake } from 'lucide-react';

/**
 * ProductCardNavidenos
 * Tarjeta de producto tematizada de Navidad, usada para los artículos
 * de la categoría Navideños. Misma interfaz que ProductCard pero con
 * diseño festivo (rojo/dorado/verde, copos de nieve y distintivo).
 */
const ProductCardNavidenos = ({ product, onOpenModal, onQuickAdd, isAdded }) => {
    return (
        <div className="w-full h-full bg-gradient-to-b from-[#fffdf5] to-[#fdf3e0] rounded-[18px] overflow-hidden flex flex-col relative shadow-sm hover:shadow-[0_8px_25px_rgba(168,18,18,0.25)] transition-shadow duration-300 group border-2 border-[#A81212]/60">

            {/* Festive top strip */}
            <div className="absolute top-0 left-0 right-0 h-[6px] bg-gradient-to-r from-[#A81212] via-[#FFD700] to-[#166534] z-10" />

            {/* Decorative snowflakes */}
            <Snowflake size={16} className="absolute top-4 left-3 text-[#A81212]/25 pointer-events-none z-10" />
            <Snowflake size={12} className="absolute bottom-24 right-4 text-[#A81212]/20 pointer-events-none z-10 animate-pulse" />

            {/* Quick Add Button */}
            <button
                onClick={(e) => { e.stopPropagation(); onQuickAdd(product, e); }}
                className={`absolute top-3 right-3 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-md ${
                    isAdded
                        ? 'bg-[#166534] scale-110'
                        : 'bg-[#A81212] hover:bg-[#8a0e0e] hover:scale-110 active:scale-95'
                }`}
                title="Agregar al carrito"
                aria-label="Agregar al carrito"
            >
                {isAdded ? (
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                ) : (
                    <Plus className="w-5 h-5 text-white" strokeWidth={2.5} />
                )}
            </button>

            {/* Image — flex-grow so it fills whatever space is left above the bottom strip */}
            <div
                className="w-full flex-grow flex items-center justify-center overflow-hidden cursor-pointer"
                onClick={() => onOpenModal(product)}
            >
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-500"
                />
            </div>

            {/* Bottom info strip — fixed height, never compressed */}
            <div className="flex-shrink-0 px-3 pt-2 pb-3 flex flex-col gap-1">
                {/* Navideño badge */}
                <div className="flex items-center gap-1">
                    <Gift size={12} className="text-[#A81212]" />
                    <span className="font-['Inter'] font-bold text-[10px] sm:text-[11px] uppercase tracking-widest text-[#A81212]">
                        Navideño
                    </span>
                </div>

                {/* Title */}
                <h3 className="font-['Inter'] font-extrabold tracking-tight text-[18px] sm:text-[22px] md:text-[26px] leading-tight text-[#7a0d0d] truncate w-full">
                    {product.name}
                </h3>

                {/* Price + Detalles row */}
                <div className="flex items-center justify-between gap-2 mt-1">
                    <span className="font-['Inter'] font-bold text-[16px] sm:text-[17px] md:text-[19px] text-[#166534] whitespace-nowrap truncate">
                        ${product.price.replace(' MXN', '').replace('$', '').trim()}
                    </span>

                    <button
                        onClick={() => onOpenModal(product)}
                        className="flex-shrink-0 w-[32px] h-[32px] sm:w-[36px] sm:h-[36px] bg-[#A81212] hover:bg-[#8a0e0e] active:scale-95 rounded-[8px] flex items-center justify-center transition-all duration-200 shadow-sm"
                        title="Ver detalles"
                        aria-label="Ver detalles"
                    >
                        <Info size={18} className="text-white" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCardNavidenos;

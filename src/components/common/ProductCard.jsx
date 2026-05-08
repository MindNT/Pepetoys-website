import React from 'react';
import { Plus, Info } from 'lucide-react';

/**
 * ProductCard
 * - Image covers ~75% of the card height
 * - Title, price and "Detalles" button are pinned at the bottom
 * - Minimal gap between card bottom border and the action row
 */
const ProductCard = ({ product, onOpenModal, onQuickAdd, isAdded }) => {
    return (
        <div className="w-full h-full bg-[#F8F8F8] rounded-[18px] overflow-hidden flex flex-col relative shadow-sm hover:shadow-lg transition-shadow duration-300 group">

            {/* Quick Add Button */}
            <button
                onClick={(e) => { e.stopPropagation(); onQuickAdd(product, e); }}
                className={`absolute top-3 right-3 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-md ${
                    isAdded
                        ? 'bg-[#006b1b] scale-110'
                        : 'bg-[#008F24] hover:bg-[#00741d] hover:scale-110 active:scale-95'
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
                className="w-full flex-grow bg-[#F8F8F8] flex items-center justify-center overflow-hidden cursor-pointer"
                onClick={() => onOpenModal(product)}
            >
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-500"
                />
            </div>

            {/* Bottom info strip — fixed height, never compressed */}
            <div className="flex-shrink-0 px-3 pt-2 pb-3 flex flex-col gap-1 bg-[#F8F8F8]">
                {/* Title */}
                <h3 className="font-['Inter'] font-extrabold tracking-tight text-[18px] sm:text-[22px] md:text-[26px] leading-tight text-[#2c2c2c] truncate w-full">
                    {product.name}
                </h3>

                {/* Price + Detalles row */}
                <div className="flex items-center justify-between gap-2 mt-1">
                    <span className="font-['Inter'] font-bold text-[16px] sm:text-[17px] md:text-[19px] text-[#008F24] whitespace-nowrap truncate">
                        ${product.price.replace(' MXN', '').replace('$', '').trim()}
                    </span>

                    <button
                        onClick={() => onOpenModal(product)}
                        className="flex-shrink-0 w-[32px] h-[32px] sm:w-[36px] sm:h-[36px] bg-[#008F24] hover:bg-[#00741d] active:scale-95 rounded-[8px] flex items-center justify-center transition-all duration-200 shadow-sm"
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

export default ProductCard;

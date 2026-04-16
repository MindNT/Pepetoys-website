import React from 'react';
import { CalendarCheck } from 'lucide-react';

const AgendaVisitaButton = ({ onClick, className = '' }) => {
    return (
        <button 
            onClick={onClick}
            className={`flex items-center justify-center gap-2.5 md:gap-3 bg-[#0A3254] hover:bg-[#072540] text-[#E0E6ED] px-6 md:px-8 py-3.5 md:py-4 rounded-xl border border-white/20 shadow-lg transition-all duration-300 hover:scale-[1.03] md:hover:scale-105 active:scale-95 ${className}`}
        >
            <CalendarCheck strokeWidth={1.5} className="text-white w-[20px] h-[20px] md:w-[26px] md:h-[26px]" />
            <span className="font-bold tracking-wide uppercase text-[14px] sm:text-[15px] md:text-[16px] text-white leading-none">
                Agenda Tu Visita
            </span>
        </button>
    );
};

export default AgendaVisitaButton;

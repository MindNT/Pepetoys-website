import React from 'react';
import eclectusMale from '../../assets/eclectus_male.png';
import ninfa from '../../assets/ninfa.png';
import eclectusFemale from '../../assets/eclectus_female.png';
import lovebird from '../../assets/lovebird_open.png';

const CATEGORIES = [
    {
        id: 1,
        name: 'LOROS',
        color: 'bg-[#65ae2d]',
        character: eclectusMale,
        animation: 'animate-wave',
        imgStyle: 'h-[60px] mb-1 md:mb-0 md:absolute md:h-[100px] md:-bottom-2 md:left-4'
    },
    {
        id: 2,
        name: 'ALIMENTOS',
        color: 'bg-[#8c52ff]',
        character: ninfa,
        animation: 'animate-eat',
        imgStyle: 'h-[60px] mb-1 md:mb-0 md:absolute md:h-[100px] md:-bottom-2 md:left-4'
    },
    {
        id: 3,
        name: 'JUGUETES',
        color: 'bg-[#e61c3f]',
        character: eclectusFemale,
        animation: 'animate-swing',
        imgStyle: 'h-[60px] mb-1 md:mb-0 md:absolute md:h-[100px] md:-bottom-2 md:left-4'
    },
    {
        id: 4,
        name: 'AVIARIOS',
        color: 'bg-[#1aabd4]',
        character: lovebird,
        animation: 'animate-breathe',
        imgStyle: 'h-[60px] mb-1 md:mb-0 md:absolute md:h-[100px] md:-bottom-2 md:left-4'
    },
];

const CategoryBanner = () => {
    return (
        <section className="w-full grid grid-cols-4 h-[120px] md:h-[180px]">
            {CATEGORIES.map((cat) => (
                <div
                    key={cat.id}
                    className={`relative w-full h-full ${cat.color} flex flex-col items-center justify-end pb-4 overflow-hidden border-r border-white/20 last:border-r-0 group`}
                >
                    {/* Background Overlay */}
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-300"></div>

                    {/* Animated Character Guide */}
                    {cat.character && (
                        <img
                            src={cat.character}
                            alt={`${cat.name} guide`}
                            className={`object-contain z-10 pointer-events-none ${cat.animation} ${cat.imgStyle}`}
                        />
                    )}

                    <h2 className="relative z-20 text-white font-bree text-lg md:text-2xl drop-shadow-md tracking-wider uppercase mb-2 md:mb-6">
                        {cat.name}
                    </h2>
                </div>
            ))}
        </section>
    );
};

export default CategoryBanner;

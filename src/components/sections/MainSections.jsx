import React from 'react';
import { Link } from 'react-router-dom';

const MAIN_SECTIONS = [
    { id: 9, name: 'Aves Chicas y Medianas', image: 'bird_small.png' },
    { id: 2, name: 'Aves Grandes y Jumbo', image: 'bird_big.png' },
    { id: 3, name: 'Perchas', image: 'perch.png' },
    { id: 4, name: 'Parques', image: 'park.png' },
    { id: 5, name: 'Transportadoras', image: 'carrier.png' },
    { id: 6, name: 'Kit inicio', image: 'kit.png' },
];

const MainSections = () => {
    return (
        <section className="max-w-[1440px] mx-auto px-4 lg:px-[108px] py-8">
            <div className="flex flex-wrap items-center justify-center md:justify-between gap-4 md:gap-8">
                {MAIN_SECTIONS.map((item) => (
                    <Link
                        key={item.id}
                        to={`/category/${item.id}`}
                        className="flex flex-col items-center gap-2 group cursor-pointer w-[140px] md:w-auto"
                    >
                        {/* Circle/Icon Placeholder */}
                        <div className="w-[80px] h-[80px] md:w-[100px] md:h-[100px] rounded-full bg-gray-100 border-2 border-transparent group-hover:border-[#008F24] transition-all flex items-center justify-center overflow-hidden shadow-sm">
                            {/* Placeholder generic image/icon if actual assets aren't ready */}
                            <span className="text-gray-400 text-xs">Foto</span>
                        </div>

                        {/* Text */}
                        <span className="font-bree text-center text-sm md:text-base text-gray-700 font-medium leading-tight group-hover:text-[#008F24] transition-colors max-w-[120px]">
                            {item.name}
                        </span>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default MainSections;

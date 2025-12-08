import React, { useRef } from 'react';
import CollectionCard from '../common/CollectionCard';
import { COLLECTIONS_TITLE } from '../../constants';
import BirdIcon from '../icons/BirdIcon';

const BASE_URL = import.meta.env.BASE_URL;

const Collections = () => {
  const scrollContainerRef = useRef(null);

  // 25 categorías numeradas
  const collections = Array.from({ length: 25 }, (_, i) => ({
    id: i + 1,
    name: `Categoría ${i + 1}`,
    image: `${BASE_URL}da9333aea433f87cb618d778f1e3b8f8885f7f08.jpg`
  }));

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 250 * 5; // Scroll 5 cards at a time (card width + gap)
      const newScrollPosition = scrollContainerRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
      scrollContainerRef.current.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="pt-12 pb-4 bg-white overflow-hidden">{/* Reduced pb-16 to pb-4 */}
      {/* Section Title */}
      <div className="max-w-[1440px] mx-auto flex items-center gap-3 mb-10 pl-4 md:pl-[108px]">
        <div className="w-[50px] h-[50px]">
          <BirdIcon />
        </div>
        <h3 className="text-xl md:text-2xl font-normal text-[#EE193F]">
          {COLLECTIONS_TITLE}
        </h3>
      </div>

      {/* Carousel with 5 visible cards centered, arrows in side margins */}
      <div className="w-full max-w-[1440px] mx-auto relative flex items-center justify-center">
        {/* Left Arrow - In left margin */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-4 md:left-8 flex-shrink-0 bg-brand-green hover:bg-brand-green-dark text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 z-10"
          aria-label="Anterior"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>

        {/* Scrollable Container - 5 cards visible, centered */}
        <div
          ref={scrollContainerRef}
          className="flex gap-[25px] overflow-x-hidden pb-8 scrollbar-hide"
          style={{
            scrollBehavior: 'smooth',
            width: 'calc(225px * 5 + 25px * 4)',
            maxWidth: 'calc(225px * 5 + 25px * 4)'
          }}
        >
          {collections.map((collection) => (
            <div key={collection.id} className="flex-shrink-0">
              <CollectionCard
                name={collection.name}
                image={collection.image}
              />
            </div>
          ))}
        </div>

        {/* Right Arrow - In right margin */}
        <button
          onClick={() => scroll('right')}
          className="absolute right-4 md:right-8 flex-shrink-0 bg-brand-green hover:bg-brand-green-dark text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 z-10"
          aria-label="Siguiente"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>
    </section>
  );
};

export default Collections;


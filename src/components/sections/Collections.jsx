import React from 'react';
import CollectionCard from '../common/CollectionCard';
import { COLLECTIONS_TITLE } from '../../constants';
import BirdIcon from '../icons/BirdIcon';

const BASE_URL = import.meta.env.BASE_URL;

const Collections = () => {
  const collections = [
    { id: 1, name: 'Voladeras', image: `${BASE_URL}77ff67b37e5c7e80d2b273048467c66a82be04b2.jpg` },
    { id: 2, name: 'Voladeras', image: `${BASE_URL}77ff67b37e5c7e80d2b273048467c66a82be04b2.jpg` },
    { id: 3, name: 'Voladeras', image: `${BASE_URL}77ff67b37e5c7e80d2b273048467c66a82be04b2.jpg` },
    { id: 4, name: 'Voladeras', image: `${BASE_URL}77ff67b37e5c7e80d2b273048467c66a82be04b2.jpg` },
    { id: 5, name: 'Voladeras', image: `${BASE_URL}77ff67b37e5c7e80d2b273048467c66a82be04b2.jpg` },
  ];

  return (
    <section className="pt-12 pb-16 bg-white overflow-hidden">
      {/* Section Title */}
      <div className="max-w-[1440px] mx-auto flex items-center gap-3 mb-10 pl-4 md:pl-[108px]">
        <div className="w-[50px] h-[50px]">
          <BirdIcon />
        </div>
        <h3 className="text-xl md:text-2xl font-normal text-[#EE193F]">
          {COLLECTIONS_TITLE}
        </h3>
      </div>

      {/* Grid of Collections - 5 cards in a row */}
      <div className="w-full max-w-[1440px] mx-auto">
        <div className="hidden 2xl:flex gap-[25px] pl-[108px] pr-[107px]">
          {collections.map((collection) => (
            <CollectionCard
              key={collection.id}
              name={collection.name}
              image={collection.image}
            />
          ))}
        </div>
        
        {/* Responsive: scale down for smaller screens */}
        <div className="2xl:hidden flex gap-[15px] px-4 md:px-8 justify-center scale-90 md:scale-95 lg:scale-100">
          {collections.map((collection) => (
            <CollectionCard
              key={collection.id}
              name={collection.name}
              image={collection.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Collections;


import React from 'react';
import { Link } from 'react-router-dom';
import CollectionCard from '../common/CollectionCard';
import { COLLECTIONS_TITLE } from '../../constants';
import BirdIcon from '../icons/BirdIcon';

const BASE_URL = import.meta.env.BASE_URL;

const Collections = () => {
  // 25 categorías numeradas
  const collections = Array.from({ length: 25 }, (_, i) => ({
    id: i + 1,
    name: `Categoría ${i + 1}`,
    image: `${BASE_URL}da9333aea433f87cb618d778f1e3b8f8885f7f08.jpg`
  }));

  return (
    <section className="pt-12 pb-4 bg-white overflow-hidden">
      {/* Section Title */}
      <div className="max-w-[1440px] mx-auto flex items-center gap-3 mb-6 md:mb-10 pl-4 md:pl-[108px]">
        <div className="w-[40px] h-[40px] md:w-[50px] md:h-[50px]">
          <BirdIcon />
        </div>
        <h3 className="text-lg md:text-2xl font-normal text-[#EE193F]">
          {COLLECTIONS_TITLE}
        </h3>
      </div>

      {/* Mobile: 2-column grid */}
      <div className="md:hidden px-4">
        <div className="grid grid-cols-2 gap-4">
          {collections.map((collection) => (
            <div key={collection.id} className="flex justify-center">
              <Link to={`/category/${collection.id}`}>
                <CollectionCard
                  name={collection.name}
                  image={collection.image}
                  mobile={true}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop: 5-column Grid */}
      <div className="hidden md:grid max-w-[1440px] mx-auto px-4 lg:px-10 grid-cols-5 gap-x-10 gap-y-16 pb-20">
        {collections.map((collection) => (
          <div key={collection.id} className="flex justify-center">
            <Link to={`/category/${collection.id}`}>
              <CollectionCard
                name={collection.name}
                image={collection.image}
              />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Collections;

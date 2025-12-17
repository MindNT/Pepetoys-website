import React from 'react';
import { Link } from 'react-router-dom';
import CollectionCard from '../common/CollectionCard';
import { COLLECTIONS_TITLE } from '../../constants';
import BirdIcon from '../icons/BirdIcon';
import lovebirdImg from '../../assets/lovebird_open.png';

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
      <div className="max-w-[1440px] mx-auto flex items-center justify-start mb-6 md:mb-10 pl-4 md:pl-[108px] relative">
        <div className="flex items-center gap-3 bg-[#1aabd4] px-6 py-3 rounded-[20px] shadow-sm relative z-10">
          <h3 className="text-xl md:text-2xl text-white font-bree pt-1">
            {COLLECTIONS_TITLE}
          </h3>
        </div>

        {/* Agapornis Character - Flying nearby */}
        <img
          src={lovebirdImg}
          alt="Agapornis alas abiertas"
          className="hidden md:block absolute left-[10px] -top-6 h-[110px] w-auto object-contain z-0 pointer-events-none mix-blend-multiply"
        />
        {/* Mobile version potentially different position or smaller */}
        <img
          src={lovebirdImg}
          alt="Agapornis alas abiertas"
          className="md:hidden absolute right-0 -top-4 h-[90px] w-auto object-contain z-0 pointer-events-none mix-blend-multiply transform -scale-x-100 rotate-6"
        />
      </div>

      {/* Mobile: 3-column grid */}
      <div className="md:hidden px-4">
        <div className="grid grid-cols-3 gap-2">
          {collections.map((collection) => (
            <div key={collection.id} className="flex justify-center w-full">
              <Link to={`/category/${collection.id}`} className="w-full">
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

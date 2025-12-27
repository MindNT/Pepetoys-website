import React from 'react';
import { Link } from 'react-router-dom';
import CollectionCard from '../common/CollectionCard';
import BirdSpeechSection from './BirdSpeechSection';

const BASE_URL = import.meta.env.BASE_URL;

const Collections = () => {
  // 25 categorías numeradas
  const collections = Array.from({ length: 25 }, (_, i) => ({
    id: i + 1,
    name: 'Voladeras',
    image: `${BASE_URL}da9333aea433f87cb618d778f1e3b8f8885f7f08.jpg`
  }));

  return (
    <>
      {/* Bird Speech Section */}
      <BirdSpeechSection />
      
      <section className="pb-8 md:pb-16 bg-white relative">
        {/* Responsive grid: 3 cols mobile, 4 cols tablet, 5 cols desktop */}
        <div className="max-w-[1440px] mx-auto px-3 sm:px-4 lg:px-10">
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 sm:gap-4 md:gap-x-10 md:gap-y-16 pb-10 md:pb-20">
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
      </section>
    </>
  );
};

export default Collections;

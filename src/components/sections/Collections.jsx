import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CollectionCard from '../common/CollectionCard';
import BirdSpeechSection from './BirdSpeechSection';
import { getCategories } from '../../services/api';
import formatGoogleDriveUrl from '../../utils/formatGoogleDriveUrl';

const BASE_URL = import.meta.env.BASE_URL;

const Collections = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await getCategories();
        
        if (response.status === 'success' && response.data) {
          // Filter only active categories and map to expected format
          const activeCategories = response.data
            .filter(cat => cat.is_active === 1)
            .map(cat => {
              // Validate image URL from API
              const imageUrl = cat.url_image || cat.img_url || cat.image_url || cat.image;
              const isValidImageUrl = imageUrl && 
                (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) &&
                imageUrl.length > 10;
              
              // Format Google Drive URLs to thumbnail format
              const formattedImageUrl = isValidImageUrl ? formatGoogleDriveUrl(imageUrl) : `${BASE_URL}da9333aea433f87cb618d778f1e3b8f8885f7f08.jpg`;
              
              return {
                id: cat.id,
                name: cat.name,
                image: formattedImageUrl
              };
            });
          setCategories(activeCategories);
        }
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError("No se pudieron cargar las categorías.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <>
      {/* Bird Speech Section */}
      <BirdSpeechSection />
      
      <section className="pb-8 md:pb-16 bg-white relative">
        {/* Responsive grid: 3 cols mobile, 4 cols tablet, 5 cols desktop */}
        <div className="max-w-[1440px] mx-auto px-3 sm:px-4 lg:px-10">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <span className="text-xl text-[#1248A4] animate-pulse font-medium">Cargando categorías...</span>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center py-20">
              <span className="text-red-500">{error}</span>
            </div>
          ) : categories.length === 0 ? (
            <div className="flex items-center justify-center py-20">
              <span className="text-gray-500">No hay categorías disponibles.</span>
            </div>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 sm:gap-4 md:gap-x-10 md:gap-y-16 pb-10 md:pb-20">
              {categories.map((collection) => (
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
          )}
        </div>
      </section>
    </>
  );
};

export default Collections;

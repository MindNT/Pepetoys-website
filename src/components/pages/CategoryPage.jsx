import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import ProductModal from '../common/ProductModal';
import CategoryHero from '../sections/CategoryHero';
import { ArrowBigRight } from 'lucide-react';

const CategoryPage = () => {
    const { id } = useParams();
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Mock Data based on ID (simplified for demo)
    const categoryName = "AVES CHICAS Y MEDIANAS";
    const subCategories = [
        "Aves Grandes y Jumbo",
        "Parches",
        "Parques",
        "Transportadoras",
        "Kit inicio"
    ];

    const products = Array.from({ length: 3 }).map((_, i) => ({
        id: i + 1,
        name: "Casa de madera",
        price: "$12 MXN",
        description: "Refugio natural y seguro, fabricado en madera no tóxica, diseñado para ofrecer a tu loro un espacio cómodo donde descansar, jugar y sentirse protegido. Ideal para enriquecer su entorno y estimular su instinto de anidación.",
        image: `${import.meta.env.BASE_URL}shopping.jpg`
    }));

    const handleOpenModal = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedProduct(null), 300);
    };


    return (
        <div className="min-h-screen bg-white relative">
            {/* Back Button */}
            <Link
                to="/"
                className="absolute top-4 left-4 z-50 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/40 transition-colors border border-white/30 text-white shadow-lg"
            >
                <ArrowBigRight className="rotate-180" />
            </Link>

            <CategoryHero />

            <main>
                <div className="max-w-[1440px] mx-auto px-4 lg:px-[108px] py-12 flex flex-col md:flex-row gap-8 lg:gap-16">
                    <div className="w-full flex-1 mb-8 md:mb-0 text-center md:text-right">
                        <h2 className="text-2xl md:text-3xl font-bold text-black uppercase tracking-wide">
                            {categoryName}
                        </h2>
                        <p className="text-brand-green text-sm md:text-base mt-2">
                            En esta sección encontrarás accesorios adecuados para aves chicas y medianas
                        </p>
                    </div>
                </div>

                <div className="max-w-[1440px] mx-auto px-4 lg:px-[108px] pb-12 flex flex-col md:flex-row gap-8 lg:gap-16">

                    {/* Sidebar */}
                    <aside className="w-full md:w-64 flex-shrink-0">
                        {/* Active selection */}
                        <div className="bg-brand-green text-white rounded-full py-3 px-6 text-center font-medium mb-4 shadow-md">
                            {categoryName}
                        </div>

                        {/* Other Categories List */}
                        <nav className="flex flex-col space-y-2">
                            {subCategories.map((sub, idx) => (
                                <button
                                    key={idx}
                                    className="text-gray-500 hover:text-brand-green py-2 px-4 text-center md:text-left transition-colors font-medium text-sm rounded-lg hover:bg-gray-50"
                                >
                                    {sub}
                                </button>
                            ))}
                        </nav>
                    </aside>

                    {/* Product Grid */}
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        {products.map((product) => (
                            <div key={product.id} className="bg-white rounded-[20px] p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center group">
                                {/* Product Image */}
                                <div className="w-full aspect-square mb-6 overflow-hidden rounded-xl bg-gray-50 flex items-center justify-center relative">
                                    <div className="absolute inset-0 bg-gray-100 animate-pulse hidden" /> {/* Loading state placeholder */}
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-[80%] h-[80%] object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>

                                {/* Content */}
                                <h3 className="font-bold text-lg text-gray-800 mb-2">{product.name}</h3>
                                <p className="text-gray-500 text-xs leading-relaxed line-clamp-3 mb-4 max-w-[250px]">
                                    {product.description}
                                </p>

                                <div className="mt-auto w-full flex items-center justify-between px-2">
                                    <span className="text-lg font-bold text-gray-900">{product.price}</span>
                                    <button
                                        onClick={() => handleOpenModal(product)}
                                        className="bg-brand-green hover:bg-brand-green-dark text-white text-xs font-semibold py-2 px-6 rounded-full transition-colors shadow-sm hover:shadow-md"
                                    >
                                        Detalles
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            <Footer />

            <ProductModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                product={selectedProduct}
            />
        </div>
    );
};

export default CategoryPage;

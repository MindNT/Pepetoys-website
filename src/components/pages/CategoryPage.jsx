import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getItems, getCategories, getItemData } from '../../services/api';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import ProductModal from '../common/ProductModal';
import CategoryBanner from '../sections/CategoryBanner';
import { ArrowBigRight, ShoppingCart, Plus } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import formatGoogleDriveUrl from '../../utils/formatGoogleDriveUrl';

const CategoryPage = () => {
    const { id } = useParams();
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalLoading, setModalLoading] = useState(false);
    const [error, setError] = useState(null);
    const [categories, setCategories] = useState([]);
    const [categoryName, setCategoryName] = useState('');
    const { addToCart, openCart } = useCart();
    const [addedProductId, setAddedProductId] = useState(null);

    // Fetch categories for sidebar
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await getCategories();
                if (response.status === 'success' && response.data) {
                    const activeCategories = response.data
                        .filter(cat => cat.is_active === 1)
                        .map(cat => ({
                            id: cat.id,
                            name: cat.name
                        }));
                    setCategories(activeCategories);
                    
                    // Set current category name
                    const currentCategory = activeCategories.find(cat => cat.id === Number(id));
                    setCategoryName(currentCategory ? currentCategory.name : `Categoría ${id}`);
                }
            } catch (err) {
                console.error("Error fetching categories:", err);
            }
        };

        fetchCategories();
    }, [id]);

    // Fetch products
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const data = await getItems();

                // API response structure is { status: "success", data: [...] }
                const items = data.data || [];

                // Filter items by category_id present in the URL
                const filteredItems = items.filter(item => item.category_id === Number(id));

                const mappedProducts = filteredItems.map(item => {
                    // Validate image URL - must be a complete URL starting with http
                    const isValidImageUrl = item.img_item && 
                        (item.img_item.startsWith('http://') || item.img_item.startsWith('https://')) &&
                        item.img_item.length > 10;
                    
                    // Format Google Drive URLs to thumbnail format
                    const formattedImageUrl = isValidImageUrl ? formatGoogleDriveUrl(item.img_item) : `${import.meta.env.BASE_URL}shopping.jpg`;
                    
                    return {
                        id: item.id,
                        name: item.name || "Producto sin nombre",
                        price: item.price ? (typeof item.price === 'number' ? `$${item.price} MXN` : item.price) : "Precio no disponible",
                        description: item.description || "Sin descripción",
                        image: formattedImageUrl,
                        available_days: item.available_days,
                        atributo_1: item.atributo_1,
                        atributo_2: item.atributo_2
                    };
                });
                setProducts(mappedProducts);
            } catch (err) {
                console.error("Error fetching products:", err);
                setError("No se pudieron cargar los productos.");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [id]);

    const handleOpenModal = async (product) => {
        setIsModalOpen(true);
        setSelectedProduct(product); // Show basic info immediately
        setModalLoading(true);

        try {
            const response = await getItemData(product.id);
            if (response.status === 'success' && response.data) {
                setSelectedProduct(prev => ({ ...prev, ...response.data }));
            }
        } catch (error) {
            console.error("Error fetching product details:", error);
        } finally {
            setModalLoading(false);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedProduct(null), 300);
    };

    const handleQuickAddToCart = (product, event) => {
        event.stopPropagation();
        addToCart(product, 1);
        // Feedback visual
        setAddedProductId(product.id);
        setTimeout(() => setAddedProductId(null), 1500);
    };


    return (
        <div className="min-h-screen bg-white relative font-['Inter']">
            {/* Back Button */}
            <Link
                to="/"
                className="absolute top-4 left-4 z-50 w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors border border-gray-600 text-white shadow-lg"
            >
                <ArrowBigRight className="rotate-180" />
            </Link>

            <CategoryBanner />
            <Header />

            <main>
                <div className="max-w-[1440px] mx-auto px-4 lg:px-[108px] py-6 md:py-12 flex flex-col md:flex-row gap-6 lg:gap-16">



                    {/* Sidebar */}
                    <aside className="w-full md:w-[182px] flex-shrink-0 flex flex-row md:flex-col overflow-x-auto md:overflow-visible items-center md:items-start gap-3 md:gap-4 pb-2 md:pb-0 scrollbar-hide">
                        {/* Render Sidebar Categories from API */}
                        {categories.map((cat) => {
                            const isActive = cat.id === Number(id);

                            return isActive ? (
                                /* Active selection (Group 3 style) */
                                <div key={cat.id} className="min-w-[160px] md:min-w-[182px] w-auto md:w-[182px] h-[36px] md:h-[40px] flex items-center justify-center bg-[#1248A4] rounded-[25px] shadow-sm px-4 md:px-0">
                                    <span className="text-white text-[13px] font-normal leading-[16px] text-center">
                                        {cat.name}
                                    </span>
                                </div>
                            ) : (
                                /* Inactive Link (Group 9 style) */
                                <Link
                                    key={cat.id}
                                    to={`/category/${cat.id}`}
                                    className="min-w-[160px] md:min-w-[182px] w-auto md:w-[182px] h-[36px] flex items-center justify-center hover:bg-gray-50 rounded-lg transition-colors px-4 md:px-0"
                                >
                                    <span className="text-[#000000] text-[13px] font-normal leading-[16px] text-center">
                                        {cat.name}
                                    </span>
                                </Link>
                            );
                        })}
                    </aside>

                    {/* Main Content Area */}
                    <div className="flex-1 flex flex-col gap-8">

                        {/* Top Bar: Cart & Title */}
                        <div className="flex flex-col-reverse md:flex-row items-center md:items-start justify-between gap-4">

                            {/* Cart Button (Left on Desktop) */}


                            {/* Title & Description (Right on Desktop) */}
                            <div className="text-center md:text-right flex-1">
                                <h2 className="text-2xl md:text-[32px] font-bold text-black uppercase tracking-wide leading-tight">
                                    {categoryName}
                                </h2>
                                <p className="text-[#1248A4] text-sm md:text-[14px] mt-2 font-normal">
                                    En esta sección encontrarás accesorios adecuados para aves chicas y medianas
                                </p>
                            </div>
                        </div>

                        {/* Product Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 lg:gap-8">
                            {loading ? (
                                <div className="col-span-full h-64 flex items-center justify-center">
                                    <span className="text-xl text-[#1248A4] animate-pulse font-medium">Cargando productos...</span>
                                </div>
                            ) : error ? (
                                <div className="col-span-full h-64 flex items-center justify-center">
                                    <div className="text-red-500">{error}</div>
                                </div>
                            ) : products.length === 0 ? (
                                <div className="col-span-full h-64 flex items-center justify-center">
                                    <div className="text-gray-500">No hay productos disponibles para este día.</div>
                                </div>
                            ) : (
                                products.map((product) => (
                                    <div key={product.id} className="w-full max-w-[250px] bg-[#F9F9F9] rounded-[15px] p-3 flex flex-col items-center relative shadow-sm hover:shadow-md transition-shadow duration-300 group">

                                        {/* Quick Add Button - Top Right Corner - MÁS GRANDE para móvil */}
                                        <button
                                            onClick={(e) => handleQuickAddToCart(product, e)}
                                            className={`absolute top-2 right-2 md:top-3 md:right-3 z-10 w-11 h-11 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${
                                                addedProductId === product.id
                                                    ? 'bg-[#008F24] scale-110'
                                                    : 'bg-white hover:bg-[#008F24] hover:scale-110 active:scale-95'
                                            } group/add`}
                                            title="Agregar al carrito"
                                            aria-label="Agregar al carrito"
                                        >
                                            {addedProductId === product.id ? (
                                                <svg className="w-6 h-6 md:w-5 md:h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                </svg>
                                            ) : (
                                                <Plus className={`w-6 h-6 md:w-5 md:h-5 transition-colors ${
                                                    addedProductId === product.id ? 'text-white' : 'text-[#008F24] group-hover/add:text-white'
                                                }`} strokeWidth={2.5} />
                                            )}
                                        </button>

                                        {/* Image Container */}
                                        <div className="w-full aspect-[250/143] mb-3 bg-white rounded-[15px] flex items-center justify-center overflow-hidden">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="h-full w-full object-contain hover:scale-105 transition-transform duration-500 p-2"
                                            />
                                        </div>

                                        {/* Title */}
                                        <h3 className="font-['Inter'] font-bold text-[14px] leading-[17px] text-center text-[#494949] mb-1 w-full truncate px-2">
                                            {product.name}
                                        </h3>

                                        {/* Description */}
                                        <p className="font-['Inter'] font-medium text-[10px] leading-[12px] text-[#8A8A8A] text-center w-full px-2 h-[40px] overflow-hidden mb-3 line-clamp-3">
                                            {product.description}
                                        </p>

                                        {/* Price & Button Container */}
                                        <div className="w-full px-2 flex items-center justify-between mt-auto mb-2 gap-2">
                                            {/* Price */}
                                            <span className="font-['Inter'] font-bold text-[16px] leading-[20px] text-center text-[#8A8A8A]">
                                                {product.price.replace(' MXN', '').replace('$', '')} MXN
                                            </span>

                                            {/* Details Button */}
                                            <button
                                                onClick={() => handleOpenModal(product)}
                                                className="min-w-[80px] h-[28px] bg-[#008F24] rounded-[8px] flex items-center justify-center hover:bg-[#00741d] transition-colors"
                                            >
                                                <span className="font-['Inter'] font-normal text-[14px] leading-[17px] text-[#F9F9F9] text-center">
                                                    Detalles
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </main>

            <Footer />

            <ProductModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                product={selectedProduct}
                loading={modalLoading}
            />
        </div>
    );
};

export default CategoryPage;

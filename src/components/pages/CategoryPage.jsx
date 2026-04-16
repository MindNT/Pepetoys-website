import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getItems, getCategories, getItemData } from '../../services/api';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import ProductModal from '../common/ProductModal';
import CategoryBanner from '../sections/CategoryBanner';
import { ArrowBigRight, ShoppingCart, Plus, Search } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import formatGoogleDriveUrl from '../../utils/formatGoogleDriveUrl';
import ProductCard from '../common/ProductCard';
import HeroJungleSection from '../sections/HeroJungleSection';

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
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 30;

    // Reset pagination when category or search changes
    useEffect(() => {
        setCurrentPage(1);
    }, [id, searchQuery]);

    // Fetch categories for sidebar
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await getCategories();
                if (response.status === 'success' && response.data) {
                    const activeCategories = response.data
                        .filter(cat => cat.is_active === 1 && !cat.name.toLowerCase().includes('voladera'))
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

                // Filter items by category — supports new array format (category_ids) and old single value (category_id)
                const categoryId = Number(id);
                const filteredItems = items.filter(item => {
                    if (Array.isArray(item.category_ids)) {
                        return item.category_ids.includes(categoryId);
                    }
                    // Fallback to old single-value field
                    return item.category_id === categoryId;
                });

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
                
                mappedProducts.sort((a, b) => a.name.localeCompare(b.name));
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

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.max(1, Math.ceil(filteredProducts.length / itemsPerPage));

    const paginatedProducts = filteredProducts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

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


                            {/* Title & Search */}
                            <div className="text-center md:text-right flex-1">
                                <h2 className="text-2xl md:text-[32px] font-bold text-black uppercase tracking-wide leading-tight">
                                    {categoryName}
                                </h2>

                                {/* Pagination and Search Bar */}
                                <div className="mt-4 flex flex-col-reverse md:flex-row items-center justify-between w-full gap-4">
                                    {/* Pagination Controls */}
                                    {filteredProducts.length > 0 && (
                                        <div className="flex items-center gap-2 text-[14px] overflow-x-auto pb-1 md:pb-0 max-w-full">
                                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                                                <button
                                                    key={number}
                                                    onClick={() => setCurrentPage(number)}
                                                    className={`flex-shrink-0 min-w-[36px] h-[36px] flex items-center justify-center rounded-md font-medium transition-colors border shadow-sm ${
                                                        currentPage === number
                                                            ? 'bg-[#1248A4] text-white border-[#1248A4]'
                                                            : 'bg-white text-[#2c2c2c] border-gray-200 hover:bg-gray-50'
                                                    }`}
                                                >
                                                    {number}
                                                </button>
                                            ))}
                                        </div>
                                    )}

                                    <div className="relative w-full max-w-[480px] md:ml-auto">
                                        <Search
                                            size={17}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1248A4] pointer-events-none"
                                        />
                                        <input
                                            id="product-search"
                                            type="text"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            placeholder="Buscar por nombre o descripción..."
                                            className="w-full pl-10 pr-5 py-3 text-[14px] text-[#2c2c2c] bg-white border border-[#1248A4]/30 rounded-full focus:outline-none focus:ring-2 focus:ring-[#1248A4]/40 focus:border-[#1248A4] placeholder:text-gray-400 transition-all duration-200 shadow-sm"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Product Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 auto-rows-[300px] md:auto-rows-[340px] lg:auto-rows-[360px]">
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
                                    <div className="text-gray-500">No hay productos disponibles para esta categoría.</div>
                                </div>
                            ) : filteredProducts.length === 0 ? (
                                <div className="col-span-full h-64 flex flex-col items-center justify-center gap-3">
                                    <Search size={36} className="text-[#1248A4]/30" />
                                    <p className="text-gray-500 text-sm">No se encontraron productos para <span className="font-semibold text-[#1248A4]">"{searchQuery}"</span></p>
                                </div>
                            ) : (
                                paginatedProducts.map((product) => (
                                    <div key={product.id} className="h-full">
                                        <ProductCard
                                            product={product}
                                            onOpenModal={handleOpenModal}
                                            onQuickAdd={handleQuickAddToCart}
                                            isAdded={addedProductId === product.id}
                                        />
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </main>

            <HeroJungleSection />

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

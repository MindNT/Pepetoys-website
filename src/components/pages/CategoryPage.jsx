import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getItemsDay, getItemData } from '../../services/api';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import ProductModal from '../common/ProductModal';
import CategoryBanner from '../sections/CategoryBanner';
import { ArrowBigRight, ShoppingCart } from 'lucide-react';

const CategoryPage = () => {
    const { id } = useParams();
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalLoading, setModalLoading] = useState(false);
    const [error, setError] = useState(null);

    // Category Mapping (Simulating "Real Data" based on user input and typical IDs)
    const categoryMap = {
        1: "Aves Chicas y Medianas", // Assuming ID 1 or current is this based on user's active example
        2: "Aves Grandes y Jumbo",
        3: "Parches",
        4: "Parques",
        5: "Transportadoras",
        6: "Kit inicio",
        9: "Aves Chicas y Medianas" // Mapping current ID 9 to the user's "Active" example for demo
    };

    const categoryName = categoryMap[id] || `Categoría ${id}`;

    // List of other categories to display in sidebar (Excluding current if needed, or just list all)
    // The user provided a specific list for the sidebar:
    const sidebarCategories = [
        { id: 9, name: "Aves Chicas y Medianas" }, // Active in example
        { id: 2, name: "Aves Grandes y Jumbo" },
        { id: 3, name: "Parches" },
        { id: 4, name: "Parques" },
        { id: 5, name: "Transportadoras" },
        { id: 6, name: "Kit inicio" }
    ];

    React.useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const data = await getItemsDay();

                // API response structure is { status: "success", data: [...] }
                const items = data.data || [];

                // Filter items by category_id present in the URL
                const fileteredItems = items.filter(item => item.category_id === Number(id));

                const mappedProducts = fileteredItems.map(item => ({
                    id: item.id,
                    name: item.Nombre || "Producto sin nombre", // API uses "Nombre"
                    price: item.price ? (typeof item.price === 'number' ? `$${item.price} MXN` : item.price) : "Precio no disponible",
                    description: item.description || "Sin descripción",
                    // Use img_item if available, otherwise fallback
                    image: item.img_item || `${import.meta.env.BASE_URL}shopping.jpg`,
                    available_days: item.available_days
                }));
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
                        {/* Render Sidebar Categories */}
                        {sidebarCategories.map((cat) => {
                            const isActive = cat.id === Number(id) || (id === '9' && cat.name === "Aves Chicas y Medianas"); // Logic to match current page

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

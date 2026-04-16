import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { getItems, getCategories, getItemData } from '../../services/api';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal';
import { useCart } from '../../context/CartContext';
import formatGoogleDriveUrl from '../../utils/formatGoogleDriveUrl';

const VoladerasModal = ({ isOpen, onClose }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // For nested ProductModal
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isProductModalOpen, setIsProductModalOpen] = useState(false);
    const [modalLoading, setModalLoading] = useState(false);
    
    const { addToCart } = useCart();
    const [addedProductId, setAddedProductId] = useState(null);

    useEffect(() => {
        if (!isOpen) return;

        const fetchData = async () => {
            try {
                setLoading(true);
                // 1. Fetch categories to find "voladeras" IDs
                const catsResponse = await getCategories();
                let voladerasIds = [];
                if (catsResponse.status === 'success' && catsResponse.data) {
                    voladerasIds = catsResponse.data
                        .filter(cat => cat.name.toLowerCase().includes('voladera'))
                        .map(cat => cat.id);
                }

                // 2. Fetch all products and filter by these IDs
                const itemsResponse = await getItems();
                const items = itemsResponse.data || [];

                const filteredItems = items.filter(item => {
                    if (Array.isArray(item.category_ids)) {
                        return item.category_ids.some(id => voladerasIds.includes(id));
                    }
                    return voladerasIds.includes(item.category_id);
                });

                const mappedProducts = filteredItems.map(item => {
                    const isValidImageUrl = item.img_item && 
                        (item.img_item.startsWith('http://') || item.img_item.startsWith('https://')) &&
                        item.img_item.length > 10;
                    
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
                console.error("Error fetching Voladeras:", err);
                setError("No se pudieron cargar las voladeras.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [isOpen]);

    const handleOpenProductModal = async (product) => {
        setIsProductModalOpen(true);
        setSelectedProduct(product);
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

    const handleCloseProductModal = () => {
        setIsProductModalOpen(false);
        setTimeout(() => setSelectedProduct(null), 300);
    };

    const handleQuickAddToCart = (product, event) => {
        event.stopPropagation();
        addToCart(product, 1);
        setAddedProductId(product.id);
        setTimeout(() => setAddedProductId(null), 1500);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            {/* Background Blur */}
            <div className="absolute inset-0 bg-[#0f341b]/60 backdrop-blur-md" onClick={onClose}></div>
            
            {/* Modal Container */}
            <div className="relative w-full max-w-[1200px] h-full max-h-[90vh] bg-white rounded-[24px] shadow-sm flex flex-col overflow-hidden border border-gray-100">
                {/* Header Modal */}
                <div className="flex items-center justify-between p-5 md:p-6 border-b border-gray-100 bg-white">
                    <h2 className="text-[28px] md:text-3xl font-black text-[#B70F2A] uppercase tracking-wide font-['Inter']">Nuestras Voladeras</h2>
                    <button 
                        onClick={onClose}
                        className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                    >
                        <X size={24} className="text-gray-600" />
                    </button>
                </div>

                {/* Content - Product Grid */}
                <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50/50">
                    {loading ? (
                        <div className="h-full min-h-[300px] flex items-center justify-center">
                            <span className="text-xl text-[#008F24] animate-pulse font-medium">Cargando voladeras...</span>
                        </div>
                    ) : error ? (
                         <div className="h-full min-h-[300px] flex items-center justify-center">
                            <div className="text-red-500 font-medium">{error}</div>
                        </div>
                    ) : products.length === 0 ? (
                        <div className="h-full min-h-[300px] flex flex-col items-center justify-center text-gray-500 gap-4">
                            <span className="text-lg">No se encontraron modelos de voladeras al momento.</span>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 auto-rows-[300px] md:auto-rows-[340px] lg:auto-rows-[360px]">
                            {products.map((product) => (
                                <div key={product.id} className="h-full">
                                    <ProductCard
                                        product={product}
                                        onOpenModal={handleOpenProductModal}
                                        onQuickAdd={handleQuickAddToCart}
                                        isAdded={addedProductId === product.id}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Nested Product Details Modal */}
            <ProductModal
                isOpen={isProductModalOpen}
                onClose={handleCloseProductModal}
                product={selectedProduct}
                loading={modalLoading}
            />
        </div>
    );
};

export default VoladerasModal;

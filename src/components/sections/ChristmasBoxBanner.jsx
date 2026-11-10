import React, { useState, useEffect } from 'react';
import { Gift, CreditCard, Snowflake, Sparkles, TreePine } from 'lucide-react';
import { getItems, getItemData } from '../../services/api';
import { useCart } from '../../context/CartContext';
import formatGoogleDriveUrl from '../../utils/formatGoogleDriveUrl';
import { isCajaNavidena } from '../../utils/navidad';
import ProductModalBox from '../common/ProductModalBox';

const BASE_URL = import.meta.env.BASE_URL;

// Colores de la serie de luces navideñas
const LIGHT_COLORS = ['#ff5252', '#ffd700', '#4caf50', '#ffffff'];

// Copos de nieve decorativos: [left%, size, duration(s), delay(s), opacity]
const SNOWFLAKES = [
    [4, 22, 7, 0, 0.5],
    [14, 14, 9, 1.2, 0.35],
    [26, 18, 8, 2.4, 0.45],
    [38, 12, 10, 0.6, 0.3],
    [50, 20, 8.5, 1.8, 0.4],
    [62, 14, 9.5, 0.2, 0.35],
    [74, 22, 7.5, 2.9, 0.5],
    [86, 12, 10.5, 1.5, 0.3],
    [94, 18, 8, 0.9, 0.45],
];

/**
 * ChristmasBoxBanner
 * Banner navideño a todo lo ancho que muestra el artículo destacado
 * "Caja navideña" (filtrado por ID — ver CAJA_NAVIDENA_ID en
 * src/utils/navidad.js). Si el artículo no existe en el API,
 * el banner no se renderiza.
 */
const ChristmasBoxBanner = () => {
    const [product, setProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalLoading, setModalLoading] = useState(false);
    const { startDirectBuy } = useCart();

    // Buscar el artículo "Caja navideña" en el API
    useEffect(() => {
        const fetchCajaNavidena = async () => {
            try {
                const data = await getItems();
                const items = data?.data || [];
                const caja = items.find(item => isCajaNavidena(item));

                if (caja) {
                    const isValidImageUrl = caja.img_item &&
                        (caja.img_item.startsWith('http://') || caja.img_item.startsWith('https://')) &&
                        caja.img_item.length > 10;

                    setProduct({
                        id: caja.id,
                        name: caja.name || 'Caja navideña',
                        price: caja.price ? (typeof caja.price === 'number' ? `$${caja.price} MXN` : caja.price) : 'Consultar',
                        description: caja.description || '',
                        image: isValidImageUrl ? formatGoogleDriveUrl(caja.img_item) : `${BASE_URL}shopping.jpg`,
                        images: Array.isArray(caja.images) ? caja.images : [],
                        available_days: caja.available_days,
                        atributo_1: caja.atributo_1,
                        atributo_2: caja.atributo_2,
                        category_id: caja.category_id,
                        category_ids: Array.isArray(caja.category_ids) ? caja.category_ids : (caja.category_id ? [caja.category_id] : [])
                    });
                }
            } catch (err) {
                console.error('Error buscando la Caja navideña:', err);
            }
        };

        fetchCajaNavidena();
    }, []);

    const handleOpenModal = async () => {
        setIsModalOpen(true);
        setModalLoading(true);
        try {
            const response = await getItemData(product.id);
            if (response.status === 'success' && response.data) {
                setProduct(prev => ({ ...prev, ...response.data }));
            }
        } catch (error) {
            console.error('Error cargando detalles de la Caja navideña:', error);
        } finally {
            setModalLoading(false);
        }
    };

    // Si el artículo no existe, no mostrar el banner
    if (!product) return null;

    const shortDescription = product.description
        ? (product.description.length > 140 ? `${product.description.slice(0, 140)}...` : product.description)
        : 'Nuestra caja especial de temporada, llena de sorpresas para tu ave.';

    return (
        <section className="relative w-full overflow-hidden bg-gradient-to-r from-[#5c0a0a] via-[#A81212] to-[#5c0a0a] shadow-md">

            {/* Serie de luces navideñas (arriba) */}
            <div className="relative z-10 flex justify-between items-center px-3 pt-1.5">
                {Array.from({ length: 40 }).map((_, i) => (
                    <span
                        key={i}
                        className="w-[6px] h-[6px] md:w-[9px] md:h-[9px] rounded-full animate-pulse"
                        style={{
                            backgroundColor: LIGHT_COLORS[i % LIGHT_COLORS.length],
                            boxShadow: `0 0 6px 1px ${LIGHT_COLORS[i % LIGHT_COLORS.length]}`,
                            animationDelay: `${(i % 5) * 0.3}s`,
                        }}
                    />
                ))}
            </div>

            {/* Copos de nieve cayendo */}
            {SNOWFLAKES.map(([left, size, duration, delay, opacity], i) => (
                <Snowflake
                    key={i}
                    size={size}
                    className="absolute top-0 pointer-events-none animate-snowfall"
                    style={{
                        left: `${left}%`,
                        opacity,
                        color: '#ffffff',
                        animationDuration: `${duration}s`,
                        animationDelay: `${delay}s`,
                    }}
                />
            ))}

            {/* Contenido */}
            <div className="relative z-10 max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 py-6 md:py-8 flex flex-col-reverse md:flex-row items-center gap-5 md:gap-10">

                {/* Texto */}
                <div className="flex-1 text-center md:text-left">
                    <span className="inline-flex items-center gap-1.5 bg-[#FFD700] text-[#7a0d0d] text-[11px] md:text-[12px] font-bold uppercase tracking-widest px-4 py-1 rounded-full shadow-md mb-3">
                        <Sparkles size={13} />
                        Edición especial
                        <Sparkles size={13} />
                    </span>

                    <h2 className="font-['Inter'] font-extrabold text-white text-2xl sm:text-3xl md:text-[40px] leading-tight drop-shadow-[0_2px_3px_rgba(0,0,0,0.45)] flex items-center justify-center md:justify-start gap-3">
                        <TreePine size={30} className="hidden md:block text-[#4caf50] flex-shrink-0" />
                        {product.name}
                    </h2>

                    <p className="text-white/85 text-[13px] sm:text-[14px] md:text-[16px] leading-relaxed mt-2 md:mt-3 max-w-[520px] mx-auto md:mx-0">
                        {shortDescription}
                    </p>

                    <div className="mt-3 md:mt-4 flex items-center justify-center md:justify-start gap-3">
                        <span className="font-['Inter'] font-extrabold text-[#FFD700] text-2xl md:text-[30px] drop-shadow-md">
                            {product.price}
                        </span>
                    </div>

                    <div className="mt-4 md:mt-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-center md:justify-start gap-3 w-full sm:w-auto max-w-[340px] sm:max-w-none mx-auto md:mx-0">
                        <button
                            onClick={handleOpenModal}
                            className="flex items-center justify-center gap-2 bg-[#166534] hover:bg-[#14532d] active:scale-95 text-white font-bold text-[15px] md:text-[16px] px-7 py-3 rounded-full border-2 border-[#FFD700]/80 shadow-[0_0_18px_rgba(255,215,0,0.35)] transition-all duration-200 hover:scale-105"
                        >
                            <Gift size={19} />
                            Ver detalles
                        </button>
                        <button
                            onClick={() => startDirectBuy(product, 1)}
                            className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 active:scale-95 text-white font-bold text-[15px] md:text-[16px] px-7 py-3 rounded-full border-2 border-white/50 transition-all duration-200 hover:scale-105"
                        >
                            <CreditCard size={19} />
                            Comprar ahora
                        </button>
                    </div>
                </div>

                {/* Imagen */}
                <div
                    className="flex-shrink-0 cursor-pointer group"
                    onClick={handleOpenModal}
                >
                    <div className="bg-white/95 rounded-3xl p-2.5 sm:p-3 md:p-4 shadow-[0_0_35px_rgba(255,255,255,0.35)] transition-transform duration-300 group-hover:scale-105 group-hover:rotate-1">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-[130px] h-[130px] sm:w-[170px] sm:h-[170px] md:w-[230px] md:h-[230px] object-contain"
                        />
                    </div>
                </div>
            </div>

            {/* Serie de luces navideñas (abajo) */}
            <div className="relative z-10 flex justify-between items-center px-3 pb-1.5">
                {Array.from({ length: 40 }).map((_, i) => (
                    <span
                        key={i}
                        className="w-[6px] h-[6px] md:w-[9px] md:h-[9px] rounded-full animate-pulse"
                        style={{
                            backgroundColor: LIGHT_COLORS[(i + 2) % LIGHT_COLORS.length],
                            boxShadow: `0 0 6px 1px ${LIGHT_COLORS[(i + 2) % LIGHT_COLORS.length]}`,
                            animationDelay: `${(i % 5) * 0.3}s`,
                        }}
                    />
                ))}
            </div>

            {/* Modal tematizado de la Caja navideña */}
            <ProductModalBox
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                product={product}
                loading={modalLoading}
            />
        </section>
    );
};

export default ChristmasBoxBanner;

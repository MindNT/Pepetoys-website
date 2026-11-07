/**
 * Utilidades para la categoría "Lin Economico" (Línea Económica).
 *
 * Los productos de esta categoría requieren que el cliente elija
 * un modelo (1-6) antes de agregarlos al carrito. La detección de la
 * categoría es tolerante a cómo esté escrita: mayúsculas, minúsculas,
 * acentos, espacios o guiones ("Lin Economico", "LIN ECONOMICO",
 * "Lin Económico", "lin-economico", etc.).
 */

// Modelos disponibles para los productos Lin Economico
export const LIN_MODELOS = ['1', '2', '3', '4', '5', '6'];

// Rango unicode de marcas diacríticas combinantes (acentos)
const COMBINING_DIACRITICS = /[\u0300-\u036f]/g;

/**
 * Normaliza un texto: minúsculas, sin acentos y sin caracteres no alfanuméricos.
 * "Lin Económico!" -> "lineconomico"
 */
export const normalizeCategoryName = (name) =>
    String(name || '')
        .toLowerCase()
        .normalize('NFD')
        .replace(COMBINING_DIACRITICS, '')
        .replace(/[^a-z0-9]/g, '');

/**
 * Indica si un nombre de categoría corresponde a "Lin Economico",
 * sin importar mayúsculas, acentos, espacios o guiones.
 */
export const isLinEconomicoCategoryName = (name) =>
    normalizeCategoryName(name).includes('lineconomico');

/**
 * Dada la lista de categorías del API, devuelve los IDs (numéricos)
 * de las que pertenecen a "Lin Economico".
 */
export const getLinEconomicoCategoryIds = (categories) =>
    (Array.isArray(categories) ? categories : [])
        .filter((cat) => isLinEconomicoCategoryName(cat?.name))
        .map((cat) => Number(cat.id))
        .filter((id) => !Number.isNaN(id));

/**
 * Indica si un producto pertenece a la categoría Lin Economico,
 * soportando el formato nuevo (category_ids: array) y el viejo (category_id).
 */
export const isLinEconomicoProduct = (product, linCategoryIds) => {
    if (!product || !Array.isArray(linCategoryIds) || linCategoryIds.length === 0) {
        return false;
    }
    const ids = Array.isArray(product.category_ids)
        ? product.category_ids
        : (product.category_id ? [product.category_id] : []);
    return ids.some((id) => linCategoryIds.includes(Number(id)));
};

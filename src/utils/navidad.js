/**
 * Utilidades para la categoría "Navideños" y el artículo destacado
 * de temporada "Caja navideña".
 *
 * La detección de la categoría es tolerante a cómo esté escrita:
 * mayúsculas, minúsculas, acentos, espacios o guiones
 * ("Navideños", "navidenos", "NAVIDEÑOS", "navideños", etc.).
 */

import { normalizeCategoryName } from './linEconomico';

/**
 * ID del artículo "Caja navideña" en el backend.
 * Si algún día cambia, basta actualizar esta constante.
 * Si se pone en `null`, el artículo se localiza por su nombre
 * ("caja navideña") dentro de los productos del API.
 */
export const CAJA_NAVIDENA_ID = 238;

/**
 * Indica si un nombre de categoría corresponde a "Navideños",
 * sin importar mayúsculas, acentos, espacios o guiones.
 */
export const isNavidenosCategoryName = (name) =>
    normalizeCategoryName(name).includes('navideno');

/**
 * Dada la lista de categorías del API, devuelve los IDs (numéricos)
 * de las que pertenecen a "Navideños".
 */
export const getNavidenosCategoryIds = (categories) =>
    (Array.isArray(categories) ? categories : [])
        .filter((cat) => isNavidenosCategoryName(cat?.name))
        .map((cat) => Number(cat.id))
        .filter((id) => !Number.isNaN(id));

/**
 * Indica si un producto pertenece a la categoría Navideños,
 * soportando el formato nuevo (category_ids: array) y el viejo (category_id).
 */
export const isNavidenosProduct = (product, navidenosCategoryIds) => {
    if (!product || !Array.isArray(navidenosCategoryIds) || navidenosCategoryIds.length === 0) {
        return false;
    }
    const ids = Array.isArray(product.category_ids)
        ? product.category_ids
        : (product.category_id ? [product.category_id] : []);
    return ids.some((id) => navidenosCategoryIds.includes(Number(id)));
};

/**
 * Indica si un producto es el artículo destacado "Caja navideña".
 * Prioriza el ID configurado en CAJA_NAVIDENA_ID; si no hay ID
 * configurado, lo detecta por el nombre del artículo.
 */
export const isCajaNavidena = (product) => {
    if (!product) return false;
    if (CAJA_NAVIDENA_ID !== null && CAJA_NAVIDENA_ID !== undefined) {
        return Number(product.id) === Number(CAJA_NAVIDENA_ID);
    }
    return normalizeCategoryName(product.name).includes('cajanavidena');
};

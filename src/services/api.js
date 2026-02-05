
export const API_BASE_URL = 'https://pepetoys-backend.mindnt.com.mx';

/**
 * Returns the current date in YYYY-MM-DD format.
 */
export const getTodayDateString = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
};

/**
 * Fetches all available items.
 * Endpoint: /items/get-items
 * @returns {Promise<{status: string, data: Array}>} - List of items
 */
export const getItems = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/items/get-items`, {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Failed to fetch items:", error);
        throw error;
    }
};

/**
 * Fetches all categories.
 * Endpoint: /items/categories
 * @returns {Promise<{status: string, data: Array<{id: number, name: string, is_active: number}>}>} - List of categories
 */
export const getCategories = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/items/categories`, {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Failed to fetch categories:", error);
        throw error;
    }
};

/**
 * Fetches items for the given day.
 * Endpoint: /items/get-items-day?day=YYYY-MM-DD
 * @param {string} date - Date in YYYY-MM-DD format
 */
export const getItemsDay = async (date = getTodayDateString()) => {
    try {
        const response = await fetch(`${API_BASE_URL}/items/get-items-day?day=${date}`, {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Failed to fetch items:", error);
        throw error;
    }
};

/**
 * Fetches data for a specific item by ID.
 * Endpoint: /items/get-item-data?item_id={id}
 * @param {number|string} id - The item ID
 */
export const getItemData = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/items/get-item-data?item_id=${id}`, {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Failed to fetch item data for id ${id}:`, error);
        throw error;
    }
};

/**
 * Saves an order to the backend.
 * Endpoint: /orders/save-order
 * @param {Object} orderData - Order data object
 * @param {string} orderData.phone - Customer phone number
 * @param {Object} orderData.items - Object with item IDs as keys and quantities as values (e.g., {"1": 2, "5": 1})
 * @param {number} orderData.total_amount - Total amount of the order
 * @param {Object} orderData.promotions - Object with promotion IDs as keys and arrays of item IDs as values (e.g., {"1": [1, 20]})
 * @param {string} orderData.code_order - Order code (optional, puede ser generado)
 * @returns {Promise<Object>} - Response from the API
 */
export const saveOrder = async (orderData) => {
    try {
        // El backend espera los parámetros como query parameters, no en el body
        // Generar código de orden si no se proporciona (timestamp o UUID simple)
        const codeOrder = orderData.code_order || `ORD-${Date.now()}`;
        
        // Convertir items a string JSON para el query parameter
        const itemsJson = JSON.stringify(orderData.items);
        const promotionsJson = JSON.stringify(orderData.promotions || {});
        
        // Construir URL con query parameters
        const url = new URL(`${API_BASE_URL}/orders/save-order`);
        url.searchParams.append('phone', orderData.phone);
        url.searchParams.append('code_order', codeOrder);
        url.searchParams.append('total_amount', orderData.total_amount.toString());
        url.searchParams.append('items', itemsJson);
        url.searchParams.append('promotions', promotionsJson);

        console.log('URL completa:', url.toString());

        const response = await fetch(url.toString(), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Intentar leer la respuesta siempre, incluso si hay error
        let responseData;
        try {
            const text = await response.text();
            responseData = text ? JSON.parse(text) : null;
        } catch (e) {
            responseData = null;
        }

        if (!response.ok) {
            // Intentar obtener el mensaje de error del servidor
            let errorMessage = `${response.status} ${response.statusText}`;
            let errorDetails = null;
            
            if (responseData) {
                if (responseData.message) {
                    errorMessage = responseData.message;
                    errorDetails = responseData;
                } else if (responseData.error) {
                    errorMessage = responseData.error;
                    errorDetails = responseData;
                } else if (responseData.detail) {
                    errorMessage = JSON.stringify(responseData.detail);
                    errorDetails = responseData.detail;
                } else {
                    errorMessage = JSON.stringify(responseData);
                    errorDetails = responseData;
                }
                console.error("Error response data:", responseData);
            }
            
            // Crear un error con más información
            const error = new Error(errorMessage);
            error.status = response.status;
            error.details = errorDetails;
            throw error;
        }

        return responseData;
    } catch (error) {
        console.error("Failed to save order:", error);
        throw error;
    }
};

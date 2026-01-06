
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

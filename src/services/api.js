
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

const API_BASE_URL = "https://fakestoreapi.com";

/**
 * Fetch all products or products by category.
 * @param {string} category - The category to fetch products for. If 'All', fetches all products.
 * @returns {Promise<Array>} - A promise resolving to an array of products.
 */
export const fetchProducts = async (category = "All") => {
  try {
    const endpoint =
      category === "All"
        ? `${API_BASE_URL}/products`
        : `${API_BASE_URL}/products/category/${encodeURIComponent(category)}`;
    const response = await fetch(endpoint);
    if (!response.ok) throw new Error(`Error fetching products: ${response.statusText}`);
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * Fetch all available product categories.
 * @returns {Promise<Array>} - A promise resolving to an array of categories.
 */
export const fetchCategories = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/categories`);
    if (!response.ok) throw new Error(`Error fetching categories: ${response.statusText}`);
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * Fetch product details by product ID.
 * @param {number} productId - The ID of the product to fetch.
 * @returns {Promise<Object>} - A promise resolving to a product object.
 */
export const fetchProductById = async (productId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${productId}`);
    if (!response.ok) throw new Error(`Error fetching product details: ${response.statusText}`);
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
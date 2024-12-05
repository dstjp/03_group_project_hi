const API_BASE_URL = "https://fakestoreapi.com";

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

import { fetchProducts } from "../../api.js";

document.addEventListener("DOMContentLoaded", async () => {
  const productListContainer = document.getElementById("product-list");

  try {
    // Fetch and display all products
    const products = await fetchProducts();
    displayProducts(products);
  } catch (error) {
    console.error("Error loading products:", error);
    productListContainer.innerHTML = `<p class="error-message">Failed to load products.</p>`;
  }

  /**
   * Display a list of products.
   * @param {Array} products - Array of product data.
   */
  function displayProducts(products) {
    productListContainer.innerHTML = products
      .map(
        (product) => `
        <div class="product-card">
          <img src="${product.image}" alt="${product.title}" class="product-image">
          <hr>
          <h3 class="product-title">${product.title}</h3>
          <hr>
          <p class="product-description">${product.description.slice(0, 100)}...</p>
          <hr>
          <p class="product-price">$${product.price}</p>
          <hr>
          <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
        </div>
      `
      )
      .join("");
  }
});



// const API_URL = 'https://fakestoreapi.com/products';

// async function fetchProducts() {
//   try {
//     const response = await fetch(API_URL);
//     if (!response.ok) {
//       throw new Error('Failed to fetch products.');
//     }
//     const products = await response.json();
//     renderProducts(products);
//   } catch (error) {
//     console.error('Error fetching products:', error);
//     const productList = document.getElementById('product-list');
//     productList.innerHTML = '<p class="error-message">Failed to load products.</p>';
//   }
// }

// function renderProducts(products) {
//   const productList = document.getElementById('product-list');
//   productList.innerHTML = products
//     .map(
//       (product) => `
//       <div class="product-card">
//         <img src="${product.image}" alt="${product.title}" class="product-image">
//         <hr>
//         <h3 class="product-title">${product.title}</h3>
//         <hr>
//         <p class="product-description">${product.description.slice(0, 100)}...</p>
//         <hr>
//         <p class="product-price">$${product.price}</p>
//         <hr>
//         <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>

//       </div>
//     `
//     )
//     .join('');
// }

// fetchProducts();
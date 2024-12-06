
import { fetchProducts } from "../../api.js";
import { createFilterUI, applyFilters } from '../filter/filter.js';  // Import your filter functions

document.addEventListener("DOMContentLoaded", async () => {
  const productListContainer = document.getElementById("product-list");
  const filterContainer = document.getElementById("filter-container");  // Add this line

  let allProducts = [];  // Store all products

  try {
    // Fetch all products
    allProducts = await fetchProducts();
    
    // Create filter UI
    createFilterUI(allProducts, filterContainer, (filterState) => {
      const filteredProducts = applyFilters(allProducts, filterState);
      displayProducts(filteredProducts);
    });

    // Initial display of all products
    displayProducts(allProducts);
  } catch (error) {
    console.error("Error loading products:", error);
    productListContainer.innerHTML = `<p class="error-message">Failed to load products.</p>`;
  }

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
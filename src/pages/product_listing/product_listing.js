import Cart from "../shopping_cart/shopping_cart.js";
import './product_listing.css'
import { fetchProducts } from "../../api.js";
import { createFilterUI, applyFilters } from '../filter/filter.js'; 

document.addEventListener("DOMContentLoaded", async () => {
  const productListContainer = document.getElementById("product-list");
  const filterContainer = document.getElementById("filter-container");
  const cart = new Cart('cart-container', 'cart-count'); 
  let allProducts = [];

  try {
    allProducts = await fetchProducts();
    
    createFilterUI(allProducts, filterContainer, (filterState) => {
      const filteredProducts = applyFilters(allProducts, filterState);
      displayProducts(filteredProducts);
    });
    
    //Search (Works even if Eslint says otherwise)
    // eslint-disable-next-line no-undef
    searchInput.addEventListener("input", () => {
      // eslint-disable-next-line no-undef
      const query = searchInput.value.toLowerCase();
      const filteredProducts = allProducts.filter(product => 
        product.title.toLowerCase().includes(query)
      );
      displayProducts(filteredProducts)
    })

    // Initial display of all products
    displayProducts(allProducts);
  } catch (error) {
    console.error("Error loading products:", error);
    productListContainer.innerHTML = `⁠<p class="error-message">Failed to load products.</p>`;
  }


  function displayProducts(products) {
    productListContainer.innerHTML = products
      .map(
        (product) => `
        <div class="product-card">
          <img src="${product.image}" alt="${product.title}" class="product-image">
          <hr>
          <h3 class="product-title">${product.title.split(' ').slice(0,3).join(' ')}</h3>
          <hr>
          <p class="product-description">${product.description.slice(0, 500)}...</p>
          <hr>
          <div class="product-footer">
                <div class="svg-container">
              <svg fill="#000000" height="50px" width="50px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-66.14 -66.14 480.38 480.38" xml:space="preserve" transform="rotate(45)matrix(-1, 0, 0, -1, 0, 0)" stroke="#000000" stroke-width="0.003481">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <g>
                    <g>
                      <g>
                        <path d="M260.1,48.65c-22,0-40,18-40,40s18,40,40,40s40-18,40-40S282.1,48.65,260.1,48.65z M260.1,112.65c-13.2,0-24-10.8-24-24 s10.8-24,24-24s24,10.8,24,24S273.3,112.65,260.1,112.65z"></path>
                        <path d="M308.1,1.05h-108c-10.8,0-20.8,4-28,11.6L11.7,172.25c-15.6,15.6-15.6,40.8,0,56.4l107.2,106.8 c7.6,7.6,17.6,11.6,28.4,11.6s20.8-4,28.4-11.6l160.4-160.4c7.6-7.2,12-17.2,12-27.6V41.05C348.1,19.05,330.1,1.05,308.1,1.05z M332.1,147.45c0,6-2.4,12-7.2,16l-160.8,160.8c-4.4,4.4-10.4,6.8-16.8,6.8s-12.4-2.4-16.8-6.8L22.9,217.45 c-9.2-9.2-9.2-24.4,0-34l160.4-159.6c4.4-4.4,10.4-6.8,16.8-6.8h108c13.2,0,24,10.8,24,24V147.45z"></path>
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
              <span class="product-price">$${product.price}</span>
            </div>
            <button class="add-to-cart-btn" data-id="${product.id}">
              <svg height="50px" width="50px" xmlns="http://www.w3.org/2000/svg" fill="#000000" viewBox="-2.6 -2.6 31.20 31.20">
                <g>
                  <path style="fill:#000000;" d="M25.856,10.641C21.673,19.5,20.312,19.5,19.5,19.5h-8c-2.802,0-4.949-1.648-5.47-4.2 c-0.016-0.078-1.6-7.853-2.005-10.025C3.826,4.21,3.32,3.5,1.5,3.5C0.671,3.5,0,2.829,0,2s0.671-1.5,1.5-1.5 c3.02,0,4.964,1.5,5.474,4.224c0.401,2.149,1.98,9.898,1.996,9.977c0.319,1.566,1.722,1.8,2.53,1.8h7.605 c0.817-0.878,2.679-4.261,4.038-7.141c0.354-0.749,1.249-1.068,1.997-0.716C25.89,8.997,26.21,9.891,25.856,10.641z M10.5,20.5 C9.119,20.5,8,21.619,8,23s1.119,2.5,2.5,2.5S13,24.381,13,23S11.881,20.5,10.5,20.5z M19.5,20.5c-1.381,0-2.5,1.119-2.5,2.5 s1.119,2.5,2.5,2.5S22,24.381,22,23S20.881,20.5,19.5,20.5z M14.663,12.344c0.1,0.081,0.223,0.12,0.346,0.12 s0.244-0.039,0.346-0.12c0.1-0.079,2.828-2.74,4.316-4.954c0.115-0.172,0.126-0.392,0.028-0.574 c-0.095-0.181-0.285-0.295-0.49-0.295h-2.226c0,0-0.217-4.291-0.359-4.49c-0.206-0.294-1.057-0.494-1.616-0.494 c-0.561,0-1.427,0.2-1.634,0.494c-0.141,0.198-0.328,4.49-0.328,4.49h-2.255c-0.206,0-0.395,0.114-0.492,0.295 c-0.097,0.182-0.086,0.403,0.028,0.574C11.816,9.605,14.564,12.265,14.663,12.344z"></path>
                </g>
              </svg>
            </button>
          </div>
        </div>
      `

      )
      .join("");
  

    const addToCartButtons = productListContainer.querySelectorAll(".add-to-cart-btn");
    function showNotification(message) {
      console.log("Notification triggered:", message);
      const notification = document.createElement("div");
      notification.className = "cart-notification";
      notification.textContent = message;
    
      // Adding the notification to the body
      document.body.appendChild(notification);
    
      setTimeout(() => {
        notification.classList.add("show");
      }, 10);
    
      setTimeout(() => {
        notification.remove();
      }, 2000);
    }
    
    addToCartButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const productId = parseInt(button.dataset.id, 10);
        console.log("Button clicked. Product ID:", productId); 
        const product = products.find((p) => p.id === productId);
        console.log("Product found:", product);
        if (product) {
          cart.addToCart(product);
          showNotification(`${product.title} added to the cart!`);
        }
      });
    });
  }
});
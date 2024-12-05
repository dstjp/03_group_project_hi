import { fetchProducts } from "../../api.js";
import { createFilterUI, applyFilters } from '../filter/filter.js';  // Import your filter functions


let cart = [];  // Store cart items

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
    productListContainer.innerHTML = `⁠<p class="error-message">Failed to load products.</p>`;
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


    function addToCart(productId) {
      const product = products.find(p => p.id === productId);
      if (product) {
        const cartItem = cart.find(item => item.id === productId);
        if (cartItem) {
          cartItem.quantity += 1;
        } else {
          cart.push({ ...product, quantity: 1 });
        }
        updateCart();
      }
    }

    function updateCart() {
      const cartItemsDiv = document.getElementById("cartItems");
      const cartTotalDiv = document.getElementById("cartTotal");

      cartItemsDiv.innerHTML = cart.map(item => `
          <div>
            ${item.title} - $${item.price} x ${item.quantity}
            <button class="add-one" data-id="${item.id}">+</button>
            <button class="subtract-one" data-id="${item.id}">-</button>
            <button class="remove-all" data-id="${item.id}">Remove</button>
          </div>
        `).join("");

      const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
      cartTotalDiv.innerHTML = `Total: $${total}`;

      document.querySelectorAll(".add-one").forEach(button => {
        button.addEventListener("click", () => {
          const productId = parseInt(button.dataset.id, 10);
          addToCart(productId);
        });
      });

      document.querySelectorAll(".subtract-one").forEach(button => {
        button.addEventListener("click", () => {
          const productId = parseInt(button.dataset.id, 10);
          subtractFromCart(productId);
        });
      });

      document.querySelectorAll(".remove-all").forEach(button => {
        button.addEventListener("click", () => {
          const productId = parseInt(button.dataset.id, 10);
          removeFromCart(productId);
        });
      });
    }

    function subtractFromCart(productId) {
      const cartItem = cart.find(item => item.id === productId);
      if (cartItem) {
        if (cartItem.quantity > 1) {
          cartItem.quantity -= 1;
        } else {
          cart = cart.filter(item => item.id !== productId);
        }
        updateCart();
      }
    }

    function removeFromCart(productId) {
      cart = cart.filter(item => item.id !== productId);
      updateCart();
    }

    // Add event listeners to "Add to Cart" buttons
    document.querySelectorAll(".add-to-cart-btn").forEach(button => {
      button.addEventListener("click", () => {
        const productId = parseInt(button.dataset.id, 10);
        addToCart(productId);
      });
    });
  }
});

const button = `
   <div>
   <button class="shopping-cart-img" id="dropdownButton"> <svg 
                width="24" 
                height="29" 
                viewBox="0 0 22 21" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg">
                <path 
                fill="black"/>
                </svg></button>
                <div id="dropdownMenu" class="dropdown-content">
      <div id="cartItems"></div>
      <div id="cartTotal">Total: $0</div>
            </div>
            </div>
    `;


// Insert the HTML content into the div with id "shopping-cart"
document.getElementById('shopping-cart').innerHTML = button;

// Add event listener to the button to toggle the dropdown menu
document.getElementById('dropdownButton').addEventListener('click', function () {
  document.getElementById('dropdownMenu').classList.toggle('show');
});
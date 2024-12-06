import './shopping_cart.css';

export default class Cart {
  constructor(cartContainerId, cartCountId) {
    this.cartItems = []; // Array to store cart items
    this.cartContainer = document.getElementById(cartContainerId);
    this.cartCount = document.getElementById(cartCountId);
    this.initCartToggle();
    this.renderCart();
  }

  // Initialize cart toggle for visibility
  initCartToggle() {
    const cartIcon = document.getElementById('cart-link');
    if (cartIcon) {
      cartIcon.addEventListener('click', (event) => {
        event.preventDefault();
        this.cartContainer.style.display =
          this.cartContainer.style.display === 'block' ? 'none' : 'block';
      });
    }
  }

  // Add a product to the cart
  addToCart(product) {
    const existingItem = this.cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1; // Increment quantity if product already exists
    } else {
      this.cartItems.push({ ...product, quantity: 1 }); // Add new product with quantity 1
    }
    this.updateCartCount();
    this.renderCart();
  }

  // Remove a product completely from the cart
  removeFromCart(productId) {
    this.cartItems = this.cartItems.filter((item) => item.id !== productId);
    this.updateCartCount();
    this.renderCart();
  }

  // Update the quantity of a product
  updateQuantity(productId, increment = true) {
    const item = this.cartItems.find((item) => item.id === productId);
    if (item) {
      item.quantity = increment ? item.quantity + 1 : item.quantity - 1;
      if (item.quantity <= 0) {
        this.removeFromCart(productId); // Remove item if quantity goes to 0
      } else {
        this.renderCart(); // Update the cart UI
      }
    }
    this.updateCartCount();
  }

  // Update the cart count badge
  updateCartCount() {
    const totalItems = this.cartItems.reduce((total, item) => total + item.quantity, 0);
    this.cartCount.textContent = totalItems;
  }

  // Calculate total cost of the cart
  calculateTotalCost() {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  }

  // Render the cart UI
  renderCart() {
    this.cartContainer.innerHTML = `
      <div class="cart-header">
        <span class="cart-title">Shopping Cart</span>
        <button class="close-cart-btn">&times;</button>
      </div>
      ${
        this.cartItems.length
          ? this.cartItems
              .map(
                (item) => `
              <div class="cart-item">
                <img src="${item.image}" alt="${item.title}" class="cart-item-image">
                <div class="cart-item-details">
                  <h4 class="cart-item-title">${item.title}</h4>
                  <p class="cart-item-price">Price: $${item.price}</p>
                  <p class="cart-item-quantity">
                    Quantity:
                    <button class="quantity-btn decrease" data-id="${item.id}">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn increase" data-id="${item.id}">+</button>
                  </p>
                  <button class="remove-cart-item-btn" data-id="${item.id}">Remove</button>
                </div>
              </div>
            `
              )
              .join("")
          : `<p class="empty-cart-message">Your cart is empty.</p>`
      }
      ${
        this.cartItems.length
          ? `<div class="cart-total">Total: $${this.calculateTotalCost()}</div>
             <button class="checkout-btn">Go to Checkout</button>
            `
          : ""
      }
    `;

    // Attach event listeners for quantity buttons
    const increaseButtons = this.cartContainer.querySelectorAll(".quantity-btn.increase");
    const decreaseButtons = this.cartContainer.querySelectorAll(".quantity-btn.decrease");
    const removeButtons = this.cartContainer.querySelectorAll(".remove-cart-item-btn");

    increaseButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const productId = parseInt(button.dataset.id, 10);
        this.updateQuantity(productId, true);
      });
    });

    decreaseButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const productId = parseInt(button.dataset.id, 10);
        this.updateQuantity(productId, false);
      });
    });

    removeButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const productId = parseInt(button.dataset.id, 10);
        this.removeFromCart(productId);
      });
    });

    // Close button functionality
    const closeButton = this.cartContainer.querySelector('.close-cart-btn');
    if (closeButton) {
      closeButton.addEventListener('click', () => {
        this.cartContainer.style.display = 'none';
      });
    }
    // Attach event listener to checkout button
    const checkoutButton = this.cartContainer.querySelector(".checkout-btn");
    if (checkoutButton) {
        checkoutButton.addEventListener("click", () => {
        this.navigateToCheckout(); // Call navigation function
        });
    }
}
    // Navigate to checkout page
    navigateToCheckout() {
    // Dynamically load the checkout page JavaScript
    import("../checkout/checkout.js")
        .then((module) => {
        const renderCheckout = module.default;
        renderCheckout(); // Call the function exported from checkout.js
        })
        .catch((error) => {
        console.error("Error loading checkout page:", error);
        });
    }
}
  
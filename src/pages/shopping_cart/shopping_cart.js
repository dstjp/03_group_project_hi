import './shopping_cart.css';

export function getCheckoutButton() {
  return document.querySelector(".checkout-btn");
}

export default class Cart {
  constructor(cartContainerId, cartCountId) {
    this.cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    this.cartContainer = document.getElementById(cartContainerId);
    this.cartCount = document.getElementById(cartCountId);
    this.initCartToggle();
    this.renderCart();
  }

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

  addToCart(product) {
    const existingItem = this.cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cartItems.push({ ...product, quantity: 1 });
    }
    
    this.updateCartCount();
    this.renderCart();
    localStorage.setItem("cartItems", JSON.stringify(this.cartItems));
  }

  removeFromCart(productId) {
    this.cartItems = this.cartItems.filter((item) => item.id !== productId);
    this.updateCartCount();
    this.renderCart();
    localStorage.setItem("cartItems", JSON.stringify(this.cartItems));
  }

  updateQuantity(productId, increment = true) {
    const item = this.cartItems.find((item) => item.id === productId);
    if (item) {
      item.quantity = increment ? item.quantity + 1 : item.quantity - 1;
      if (item.quantity <= 0) {
        this.removeFromCart(productId);
      } else {
        this.renderCart();
      }
    }
    this.updateCartCount();
  }

  updateCartCount() {
    const totalItems = this.cartItems.reduce((total, item) => total + item.quantity, 0);
    this.cartCount.textContent = totalItems;
  }

  calculateTotalCost() {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  }

  renderCart() {
    this.cartContainer.innerHTML = `
      <div class="cart-header">
        <span class="cart-title">Cart</span>
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

    const closeButton = this.cartContainer.querySelector('.close-cart-btn');
    if (closeButton) {
      closeButton.addEventListener('click', () => {
        this.cartContainer.style.display = 'none';
      });
    }

    const checkoutButton = this.cartContainer.querySelector(".checkout-btn");
    if (checkoutButton) {
      checkoutButton.addEventListener("click", () => {
        this.navigateToCheckout();
      });
    }
  }

  navigateToCheckout() {
    this.cartContainer.style.display = "none";
    import("../checkout/checkout.js")
      .then((module) => {
        const renderCheckoutPage = module.renderCheckoutPage;
        const cartData = JSON.parse(localStorage.getItem("cartItems")) || [];
        renderCheckoutPage(cartData);
        //to make Hero Banner disappear when clicking go to checkout
        document.getElementById("hero-banner").style.display = 'none';
        // Scroll to the top when clicking checkout
        document.documentElement.scrollTop = 0;
      })
      .catch((error) => {
        console.error("Error loading checkout page:", error);
      });
  }
}

import "./checkout.css";
import klarnaImage from "../img/klarna.jpg";
import swishImage from "../img/swish.jpg";
import cardImage from "../img/card.jpg";
import paypalImage from "../img/paypal.jpg";
import Cart from "../shopping_cart/shopping_cart.js";

const productListingSection = document.getElementById(
  "product-listing-section"
);
const checkoutSection = document.getElementById("checkout-section");

export function renderCheckoutPage(cartData) {
  // Trying to Validate if cart data is available
  if (!cartData || cartData.length === 0) {
    console.error("Cart data is empty or unavailable.");
    return;
  }

  const app = document.getElementById("app");
  const checkoutContainer = document.createElement("div");
  checkoutContainer.className = "checkout-container";

  productListingSection.style.display = "none"; // Hide product listing and show checkout

  const cartSection = document.getElementById("cart-container");
  if (cartSection) {
    cartSection.style.display = "none";
  }
  checkoutSection.style.display = "block";

  let bagItemsHTML = "";
  let subtotal = 0;

  // Loop through cart data to generate checkout items
  cartData.forEach((item) => {
    subtotal += item.price * item.quantity;
    bagItemsHTML += `
      <div class="product-details">
        <img src="${item.image}" alt="${item.title}" />
        <div class="product-info">
          <h4>${item.title}</h4>
          <p>Style #: ${item.id}</p>
          <p>Qty: ${item.quantity} @ $${item.price.toFixed(2)}</p>
          <p><strong>$${(item.price * item.quantity).toFixed(2)}</strong></p>
        </div>
      </div>
    `;
  });

  const shipping = 8.0;
  const tax = 0.0;
  const total = subtotal + shipping + tax;

  checkoutContainer.innerHTML = `
   <div class="main-content">
        <!-- Shipping Section -->
        <section class="section">
          <h2 class="section-title">Shipping</h2>
          <div class="delivery-type">
            <label><input type="radio" name="delivery" checked /> Home</label>
            <label><input type="radio" name="delivery" />Office</label>
          </div>
          <form id="checkout-form">
            <div class="form-group">
              <input
                type="text"
                placeholder="Name"
                id="name"
                name="name"
                required
              />
            </div>
            <div class="form-group">
              <input
                type="text"
                placeholder="Type your address"
                id="address"
                name="address"
                required
              />
            </div>
            <div class="form-group">
              <input
                type="email"
                placeholder="Email"
                id="email"
                name="email"
                required
              />
            </div>
            <div class="form-group">
              <input
                type="tel"
                placeholder="Phone Number"
                id="phone"
                name="phone"
                pattern="\\d{10}"
                required
              />
            </div>
          <button type="submit" class="btn">PROCEED TO PAYMENT</button> 
            </form>
        </section>
    
        <!-- Payment Section -->
        <section class="section payment-container">
          <h2 class="section-title">Payment</h2>
          <p>How would you like to pay?</p>
          <!-- Payment options here -->
          <form id="payment-form">
              <div class="payment-option">
                <label>
                  <input type="radio" name="payment-method" value="klarna" required/>
                  <span>Klarna</span>
                </label>
                <img src="${klarnaImage}" alt="Klarna"/>
              </div>

              <div class="payment-option">
                <label for="rewards-card">
                <input type="radio" id="rewards-card" name="payment-method" />
                <span class="option-title">Swish</span>
                </label>
                <img src="${swishImage}" alt="Klarna"/>
              </div>
    
              <div class="payment-option">
                <label for="credit-card">
                <input type="radio" id="credit-card" name="payment-method" />
                <span class="option-title">Credit or Debit Card</span> </label>
                <img src="${cardImage}" alt="Klarna"/>
               </div>
    
              <div class="payment-option">
                <label for="paypal">
                <input type="radio" id="paypal" name="payment-method" />
                <span class="option-title">PayPal</span>
                </label>
                <img src="${paypalImage}" alt="Klarna"/>
              </div>
    
              <button type="submit" class="btn">
                CONFIRM AND PAY
              </button>
            </form>
        </section>
      </div>
    
      <!-- Sidebar: In Your Bag -->
      <aside class="sidebar">
      <h3 class="bag-title">IN YOUR BAG</h3>
      <div class="summary">
        <p>Subtotal <span>$${subtotal.toFixed(2)}</span></p>
        <p>Estimated Shipping <span>$${shipping.toFixed(2)}</span></p>
        <p>Estimated Tax <span>$${tax.toFixed(2)}</span></p>
        <p class="total">Total <span class="total-amt">$${total.toFixed(
          2
        )}</span></p>
      </div>
      <div class="divider"></div>
      <div class="arrival-info">
        ${bagItemsHTML}
      </div>
    </aside>

      <div id="dialog-container" class="dialog-container">
  <div class="dialog-box">
    <p>Thank you for your order!</p>
  </div>
</div>
  `;

  app.innerHTML = "";
  app.appendChild(checkoutContainer);

  // Handling form submission
  document
    .getElementById("checkout-form")
    .addEventListener("submit", (event) => {
      event.preventDefault();
      const paymentSection = document.querySelector(".payment-container");

      paymentSection.scrollIntoView({ behavior: "smooth" }); // Scroll to the payment section
      paymentSection.classList.add("highlight");
      setTimeout(() => {
        paymentSection.classList.remove("highlight");
      }, 3000);
    });

  document
    .getElementById("payment-form")
    .addEventListener("submit", handleFormSubmit);
}
// Payment form submission handler

function handleFormSubmit(event) {
  event.preventDefault();
  document.body.style.opacity = "0.8";
  document.getElementById("dialog-container").style.display = "block";

  
  setTimeout(function () {
    document.body.style.opacity = "1";
    document.getElementById("dialog-container").style.display = "none";

    localStorage.removeItem("cartItems");  // Clear cart data after order confirmation
    const cartInstance = new Cart("cart-container", "cart-count");
    cartInstance.renderCart();

    document.getElementById("checkout-form").reset();
    document.getElementById("payment-form").reset();

    const paymentRadios = document.querySelectorAll('[name="payment-method"]');
    paymentRadios.forEach((radio) => {
      radio.checked = false;
    });

    productListingSection.style.display = "block";
    checkoutSection.style.display = "none";

    productListingSection.scrollIntoView({ behavior: "smooth" });
  }, 3000);
}

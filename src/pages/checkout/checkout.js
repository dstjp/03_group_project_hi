import "./checkout.css"; // Importing styles
import shoeImage from "./shoe.jpg";
import klarnaImage from "./klarna.jpg";
import swishImage from "./swish.jpg";
import cardImage from "./card.jpg";
import paypalImage from "./paypal.jpg";

export function renderCheckoutPage() {
  const mockCartData = [ 
    {
      name: "Nike Air Zoom Pegasus 38 Women's Running Shoe",
      style: "CW7358-601",
      size: 8,
      color: "Champagne/Barely Rose/Arctic Pink/White",
      qty: 1,
      price: 120.00,
      image: shoeImage,
      deliveryDate: "Thu, Jun 24"
    },
    {
      name: "Adidas Ultraboost 22 Men's Running Shoe",
      style: "AB1234-789",
      size: 10,
      color: "Core Black/Cloud White",
      qty: 1,
      price: 180.00,
      image: shoeImage, 
      deliveryDate: "Fri, Jun 25"
    }
    
  ];

  const app = document.getElementById("app"); 
  const checkoutContainer = document.createElement("div");
  checkoutContainer.className = "checkout-container";

  let bagItemsHTML = "";
  let subtotal = 0;

  mockCartData.forEach((item) => {
    subtotal += item.price * item.qty;
    bagItemsHTML += `
      <div class="product-details">
        <img src="${item.image}" alt="${item.name}" />
        <div class="product-info">
          <h4>${item.name}</h4>
          <p>Style #: ${item.style}</p>
          <p>Size: ${item.size}</p>
          <p>Color: ${item.color}</p>
          <p>Qty: ${item.qty} @ $${item.price.toFixed(2)}</p>
          <p><strong>$${(item.price * item.qty).toFixed(2)}</strong></p>
        </div>
      </div>
    `;
  });

  const shipping = 8.00; 
  const tax = 0.00; 
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
        <p class="total">Total <span class="total-amt">$${total.toFixed(2)}</span></p>
      </div>
      <div class="divider"></div>
      <div class="arrival-info">
        <p><strong>Arrives by ${mockCartData[0].deliveryDate}</strong></p>
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

  // Handle form submission
  document.getElementById("checkout-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const paymentSection = document.querySelector(".payment-container");
    
    // Scroll to the payment section
    paymentSection.scrollIntoView({ behavior: "smooth" });
  
    // Highlight the section
    paymentSection.classList.add("highlight");
  
    // Remove the highlight after 3 seconds
    setTimeout(() => {
      paymentSection.classList.remove("highlight");
    }, 3000);
  });
  
  document
    .getElementById("payment-form")
    .addEventListener("submit", handleFormSubmit);
}

function handleFormSubmit(event) {
  event.preventDefault(); 
  document.body.style.opacity = '0.8';
  document.getElementById('dialog-container').style.display = 'block';
  
  // hide the dialog after a few seconds:
  setTimeout(function() {
    document.body.style.opacity = '1';
    document.getElementById('dialog-container').style.display = 'none';
  

  // Reset forms to their initial state
  document.getElementById("checkout-form").reset();
  document.getElementById("payment-form").reset();
  
  const paymentRadios = document.querySelectorAll('[name="payment-method"]');
  paymentRadios.forEach((radio) => {
    radio.checked = false;
  });

  // Scroll back to the top of the form (optional for better user experience)
  document.getElementById("app").scrollIntoView({ behavior: "smooth" });
}, 3000);


//for my practice

//   const name = document.getElementById("name").value;
//  const email = document.getElementById("email").value;
//   const address = document.getElementById("address").value;
//   // const paymentMethod = document.getElementById("payment-method").value;

//   // Simulate order placement
//   console.log("Order Summary:");
//   console.log(`Name: ${name}`);
//   console.log(`Email: ${email}`);
//   console.log(`Address: ${address}`);
//   // console.log(`Payment Method: ${paymentMethod}`);

//   //alert("Order placed successfully!");
}


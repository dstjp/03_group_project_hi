import './global.css'
import './pages/product_listing/product_listing.css';
import './pages/product_listing/product_listing.js';
import './pages/filter/filter.js';
import './pages/shopping_cart/shopping_cart.js';
import { getCheckoutButton } from "./pages/shopping_cart/shopping_cart.js";
import { renderCheckoutPage } from "./pages/checkout/checkout.js";




    const observeCheckoutButton = () => {
      const checkoutbtn = getCheckoutButton();
      if (checkoutbtn) {
        console.log("Checkout button found:", checkoutbtn);
        checkoutbtn.addEventListener("click", () => {
            const cartData = JSON.parse(localStorage.getItem("cartItems")) || [];
            console.log("Cart Data:", cartData);
                renderCheckoutPage(cartData);
                localStorage.removeItem("cartItems");
       
        });
      } else {
        console.log("Checkout button not yet rendered. Waiting...");
        setTimeout(observeCheckoutButton, 100);
      }
    };
  
    document.addEventListener("DOMContentLoaded", observeCheckoutButton);

 


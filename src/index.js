import './global.css'
import './pages/product_listing/product_listing.css';
import './pages/product_listing/product_listing.js';
import './pages/filter/filter.js';

//checkout page code
import { renderCheckoutPage } from "./pages/checkout/checkout.js";

document.addEventListener("DOMContentLoaded", () => {
  // Simple router for hash-based navigation
  function navigateTo(hash) {
    switch (hash) {
      case "#checkout":
        renderCheckoutPage();
        break;
      // Add cases for other pages like product listing, cart, etc.
      
    }
  }

  // Load initial page based on hash
  window.addEventListener("hashchange", () => navigateTo(window.location.hash));
  navigateTo(window.location.hash || "#");
});


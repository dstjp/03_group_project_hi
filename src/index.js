import "./global.css"; // Global styles
import { renderCheckoutPage } from "./pages/checkout/checkout.js"; 

document.addEventListener("DOMContentLoaded", () => {
  // Simple router for hash-based navigation
  function navigateTo(hash) {
    switch (hash) {
      case "#checkout":
        renderCheckoutPage();
        break;
      // Add cases for other pages like product listing, cart, etc.
      
      default:
        document.getElementById("app").innerHTML = "<h2>Welcome to our E-Commerce Site</h2>";
    }
  }

  // Load initial page based on hash
  window.addEventListener("hashchange", () => navigateTo(window.location.hash));
  navigateTo(window.location.hash || "#");
});

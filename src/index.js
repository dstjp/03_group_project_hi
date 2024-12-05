import './global.css'
import './pages/product_listing/product_listing.css';
import './pages/product_listing/product_listing.js';
import { renderCheckoutPage } from "./pages/checkout/checkout.js";
import './pages/filter/filter.js';

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

/* MODAL CARD */

const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')

openModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = document.querySelector(button.dataset.modalTarget)
        openModal(modal)
    })
})

overlay.addEventListener('click', () => {
    const modals = document.querySelectorAll('.modal.active')
    modals.forEach(modal => {
        closeModal(modal)
    })
})

closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal')
        closeModal(modal)
    })
})

function openModal(modal) {
    if (modal == null) return 
    modal.classList.add('active')
    overlay.classList.add('active')
}
function closeModal(modal) {
    if (modal == null) return 
    modal.classList.remove('active')
    overlay.classList.remove('active')
};


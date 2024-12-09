import "./global.css";
import "./pages/product_listing/product_listing.css";
import "./pages/product_listing/product_listing.js";
import "./pages/filter/filter.js";
import "./pages/shopping_cart/shopping_cart.js";
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
      //localStorage.removeItem("cartItems");
    });
  } else {
    console.log("Checkout button not yet rendered. Waiting...");
    setTimeout(observeCheckoutButton, 100);
  }
};

document.addEventListener("DOMContentLoaded", observeCheckoutButton);


/* MODAL CARD */

const openModalButtons = document.querySelectorAll("[data-modal-target]");
const closeModalButtons = document.querySelectorAll("[data-close-button]");
const overlay = document.getElementById("overlay");

openModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = document.querySelector(button.dataset.modalTarget);
    openModal(modal);
  });
});

overlay.addEventListener("click", () => {
  const modals = document.querySelectorAll(".modal.active");
  modals.forEach((modal) => {
    closeModal(modal);
  });
});

closeModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = button.closest(".modal");
    closeModal(modal);
  });
});

function openModal(modal) {
  if (modal == null) return;
  modal.classList.add("active");
  overlay.classList.add("active");
}
function closeModal(modal) {
  if (modal == null) return;
  modal.classList.remove("active");
  overlay.classList.remove("active");
}

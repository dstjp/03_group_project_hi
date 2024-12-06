import './filter.css';
import '../product_listing/product_listing.js';

// productFilter.js

export function createFilterUI(products, containerElement, onFilterChange) {
  const filterContainer = document.createElement("div");
  filterContainer.className = "filter-container";

  // Define background colors for categories
  const categoryColors = {
    electronics: "#f4a261",
    jewelery: "#2a9d8f",
    "men's clothing": "#264653",
    "women's clothing": "#e76f51",
  };

  // Unique categories from products
  const categories = [...new Set(products.map(product => product.category))];

  // Create category buttons
  categories.forEach(category => {
    const button = document.createElement("button");
    button.className = "filter-button";
    button.textContent = capitalize(category);
    button.dataset.category = category;
    button.style.backgroundColor = categoryColors[category] || "#ccc";
    button.addEventListener("click", () => onFilterChange(category));
    filterContainer.appendChild(button);
  });

  containerElement.appendChild(filterContainer);
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
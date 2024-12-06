import './filter.css';
import '../product_listing/product_listing.js';

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function createFilterUI(products, containerElement, onFilterChange) {
  const filterContainer = document.createElement("div");
  filterContainer.className = "filter-container";

  // Add "All Products" button
  const allButton = document.createElement("button");
  allButton.className = "filter-button active";
  allButton.textContent = "All Products";
  allButton.dataset.category = "";
  filterContainer.appendChild(allButton);

  // Unique categories from products
  const categories = [...new Set(products.map(product => product.category))];

  // Create category buttons
  [allButton, ...categories.map(category => {
    const button = document.createElement("button");
    button.className = "filter-button";
    button.textContent = capitalize(category);
    button.dataset.category = category;
    return button;
  })].forEach(button => {
    // Handle button click
    button.addEventListener("click", () => {
      // Remove 'active' class from all buttons
      filterContainer.querySelectorAll(".filter-button").forEach(btn => {
        btn.classList.remove("active");
      });
      
      // Toggle 'active' class on the clicked button
      button.classList.add("active");
      
      onFilterChange(getFilterState()); // Trigger filter update
    });

    filterContainer.appendChild(button);
  });

  // Sort dropdown
  const sortSelect = document.createElement("select");
  sortSelect.id = "sort-select";
  sortSelect.innerHTML = `
    <option value="default">Default</option>
    <option value="price-asc">Price: Low to High</option>
    <option value="price-desc">Price: High to Low</option>
  `;
  sortSelect.addEventListener("change", () => onFilterChange(getFilterState()));
  filterContainer.appendChild(sortSelect);

  // Price range slider
  const maxPrice = Math.ceil(Math.max(...products.map(p => p.price)));
  const priceRange = document.createElement("input");
  priceRange.type = "range";
  priceRange.min = 0;
  priceRange.max = maxPrice;
  priceRange.value = maxPrice;
  priceRange.id = "price-range";

  const priceValue = document.createElement("span");
  priceValue.id = "price-value";
  priceValue.textContent = `$${maxPrice}`;
  priceRange.addEventListener("input", () => {
    priceValue.textContent = `$${priceRange.value}`;
    onFilterChange(getFilterState());
  });

  filterContainer.appendChild(priceRange);
  filterContainer.appendChild(priceValue);

  // Append the filter container to the DOM
  containerElement.appendChild(filterContainer);

  // Get the current filter state
  function getFilterState() {
    const selectedCategory = filterContainer.querySelector(".filter-button.active")?.dataset.category || "";

    const sortValue = sortSelect.value;
    const maxPrice = parseInt(priceRange.value, 10);

    return { selectedCategory, sortValue, maxPrice };
  }
}

export function applyFilters(products, filterState) {
  const { selectedCategory, sortValue, maxPrice } = filterState;

  // Filter products by category and price range
  let filteredProducts = products.filter(
    product =>
      (selectedCategory === "" || product.category === selectedCategory) &&
      product.price <= maxPrice
  );

  // Sort products based on the selected sorting option
  if (sortValue === "price-asc") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortValue === "price-desc") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  return filteredProducts;
}
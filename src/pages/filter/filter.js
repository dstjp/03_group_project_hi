import './filter.css';
import '../product_listing/product_listing.js';

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function createFilterUI(products, containerElement, onFilterChange) {
  const filterContainer = document.createElement("div");
  filterContainer.className = "filter-container";

  const categoryColors = {
    electronics: "#f4a261",
    jewelery: "#2a9d8f",
    "men's clothing": "#264653",
    "women's clothing": "#e76f51",
  };

  const allButton = document.createElement("button");
  allButton.className = "filter-button active";
  allButton.textContent = "All Products";
  allButton.dataset.category = "";
  filterContainer.appendChild(allButton);

  const categories = [...new Set(products.map(product => product.category))];


  [allButton, ...categories.map(category => {
    const button = document.createElement("button");
    button.className = "filter-button";
    button.textContent = capitalize(category);
    button.dataset.category = category;
    button.style.backgroundColor = categoryColors[category] || "#ccc"; 
    return button;
     })].forEach(button => {
  
    button.addEventListener("click", () => {
    filterContainer.querySelectorAll(".filter-button").forEach(btn => {
        btn.classList.remove("active");
      });
      
      button.classList.add("active");
      
      onFilterChange(getFilterState());
    });

    filterContainer.appendChild(button);
  });

  const sortSelect = document.createElement("select");
  sortSelect.id = "sort-select";
  sortSelect.innerHTML = `
    <option value="default">Default</option>
    <option value="price-asc">Price: Low to High</option>
    <option value="price-desc">Price: High to Low</option>
  `;
  sortSelect.addEventListener("change", () => onFilterChange(getFilterState()));
  filterContainer.appendChild(sortSelect);

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

  containerElement.appendChild(filterContainer);

  function getFilterState() {
    const selectedCategory = filterContainer.querySelector(".filter-button.active")?.dataset.category || "";

    const sortValue = sortSelect.value;
    const maxPrice = parseInt(priceRange.value, 10);

    return { selectedCategory, sortValue, maxPrice };
  }
}

export function applyFilters(products, filterState) {
  const { selectedCategory, sortValue, maxPrice } = filterState;

  let filteredProducts = products.filter(
    product =>
      (selectedCategory === "" || product.category === selectedCategory) &&
      product.price <= maxPrice
  );

  if (sortValue === "price-asc") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortValue === "price-desc") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  return filteredProducts;
import './filter.css';
import '../product_listing/product_listing.js';

// productFilter.js

export function createFilterUI(products, containerElement, onFilterChange) {
  const filterContainer = document.createElement("div");
  filterContainer.className = "filter-container";

    // Define background colors for categories
    const categoryColors = {
      electronics: "#F9F9F9",
      jewelery: "#F9F9F9",
      "men's clothing": "#F9F9F9",
      "women's clothing": "#F9F9F9;",
    };

  // Unique categories from products
  const categories = [...new Set(products.map(product => product.category))];

  // Create category buttons
  categories.forEach(category => {
    const button = document.createElement("button");
    button.className = "filter-button";
    button.textContent = capitalize(category);
    button.dataset.category = category;

     // Assign background color based on category
     button.style.backgroundColor = categoryColors[category] || "#ccc"; // Default color if category is missing

    // Handle button click
    button.addEventListener("click", () => {
      button.classList.toggle("active"); // Toggle active class
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
    const selectedCategories = Array.from(filterContainer.querySelectorAll(".filter-button.active"))
      .map(button => button.dataset.category);

    const sortValue = sortSelect.value;
    const maxPrice = parseInt(priceRange.value, 10);

    return { selectedCategories, sortValue, maxPrice };
  }

  // Capitalize category names
  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}

export function applyFilters(products, filterState) {
  const { selectedCategories, sortValue, maxPrice } = filterState;

  // Filter products by categories and price range
  let filteredProducts = products.filter(
    product =>
      (selectedCategories.length === 0 || selectedCategories.includes(product.category)) &&
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
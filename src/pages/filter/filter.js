import './filter.css';
import '../product_listing/product_listing.js';

export function createFilterUI(products, containerElement, onFilterChange) {
  const filterContainer = document.createElement("div");
  filterContainer.className = "filter-container";

  const categories = [...new Set(products.map(product => product.category))];

  categories.forEach(category => {
    const button = document.createElement("button");
    button.className = "filter-button";
    button.textContent = capitalize(category);
    button.dataset.category = category;

    button.addEventListener("click", () => {
      button.classList.toggle("active"); 
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

  // Price range slider (NOT SHOWN)
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
    const selectedCategories = Array.from(filterContainer.querySelectorAll(".filter-button.active"))
      .map(button => button.dataset.category);

    const sortValue = sortSelect.value;
    const maxPrice = parseInt(priceRange.value, 10);

    return { selectedCategories, sortValue, maxPrice };
  }

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}

export function applyFilters(products, filterState) {
  const { selectedCategories, sortValue, maxPrice } = filterState;

  
  let filteredProducts = products.filter(
    product =>
      (selectedCategories.length === 0 || selectedCategories.includes(product.category)) &&
      product.price <= maxPrice
  );

  if (sortValue === "price-asc") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortValue === "price-desc") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  return filteredProducts;
}
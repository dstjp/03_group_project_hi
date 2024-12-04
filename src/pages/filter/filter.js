import './filter.css';

let products = [];

let displayProduct = async () => {
  try {
    let response = await fetch('https://fakestoreapi.com/products');
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    products = await response.json();
    
    const productContainer = document.createElement('div');
    productContainer.className = 'product-container';
    
    const filterContainer = document.createElement('div');
    filterContainer.className = 'filter-container';
    
    // Get unique categories
    const categories = [...new Set(products.map(item => item.category))];
    
    // Create category filter buttons
    categories.forEach(category => {
      const filterButton = document.createElement('label');
      filterButton.className = 'filter-button';
      filterButton.innerHTML = `
        <input type="checkbox" value="${category}">
        ${category}
      `;
      filterContainer.appendChild(filterButton);
    });
    
    // Create sort select
    const sortSelect = document.createElement('select');
    sortSelect.id = 'sort-select';
    sortSelect.innerHTML = `
      <option value="default">Default</option>
      <option value="price-asc">Price: Low to High</option>
      <option value="price-desc">Price: High to Low</option>
    `;
    filterContainer.appendChild(sortSelect);
    
    // Create price range input
    const priceRange = document.createElement('input');
    priceRange.type = 'range';
    priceRange.id = 'price-range';
    priceRange.min = 0;
    priceRange.max = Math.ceil(Math.max(...products.map(p => p.price)));
    priceRange.value = priceRange.max;
    filterContainer.appendChild(priceRange);
    
    const priceValue = document.createElement('span');
    priceValue.id = 'price-value';
    priceValue.textContent = `$${priceRange.value}`;
    filterContainer.appendChild(priceValue);
    
    document.body.appendChild(filterContainer);
    document.body.appendChild(productContainer);
    
    const displayFilteredProducts = () => {
      const selectedCategories = Array.from(document.querySelectorAll('.filter-button input:checked'))
        .map(checkbox => checkbox.value);
      const sortValue = sortSelect.value;
      const maxPrice = parseInt(priceRange.value);
      
      let filteredProducts = products.filter(product => 
        (selectedCategories.length === 0 || selectedCategories.includes(product.category)) &&
        product.price <= maxPrice
      );
      
      if (sortValue === 'price-asc') {
        filteredProducts.sort((a, b) => a.price - b.price);
      } else if (sortValue === 'price-desc') {
        filteredProducts.sort((a, b) => b.price - a.price);
      }
      
      productContainer.innerHTML = '';
      filteredProducts.forEach(item => {
        const productElement = document.createElement('div');
        productElement.className = 'product';
        productElement.innerHTML = `
          <h2>${item.title}</h2>
          <img src="${item.image}" alt="${item.title}">
          <p class="price">Price: $${item.price.toFixed(2)}</p>
          <div class="description-container">
            <p class="description">${item.description}</p>
          </div>
        `;
        productContainer.appendChild(productElement);
      });
    };
    
    // Initial display of all products
    displayFilteredProducts();
    
    // Add event listeners
    filterContainer.addEventListener('change', displayFilteredProducts);
    sortSelect.addEventListener('change', displayFilteredProducts);
    priceRange.addEventListener('input', () => {
      priceValue.textContent = `$${priceRange.value}`;
      displayFilteredProducts();
    });
    
  } catch (error) {
    console.error('Error fetching product data: ', error);
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    errorMessage.textContent = 'Unable to fetch products. Please try again later.';
    document.body.appendChild(errorMessage);
  }
}

displayProduct();



/*
// productFilter.js

export function createFilterUI(products, containerElement, onFilterChange) {
    const filterContainer = document.createElement('div');
    filterContainer.className = 'filter-container';
  
    // Get unique categories
    const categories = [...new Set(products.map(item => item.category))];
  
    // Create category filter buttons
    categories.forEach(category => {
      const filterButton = document.createElement('label');
      filterButton.className = 'filter-button';
      filterButton.innerHTML = `
        <input type="checkbox" value="${category}">
        ${category}
      `;
      filterContainer.appendChild(filterButton);
    });
  
    // Create sort select
    const sortSelect = document.createElement('select');
    sortSelect.id = 'sort-select';
    sortSelect.innerHTML = `
      <option value="default">Default</option>
      <option value="price-asc">Price: Low to High</option>
      <option value="price-desc">Price: High to Low</option>
    `;
    filterContainer.appendChild(sortSelect);
  
    // Create price range input
    const priceRange = document.createElement('input');
    priceRange.type = 'range';
    priceRange.id = 'price-range';
    priceRange.min = 0;
    priceRange.max = Math.ceil(Math.max(...products.map(p => p.price)));
    priceRange.value = priceRange.max;
    filterContainer.appendChild(priceRange);
  
    const priceValue = document.createElement('span');
    priceValue.id = 'price-value';
    priceValue.textContent = `$${priceRange.value}`;
    filterContainer.appendChild(priceValue);
  
    containerElement.appendChild(filterContainer);
  
    // Add event listeners
    filterContainer.addEventListener('change', () => onFilterChange(getFilterState()));
    priceRange.addEventListener('input', () => {
      priceValue.textContent = `$${priceRange.value}`;
      onFilterChange(getFilterState());
    });
  
    function getFilterState() {
      const selectedCategories = Array.from(document.querySelectorAll('.filter-button input:checked'))
        .map(checkbox => checkbox.value);
      const sortValue = sortSelect.value;
      const maxPrice = parseInt(priceRange.value);
  
      return { selectedCategories, sortValue, maxPrice };
    }
  }
  
  export function applyFilters(products, filterState) {
    const { selectedCategories, sortValue, maxPrice } = filterState;
  
    let filteredProducts = products.filter(product => 
      (selectedCategories.length === 0 || selectedCategories.includes(product.category)) &&
      product.price <= maxPrice
    );
  
    if (sortValue === 'price-asc') {
      filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortValue === 'price-desc') {
      filteredProducts.sort((a, b) => b.price - a.price);
    }
  
    return filteredProducts;
  }
    */
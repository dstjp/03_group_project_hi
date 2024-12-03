const htmlContent = `
  <div>
    <h1>this is my commit</h1>
    <p>awdwd</p>
    <button id="dropdownButton">Cart</button>
    <div id="dropdownMenu" class="dropdown-content">
      <div id="cartItems"></div>
      <div id="cartTotal">Total: $0</div>
    </div>
    <div class="product">
      <div id="productInfo"></div>
      <button id="addToCartButton">Add to cart</button>
    </div>
  </div>
`;

// Insert the HTML content into the div with id "content"
document.getElementById('shopping-cart').innerHTML = htmlContent;

// Add event listener to the button to toggle the dropdown menu
document.getElementById('dropdownButton').addEventListener('click', function() {
  document.getElementById('dropdownMenu').classList.toggle('show');
});

// Fetch product data from the API and display it
fetch('https://fakestoreapi.com/products/1')
  .then(response => response.json())
  .then(data => {
    const productInfo = document.getElementById('productInfo');
    const productHtml = `
      <h2>${data.title}</h2>
      <img src="${data.image}" alt="${data.title}" style="width:100px;height:100px;">
      <p>${data.description}</p>
      <p>Price: $${data.price}</p>
    `;
    productInfo.innerHTML = productHtml;

    // Add event listener to the "Add to cart" button
    document.getElementById('addToCartButton').addEventListener('click', function() {
      const cartItems = document.getElementById('cartItems');
      const cartTotal = document.getElementById('cartTotal');
      let cartItem = cartItems.querySelector(`.cart-item[data-id="${data.id}"]`);
    
      if (cartItem) {
        updateQuantity(cartItem, 1);
      } else {
        addItemToCart(data);
      }
    
      updateCartTotal(data.price);
    });

    function updateQuantity(cartItem, amount) {
      const quantityElement = cartItem.querySelector('.quantity');
      let quantity = parseInt(quantityElement.textContent);
      quantityElement.textContent = quantity + amount;
    }
    
    function updateCartTotal(amount) {
      const cartTotal = document.getElementById('cartTotal');
      let total = parseFloat(cartTotal.textContent) || 0;
      total += amount;
      cartTotal.textContent = total.toFixed(2);
    }
    
    function addItemToCart(data) {
      const cartItems = document.getElementById('cartItems');
      const cartItemHtml = `
        <div class="cart-item" data-id="${data.id}">
          <p>${data.title} - $${data.price} x <span class="quantity">1</span></p>
          <button class="removeFromCartButton">-</button>
          <button class="increaseQuantityButton">+</button>
          <button class="removeAllButton">Remove All</button>
        </div>
      `;
      cartItems.insertAdjacentHTML('beforeend', cartItemHtml);
    
      const cartItem = cartItems.querySelector(`.cart-item[data-id="${data.id}"]`);
      cartItem.querySelector('.removeFromCartButton').addEventListener('click', function() {
        const quantityElement = cartItem.querySelector('.quantity');
        let quantity = parseInt(quantityElement.textContent);
    
        if (quantity > 1) {
          updateQuantity(cartItem, -1);
        } else {
          cartItem.remove();
        }
    
        updateCartTotal(-data.price);
      });
    
      cartItem.querySelector('.increaseQuantityButton').addEventListener('click', function() {
        updateQuantity(cartItem, 1);
        updateCartTotal(data.price);
      });
    
      cartItem.querySelector('.removeAllButton').addEventListener('click', function() {
        const quantityElement = cartItem.querySelector('.quantity');
        const quantity = parseInt(quantityElement.textContent);
        const itemTotalPrice = data.price * quantity;
    
        cartItem.remove();
        updateCartTotal(-itemTotalPrice);
      });
    }
  })
  .catch(error => console.error('Error fetching product:', error));
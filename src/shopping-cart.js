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
document.getElementById('content').innerHTML = htmlContent;

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
      const cartItemHtml = `
        <div class="cart-item">
          <p>${data.title} - $${data.price}</p>
          <button class="removeFromCartButton">Remove</button>
        </div>
      `;
      const cartItemElement = document.createElement('div');
      cartItemElement.innerHTML = cartItemHtml;
      cartItems.appendChild(cartItemElement);

      // Update the total amount
      const currentTotal = parseFloat(cartTotal.textContent.replace('Total: $', ''));
      const newTotal = currentTotal + data.price;
      cartTotal.textContent = `Total: $${newTotal.toFixed(2)}`;

      // Add event listener to the "Remove" button
      cartItemElement.querySelector('.removeFromCartButton').addEventListener('click', function() {
        cartItems.removeChild(cartItemElement);

        // Update the total amount
        const updatedTotal = parseFloat(cartTotal.textContent.replace('Total: $', '')) - data.price;
        cartTotal.textContent = `Total: $${updatedTotal.toFixed(2)}`;
      });
    });
  })
  .catch(error => console.error('Error fetching product:', error));
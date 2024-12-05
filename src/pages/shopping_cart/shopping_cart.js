const button = `
   <div>
   <button class="shopping-cart-img" id="dropdownButton"> <svg 
                width="24" 
                height="29" 
                viewBox="0 0 22 21" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg">
                <path 
                d="M1.39999 -0.00726318C0.847709 -0.00726318 0.399994 0.440452 0.399994 0.992737C0.399994 1.54502 0.847709 1.99274 1.39999 1.99274V-0.00726318ZM3.69253 0.992737L4.65776 0.731321C4.5397 0.295419 4.14414 -0.00726318 3.69253 -0.00726318V0.992737ZM7.4179 14.748L6.45268 15.0094C6.58295 15.4904 7.04747 15.8021 7.54194 15.7402L7.4179 14.748ZM18.8806 13.3151L19.0046 14.3074C19.4293 14.2543 19.7731 13.9369 19.8598 13.5177L18.8806 13.3151ZM20.6 5.00468L21.5793 5.20728C21.6402 4.91277 21.5653 4.60647 21.3754 4.37325C21.1855 4.14004 20.9007 4.00468 20.6 4.00468V5.00468ZM4.7791 5.00468L3.81387 5.26609L4.7791 5.00468ZM1.39999 1.99274H3.69253V-0.00726318H1.39999V1.99274ZM7.54194 15.7402L19.0046 14.3074L18.7566 12.3228L7.29387 13.7557L7.54194 15.7402ZM19.8598 13.5177L21.5793 5.20728L19.6207 4.80207L17.9013 13.1125L19.8598 13.5177ZM2.7273 1.25415L3.81387 5.26609L5.74432 4.74326L4.65776 0.731321L2.7273 1.25415ZM3.81387 5.26609L6.45268 15.0094L8.38313 14.4865L5.74432 4.74326L3.81387 5.26609ZM20.6 4.00468H4.7791V6.00468H20.6V4.00468ZM9.99999 18.5C9.99999 18.7762 9.77614 19 9.49999 19V21C10.8807 21 12 19.8807 12 18.5H9.99999ZM9.49999 19C9.22385 19 8.99999 18.7762 8.99999 18.5H6.99999C6.99999 19.8807 8.11928 21 9.49999 21V19ZM8.99999 18.5C8.99999 18.2239 9.22385 18 9.49999 18V16C8.11928 16 6.99999 17.1193 6.99999 18.5H8.99999ZM9.49999 18C9.77614 18 9.99999 18.2239 9.99999 18.5H12C12 17.1193 10.8807 16 9.49999 16V18ZM18 18.5C18 18.7762 17.7761 19 17.5 19V21C18.8807 21 20 19.8807 20 18.5H18ZM17.5 19C17.2239 19 17 18.7762 17 18.5H15C15 19.8807 16.1193 21 17.5 21V19ZM17 18.5C17 18.2239 17.2239 18 17.5 18V16C16.1193 16 15 17.1193 15 18.5H17ZM17.5 18C17.7761 18 18 18.2239 18 18.5H20C20 17.1193 18.8807 16 17.5 16V18Z" 
                fill="black"/>
                </svg></button>
                <div id="dropdownMenu" class="dropdown-content">
      <div id="cartItems"></div>
      <div id="cartTotal">Total: $0</div>
            </div>
            </div>
    `;
    
    const product = `
    <div class="product">
      <div id="productInfo"></div>
      <button id="addToCartButton">Add to cart</button>
    </div>
  </div>
`;

// Insert the HTML content into the div with id "shopping-cart"
document.getElementById('shopping-cart').innerHTML = button;
document.getElementById('product').innerHTML = product;

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
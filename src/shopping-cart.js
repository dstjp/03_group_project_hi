
const htmlContent = `
  <div>
    <h1>this is my commit</h1>
    <p>awdwd</p>
    <button id="dropdownButton">Cart</button>
    <div id="dropdownMenu" class="dropdown-content">
     <div id="cartItems"></div>
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

  fetch('https://fakestoreapi.com/products/1')
  .then(res=>res.json())
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
        const cartItemHtml = `
          <div class="cart-item">
            <p>${data.title} - $${data.price}</p>
          </div>
        `;
        cartItems.innerHTML += cartItemHtml;
      });
  })
  .catch(error => console.error('Error fetching product:', error));
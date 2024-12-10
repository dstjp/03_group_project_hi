import Cart from './shopping_cart';

describe('Cart', () => {
  let cart;
  let cartContainer;
  let cartCount;

  beforeEach(() => {
    document.body.innerHTML = `
      <div id="cart-container"></div>
      <span id="cart-count"></span>
      <a id="cart-link" href="#">Cart</a>
    `;

    cartContainer = document.getElementById('cart-container');
    cartCount = document.getElementById('cart-count');

    cart = new Cart('cart-container', 'cart-count');
  });

  test('should add a product to the cart', () => {
    const product = { id: 1, title: 'Product 1', price: 10.0, image: 'image1.jpg' };
    cart.addToCart(product);

    expect(cart.cartItems.length).toBe(1);
    expect(cart.cartItems[0].quantity).toBe(1);
    expect(cartCount.textContent).toBe('1');
  });

   test('should remove a product from the cart', () => {
    const product = { id: 1, title: 'Product 1', price: 10.0, image: 'image1.jpg' };
    cart.addToCart(product);
    cart.removeFromCart(product.id);

    expect(cart.cartItems.length).toBe(0);
    expect(cartCount.textContent).toBe('0');
  });

  test('should update the quantity of a product', () => {
    const product = { id: 1, title: 'Product 1', price: 10.0, image: 'image1.jpg' };
    cart.addToCart(product);
    cart.updateQuantity(product.id, true); 

    expect(cart.cartItems[0].quantity).toBe(2);
    expect(cartCount.textContent).toBe('2');

    cart.updateQuantity(product.id, false); 

    expect(cart.cartItems[0].quantity).toBe(1);
    expect(cartCount.textContent).toBe('1');
  });
});
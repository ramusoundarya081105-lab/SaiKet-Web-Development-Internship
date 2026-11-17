const productPrice = 1999;

let cartItems = 0;
let totalPrice = 0;

const addToCartButton = document.getElementById("add-to-cart");

const quantityInput = document.getElementById("quantity");

const cartCount = document.getElementById("cart-count");

const totalItems = document.getElementById("total-items");

const totalPriceElement = document.getElementById("total-price");

const cartMessage = document.getElementById("cart-message");

// Add to Cart Function
addToCartButton.addEventListener("click", function () {
  const quantity = Number(quantityInput.value);

  // Validate Quantity
  if (!Number.isInteger(quantity) || quantity < 1 || quantity > 10) {
    alert("Please select a quantity between 1 and 10");
    return;
  }

  // Update Cart
  cartItems += quantity;
  totalPrice += productPrice * quantity;

  // Display Updated Values
  cartCount.textContent = cartItems;
  totalItems.textContent = cartItems;

  totalPriceElement.textContent = totalPrice.toLocaleString("en-IN");

  // Success Message
  cartMessage.textContent = quantity + " item(s) added to cart successfully!";

  // Reset Quantity
  quantityInput.value = 1;
});

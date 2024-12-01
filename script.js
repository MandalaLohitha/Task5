let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Add to cart
document.querySelectorAll(".add-to-cart").forEach(button => {
  button.addEventListener("click", () => {
    const name = button.getAttribute("data-name");
    const price = parseFloat(button.getAttribute("data-price"));

    // Check if item already exists in the cart
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
      existingItem.quantity += 1; // Increment quantity
    } else {
      cart.push({ name, price, quantity: 1 }); // Add new item
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${name} added to cart.`);
  });
});

// View cart button
document.getElementById("view-cart").addEventListener("click", () => {
  window.location.href = "cart.html";
});

// Cart page logic
if (window.location.pathname.endsWith("cart.html")) {
  const cartItemsContainer = document.getElementById("cart-items");
  const totalAmountElement = document.getElementById("total-amount");

  // Clear and display cart
  const displayCart = () => {
    cartItemsContainer.innerHTML = ""; // Clear current items
    let total = 0;

    if (cart.length === 0) {
      cartItemsContainer.textContent = "Your cart is empty.";
      totalAmountElement.textContent = "Total: $0";
      return;
    }

    cart.forEach((item, index) => {
      const itemDiv = document.createElement("div");
      itemDiv.classList.add("cart-item");

      itemDiv.innerHTML = `
        ${item.name} - $${item.price} x ${item.quantity} 
        <button class="decrement" data-index="${index}">-</button>
        <button class="increment" data-index="${index}">+</button>
        <button class="remove" data-index="${index}">Remove</button>
      `;
      cartItemsContainer.appendChild(itemDiv);
      total += item.price * item.quantity;
    });

    totalAmountElement.textContent = `Total: $${total.toFixed(2)}`;
  };

  // Handle quantity changes and remove actions
  cartItemsContainer.addEventListener("click", (event) => {
    const index = event.target.getAttribute("data-index");
    if (event.target.classList.contains("increment")) {
      cart[index].quantity += 1;
    } else if (event.target.classList.contains("decrement")) {
      if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
      } else {
        cart.splice(index, 1); // Remove item if quantity becomes zero
      }
    } else if (event.target.classList.contains("remove")) {
      cart.splice(index, 1); // Remove item
    }
    localStorage.setItem("cart", JSON.stringify(cart)); // Update localStorage
    displayCart(); // Re-render cart
  });

  displayCart(); // Initial render of the cart
}

// Lazy loading
document.addEventListener("DOMContentLoaded", () => {
  const lazyImages = document.querySelectorAll(".lazy");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.getAttribute("data-src");
        img.classList.remove("lazy");
        observer.unobserve(img);
      }
    });
  });

  lazyImages.forEach(img => observer.observe(img));
});

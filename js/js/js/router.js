import { products, getProductById } from './products.js';
import { getCart, addToCart, removeFromCart, updateQty, updateCartBadge } from './cart.js';

const appEl = document.getElementById('app');

function renderHome() {
  appEl.innerHTML = `
    <h2>Product Catalog</h2>
    <div class="product-grid">
      ${products.map(p => `
        <div class="product-card">
          <div class="product-emoji">${p.emoji}</div>
          <h3>${p.name}</h3>
          <p class="product-price">₹${p.price}</p>
          <div class="product-actions">
            <a href="#/product/${p.id}" class="btn-view">View</a>
            <button class="btn-add" data-id="${p.id}">Add to Cart</button>
          </div>
        </div>
      `).join('')}
    </div>
  `;
  appEl.querySelectorAll('.btn-add').forEach(btn => {
    btn.addEventListener('click', () => {
      addToCart(Number(btn.dataset.id));
      btn.textContent = 'Added ✓';
      setTimeout(() => { btn.textContent = 'Add to Cart'; }, 1000);
    });
  });
}

function renderProduct(id) {
  const product = getProductById(id);
  if (!product) {
    appEl.innerHTML = `<p>Product not found. <a href="#/">Back to catalog</a></p>`;
    return;
  }
  appEl.innerHTML = `
    <a href="#/" class="back-link">&larr; Back to catalog</a>
    <div class="product-detail">
      <div class="product-emoji large">${product.emoji}</div>
      <h2>${product.name}</h2>
      <p class="product-category">${product.category}</p>
      <p>${product.description}</p>
      <p class="product-price large">₹${product.price}</p>
      <button id="detail-add-btn">Add to Cart</button>
    </div>
  `;
  document.getElementById('detail-add-btn').addEventListener('click', () => {
    addToCart(product.id);
    document.getElementById('detail-add-btn').textContent = 'Added ✓';
  });
}

function renderCart() {
  const cart = getCart();
  if (cart.length === 0) {
    appEl.innerHTML = `<h2>Your Cart</h2><p>Your cart is empty. <a href="#/">Start shopping</a></p>`;
    return;
  }
  let total = 0;
  const rows = cart.map(item => {
    const product = getProductById(item.id);
    if (!product) return '';
    const subtotal = product.price * item.qty;
    total += subtotal;
    return `
      <div class="cart-row" data-id="${product.id}">
        <span class="cart-emoji">${product.emoji}</span>
        <span class="cart-name">${product.name}</span>
        <input type="number" min="1" value="${item.qty}" class="qty-input" data-id="${product.id}">
        <span class="cart-subtotal">₹${subtotal}</span>
        <button class="btn-remove" data-id="${product.id}">🗑️</button>
      </div>
    `;
  }).join('');

  appEl.innerHTML = `
    <h2>Your Cart</h2>
    <div class="cart-list">${rows}</div>
    <div class="cart-total">Total: ₹${total}</div>
    <a href="#/" class="back-link">&larr; Continue shopping</a>
  `;

  appEl.querySelectorAll('.qty-input').forEach(input => {
    input.addEventListener('change', () => {
      updateQty(Number(input.dataset.id), Number(input.value));
      renderCart();
    });
  });

  appEl.querySelectorAll('.btn-remove').forEach(btn => {
    btn.addEventListener('click', () => {
      removeFromCart(Number(btn.dataset.id));
      renderCart();
    });
  });
}

export function router() {
  const hash = window.location.hash.slice(1) || '/';
  updateCartBadge();

  if (hash === '/' || hash === '') {
    renderHome();
  } else if (hash.startsWith('/product/')) {
    const id = hash.split('/product/')[1];
    renderProduct(id);
  } else if (hash === '/cart') {
    renderCart();
  } else {
    appEl.innerHTML = `<p>Page not found. <a href="#/">Go home</a></p>`;
  }
}

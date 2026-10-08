lucide.createIcons();

// ---- Carrito (se guarda en localStorage para que persista entre páginas) ----
let cart = JSON.parse(localStorage.getItem('apex-cart') || '[]');

// Inyecta el carrito y el toast en cualquier página
document.body.insertAdjacentHTML('beforeend', `
  <div class="overlay" id="overlay"></div>
  <div class="cart-drawer" id="cart-drawer">
    <div class="cart-header">
      <h3>Tu Carrito</h3>
      <button class="close-cart" id="close-cart"><i data-lucide="x"></i></button>
    </div>
    <div class="cart-items" id="cart-items-container"></div>
    <div class="cart-footer">
      <div class="cart-total"><span>Total:</span><span id="cart-total-price">$0 USD</span></div>
      <button class="btn-primary" style="width:100%;justify-content:center" id="checkout-btn">Finalizar Compra</button>
    </div>
  </div>
  <div class="toast" id="toast">
    <i data-lucide="check-circle" style="color:var(--accent-red)"></i>
    <span id="toast-message"></span>
  </div>`);

document.getElementById('cart-btn').addEventListener('click', toggleCart);
document.getElementById('close-cart').addEventListener('click', toggleCart);
document.getElementById('overlay').addEventListener('click', toggleCart);
document.getElementById('checkout-btn').addEventListener('click', checkout);

function toggleCart() {
  document.getElementById('cart-drawer').classList.toggle('open');
  document.getElementById('overlay').classList.toggle('active');
}

function saveCart() {
  localStorage.setItem('apex-cart', JSON.stringify(cart));
  updateCartUI();
}

function addToCart(title, price, img) {
  const item = cart.find(i => i.title === title);
  if (item) item.quantity += 1;
  else cart.push({ title, price, img, quantity: 1 });
  saveCart();
  showToast(`"${title}" añadido al carrito`);
}

function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
}

function updateCartUI() {
  const container = document.getElementById('cart-items-container');
  document.getElementById('cart-count').textContent = cart.reduce((s, i) => s + i.quantity, 0);
  container.innerHTML = '';

  if (cart.length === 0) {
    container.innerHTML = '<p style="color:var(--text-muted);text-align:center;margin-top:2rem">El carrito está vacío.</p>';
    document.getElementById('cart-total-price').textContent = '$0 USD';
    return;
  }

  let total = 0;
  cart.forEach((item, index) => {
    total += item.price * item.quantity;
    const el = document.createElement('div');
    el.className = 'cart-item';
    el.innerHTML = `
      <img src="${item.img}" alt="${item.title}">
      <div class="cart-item-details">
        <div class="cart-item-title">${item.title}</div>
        <div class="cart-item-price">$${item.price} x ${item.quantity}</div>
      </div>
      <button class="remove-item" onclick="removeFromCart(${index})"><i data-lucide="trash-2"></i></button>`;
    container.appendChild(el);
  });
  document.getElementById('cart-total-price').textContent = `$${total.toLocaleString()} USD`;
  lucide.createIcons();
}

function checkout() {
  if (cart.length === 0) return alert('El carrito está vacío.');
  alert('¡Gracias por tu pedido en Apex Tech! Procesando tu compra...');
  cart = [];
  saveCart();
  toggleCart();
}

function showToast(message) {
  const toast = document.getElementById('toast');
  document.getElementById('toast-message').textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

function handleFormSubmit(e) {
  e.preventDefault();
  showToast('Mensaje enviado. Nos pondremos en contacto pronto.');
  e.target.reset();
}

updateCartUI();

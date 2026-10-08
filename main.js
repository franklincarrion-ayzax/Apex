// Íconos
lucide.createIcons();

// Carrito
let carrito = Number(localStorage.getItem('carrito')) || 0;
const contador = document.getElementById('cart-count');
contador.textContent = carrito;

document.querySelectorAll('.add-cart').forEach(btn => {
  btn.addEventListener('click', () => {
    carrito++;
    localStorage.setItem('carrito', carrito);
    contador.textContent = carrito;
  });
});

document.getElementById('cart-btn').addEventListener('click', () => {
  alert('Tienes ' + carrito + ' producto(s) en el carrito');
});

// Formulario de contacto
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    document.getElementById('form-msg').textContent = '¡Gracias! Te responderemos pronto.';
    form.reset();
  });
}

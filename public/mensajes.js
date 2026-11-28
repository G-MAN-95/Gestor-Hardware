// Muestra mensajes de éxito o error encima del formulario
const cajaMensajes = document.getElementById('mensajes');

function mostrarExito(texto) {
  cajaMensajes.innerHTML = '';
  const div = document.createElement('div');
  div.className = 'mensaje exito';
  div.textContent = texto;
  cajaMensajes.appendChild(div);
  setTimeout(() => div.remove(), 3000);
}

function mostrarError(respuesta) {
  cajaMensajes.innerHTML = '';
  const div = document.createElement('div');
  div.className = 'mensaje error';
  div.textContent = (respuesta && respuesta.error) || 'Ocurrió un error';

  // Si la API mandó la lista de errores de validación, la mostramos
  if (respuesta && Array.isArray(respuesta.detalles)) {
    const lista = document.createElement('ul');
    for (const detalle of respuesta.detalles) {
      const li = document.createElement('li');
      li.textContent = detalle;
      lista.appendChild(li);
    }
    div.appendChild(lista);
  }
  cajaMensajes.appendChild(div);
}

function limpiarMensajes() {
  cajaMensajes.innerHTML = '';
}

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
  cajaMensajes.appendChild(div);
}

function limpiarMensajes() {
  cajaMensajes.innerHTML = '';
}

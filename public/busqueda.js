// Buscador: filtra la tabla mientras el usuario escribe
const buscador = document.getElementById('buscador');
let temporizador;

buscador.addEventListener('input', () => {
  clearTimeout(temporizador);
  // Espera 300 ms después de la última tecla para no llamar a la API en cada letra
  temporizador = setTimeout(() => cargarEquipos(buscador.value.trim()), 300);
});

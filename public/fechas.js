// Convierte una fecha a texto para mostrarla en la tabla
function formatearFecha(valor) {
  if (!valor) return '';
  return new Date(valor).toLocaleDateString();
}

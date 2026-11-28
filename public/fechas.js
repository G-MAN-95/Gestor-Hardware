// Convierte una fecha "aaaa-mm-dd" a "dd/mm/aaaa" para mostrarla en la tabla.
// Corrección: antes se usaba new Date(valor), que interpreta la fecha en UTC
// y en zonas horarias como UTC-4 mostraba un día menos (ej.: 15/03 salía 14/03).
function formatearFecha(valor) {
  if (!valor) return '';
  const partes = String(valor).slice(0, 10).split('-');
  if (partes.length !== 3) return valor;
  const [anio, mes, dia] = partes;
  return `${dia}/${mes}/${anio}`;
}

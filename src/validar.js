// Middleware que revisa los datos de un equipo antes de guardarlos
const CATEGORIAS = ['Computadora', 'Laptop', 'Monitor', 'Impresora', 'Redes', 'Almacenamiento', 'Periférico', 'Otro'];
const ESTADOS = ['Operativo', 'En reparación', 'Dado de baja'];
const FORMATO_SERIE = /^[A-Za-z0-9-]{4,30}$/;   // letras, números y guiones (ej.: SN-ABC12345)

function validarEquipo(req, res, next) {
  const b = req.body || {};
  const errores = [];
  const texto = (v) => (v === undefined || v === null ? '' : String(v).trim());

  if (texto(b.nombre).length < 3) errores.push('El nombre del equipo debe tener al menos 3 caracteres.');
  if (texto(b.marca).length < 2) errores.push('La marca es obligatoria.');
  if (texto(b.modelo).length < 1) errores.push('El modelo es obligatorio.');
  if (!FORMATO_SERIE.test(texto(b.numeroSerie))) {
    errores.push('El número de serie debe tener de 4 a 30 caracteres: solo letras, números y guiones.');
  }
  if (!CATEGORIAS.includes(texto(b.categoria))) errores.push('Selecciona una categoría válida.');
  if (!ESTADOS.includes(texto(b.estado))) errores.push('Selecciona un estado válido.');

  const fecha = texto(b.fechaCompra);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha) || isNaN(Date.parse(fecha))) {
    errores.push('La fecha de compra no es válida.');
  } else if (new Date(fecha) > new Date()) {
    errores.push('La fecha de compra no puede ser futura.');
  }

  if (errores.length) {
    return res.status(400).json({ error: 'Datos inválidos', detalles: errores });
  }
  next();
}

module.exports = validarEquipo;

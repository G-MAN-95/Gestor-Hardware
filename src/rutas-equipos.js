// Rutas de la API REST de equipos de hardware (CRUD)
const express = require('express');
const store = require('./store');

const router = express.Router();
const CAMPOS = ['nombre', 'marca', 'modelo', 'numeroSerie', 'categoria', 'estado', 'fechaCompra'];

// Copia solo los campos permitidos del cuerpo de la petición
function tomarCampos(body) {
  const datos = {};
  for (const campo of CAMPOS) {
    if (body[campo] !== undefined) datos[campo] = String(body[campo]).trim();
  }
  return datos;
}

// READ: listar todos
router.get('/', (req, res) => {
  res.json(store.listar());
});

// READ: obtener uno por id
router.get('/:id', (req, res) => {
  const equipo = store.obtener(Number(req.params.id));
  if (!equipo) return res.status(404).json({ error: 'Equipo no encontrado' });
  res.json(equipo);
});

// CREATE: registrar un equipo nuevo
router.post('/', (req, res) => {
  const nuevo = store.crear(tomarCampos(req.body));
  res.status(201).json(nuevo);
});

// UPDATE: actualizar un equipo existente
router.put('/:id', (req, res) => {
  const actualizado = store.actualizar(Number(req.params.id), tomarCampos(req.body));
  if (!actualizado) return res.status(404).json({ error: 'Equipo no encontrado' });
  res.json(actualizado);
});

// DELETE: eliminar un equipo
router.delete('/:id', (req, res) => {
  const borrado = store.eliminar(Number(req.params.id));
  if (!borrado) return res.status(404).json({ error: 'Equipo no encontrado' });
  res.status(204).end();
});

module.exports = router;

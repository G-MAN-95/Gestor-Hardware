// Rutas de la API REST de equipos de hardware (CRUD)
const express = require('express');
const store = require('./store');
const validarEquipo = require('./validar');

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

// Revisa que ningún otro equipo tenga el mismo número de serie
function serieRepetida(numeroSerie, idActual) {
  const serie = numeroSerie.toUpperCase();
  return store.listar().some((e) => String(e.numeroSerie).toUpperCase() === serie && e.id !== idActual);
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
router.post('/', validarEquipo, (req, res) => {
  const datos = tomarCampos(req.body);
  if (serieRepetida(datos.numeroSerie)) {
    return res.status(409).json({ error: 'Ya existe un equipo con ese número de serie' });
  }
  const nuevo = store.crear(datos);
  res.status(201).json(nuevo);
});

// UPDATE: actualizar un equipo existente
router.put('/:id', validarEquipo, (req, res) => {
  const id = Number(req.params.id);
  const datos = tomarCampos(req.body);
  if (serieRepetida(datos.numeroSerie, id)) {
    return res.status(409).json({ error: 'Ya existe un equipo con ese número de serie' });
  }
  const actualizado = store.actualizar(id, datos);
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

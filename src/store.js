// Guarda y lee los equipos en un archivo JSON (data/equipos.json)
const fs = require('fs');
const path = require('path');

const CARPETA = path.join(__dirname, '..', 'data');
const ARCHIVO = path.join(CARPETA, 'equipos.json');

function leer() {
  if (!fs.existsSync(ARCHIVO)) return [];
  return JSON.parse(fs.readFileSync(ARCHIVO, 'utf8'));
}

function guardar(lista) {
  fs.mkdirSync(CARPETA, { recursive: true });
  fs.writeFileSync(ARCHIVO, JSON.stringify(lista, null, 2));
}

function listar() {
  return leer();
}

function obtener(id) {
  return leer().find((e) => e.id === id);
}

function crear(datos) {
  const lista = leer();
  const id = lista.length ? Math.max(...lista.map((e) => e.id)) + 1 : 1;
  const nuevo = { id, ...datos, creadoEn: new Date().toISOString() };
  lista.push(nuevo);
  guardar(lista);
  return nuevo;
}

function actualizar(id, datos) {
  const lista = leer();
  const i = lista.findIndex((e) => e.id === id);
  if (i === -1) return null;
  lista[i] = { ...lista[i], ...datos, id };
  guardar(lista);
  return lista[i];
}

function eliminar(id) {
  const lista = leer();
  const filtrada = lista.filter((e) => e.id !== id);
  if (filtrada.length === lista.length) return false;
  guardar(filtrada);
  return true;
}

module.exports = { listar, obtener, crear, actualizar, eliminar };

// Lógica de la página: conecta el formulario y la tabla con la API
const API = '/api/equipos';
const CAMPOS = ['nombre', 'marca', 'modelo', 'numeroSerie', 'categoria', 'estado', 'fechaCompra'];

const formulario = document.getElementById('formulario');
const tabla = document.getElementById('tabla');
const vacio = document.getElementById('vacio');
const tituloForm = document.getElementById('titulo-form');
const btnCancelar = document.getElementById('btn-cancelar');
const campoId = document.getElementById('id');

// READ: pide la lista a la API y la dibuja en la tabla
async function cargarEquipos(busqueda = '') {
  const url = busqueda ? `${API}?q=${encodeURIComponent(busqueda)}` : API;
  const respuesta = await fetch(url);
  const equipos = await respuesta.json();
  dibujarTabla(equipos);
}

function celda(texto, clase) {
  const td = document.createElement('td');
  td.textContent = texto;
  if (clase) td.className = clase;
  return td;
}

function boton(texto, clase, accion) {
  const b = document.createElement('button');
  b.type = 'button';
  b.textContent = texto;
  if (clase) b.className = clase;
  b.addEventListener('click', accion);
  return b;
}

// Clase CSS según el estado, para pintarlo de un color distinto
function claseEstado(estado) {
  if (estado === 'Operativo') return 'estado ok';
  if (estado === 'En reparación') return 'estado reparacion';
  return 'estado baja';
}

function dibujarTabla(equipos) {
  tabla.innerHTML = '';
  vacio.hidden = equipos.length > 0;
  for (const e of equipos) {
    const tr = document.createElement('tr');
    tr.appendChild(celda(e.numeroSerie));
    tr.appendChild(celda(e.nombre));
    tr.appendChild(celda(`${e.marca} ${e.modelo}`));
    tr.appendChild(celda(e.categoria));
    const tdEstado = document.createElement('td');
    const etiqueta = document.createElement('span');
    etiqueta.className = claseEstado(e.estado);
    etiqueta.textContent = e.estado;
    tdEstado.appendChild(etiqueta);
    tr.appendChild(tdEstado);
    tr.appendChild(celda(formatearFecha(e.fechaCompra)));
    const acciones = document.createElement('td');
    acciones.className = 'acciones';
    acciones.appendChild(boton('Editar', 'secundario', () => editar(e)));
    acciones.appendChild(boton('Eliminar', 'peligro', () => eliminar(e)));
    tr.appendChild(acciones);
    tabla.appendChild(tr);
  }
}

// Pasa los datos de un equipo al formulario para editarlo
function editar(equipo) {
  campoId.value = equipo.id;
  for (const campo of CAMPOS) {
    document.getElementById(campo).value = equipo[campo] || '';
  }
  tituloForm.textContent = 'Editar equipo';
  btnCancelar.hidden = false;
  limpiarMensajes();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function limpiarFormulario() {
  formulario.reset();
  campoId.value = '';
  tituloForm.textContent = 'Registrar equipo';
  btnCancelar.hidden = true;
}

// DELETE
async function eliminar(equipo) {
  if (!confirm(`¿Eliminar el equipo "${equipo.nombre}" (${equipo.numeroSerie})?`)) return;
  const respuesta = await fetch(`${API}/${equipo.id}`, { method: 'DELETE' });
  if (respuesta.ok) {
    mostrarExito('Equipo eliminado');
    cargarEquipos();
  } else {
    mostrarError(await respuesta.json());
  }
}

// CREATE y UPDATE: el mismo formulario sirve para los dos
formulario.addEventListener('submit', async (evento) => {
  evento.preventDefault();
  const datos = {};
  for (const campo of CAMPOS) datos[campo] = document.getElementById(campo).value;

  const id = campoId.value;
  const respuesta = await fetch(id ? `${API}/${id}` : API, {
    method: id ? 'PUT' : 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos),
  });

  if (respuesta.ok) {
    mostrarExito(id ? 'Equipo actualizado' : 'Equipo registrado');
    limpiarFormulario();
    cargarEquipos();
  } else {
    mostrarError(await respuesta.json());
  }
});

btnCancelar.addEventListener('click', () => {
  limpiarFormulario();
  limpiarMensajes();
});

cargarEquipos();

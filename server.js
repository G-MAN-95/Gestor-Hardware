const express = require('express');
const rutasEquipos = require('./src/rutas-equipos');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Ruta para comprobar que el servidor está funcionando
app.get('/api/salud', (req, res) => {
  res.json({ estado: 'ok' });
});

// API REST de equipos de hardware
app.use('/api/equipos', rutasEquipos);

app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});

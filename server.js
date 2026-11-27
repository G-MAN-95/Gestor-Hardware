const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Ruta para comprobar que el servidor está funcionando
app.get('/api/salud', (req, res) => {
  res.json({ estado: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});

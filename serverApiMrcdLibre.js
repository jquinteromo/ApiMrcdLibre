const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const app = express();

app.use(cors());

app.get('/api/products', async (req, res) => {
  try {
    const response = await fetch('https://api.mercadolibre.com/sites/MCO/search?q=silla+oficina');
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener productos' });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Servidor corriendo en Render');
});

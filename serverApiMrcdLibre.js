const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

app.use(cors());

app.get('/api/products', async (req, res) => {
  try {
    const { data } = await axios.get('https://api.mercadolibre.com/sites/MCO/search?q=silla+oficina');
    res.json(data);
  } catch (err) {
    console.error('Error en axios:', err.message);
    res.status(500).json({ error: 'Error al obtener productos', detalle: err.message });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Servidor corriendo en Render');
});

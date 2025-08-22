const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

app.use(cors());

app.get('/api/products', async (req, res) => {
  try {
    const { data } = await axios.get(
      'https://api.mercadolibre.com/sites/MCO/search?q=silla+oficina',
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; MrcdLibreBot/1.0)',
        }
      }
    );
    console.log('✅ Respuesta recibida');
    res.json(data);
  } catch (err) {
    console.error('❌ Error en axios:', err.response?.status, err.message);
    res.status(500).json({ error: 'Error al obtener productos', detalle: err.message });
  }
});



app.listen(process.env.PORT || 3000, () => {
  console.log('Servidor corriendo en Render');
});

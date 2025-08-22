// const express = require('express');
const cors = require('cors');
// const axios = require('axios');
// const app = express();



// app.get('/api/products', async (req, res) => {
//   try {
//     const { data } = await axios.get(
//       'https://api.mercadolibre.com/sites/MCO/search?q=silla+oficina',
//       {
//         headers: {
//           'User-Agent': 'Mozilla/5.0 (compatible; MrcdLibreBot/1.0)',
//         }
//       }
//     );
//     console.log('✅ Respuesta recibida');
//     res.json(data);
//   } catch (err) {
//     console.error('❌ Error en axios:', err.response?.status, err.message);
//     res.status(500).json({ error: 'Error al obtener productos', detalle: err.message });
//   }
// });



// app.listen(process.env.PORT || 3000, () => {
//   console.log('Servidor corriendo en Render');
// });


const axios = require('axios');
const express = require('express');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/token', async (req, res) => {
  const code = req.body.code;

  try {
    const { data } = await axios.post('https://api.mercadolibre.com/oauth/token', null, {
      params: {
        grant_type: 'authorization_code',
        client_id: '1314068552118393',
        client_secret: 'i4ksi1ljJ1sXNz1nMFkTHSJFXEx0SZI1', // ← reemplaza con el real
        code,
        redirect_uri: 'https://corpstore.com/lander' // ← debe coincidir con la URL donde recibiste el code
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    console.log('✅ Access Token:', data.access_token);
    console.log('🔁 Refresh Token:', data.refresh_token);
    res.json(data);
  } catch (err) {
    console.error('❌ Error al obtener token:', err.response?.data || err.message);
    res.status(500).json({ error: 'Error al obtener token', detalle: err.message });
  }
});

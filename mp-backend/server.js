// server.js



const express = require("express");
const cors = require("cors");
const mercadopago = require("mercadopago");

const app = express();
app.use(cors());
app.use(express.json());

// SDK de Mercado Pago
const { MercadoPagoConfig, Preference } = require('mercadopago');
// Agrega credenciales
const client = new MercadoPagoConfig({ accessToken: 'APP_USR-5277649914981016-091123-e68be859a5234b6287c537ab503999c4-2682607121' });

app.post("/crear_preferencia", async (req, res) => {
const preference = new Preference(client);

preference.create({
  body: {
    items: [
      {
        title: 'Mi producto',
        quantity: 1,
        unit_price: 2000
      }
    ],
  }
})
.then((data) => {
  console.log(data);
  res.status(200).json({
    preference_id:data.id,
  preference_url:data.init_point,
  })
})
.catch(() => {
  res.status(500).json({"error": "Algo salio mal en las preferencias"})
});
});










/* 
{
  "preference_id": "2682607121-71344b85-801a-411b-b514-23432b68285e",
  "preference_url": "https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=2682607121-71344b85-801a-411b-b514-23432b68285e"
} */


/* 
// 🔑 Credencial privada de prueba (sandbox)
mercadopago.configure({
  access_token: "APP_USR-5277649914981016-091123-e68be859_a5234b6287c537ab503999c4-2682607121"
});

// Endpoint para crear preferencia
app.post("/crear_preferencia", async (req, res) => {
  try {
    const { carrito } = req.body;

    if (!Array.isArray(carrito) || carrito.length === 0) {
      return res.status(400).json({ error: "Carrito vacío" });
    }

    // Transformar carrito para Mercado Pago
    const items = carrito.map(prod => ({
      title: prod.title,             // debe llamarse 'title'
      unit_price: Number(prod.unit_price), // debe llamarse 'unit_price'
      quantity: prod.quantity || 1,
      currency_id: "ARS"
    }));

    const preference = {
      items,
      back_urls: {
        success: "http://127.0.0.1:5500/success.html",
        failure: "http://127.0.0.1:5500/failure.html",
        pending: "http://127.0.0.1:5500/pending.html"
      },
      auto_return: "approved"
    };

    const respuesta = await mercadopago.preferences.create(preference);
    res.json({ id: respuesta.body.id });

  } catch (error) {
    console.error("Error creando preferencia:", error);
    if (error.response) console.error(error.response.body);
    res.status(500).json({ error: "Error creando preferencia" });
  }
});
 */

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor backend en http://localhost:${PORT}`);
});

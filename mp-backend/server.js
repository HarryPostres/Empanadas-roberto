// server.js
const express = require ("express");
const cors = require ("cors");
const mercadopago = require("mercadopago");

const app = express();
app.use(cors());
app.use(express.json());

// 🔑 credencial privada de prueba
mercadopago.configurations = {
  access_token:'APP_USR-5277649914981016-091123-e68be859_a5234b6287c537ab503999c4-2682607121'
};

// Endpoint para crear preferencia
app.post("/crear_preferencia", async (req, res) => {
  try {
    const { carrito } = req.body;
     if (!Array.isArray(carrito) || carrito.length === 0) {
      return res.status(400).json({ error: "Carrito vacío" });
    }

    const items = carrito.map((prod) => ({
      title: prod.title,
      unit_price: Number(prod.unit_price),
      quantity: prod.quantity || 1,
      currency_id: "ARS",
    }));

    const preference = {
      items,
      back_urls: {
        success: "http://127.0.0.1:5500/success.html",
        failure: "http://127.0.0.1:5500/failure.html",
        pending: "http://127.0.0.1:5500/pending.html",
      },
      auto_return: "approved",
    };

    const respuesta = await mercadopago.preferences.create(preference);
    res.json({ id: respuesta.body.id });
  } catch (error) {
    console.error("error creando preferencia:", error);
    res.status(500).json({ error: "Error creando preferencia" });
  }
});

const PORT= 3000;
app.listen(PORT, () => {
  console.log("Servidor backend en http://localhost:3000");
});
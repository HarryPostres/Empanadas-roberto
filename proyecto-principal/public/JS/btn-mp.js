/* // Cliente público de prueba (usa el tuyo)
const mp = new MercadoPago("APP_USR-a656f3b0-ef67-46a7-98bd-27e1543e01eb", {
  locale: "es-AR",
});

document.getElementById("btn-check-out").addEventListener("click", async () => {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  if (carrito.length === 0) {
    return alert("El carrito está vacío");
  }

  try {
    // Enviar carrito al backend
    const resp = await fetch("http://localhost:3000/crear_preferencia", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ carrito }),
    });

    if (!resp.ok) {
      const err = await resp.json().catch(() => ({}));
      throw new Error(err.error || "Error creando preferencia en backend");
    }

    const data = await resp.json();

    // Renderizar botón oficial de MP
    mp.checkout({
      preference: {
        id: data.id,
      },
      render: {
        container: "#mp-button-container", // mismo div del HTML
        label: "Pagar con Mercado Pago",
      },
    });

    // Ocultar botón propio
    document.getElementById("btn-check-out").style.display = "none";
  } catch (error) {
    console.error("Error en el pago:", error);
    alert("Hubo un problema creando la preferencia");
  }
});
 */

import React from 'react';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import { useState , useEffect} from 'react';
// Inicializa Mercado Pago con tu Public Key
const[preference_id,setPreferenceId] = useState(null);
initMercadoPago('APP_USR-a656f3b0-ef67-46a7-98bd-27e1543e01eb');

useEffect(()=>{



const crearPreferencia = async()=>{
  try{
  const response = await fetch('http://localhost:3000/crear_preferencia',{
    method:'POST',
    headers:{
      'Content-Type': 'aplication/json',
    },
    body: JSON.stringify({
      items: [
        {
          title: CSSMathProduct.title, 
          quantity: 1,
          unit_price:100,
        },
      ],
    }),
  })
  if(response.ok){
    const data = await response.json();
    setPreferenceId (data.preference_id);
    console.log (data);
  }
}catch(error){
  console.log(error);
}
}
crearPreferencia();
},[producto
  
]);

const App = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
      <h1>Botón de Pago</h1>
      <p>Haz clic en el botón para realizar el pago.</p>
      {/* Renderiza el botón de pago */}
      <div style={{ width: '300px' }}>
        <Wallet initialization={{ preferenceId: preference_id }} />
      </div>
    </div>
  );
};

export default App;
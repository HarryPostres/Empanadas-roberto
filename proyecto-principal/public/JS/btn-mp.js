const mp = new MercadoPago("APP_USR-a656f3b0-ef67-46a7-98bd-27e1543e01eb", { locale: "es-AR" });

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

    if(!resp.ok){
        const err = await resp.json().catch(() => ({}));
        throw new Error (err.error || "error creando preferencia en backend");
    }



    const data = await resp.json();

    // Iniciar checkout
    mp.checkout({
      preference: {
        id: data.id,
      },
      render: {
        container: "#mp-button-container",
        label: "Pagar con Mercado Pago",
      },
    });

    document.getElementById("btn-check-out").style.display = "none";
  } catch (error) {
    console.error("Error en el pago:", error);
    alert("Hubo un problema creando la preferencia");
  }
});
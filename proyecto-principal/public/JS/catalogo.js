/* render catalogo index */
let catalogo = [];

async function CargarEmpanadas() {
    try {
        const resp = await fetch("/proyecto-principal/public/data/empanadas.json");
        if (!resp.ok) throw new Error("no se pudo cargar el catalogo")
        catalogo = await resp.json();
        console.log("empanadas cargadas:", catalogo);

        if (document.getElementById("index-catalog")) {
            renderCatalogoIndex(catalogo);
        }
        if (document.getElementById("productos")) {
            renderCatalogoMenu(catalogo);
        }
    } catch (err) {
        console.error(err);
    }
}



function renderCatalogoIndex(empanadas) {
    const app = document.getElementById("index-catalog");
    if (!app) return;

    app.innerHTML = "";
    empanadas.slice(0, 6).forEach(emp => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
        <img src="${emp.img}" alt="${emp.nombre}" class="card-img">
        <h3>${emp.nombre}</h3>
        <p>precio: $${emp.precio}</p>
        <p>stock: ${emp.stock}</p>
        <button onclick="agregarAlCarrito(${emp.id})">agregar al carrito</button>
        `;
        app.appendChild(card);
    });
}




/* render catalogo en el menu */


function renderCatalogoMenu(lista){
    const contenedor = document.getElementById("productos");

    if (!contenedor) return;

    contenedor.innerHTML = "";
    lista.forEach(emp => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
            <img src="${emp.img}" alt="${emp.title}" class="card-img">
            <h3>${emp.title}</h3>
            <p>categoria: ${emp.categoria}</p>
            <p>precio: $${emp.unit_price}</p>
            <p>stock: ${emp.stock}</p>
            <button onclick="agregarAlCarrito(${emp.id})">agregar al carrito</button>
        `;
    contenedor.appendChild(card);
    });
}

/* selector ordenar por en menu */
document.addEventListener("DOMContentLoaded", () => {
    const ordenarSelect = document.getElementById("ordenarPor");
    if(!ordenarSelect) return;

    ordenarSelect.addEventListener("change", () => {
        let listaOrdenada = [...catalogo];

        if (ordenarSelect.value === "precio"){
            listaOrdenada.sort((a, b) => a.precio - b.precio);
        } else if (ordenarSelect.value === "categoria"){
            listaOrdenada.sort((a, b) => a.categoria.localeCompare(b.categoria));
        } else if (ordenarSelect.value === "masVendidos"){
            listaOrdenada.sort((a, b) => b.vendidos - a.vendidos);
        }
        renderCatalogoMenu(listaOrdenada);
    });
});

CargarEmpanadas();


document.addEventListener("DOMContentLoaded", () => {

    // --- Función para agregar producto al carrito ---
    function agregarAlCarrito(id) {
        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        const producto = catalogo.find(emp => emp.id == id);
        if (!producto) return;

        carrito.push(producto);
        localStorage.setItem("carrito", JSON.stringify(carrito));

        renderCarrito();
        renderCarritoFlotante();
    }

    // --- Renderizar carrito principal ---
    function renderCarrito() {
        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        const contenedor = document.getElementById("carrito");
        const totalSpan = document.getElementById("total");

        if (!contenedor) return;

        contenedor.innerHTML = "";
        let total = 0;

        carrito.forEach((prod, index) => {
            const item = document.createElement("div");
            item.classList.add("item-carrito");
            item.innerHTML = `
                <div class="card-carrito">
                    <img src="${prod.img}" alt="${prod.title}" class="carrito-img">
                    <div class="carrito-info">
                        <h3>${prod.title}</h3>
                        <p>Precio: $${prod.unit_price}</p>
                        <button class="btn-quitar" onclick="eliminarDelCarrito(${index})">Quitar</button>
                    </div>
                </div>
            `;
            contenedor.appendChild(item);
            total += prod.unit_price;
        });

        if (totalSpan) totalSpan.textContent = total;
    }

    // --- Eliminar del carrito principal ---
    window.eliminarDelCarrito = function(index) {
        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        carrito.splice(index, 1);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        renderCarrito();
        renderCarritoFlotante();
    }

    // --- Carrito flotante ---
    function crearCarritoFlotante() {
        const miniCarrito = document.getElementById("mini-carrito");
        if (!miniCarrito) return;

        miniCarrito.innerHTML = "";

        const header = document.createElement("div");
        header.id = "mini-carrito-header";

        const title = document.createElement("span");
        title.textContent = "Carrito";
        header.appendChild(title);

        const toggleBtn = document.createElement("button");
        toggleBtn.id = "toggle-carrito";
        toggleBtn.textContent = "↓";
        header.appendChild(toggleBtn);
        miniCarrito.appendChild(header);

        const body = document.createElement("div");
        body.id = "mini-carrito-body";
        body.style.display = "block";

        const contenedor = document.createElement("div");
        contenedor.id = "mini-contenedor";
        body.appendChild(contenedor);

        const totalp = document.createElement("p");
        totalp.innerHTML = 'Total: $<span id="mini-total">0</span>';
        body.appendChild(totalp);

        const vaciarBtn = document.createElement("button");
        vaciarBtn.id = "mini-vaciar";
        vaciarBtn.textContent = "Vaciar carrito";
        body.appendChild(vaciarBtn);

        miniCarrito.appendChild(body);

        // --- Eventos ---
        toggleBtn.addEventListener("click", () => {
            if (body.style.display === "none" || body.style.display === "") {
                body.style.display = "block";
                toggleBtn.textContent = "↑";
            } else {
                body.style.display = "none";
                toggleBtn.textContent = "↓";
            }
        });

        vaciarBtn.addEventListener("click", () => {
            localStorage.removeItem("carrito");
            renderCarrito();
            renderCarritoFlotante();
        });
    }

    // --- Render carrito flotante ---
    function renderCarritoFlotante() {
        const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        const contenedor = document.getElementById("mini-contenedor");
        const totalSpan = document.getElementById("mini-total");

        if (!contenedor) return;
        contenedor.innerHTML = "";

        let total = 0;

        carrito.forEach((prod, index) => {
            const item = document.createElement("div");
            item.classList.add("mini-item-carrito");

            item.innerHTML = `
                <img src="${prod.img}" alt="${prod.title}" class="mini-carrito-img">
                <div class="mini-carrito-info">
                    <h4>${prod.title}</h4>
                    <p>Precio: $${prod.unit_price}</p>
                    <button onclick="eliminarDelCarritoFlotante(${index})">Quitar</button>
                </div>
            `;

            contenedor.appendChild(item);
            total += prod.unit_price;
        });

        if (totalSpan) totalSpan.textContent = total;
    }

    // --- Eliminar del carrito flotante ---
    window.eliminarDelCarritoFlotante = function(index) {
        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        carrito.splice(index, 1);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        renderCarritoFlotante();
        renderCarrito();
    }

    // --- Botón vaciar principal (si existe) ---
    const vaciarBtnPrincipal = document.getElementById("vaciar");
    if (vaciarBtnPrincipal) {
        vaciarBtnPrincipal.addEventListener("click", () => {
            localStorage.removeItem("carrito");
            renderCarrito();
            renderCarritoFlotante();
        });
    }

    // --- Inicializar ---
    renderCarrito();
    crearCarritoFlotante();
    renderCarritoFlotante();

});



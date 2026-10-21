/* =========================================================
   TU DETALLE CHINCHA · CATÁLOGO
   ---------------------------------------------------------
   Productos DE EJEMPLO: cambia nombres, precios, descripciones
   e imágenes por los reales. Cada imagen apunta a
   imagenes/productos/<archivo>.jpg — sube la foto con ese nombre.

   Campos para el asistente "Encuentra el detalle perfecto":
   - para:      pareja | mama | papa | amigo | familiar | companero
   - emociones: amor | agradecimiento | felicidad | sorpresa | carino | celebracion
   - ocasiones: cumpleanos | aniversario | sanvalentin | madre | padre
                graduacion | nacimiento | pedida | corporativo | navidad | especial
   ========================================================= */

window.TDC_CATEGORIAS = {
  pareja:      { nombre: "Para mi pareja",   art: "heart" },
  cumpleanos:  { nombre: "Cumpleaños",       art: "cake" },
  mama:        { nombre: "Para mamá",        art: "rose" },
  papa:        { nombre: "Para papá",        art: "tie" },
  aniversario: { nombre: "Aniversario",      art: "ring" },
  graduacion:  { nombre: "Graduación",       art: "cap" },
  nacimiento:  { nombre: "Nacimiento",       art: "baby" },
  especial:    { nombre: "Ocasión especial", art: "sparkle" },
  corporativo: { nombre: "Corporativo",      art: "brief" }
};

window.TDC_PRODUCTOS = [
  {
    id: "box-amor", nombre: "Box Amor", precio: 89.90,
    categoria: "pareja", etiqueta: "Más pedido", art: "gift", tono: "deep",
    imagen: "imagenes/productos/box-amor.jpg",
    descripcion: "Un detalle pensado para sorprender a esa persona especial.",
    incluye: ["Caja rígida con lazo", "Rosas y chocolates", "Tarjeta con dedicatoria"],
    para: ["pareja"], emociones: ["amor", "sorpresa"], ocasiones: ["aniversario", "sanvalentin", "especial"]
  },
  {
    id: "box-mama", nombre: "Box Mamá Bonita", precio: 99.90,
    categoria: "mama", etiqueta: "Temporada", art: "rose", tono: "blush",
    imagen: "imagenes/productos/box-mama.jpg",
    descripcion: "Flores, dulzura y una dedicatoria para quien lo dio todo.",
    incluye: ["Arreglo floral", "Taza personalizada", "Bombones"],
    para: ["mama", "familiar"], emociones: ["agradecimiento", "carino", "amor"], ocasiones: ["madre", "cumpleanos"]
  },
  {
    id: "ramo-eterno", nombre: "Ramo Eterno", precio: 129.90,
    categoria: "pareja", etiqueta: "Edición especial", art: "bouquet", tono: "emerald",
    imagen: "imagenes/productos/ramo-eterno.jpg",
    descripcion: "Rosas que duran como el recuerdo que van a crear.",
    incluye: ["Rosas preservadas", "Envoltura artesanal", "Tarjeta escrita a mano"],
    para: ["pareja", "mama"], emociones: ["amor", "carino"], ocasiones: ["aniversario", "sanvalentin", "madre", "pedida"]
  },
  {
    id: "globo-burbuja", nombre: "Globo Burbuja", precio: 49.90,
    categoria: "cumpleanos", etiqueta: "", art: "balloon", tono: "champagne",
    imagen: "imagenes/productos/globo-burbuja.jpg",
    descripcion: "Un globo transparente con su nombre y lo que quieras decirle.",
    incluye: ["Globo burbuja con nombre", "Globos internos", "Base decorada"],
    para: ["pareja", "amigo", "familiar", "companero", "mama", "papa"], emociones: ["felicidad", "celebracion", "sorpresa"], ocasiones: ["cumpleanos", "graduacion", "especial"]
  },
  {
    id: "desayuno-sorpresa", nombre: "Desayuno Sorpresa", precio: 119.90,
    categoria: "cumpleanos", etiqueta: "Entrega a domicilio", art: "cup", tono: "cream",
    imagen: "imagenes/productos/desayuno-sorpresa.jpg",
    descripcion: "Para empezar el día sabiendo que alguien pensó en ti.",
    incluye: ["Bandeja decorada", "Desayuno completo", "Globo y tarjeta"],
    para: ["pareja", "mama", "papa", "amigo", "familiar"], emociones: ["sorpresa", "carino", "felicidad"], ocasiones: ["cumpleanos", "madre", "padre", "aniversario"]
  },
  {
    id: "box-papa", nombre: "Box Papá Campeón", precio: 94.90,
    categoria: "papa", etiqueta: "", art: "tie", tono: "deep",
    imagen: "imagenes/productos/box-papa.jpg",
    descripcion: "Para el que siempre estuvo ahí, un detalle a su medida.",
    incluye: ["Caja de madera", "Snacks y bebida", "Taza grabada"],
    para: ["papa", "familiar"], emociones: ["agradecimiento", "celebracion"], ocasiones: ["padre", "cumpleanos"]
  },
  {
    id: "cofre-recuerdos", nombre: "Cofre de Recuerdos", precio: 79.90,
    categoria: "especial", etiqueta: "Con tus fotos", art: "chest", tono: "pastel",
    imagen: "imagenes/productos/cofre-recuerdos.jpg",
    descripcion: "Sus fotos favoritas, guardadas en un cofre que se abre con emoción.",
    incluye: ["Cofre decorado", "12 fotos impresas", "Mensaje personalizado"],
    para: ["pareja", "amigo", "familiar"], emociones: ["amor", "carino", "sorpresa"], ocasiones: ["aniversario", "cumpleanos", "sanvalentin", "especial"]
  },
  {
    id: "oso-dedicatoria", nombre: "Oso con Dedicatoria", precio: 69.90,
    categoria: "pareja", etiqueta: "", art: "bear", tono: "champagne",
    imagen: "imagenes/productos/oso-dedicatoria.jpg",
    descripcion: "Un abrazo suave que se queda cuando tú no estás.",
    incluye: ["Peluche mediano", "Lazo con nombre", "Tarjeta"],
    para: ["pareja", "amigo", "familiar"], emociones: ["carino", "amor"], ocasiones: ["sanvalentin", "nacimiento", "cumpleanos", "especial"]
  },
  {
    id: "torre-chocolates", nombre: "Torre de Chocolates", precio: 59.90,
    categoria: "especial", etiqueta: "", art: "choco", tono: "cream",
    imagen: "imagenes/productos/torre-chocolates.jpg",
    descripcion: "Dulce, alegre y perfecta para decir gracias.",
    incluye: ["Chocolates surtidos", "Base decorada", "Lazo y tarjeta"],
    para: ["amigo", "companero", "familiar", "mama", "papa"], emociones: ["agradecimiento", "felicidad"], ocasiones: ["cumpleanos", "especial", "corporativo"]
  },
  {
    id: "kit-graduacion", nombre: "Kit Graduación", precio: 84.90,
    categoria: "graduacion", etiqueta: "", art: "cap", tono: "emerald",
    imagen: "imagenes/productos/kit-graduacion.jpg",
    descripcion: "Para celebrar el esfuerzo de años en un solo momento.",
    incluye: ["Birrete decorativo", "Globo metálico", "Flores y tarjeta"],
    para: ["amigo", "familiar", "pareja"], emociones: ["celebracion", "felicidad"], ocasiones: ["graduacion"]
  },
  {
    id: "canasta-bebe", nombre: "Bienvenida Bebé", precio: 109.90,
    categoria: "nacimiento", etiqueta: "", art: "baby", tono: "pastel",
    imagen: "imagenes/productos/canasta-bebe.jpg",
    descripcion: "Una canasta suave para recibir a quien acaba de llegar.",
    incluye: ["Canasta tejida", "Peluche y mantita", "Tarjeta de bienvenida"],
    para: ["familiar", "amigo", "companero"], emociones: ["carino", "felicidad"], ocasiones: ["nacimiento"]
  },
  {
    id: "box-pedida", nombre: "Box Pedida de Mano", precio: 159.90,
    categoria: "aniversario", etiqueta: "Bajo reserva", art: "ring", tono: "deep",
    imagen: "imagenes/productos/box-pedida.jpg",
    descripcion: "Para la pregunta más importante, un escenario a la altura.",
    incluye: ["Caja para anillo", "Rosas preservadas", "Decoración para la sorpresa"],
    para: ["pareja"], emociones: ["amor", "sorpresa"], ocasiones: ["pedida", "aniversario", "sanvalentin"]
  },
  {
    id: "detalle-corporativo", nombre: "Detalle Corporativo", precio: 45.90, desde: true,
    categoria: "corporativo", etiqueta: "Por volumen", art: "brief", tono: "cream",
    imagen: "imagenes/productos/detalle-corporativo.jpg",
    descripcion: "Cajas con tu marca para clientes y equipos que quieres cuidar.",
    incluye: ["Caja con logo", "Selección a medida", "Tarjeta de empresa"],
    para: ["companero"], emociones: ["agradecimiento", "celebracion"], ocasiones: ["corporativo", "navidad"]
  },
  {
    id: "box-aniversario", nombre: "Box Aniversario", precio: 114.90,
    categoria: "aniversario", etiqueta: "", art: "photo", tono: "blush",
    imagen: "imagenes/productos/box-aniversario.jpg",
    descripcion: "Un año más juntos merece una caja llena de ustedes.",
    incluye: ["Caja con fotos", "Vino o espumante", "Chocolates y carta"],
    para: ["pareja"], emociones: ["amor", "celebracion"], ocasiones: ["aniversario", "sanvalentin"]
  }
];

/* ---------------- Utilidades compartidas ---------------- */
window.tdcPrecio = (p) => "S/ " + p.toFixed(2);

window.tdcWhatsappLink = function (texto) {
  const cfg = window.TDC_CONFIG || {};
  const msg = texto || cfg.mensajeWhatsapp || "";
  return `https://wa.me/${cfg.whatsapp}?text=${encodeURIComponent(msg)}`;
};

window.tdcProducto = (id) => window.TDC_PRODUCTOS.find(p => p.id === id);

/* Tarjeta editorial de producto */
window.tdcCard = function (p, i = 0) {
  const cat = window.TDC_CATEGORIAS[p.categoria] || { nombre: "" };
  const msg = `¡Hola Tu Detalle Chincha! 🎁 Me interesa el detalle "${p.nombre}" (${tdcPrecio(p.precio)}). ¿Está disponible?`;
  return `
  <article class="pcard" data-reveal="up" data-id="${p.id}" data-cat="${p.categoria}" style="--i:${i}" data-cursor="Ver">
    <div class="pcard__frame">
      <figure class="media pcard__media" data-art="${p.art}" data-tone="${p.tono}">
        <img src="${p.imagen}" alt="${p.nombre}: ${p.descripcion}" loading="lazy" decoding="async" width="800" height="1000">
      </figure>
      ${p.etiqueta ? `<span class="pcard__tag">${p.etiqueta}</span>` : ""}
      <div class="pcard__more" aria-hidden="true">
        <span class="pcard__more-title">Incluye</span>
        <ul>${p.incluye.map(x => `<li>${x}</li>`).join("")}</ul>
      </div>
      <span class="pcard__shine" aria-hidden="true"></span>
    </div>
    <div class="pcard__body">
      <p class="pcard__cat">${cat.nombre}</p>
      <h3 class="pcard__name">${p.nombre}</h3>
      <p class="pcard__desc">${p.descripcion}</p>
      <div class="pcard__foot">
        <p class="pcard__price">${p.desde ? "<small>desde</small> " : ""}${tdcPrecio(p.precio)}</p>
        <a class="pcard__btn" href="${tdcWhatsappLink(msg)}" target="_blank" rel="noopener" aria-label="Quiero este detalle: ${p.nombre}">
          <span>Quiero este detalle</span>${tdcIcon("arrow")}
        </a>
      </div>
    </div>
  </article>`;
};

/* ---------------- Render ---------------- */
document.addEventListener("DOMContentLoaded", () => {
  /* Inicio: selección curada (no llenar la pantalla de productos) */
  const curated = document.getElementById("catalogo-destacado");
  if (curated) {
    const ids = ["box-amor", "box-mama", "globo-burbuja", "cofre-recuerdos", "desayuno-sorpresa", "box-papa"];
    curated.innerHTML = ids.map((id, i) => tdcCard(tdcProducto(id), i)).join("");
    window.tdcMedia(curated);
  }

  /* Página de productos con filtros */
  const grid = document.getElementById("catalogo-completo");
  if (!grid) return;
  grid.innerHTML = TDC_PRODUCTOS.map((p, i) => tdcCard(p, i)).join("");
  window.tdcMedia(grid);

  const chips = document.querySelectorAll(".filter__chip");
  const indicator = document.querySelector(".filter__indicator");
  const count = document.getElementById("catalogo-count");
  const cards = [...grid.children];

  function moveIndicator(chip) {
    if (!indicator || !chip) return;
    indicator.style.width = chip.offsetWidth + "px";
    indicator.style.transform = `translateX(${chip.offsetLeft}px)`;
  }

  function apply(cat, animate = true) {
    if (!document.querySelector(`.filter__chip[data-filter="${cat}"]`)) cat = "todos";
    chips.forEach(c => {
      const on = c.dataset.filter === cat;
      c.classList.toggle("is-active", on);
      c.setAttribute("aria-pressed", on);
      if (on) moveIndicator(c);
    });
    let n = 0;
    cards.forEach(card => {
      const p = tdcProducto(card.dataset.id);
      const show = cat === "todos" || p.categoria === cat || p.ocasiones.includes(cat) || p.para.includes(cat);
      if (show) {
        card.hidden = false;
        card.style.setProperty("--i", n++);
        if (animate) { card.classList.remove("is-in"); void card.offsetWidth; card.classList.add("is-in"); }
      } else card.hidden = true;
    });
    if (count) count.textContent = n === 1 ? "1 detalle" : `${n} detalles`;
    const empty = document.getElementById("catalogo-vacio");
    if (empty) empty.hidden = n > 0;
  }

  chips.forEach(chip => chip.addEventListener("click", () => {
    apply(chip.dataset.filter);
    try { history.replaceState(null, "", chip.dataset.filter === "todos" ? location.pathname : "#" + chip.dataset.filter); } catch (e) {}
  }));

  const fromHash = (location.hash || "").replace("#", "");
  apply(fromHash || "todos", false);
  window.addEventListener("resize", () => moveIndicator(document.querySelector(".filter__chip.is-active")));
  window.addEventListener("hashchange", () => apply(location.hash.replace("#", "") || "todos"));
});

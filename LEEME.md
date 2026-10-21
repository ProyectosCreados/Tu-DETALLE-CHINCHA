# Tu Detalle Chincha · sitio web

HTML5 + CSS3 + JavaScript vanilla. Sin frameworks. Abre `index.html` en el navegador o súbelo tal cual a cualquier hosting.

## Lo primero que debes editar

| Qué | Dónde |
|---|---|
| Número de WhatsApp, redes, ubicación, horario | `js/config.js` |
| Producto de "Detalle de la semana" | `js/config.js` → `destacado` |
| Testimonios (ahora son de ejemplo) | `js/config.js` → `testimonios` (pon `ejemplo: false`) |
| Productos, precios, descripciones | `js/productos.js` |
| Historia de "Nosotros" | `nosotros.html` |

## Imágenes

Mientras una foto no exista, se muestra una ilustración con el nombre del archivo que espera
(por ejemplo `Foto · box-amor.jpg`). Sube la foto con ese nombre y aparece sola con un fundido.

- `imagenes/logo.png` → logo (si no existe, se usa el logotipo tipográfico)
- `imagenes/hero/` → box-sorpresa, flores, globos, chocolates, peluche (.jpg)
- `imagenes/categorias/` → pareja, cumpleanos, mama, papa, aniversario, graduacion, nacimiento, especial (.jpg)
- `imagenes/productos/` → una por producto (ver campo `imagen` en `js/productos.js`)
- `imagenes/galeria/` → galeria-01 … galeria-09, historia, nosotros (.jpg)

Recomendado: JPG o WebP de 1200 px de ancho máximo, menos de 250 KB.

## Estructura

```
index.html  productos.html  nosotros.html  contacto.html
css/  style.css · productos.css · responsive.css
js/   config.js · ilustraciones.js · productos.js · animations.js · main.js
imagenes/  logo.png · hero/ · productos/ · categorias/ · galeria/
videos/    promocional.mp4 (opcional)
```

Las animaciones respetan `prefers-reduced-motion` y se pausan cuando no están en pantalla.

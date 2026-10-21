/* =========================================================
   TU DETALLE CHINCHA · CONFIGURACIÓN
   ---------------------------------------------------------
   Todo lo que cambia con frecuencia vive aquí:
   número de WhatsApp, redes, horario, ubicación,
   producto destacado y testimonios.
   ========================================================= */

window.TDC_CONFIG = {
  /* WhatsApp: código de país + número, sin espacios ni "+"
     Ejemplo Perú: 51 + 9XXXXXXXX  →  "51987654321"
     ⚠️ REEMPLAZAR por el número real */
  whatsapp: "51999999999",

  /* Mensaje por defecto al abrir WhatsApp */
  mensajeWhatsapp: "¡Hola Tu Detalle Chincha! 🎁 Quisiera consultar por un detalle.",

  marca: "Tu Detalle Chincha",

  /* Redes sociales ⚠️ REEMPLAZAR por los enlaces reales */
  redes: {
    facebook: "https://www.facebook.com/",
    instagram: "https://www.instagram.com/",
    tiktok: "https://www.tiktok.com/"
  },

  /* Ubicación y horario ⚠️ REEMPLAZAR */
  ubicacion: "Chincha Alta, Ica – Perú",
  ubicacionDetalle: "Dirección exacta por confirmar",
  mapa: "https://www.google.com/maps/search/?api=1&query=Chincha+Alta+Ica+Peru",
  horario: "Lunes a sábado · 9:00 a. m. – 8:00 p. m.",
  horarioDetalle: "Domingos y feriados: pedidos con anticipación",

  /* Producto que aparece en "Detalle de la semana" (id de js/productos.js) */
  destacado: "ramo-eterno",

  /* TESTIMONIOS
     Contenido DEMOSTRATIVO. Reemplazar por testimonios reales
     y cambiar `ejemplo` a false para ocultar la etiqueta. */
  testimonios: [
    { texto: "Aquí irá el comentario real de un cliente contando cómo reaccionó esa persona especial al recibir su detalle.", autor: "Nombre del cliente", ocasion: "Aniversario", ejemplo: true },
    { texto: "Espacio para un testimonio real sobre la puntualidad de la entrega y lo bonito de la presentación.", autor: "Nombre del cliente", ocasion: "Día de la Madre", ejemplo: true },
    { texto: "Ejemplo de testimonio: una sorpresa de cumpleaños que salió tal como la imaginaron.", autor: "Nombre del cliente", ocasion: "Cumpleaños", ejemplo: true },
    { texto: "Testimonio de muestra sobre la atención por WhatsApp y la ayuda para elegir el detalle ideal.", autor: "Nombre del cliente", ocasion: "San Valentín", ejemplo: true },
    { texto: "Aquí puede ir la experiencia de alguien que pidió un detalle personalizado con foto y dedicatoria.", autor: "Nombre del cliente", ocasion: "Personalizado", ejemplo: true }
  ]
};

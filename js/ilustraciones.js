/* =========================================================
   TU DETALLE CHINCHA · ILUSTRACIONES Y PLACEHOLDERS
   ---------------------------------------------------------
   1. Inyecta un sprite SVG de ilustraciones de línea
      (estilo artesanal, inspirado en el logo).
   2. Mientras no existan las fotos reales, cada <figure class="media">
      muestra una ilustración elegante + el nombre del archivo esperado.
      Cuando subas la foto a la ruta indicada, aparece sola con un fundido.
   ========================================================= */
(function () {
  const S = 'fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"';

  const icons = {
    gift: `<path d="M12 29h40v25H12z"/><path d="M9 21h46v8H9z"/><path d="M32 21v33"/><path d="M32 21c-4-8-15-11-15-5 0 4 8 5 15 5z"/><path d="M32 21c4-8 15-11 15-5 0 4-8 5-15 5z"/>`,
    rose: `<path d="M32 58V31"/><path d="M32 45c-7-1-11-6-11-11 6 0 10 5 11 11z"/><path d="M32 50c6-1 10-5 10-9-5 0-9 4-10 9z"/><path d="M32 31c-9 0-13-7-13-13 4 2 9 2 13-3 4 5 9 5 13 3 0 6-4 13-13 13z"/><path d="M28 19c1-4 8-4 8 0s-4 5-6 3"/>`,
    bouquet: `<circle cx="24" cy="20" r="7"/><circle cx="40" cy="20" r="7"/><circle cx="32" cy="13" r="7"/><path d="M22 32l10 26 10-26z"/><path d="M26 32l6-6 6 6"/><path d="M27 42h10"/>`,
    balloon: `<ellipse cx="32" cy="24" rx="13" ry="16"/><path d="M30 40l2 3 2-3z"/><path d="M32 43c-3 5 3 8 0 13s2 5 0 7"/><path d="M25 17c1-3 3-5 6-6"/>`,
    heart: `<path d="M32 52C18 42 10 34 10 24c0-7 5-12 11-12 5 0 9 3 11 7 2-4 6-7 11-7 6 0 11 5 11 12 0 10-8 18-22 28z"/>`,
    cake: `<path d="M14 35h36v18H14z"/><path d="M18 25h28v10H18z"/><path d="M26 25v-8M32 25v-10M38 25v-8"/><path d="M26 14c-1-2 0-4 0-4s1 2 0 4zM32 12c-1-2 0-4 0-4s1 2 0 4zM38 14c-1-2 0-4 0-4s1 2 0 4z"/><path d="M14 41c3 3 6 3 9 0s6 3 9 0 6 3 9 0 6 3 9 0"/>`,
    bear: `<circle cx="32" cy="25" r="12"/><circle cx="21" cy="15" r="5"/><circle cx="43" cy="15" r="5"/><ellipse cx="32" cy="49" rx="13" ry="10"/><ellipse cx="32" cy="29" rx="5" ry="4"/><path d="M28 22h.01M36 22h.01" stroke-width="3"/><path d="M32 47c-2-2-5 0-3 3l3 2 3-2c2-3-1-5-3-3z"/>`,
    ring: `<circle cx="32" cy="41" r="14"/><circle cx="32" cy="41" r="10"/><path d="M26 20l6-8 6 8-6 7z"/><path d="M26 20h12"/>`,
    cap: `<path d="M8 26l24-10 24 10-24 10z"/><path d="M18 30v10c0 5 28 5 28 0V30"/><path d="M52 28v12"/><circle cx="52" cy="42" r="2"/>`,
    baby: `<path d="M24 12h16l9 8-6 6-4-4v30H25V22l-4 4-6-6z"/><path d="M27 12c1 4 9 4 10 0"/><path d="M28 46h8"/>`,
    tie: `<path d="M26 12h12"/><path d="M28 12l-2 6h12l-2-6"/><path d="M27 18l-4 26 9 10 9-10-4-26"/><path d="M22 10l-6 6M42 10l6 6"/>`,
    card: `<path d="M10 18h44v30H10z"/><path d="M10 18l22 16 22-16"/><path d="M32 44c-5-3-7-5-7-7 0-2 2-3 3-3s3 1 4 2c1-1 2-2 4-2 1 0 3 1 3 3 0 2-2 4-7 7z"/>`,
    choco: `<rect x="10" y="20" width="44" height="30" rx="3"/><circle cx="20" cy="29" r="4"/><circle cx="32" cy="29" r="4"/><circle cx="44" cy="29" r="4"/><circle cx="20" cy="41" r="4"/><circle cx="32" cy="41" r="4"/><circle cx="44" cy="41" r="4"/>`,
    sparkle: `<path d="M32 8c2 12 12 22 24 24-12 2-22 12-24 24-2-12-12-22-24-24 12-2 22-12 24-24z"/>`,
    photo: `<path d="M15 10h34v44H15z"/><path d="M19 14h26v26H19z"/><path d="M32 33c-5-3-7-5-7-8 0-2 2-3 3-3s3 1 4 2c1-1 2-2 4-2 1 0 3 1 3 3 0 3-2 5-7 8z"/>`,
    tree: `<path d="M32 8l12 18h-6l10 16H16l10-16h-6z"/><path d="M28 42v10h8V42"/><path d="M32 4v4"/>`,
    cup: `<path d="M14 28h30v8a15 15 0 0 1-30 0z"/><path d="M44 30h4a5 5 0 0 1 0 10h-5"/><path d="M22 20c-2-3 2-5 0-8M29 20c-2-3 2-5 0-8M36 20c-2-3 2-5 0-8"/><path d="M12 56h36"/>`,
    brief: `<rect x="10" y="22" width="44" height="30" rx="3"/><path d="M26 22v-5h12v5"/><path d="M10 34h44"/><path d="M29 34v4h6v-4"/>`,
    chest: `<path d="M10 30h44v22H10z"/><path d="M10 30c0-10 8-16 22-16s22 6 22 16"/><path d="M28 30v8h8v-8"/><path d="M10 40h18M36 40h18"/>`,
    basket: `<path d="M8 30h48l-6 22H14z"/><path d="M18 30c0-10 6-16 14-16s14 6 14 16"/><path d="M20 38l2 8M32 38v8M44 38l-2 8"/>`,
    star: `<path d="M32 10l6 14 15 1-12 10 4 15-13-8-13 8 4-15-12-10 15-1z"/>`,
    /* Utilidades */
    whatsapp: `<path d="M12 52l3-10a22 22 0 1 1 8 8z"/><path d="M26 22c-1 0-3 1-3 4 0 6 8 15 15 15 3 0 4-2 4-3l-1-2-5-2-2 2c-3-1-6-4-7-7l2-2-2-5z"/>`,
    facebook: `<path d="M36 56V34h7l1-8h-8v-5c0-2 1-4 4-4h4v-7c-1 0-4-1-6-1-7 0-10 4-10 11v6h-7v8h7v22"/>`,
    instagram: `<rect x="12" y="12" width="40" height="40" rx="12"/><circle cx="32" cy="32" r="9"/><path d="M44 20h.01" stroke-width="3.5"/>`,
    tiktok: `<path d="M36 10v30a9 9 0 1 1-9-9"/><path d="M36 10c1 7 6 11 13 11"/>`,
    pin: `<path d="M32 56s-16-15-16-28a16 16 0 0 1 32 0c0 13-16 28-16 28z"/><circle cx="32" cy="28" r="6"/>`,
    clock: `<circle cx="32" cy="32" r="22"/><path d="M32 18v14l9 6"/>`,
    arrow: `<path d="M12 32h40M38 18l14 14-14 14"/>`,
    close: `<path d="M16 16l32 32M48 16L16 48"/>`,
    chevronL: `<path d="M40 14L22 32l18 18"/>`,
    chevronR: `<path d="M24 14l18 18-18 18"/>`,
    upload: `<path d="M32 42V14M20 26l12-12 12 12"/><path d="M12 42v10h40V42"/>`,
    pen: `<path d="M14 50l4-12 26-26 8 8-26 26z"/><path d="M38 18l8 8"/>`,
    palette: `<path d="M32 10a22 22 0 1 0 0 44c3 0 4-2 4-4 0-3-3-4-1-7 2-2 5-1 9-1 6 0 10-4 10-10 0-12-10-22-22-22z"/><circle cx="21" cy="30" r="3"/><circle cx="27" cy="20" r="3"/><circle cx="38" cy="19" r="3"/>`,
    message: `<path d="M10 14h44v30H26l-10 8v-8h-6z"/><path d="M20 26h24M20 33h16"/>`,
    theme: `<path d="M32 10v44M10 32h44"/><circle cx="32" cy="32" r="10"/>`,
    box3d: `<path d="M32 10l20 10v24L32 54 12 44V20z"/><path d="M12 20l20 10 20-10M32 30v24"/>`
  };

  const sprite = '<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="position:absolute;width:0;height:0;overflow:hidden">' +
    Object.entries(icons).map(([k, v]) => `<symbol id="i-${k}" viewBox="0 0 64 64"><g ${S}>${v}</g></symbol>`).join('') +
    '</svg>';

  function inject() {
    if (document.getElementById('i-gift')) return;
    document.body.insertAdjacentHTML('afterbegin', sprite);
  }

  /* Helper global: <svg class="ico"><use href="#i-gift"></use></svg> */
  window.tdcIcon = (name, cls = 'ico') =>
    `<svg class="${cls}" aria-hidden="true" focusable="false"><use href="#i-${name}"></use></svg>`;

  /* ---------- Sistema de imágenes con placeholder ---------- */
  function fileName(src) {
    try { return decodeURIComponent(src.split('/').pop().split('?')[0]); } catch (e) { return src; }
  }

  function setupMedia(fig) {
    if (fig.dataset.ready) return;
    fig.dataset.ready = '1';
    const img = fig.querySelector('img');
    const art = fig.dataset.art || 'gift';
    const src = img ? img.getAttribute('src') : '';

    const ph = document.createElement('div');
    ph.className = 'media__ph';
    ph.setAttribute('aria-hidden', 'true');
    ph.innerHTML =
      `<span class="media__ring"></span>` +
      window.tdcIcon(art, 'media__art') +
      (src && !fig.hasAttribute('data-nolabel') ? `<span class="media__label">Foto · ${fileName(src)}</span>` : '');
    fig.insertBefore(ph, fig.firstChild);

    if (!img) { fig.classList.add('is-missing'); return; }
    const ok = () => fig.classList.add('is-loaded');
    const bad = () => fig.classList.add('is-missing');
    if (img.complete) { img.naturalWidth > 0 ? ok() : bad(); }
    img.addEventListener('load', ok, { once: true });
    img.addEventListener('error', bad, { once: true });
  }

  window.tdcMedia = function (root = document) {
    root.querySelectorAll('.media').forEach(setupMedia);
  };

  /* Logo: si existe imagenes/logo.png se usa; si no, se muestra el logotipo tipográfico */
  function setupLogos() {
    document.querySelectorAll('.brand__img').forEach(img => {
      const wrap = img.closest('.brand');
      const ok = () => wrap && wrap.classList.add('has-img');
      if (img.complete && img.naturalWidth > 0) ok();
      img.addEventListener('load', ok, { once: true });
      img.addEventListener('error', () => img.remove(), { once: true });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    inject();
    window.tdcMedia();
    setupLogos();
  });
})();

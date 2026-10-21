/* =========================================================
   TU DETALLE CHINCHA · INTERACCIONES
   ---------------------------------------------------------
   Navegación · menú móvil · datos de contacto desde config ·
   asistente "Encuentra el detalle perfecto" · estudio de
   personalización · galería con lightbox · testimonios ·
   fechas especiales con cuenta regresiva · WhatsApp
   ========================================================= */
(function () {
  const CFG = window.TDC_CONFIG || {};
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const wa = (t) => window.tdcWhatsappLink(t);

  /* ---------- Intro: solo la primera vez por sesión ---------- */
  function initIntro() {
    try { sessionStorage.setItem("tdc-intro", "1"); } catch (e) {}
    const intro = $("#intro");
    if (!intro) return;
    intro.addEventListener("animationend", e => { if (e.animationName === "introOut") intro.remove(); });
    setTimeout(() => intro.isConnected && intro.remove(), 4000);
  }

  /* ---------- Datos de contacto desde js/config.js ---------- */
  function formatPhone(n) {
    const d = String(n).replace(/\D/g, "");
    if (d.length < 9) return "+" + d;
    const cc = d.slice(0, d.length - 9), rest = d.slice(-9);
    return `+${cc} ${rest.slice(0, 3)} ${rest.slice(3, 6)} ${rest.slice(6)}`;
  }
  function initConfig() {
    $$("[data-wa]").forEach(a => { a.href = wa(); });
    $$("[data-social]").forEach(a => { const u = CFG.redes && CFG.redes[a.dataset.social]; if (u) a.href = u; });
    $$('[data-cfg="telefono"]').forEach(el => { el.textContent = formatPhone(CFG.whatsapp); });
    $$('[data-cfg="ubicacion"]').forEach(el => { el.textContent = CFG.ubicacion; });
    $$('[data-cfg="ubicacionDetalle"]').forEach(el => { el.textContent = CFG.ubicacionDetalle; });
    $$('[data-cfg="horario"]').forEach(el => { el.textContent = CFG.horario; });
    $$('[data-cfg="horarioDetalle"]').forEach(el => { el.textContent = CFG.horarioDetalle; });
    $$("[data-map]").forEach(a => { a.href = CFG.mapa; });
    $$("[data-year]").forEach(el => { el.textContent = new Date().getFullYear(); });
  }

  /* ---------- Navegación ---------- */
  function initNav() {
    const nav = $("#nav");
    if (!nav) return;
    const menu = $("#mobile-menu");
    const burger = $(".burger");
    let open = false;

    tdcOnScroll((y, v) => {
      nav.classList.toggle("is-scrolled", y > 40);
      if (open) return;
      if (y > 480 && v > 4) nav.classList.add("is-hidden");
      else if (v < -4 || y < 480) nav.classList.remove("is-hidden");
    });

    function setMenu(state) {
      open = state;
      burger.setAttribute("aria-expanded", state);
      burger.setAttribute("aria-label", state ? "Cerrar menú" : "Abrir menú");
      if (state) {
        menu.hidden = false;
        requestAnimationFrame(() => requestAnimationFrame(() => menu.classList.add("is-open")));
        document.body.style.overflow = "hidden";
        nav.classList.remove("is-hidden");
        setTimeout(() => { const f = menu.querySelector("a"); f && f.focus({ preventScroll: true }); }, 350);
      } else {
        menu.classList.remove("is-open");
        document.body.style.overflow = "";
        setTimeout(() => { if (!open) menu.hidden = true; }, reduced ? 0 : 750);
      }
    }
    burger && burger.addEventListener("click", () => setMenu(!open));
    menu && menu.addEventListener("click", e => { if (e.target.closest("a")) setMenu(false); });
    document.addEventListener("keydown", e => { if (e.key === "Escape" && open) { setMenu(false); burger.focus(); } });
    window.addEventListener("resize", () => { if (open && window.innerWidth > 1180) setMenu(false); });

    /* Enlace activo según la sección visible */
    const links = $$('.nav__link[href^="#"]');
    const map = new Map();
    links.forEach(l => { const s = document.querySelector(l.getAttribute("href")); if (s) map.set(s, l); });
    if (!map.size) return;
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { links.forEach(l => l.classList.remove("is-active")); map.get(e.target).classList.add("is-active"); }
    }), { rootMargin: "-45% 0px -50% 0px" });
    map.forEach((_, s) => io.observe(s));
  }

  /* ---------- WhatsApp flotante ---------- */
  function initWaFloat() {
    const f = $(".wa-float");
    if (!f) return;
    const delay = document.body.classList.contains("page-home") && !document.documentElement.classList.contains("no-intro") ? 3200 : 900;
    setTimeout(() => f.classList.add("is-visible"), reduced ? 0 : delay);
    setTimeout(() => { f.classList.add("is-hint"); setTimeout(() => f.classList.remove("is-hint"), 3800); }, delay + 7000);
  }

  /* ---------- Detalle de la semana ---------- */
  function initFeatured() {
    const p = window.tdcProducto && window.tdcProducto(CFG.destacado);
    const name = $("#feat-title");
    if (!p || !name) return;
    name.textContent = p.nombre;
    $("#feat-desc").textContent = p.descripcion;
    $("#feat-list").innerHTML = p.incluye.map(x => `<li>${x}</li>`).join("");
    $("#feat-price").textContent = (p.desde ? "desde " : "") + tdcPrecio(p.precio);
    $("#feat-btn").href = wa(`¡Hola Tu Detalle Chincha! 🎁 Quiero sorprender con el detalle de la semana: "${p.nombre}" (${tdcPrecio(p.precio)}).`);
    const fig = $("#feat-media");
    const img = fig && fig.querySelector("img");
    if (img && img.getAttribute("src") !== p.imagen) {
      const ph = fig.querySelector(".media__ph"); ph && ph.remove();
      fig.classList.remove("is-loaded", "is-missing");
      delete fig.dataset.ready;
      fig.dataset.art = p.art; fig.dataset.tone = p.tono;
      img.src = p.imagen; img.alt = `${p.nombre}, detalle de la semana`;
      window.tdcMedia(fig.parentElement);
    }
  }

  /* ---------- Asistente: Encuentra el detalle perfecto ---------- */
  const LABELS = {
    para: { pareja: "tu pareja", mama: "mamá", papa: "papá", amigo: "tu amigo/a", familiar: "un familiar", companero: "un compañero/a" },
    emocion: { amor: "amor", agradecimiento: "agradecimiento", felicidad: "felicidad", sorpresa: "sorpresa", carino: "cariño", celebracion: "celebración" },
    ocasion: { cumpleanos: "su cumpleaños", aniversario: "su aniversario", sanvalentin: "San Valentín", madre: "el Día de la Madre", padre: "el Día del Padre", otra: "una ocasión especial" }
  };
  function initFinder() {
    const root = $("#encuentra");
    if (!root) return;
    const steps = $$(".fstep", root);
    const prog = $$(".finder__progress li", root);
    const bar = $(".finder__bar i", root);
    const back = $("#finder-back");
    const card = $(".finder__card", root);
    const state = {};
    let cur = 0, busy = false;

    $$(".fopts", root).forEach(g => $$(".fopt", g).forEach((b, i) => b.style.setProperty("--i", i)));

    function paintProgress(n) {
      prog.forEach((li, i) => {
        li.classList.toggle("is-current", i === n);
        li.classList.toggle("is-done", i < n);
      });
      bar.parentElement.style.setProperty("--prog", n === 3 ? 1 : (n + 1) / 4);
      bar.style.transform = `scaleX(${n === 3 ? 1 : (n + 1) / 4})`;
      back.hidden = n === 0;
    }

    function go(n) {
      if (busy || n === cur) return;
      busy = true;
      const from = steps[cur], to = steps[n];
      from.classList.remove("is-enter");
      from.classList.add("is-leave");
      setTimeout(() => {
        from.hidden = true; from.classList.remove("is-leave", "is-current");
        if (n === 3) renderResults();
        to.hidden = false; to.classList.add("is-current");
        void to.offsetWidth;
        to.classList.add("is-enter");
        cur = n; busy = false;
        paintProgress(n);
        const r = card.getBoundingClientRect();
        if (r.top < 0 || r.top > window.innerHeight * .6) card.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
        const focusable = to.querySelector(".fopt, a, button");
        focusable && focusable.focus({ preventScroll: true });
      }, reduced ? 0 : 380);
    }

    function burst(btn) {
      if (reduced) return;
      for (let i = 0; i < 10; i++) {
        const s = document.createElement("span");
        s.className = "burst";
        const a = (Math.PI * 2 * i) / 10 + Math.random() * .4, d = 40 + Math.random() * 40;
        s.style.setProperty("--dx", `${Math.cos(a) * d}px`);
        s.style.setProperty("--dy", `${Math.sin(a) * d}px`);
        btn.appendChild(s);
        setTimeout(() => s.remove(), 850);
      }
    }

    steps.forEach((step, idx) => {
      step.addEventListener("click", e => {
        const b = e.target.closest(".fopt");
        if (!b || busy) return;
        $$(".fopt", step).forEach(o => { o.classList.remove("is-picked"); o.setAttribute("aria-pressed", "false"); });
        b.classList.add("is-picked"); b.setAttribute("aria-pressed", "true");
        state[step.dataset.key] = b.dataset.value;
        burst(b);
        setTimeout(() => go(idx + 1), reduced ? 0 : 480);
      });
    });

    back.addEventListener("click", () => go(Math.max(0, cur - 1)));
    $("#finder-restart").addEventListener("click", () => {
      Object.keys(state).forEach(k => delete state[k]);
      $$(".fopt", root).forEach(o => { o.classList.remove("is-picked"); o.setAttribute("aria-pressed", "false"); });
      go(0);
    });

    function renderResults() {
      const list = window.TDC_PRODUCTOS.map((p, order) => {
        let s = 0;
        if (p.para.includes(state.para)) s += 3;
        if (state.ocasion && state.ocasion !== "otra" && p.ocasiones.includes(state.ocasion)) s += 3;
        if (state.ocasion === "otra" && p.ocasiones.includes("especial")) s += 1;
        if (p.emociones.includes(state.emocion)) s += 2;
        return { p, s, order };
      }).sort((a, b) => b.s - a.s || a.order - b.order).slice(0, 3);

      $("#finder-summary").innerHTML =
        `Para <strong>${LABELS.para[state.para] || "esa persona"}</strong>, para transmitir <strong>${LABELS.emocion[state.emocion] || "algo especial"}</strong>, en <strong>${LABELS.ocasion[state.ocasion] || "su día"}</strong>.`;

      const grid = $("#finder-results");
      grid.innerHTML = list.map(({ p }, i) => `
        <article class="fidea" style="--i:${i}">
          <figure class="media" data-art="${p.art}" data-tone="${p.tono}"><img src="${p.imagen}" alt="${p.nombre}" loading="lazy" decoding="async"></figure>
          <div class="fidea__body">
            <h4 class="fidea__name">${p.nombre}</h4>
            <p class="fidea__desc">${p.descripcion}</p>
            <div class="fidea__row">
              <span class="fidea__price">${p.desde ? "desde " : ""}${tdcPrecio(p.precio)}</span>
              <a class="fidea__link" href="${wa(`¡Hola Tu Detalle Chincha! 🎁 El asistente me recomendó "${p.nombre}" (${tdcPrecio(p.precio)}). Es para ${LABELS.para[state.para]}, por ${LABELS.ocasion[state.ocasion]}.`)}" target="_blank" rel="noopener">Lo quiero ${tdcIcon("arrow")}</a>
            </div>
          </div>
        </article>`).join("");
      window.tdcMedia(grid);

      $("#finder-wa").href = wa(`¡Hola Tu Detalle Chincha! 🎁 Busco un detalle para ${LABELS.para[state.para]}, quiero transmitir ${LABELS.emocion[state.emocion]} y es por ${LABELS.ocasion[state.ocasion]}. ¿Qué me recomiendan?`);
    }

    paintProgress(0);
  }

  /* ---------- Estudio de personalización ---------- */
  const COLORS = {
    verde: ["#1f5c45", "#174a37", "#e9dcc0"],
    marfil: ["#f3ecdd", "#e2d6bd", "#1f5c45"],
    rosa: ["#e9cfc8", "#d9b7ad", "#fbf8f1"],
    champagne: ["#e3cfa6", "#cfb785", "#0d3a2b"],
    noche: ["#0d3a2b", "#082a1f", "#c4a263"]
  };
  const THEMES = {
    romantica: ["heart", "heart", "sparkle", "heart"],
    cumpleanos: ["balloon", "star", "balloon", "sparkle"],
    elegante: ["sparkle", "star", "sparkle", "star"],
    bebe: ["star", "bear", "star", "heart"]
  };
  const NAMES = { verde: "verde", marfil: "marfil", rosa: "rosa tenue", champagne: "champagne", noche: "esmeralda noche" };
  function initStudio() {
    const form = $("#studio-form");
    if (!form) return;
    const pv = $("#studio-preview");
    const tag = $("#studio-tag"), card = $("#studio-card");
    const name = $("#st-name"), msg = $("#st-msg"), photo = $("#st-photo");
    const deco = $$(".studio__deco use", pv);
    let hasPhoto = false;

    const val = n => (form.querySelector(`input[name="${n}"]:checked`) || {}).value;
    function bump() {
      if (reduced) return;
      pv.classList.remove("bump"); void pv.offsetWidth; pv.classList.add("bump");
    }
    function update(withBump) {
      tag.textContent = name.value.trim() || "Para ti";
      card.textContent = msg.value.trim() || "Gracias por existir.";
      const c = COLORS[val("st-color")] || COLORS.verde;
      pv.style.setProperty("--box", c[0]); pv.style.setProperty("--box-d", c[1]); pv.style.setProperty("--rib", c[2]);
      pv.dataset.shape = val("st-shape") || "caja";
      (THEMES[val("st-theme")] || THEMES.romantica).forEach((ic, i) => deco[i] && deco[i].setAttribute("href", "#i-" + ic));
      if (withBump) bump();
      const lines = [
        "¡Hola Tu Detalle Chincha! 🎁 Quiero un detalle personalizado:",
        `• Presentación: ${val("st-shape")}`,
        `• Color: ${NAMES[val("st-color")]}`,
        `• Temática: ${val("st-theme")}`,
        `• Nombre: ${name.value.trim() || "(por definir)"}`,
        `• Dedicatoria: ${msg.value.trim() || "(por definir)"}`
      ];
      if (hasPhoto) lines.push("• Quiero incluir una foto (te la envío por aquí).");
      $("#studio-wa").href = wa(lines.join("\n"));
    }
    form.addEventListener("input", e => update(e.target.type === "radio"));
    form.addEventListener("change", e => { if (e.target.type === "radio") update(true); });
    form.addEventListener("submit", e => e.preventDefault());
    photo.addEventListener("change", () => {
      const f = photo.files && photo.files[0];
      if (!f || !f.type.startsWith("image/")) return;
      const r = new FileReader();
      r.onload = () => {
        const box = $("#studio-photo");
        box.innerHTML = `<span role="img" aria-label="Tu foto de prueba" style="background-image:url('${r.result}')"></span>`;
        hasPhoto = true; update(true);
      };
      r.readAsDataURL(f);
    });
    update(false);
  }

  /* ---------- Galería + lightbox ---------- */
  function initGallery() {
    const items = $$(".mosaic__item");
    const lb = $("#lightbox");
    if (!items.length || !lb) return;
    const holder = $(".lightbox__img", lb), cap = $(".lightbox__cap", lb);
    let idx = 0, lastFocus = null;

    function show(i, fromEl) {
      idx = (i + items.length) % items.length;
      const src = items[idx].querySelector(".media");
      const clone = src.cloneNode(true);
      clone.removeAttribute("data-parallax"); clone.style.removeProperty("--py");
      const img = clone.querySelector("img"); if (img) img.removeAttribute("loading");
      holder.innerHTML = ""; holder.appendChild(clone);
      cap.textContent = items[idx].dataset.caption || "";
      if (fromEl && !reduced) {
        const a = fromEl.getBoundingClientRect(), b = holder.getBoundingClientRect();
        holder.style.setProperty("--lx", `${(a.left + a.width / 2) - (b.left + b.width / 2)}px`);
        holder.style.setProperty("--ly", `${(a.top + a.height / 2) - (b.top + b.height / 2)}px`);
        holder.style.setProperty("--ls", Math.max(.2, Math.min(1, a.width / b.width)).toFixed(3));
      } else {
        holder.style.setProperty("--lx", "0px"); holder.style.setProperty("--ly", "0px"); holder.style.setProperty("--ls", ".92");
      }
      holder.style.animation = "none"; void holder.offsetWidth; holder.style.animation = "";
    }
    function open(i) {
      lastFocus = document.activeElement;
      lb.hidden = false; lb.classList.remove("is-closing");
      document.body.style.overflow = "hidden";
      show(i, items[i]);
      $(".lightbox__close", lb).focus();
    }
    function close() {
      lb.classList.add("is-closing");
      setTimeout(() => { lb.hidden = true; lb.classList.remove("is-closing"); document.body.style.overflow = ""; lastFocus && lastFocus.focus(); }, reduced ? 0 : 340);
    }
    items.forEach((it, i) => it.addEventListener("click", () => open(i)));
    $(".lightbox__close", lb).addEventListener("click", close);
    $(".lightbox__nav--prev", lb).addEventListener("click", () => show(idx - 1));
    $(".lightbox__nav--next", lb).addEventListener("click", () => show(idx + 1));
    lb.addEventListener("click", e => { if (e.target === lb) close(); });
    document.addEventListener("keydown", e => {
      if (lb.hidden) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") show(idx - 1);
      if (e.key === "ArrowRight") show(idx + 1);
      if (e.key === "Tab") { /* mantener el foco dentro */
        const f = $$("button", lb); const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
    let sx = null;
    lb.addEventListener("touchstart", e => { sx = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener("touchend", e => { if (sx === null) return; const dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 50) show(idx + (dx < 0 ? 1 : -1)); sx = null; });
  }

  /* ---------- Testimonios ---------- */
  function initReviews() {
    const track = $("#reviews-track");
    if (!track || !CFG.testimonios) return;
    const html = (hidden) => CFG.testimonios.map(t => `
      <figure class="review"${hidden ? ' aria-hidden="true"' : ""}>
        <span class="review__mark" aria-hidden="true">“</span>
        <blockquote class="review__text">${t.texto}</blockquote>
        <figcaption class="review__foot">
          <span class="review__who"><strong>${t.autor}</strong><span>${t.ocasion}</span></span>
          ${t.ejemplo ? '<span class="review__demo">Ejemplo</span>' : ""}
        </figcaption>
      </figure>`).join("");
    track.innerHTML = html(false) + (reduced ? "" : html(true));
  }

  /* ---------- Fechas especiales con cuenta regresiva ---------- */
  function nthSunday(year, month, n) {
    const d = new Date(year, month, 1);
    const first = (7 - d.getDay()) % 7 + 1;
    return new Date(year, month, first + (n - 1) * 7);
  }
  function nextDate(fn) {
    const today = new Date(); today.setHours(0, 0, 0, 0);
    let d = fn(today.getFullYear());
    if (d < today) d = fn(today.getFullYear() + 1);
    return { date: d, days: Math.round((d - today) / 86400000) };
  }
  function initDates() {
    const grid = $("#dates-grid");
    if (!grid) return;
    const fmt = d => {
      const s = d.toLocaleDateString("es-PE", { weekday: d.getDay() === 0 ? "long" : undefined, day: "numeric", month: "long", year: "numeric" });
      return s.charAt(0).toUpperCase() + s.slice(1);
    };
    const items = [
      { name: "San Valentín", icon: "heart", link: "pareja", calc: y => new Date(y, 1, 14) },
      { name: "Día de la Madre", icon: "rose", link: "mama", calc: y => nthSunday(y, 4, 2) },
      { name: "Día del Padre", icon: "tie", link: "papa", calc: y => nthSunday(y, 5, 3) },
      { name: "Cumpleaños", icon: "cake", link: "cumpleanos", always: "Todo el año, cuando más importa." },
      { name: "Aniversarios", icon: "ring", link: "aniversario", always: "Un año más merece celebrarse." },
      { name: "Navidad", icon: "tree", link: "especial", calc: y => new Date(y, 11, 25) }
    ].map(it => it.calc ? Object.assign(it, nextDate(it.calc)) : it);

    const soonest = items.filter(i => i.calc).sort((a, b) => a.days - b.days)[0];
    const tones = ["date--blush", "date--champagne", "date--pastel", "", "date--pastel", "date--champagne"];

    grid.innerHTML = items.map((it, i) => {
      const isNext = it === soonest;
      const cls = isNext ? "date--deep" : tones[i];
      const num = it.calc
        ? (it.days === 0 ? `<p class="date__num">¡Hoy!</p>` : `<p class="date__num"><span data-count="${it.days}">${it.days}</span><small>${it.days === 1 ? "día" : "días"}</small></p>`)
        : `<p class="date__num" aria-hidden="true">365<small>días</small></p>`;
      return `
      <article class="date ${cls}" data-reveal="up">
        <div class="date__top">${tdcIcon(it.icon, "ico date__ico")}${isNext ? '<span class="date__badge">La próxima</span>' : ""}</div>
        <div class="date__mid">
          ${num}
          <h3 class="date__name">${it.name}</h3>
          <p class="date__when">${it.calc ? fmt(it.date) : it.always}</p>
        </div>
        <a class="date__link" href="productos.html#${it.link}">Ver detalles ${tdcIcon("arrow")}</a>
      </article>`;
    }).join("");

    /* números que cuentan al entrar en pantalla */
    if (reduced || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return;
      io.unobserve(e.target);
      const el = e.target, end = +el.dataset.count, t0 = performance.now(), dur = 1400;
      (function tick(now) {
        const p = Math.min(1, (now - t0) / dur), ease = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(end * ease);
        if (p < 1) requestAnimationFrame(tick);
      })(t0);
    }), { threshold: .6 });
    $$("[data-count]", grid).forEach(el => { el.textContent = "0"; io.observe(el); });
  }

  /* ---------- Formulario breve de contacto → WhatsApp ---------- */
  function initContactForm() {
    const form = $("#contact-form");
    if (!form) return;
    const out = $("#contact-out"), err = $("#contact-error");
    form.addEventListener("submit", e => {
      e.preventDefault();
      const n = $("#cf-name").value.trim(), o = $("#cf-occasion").value, m = $("#cf-msg").value.trim();
      if (!n || !m) { err.hidden = false; err.textContent = "Escribe tu nombre y lo que estás buscando para preparar el mensaje."; (!n ? $("#cf-name") : $("#cf-msg")).focus(); return; }
      err.hidden = true;
      const url = wa(`¡Hola Tu Detalle Chincha! 🎁 Soy ${n}.${o ? ` Busco un detalle para: ${o}.` : ""}\n${m}`);
      out.href = url; out.hidden = false;
      let w = null;
      try { w = window.open(url, "_blank", "noopener"); } catch (x) {}
      out.focus();
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    initIntro();
    initConfig();
    initNav();
    initWaFloat();
    initFeatured();
    initFinder();
    initStudio();
    initGallery();
    initReviews();
    initDates();
    initContactForm();
    /* los elementos creados aquí también se revelan al hacer scroll */
    if (window.tdcReveal) {
      $$("#dates-grid [data-reveal]").forEach((el, i) => el.style.setProperty("--i", i % 3));
      const io = "IntersectionObserver" in window && !reduced ? new IntersectionObserver(es => es.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add("revealed"); io.unobserve(e.target); setTimeout(() => e.target.classList.remove("will-reveal", "revealed"), 2400); }
      }), { rootMargin: "0px 0px -8% 0px", threshold: .12 }) : null;
      if (io) $$("#dates-grid [data-reveal]").forEach(el => {
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight * .92) return;
        el.classList.add("will-reveal"); io.observe(el);
      });
    }
  });
})();

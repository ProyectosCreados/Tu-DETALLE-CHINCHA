/* =========================================================
   TU DETALLE CHINCHA · ANIMACIONES
   ---------------------------------------------------------
   - Reveal on scroll con IntersectionObserver (jerarquía + stagger)
   - Titular que aparece palabra por palabra (blur reveal)
   - Parallax (scroll y mouse) · Olas del logo que "respiran"
     con la velocidad del scroll · Línea del proceso que se dibuja
   - Texto de la historia que se "lee" solo al hacer scroll
   - Cursor sutil · Botones magnéticos · Tarjetas con inclinación 3D
   Todo usa transform/opacity y se pausa fuera de pantalla.
   ========================================================= */
(function () {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  let vh = window.innerHeight;
  window.addEventListener("resize", () => { vh = window.innerHeight; }, { passive: true });

  /* ---------- Bus de scroll (un solo listener, sincronizado con rAF) ---------- */
  const scrollFns = [];
  let ticking = false, lastY = window.scrollY, velocity = 0;
  window.tdcOnScroll = (fn) => { scrollFns.push(fn); fn(window.scrollY, 0); };
  function runScroll() {
    const y = window.scrollY;
    velocity = y - lastY; lastY = y;
    scrollFns.forEach(fn => fn(y, velocity));
    ticking = false;
  }
  window.addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(runScroll); } }, { passive: true });
  window.addEventListener("resize", () => requestAnimationFrame(runScroll), { passive: true });

  /* ---------- Titular palabra por palabra ---------- */
  function splitTitle(el) {
    let i = 0;
    [...el.childNodes].forEach(node => {
      if (node.nodeType === 3) {
        const frag = document.createDocumentFragment();
        node.textContent.split(/(\s+)/).forEach(part => {
          if (!part) return;
          if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
          const s = document.createElement("span");
          s.className = "w"; s.style.setProperty("--i", i++); s.textContent = part;
          frag.appendChild(s);
        });
        node.replaceWith(frag);
      } else if (node.nodeType === 1) {
        const wrap = document.createElement("span");
        wrap.className = "w"; wrap.style.setProperty("--i", i++);
        node.replaceWith(wrap); wrap.appendChild(node);
      }
    });
    el.classList.add("is-split");
  }

  /* ---------- Reveal on scroll ---------- */
  function initReveal() {
    const els = [...document.querySelectorAll("[data-reveal]")];
    document.querySelectorAll("[data-stagger]").forEach(group => {
      [...group.children].filter(c => c.hasAttribute("data-reveal"))
        .forEach((c, i) => c.style.setProperty("--i", i % 8));
    });
    if (reduced || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add("revealed");
          io.unobserve(e.target);
          setTimeout(() => e.target.classList.remove("will-reveal", "revealed"), 2400);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });
    els.forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.top < vh * 0.92 && r.bottom > 0) return; // ya visible: se queda visible
      el.classList.add("will-reveal");
      io.observe(el);
    });
  }
  window.tdcReveal = initReveal;

  /* ---------- Partículas del hero ---------- */
  function initMotes() {
    const box = document.querySelector(".motes");
    if (!box || reduced) return;
    const n = window.innerWidth < 640 ? 9 : 18;
    for (let i = 0; i < n; i++) {
      const m = document.createElement("span");
      m.className = "mote";
      m.style.cssText = `left:${Math.random() * 100}%;top:${20 + Math.random() * 75}%;--s:${1.5 + Math.random() * 3}px;--t:${9 + Math.random() * 10}s;--dl:${-Math.random() * 12}s;--o:${.25 + Math.random() * .5};--dx:${(Math.random() - .5) * 80}px`;
      box.appendChild(m);
    }
  }

  /* ---------- Hero: parallax con el mouse + salida cinematográfica al hacer scroll ---------- */
  function initHero() {
    const hero = document.querySelector(".hero");
    if (!hero || reduced) return;
    const layers = [...hero.querySelectorAll("[data-depth]")];
    const copy = hero.querySelector(".hero__copy");
    const stage = hero.querySelector(".hero__stage");

    if (finePointer) {
      let tx = 0, ty = 0, cx = 0, cy = 0, raf = null;
      const loop = () => {
        cx += (tx - cx) * .08; cy += (ty - cy) * .08;
        layers.forEach(l => {
          const d = parseFloat(l.dataset.depth) || .5;
          l.style.translate = `${(cx * 22 * d).toFixed(2)}px ${(cy * 16 * d).toFixed(2)}px`;
        });
        raf = (Math.abs(tx - cx) + Math.abs(ty - cy) > .001) ? requestAnimationFrame(loop) : null;
      };
      hero.addEventListener("pointermove", e => {
        const r = hero.getBoundingClientRect();
        tx = (e.clientX - r.left) / r.width - .5;
        ty = (e.clientY - r.top) / r.height - .5;
        if (!raf) raf = requestAnimationFrame(loop);
      });
      hero.addEventListener("pointerleave", () => { tx = 0; ty = 0; if (!raf) raf = requestAnimationFrame(loop); });
    }

    tdcOnScroll(y => {
      const h = hero.offsetHeight;
      if (y > h) return;
      const p = y / h;
      if (copy) { copy.style.transform = `translateY(${p * 90}px)`; copy.style.opacity = 1 - p * 1.1; }
      if (stage) stage.style.transform = `translateY(${p * -40}px) scale(${1 - p * .06})`;
    });
  }

  /* ---------- Parallax de imágenes ---------- */
  function initParallax() {
    if (reduced) return;
    const els = [...document.querySelectorAll("[data-parallax]")];
    if (!els.length) return;
    const visible = new Set();
    const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)), { rootMargin: "100px" });
    els.forEach(el => io.observe(el));
    tdcOnScroll(() => {
      visible.forEach(el => {
        const r = el.getBoundingClientRect();
        const off = (r.top + r.height / 2 - vh / 2) * (parseFloat(el.dataset.parallax) || .08);
        el.style.setProperty("--py", `${off.toFixed(1)}px`);
      });
    });
  }

  /* ---------- Olas del logo que respiran con el scroll ---------- */
  function initWaves() {
    const waves = [...document.querySelectorAll("[data-wave]")].map((el, i) => ({
      el, fill: el.querySelector(".wave__fill"), line: el.querySelector(".wave__line"),
      ph: i * 1.7, dir: i % 2 ? 1 : -1, on: false
    }));
    if (!waves.length || reduced) return;
    const W = 1440, H = 120, STEP = 36;
    let boost = 0, t = 0, running = false;

    const io = new IntersectionObserver(es => {
      es.forEach(e => { const w = waves.find(w => w.el === e.target); if (w) w.on = e.isIntersecting; });
      if (!running && waves.some(w => w.on)) { running = true; requestAnimationFrame(frame); }
    });
    waves.forEach(w => io.observe(w.el));
    tdcOnScroll((y, v) => { boost = Math.min(26, boost + Math.abs(v) * .08); });

    function build(w, base, amp) {
      let d = "";
      for (let x = 0; x <= W; x += STEP) {
        const y = base
          + Math.sin(x / W * Math.PI * 2 * 1.4 + t * w.dir + w.ph) * amp * .7
          + Math.sin(x / W * Math.PI * 2 * 3.2 - t * 1.3 * w.dir + w.ph) * amp * .3;
        d += (x ? " L" : "M") + x + " " + y.toFixed(1);
      }
      return d;
    }
    function frame() {
      if (!waves.some(w => w.on)) { running = false; return; }
      t += .012 + boost * .002;
      boost *= .94;
      const amp = 14 + boost;
      waves.forEach(w => {
        if (!w.on) return;
        const line = build(w, 52, amp);
        w.fill.setAttribute("d", build(w, 70, amp * .9) + ` L${W} ${H} L0 ${H}Z`);
        w.line.setAttribute("d", line);
      });
      requestAnimationFrame(frame);
    }
  }

  /* ---------- Línea del proceso ---------- */
  function initProcess() {
    const track = document.getElementById("process-track");
    if (!track) return;
    const draw = track.querySelector(".process__draw");
    const svg = track.querySelector(".process__line");
    const vline = track.querySelector(".process__vline");
    const steps = [...track.querySelectorAll(".pstep")];
    tdcOnScroll(() => {
      const r = track.getBoundingClientRect();
      if (r.top > vh * 1.2 || r.bottom < -vh * .2) return;
      const horizontal = svg && getComputedStyle(svg).display !== "none";
      if (horizontal) {
        const p = clamp((vh * .85 - r.top) / (vh * .55), 0, 1);
        draw.style.strokeDashoffset = reduced ? 0 : (1 - p).toFixed(4);
        steps.forEach(s => s.classList.toggle("is-active", reduced || p >= parseFloat(s.dataset.at)));
      } else {
        const p = clamp((vh * .7 - r.top) / r.height, 0, 1);
        vline && vline.style.setProperty("--prog", reduced ? 1 : p.toFixed(4));
        steps.forEach(s => s.classList.toggle("is-active", reduced || s.getBoundingClientRect().top < vh * .7));
      }
    });
  }

  /* ---------- Historia: el texto se "lee" con el scroll ---------- */
  function initScrub() {
    document.querySelectorAll("[data-scrub]").forEach(el => {
      const words = el.textContent.trim().split(/\s+/);
      el.innerHTML = words.map(w => `<span class="sw">${w}</span>`).join(" ");
      const spans = [...el.querySelectorAll(".sw")];
      if (reduced) return;
      tdcOnScroll(() => {
        const r = el.getBoundingClientRect();
        if (r.top > vh || r.bottom < 0) return;
        const p = clamp((vh * .82 - r.top) / (r.height + vh * .3), 0, 1);
        const f = p * (spans.length + 4);
        spans.forEach((s, i) => s.style.setProperty("--o", (.16 + .84 * clamp(f - i, 0, 1)).toFixed(3)));
      });
    });
  }

  /* ---------- Hilo dorado de progreso ---------- */
  function initThread() {
    const bar = document.querySelector(".thread__bar");
    if (!bar) return;
    tdcOnScroll(y => {
      const max = document.documentElement.scrollHeight - vh;
      bar.style.setProperty("--p", max > 0 ? (y / max).toFixed(4) : 0);
    });
  }

  /* ---------- Cursor sutil ---------- */
  function initCursor() {
    if (!finePointer || reduced) return;
    const c = document.querySelector(".cursor");
    if (!c) return;
    document.documentElement.classList.add("has-cursor");
    const dot = c.querySelector(".cursor__dot"), ring = c.querySelector(".cursor__ring"), label = c.querySelector(".cursor__label");
    let x = -100, y = -100, rx = -100, ry = -100;
    window.addEventListener("pointermove", e => { x = e.clientX; y = e.clientY; c.classList.remove("is-hidden"); dot.style.transform = `translate(${x}px,${y}px)`; }, { passive: true });
    document.addEventListener("pointerleave", () => c.classList.add("is-hidden"));
    (function loop() {
      rx += (x - rx) * .18; ry += (y - ry) * .18;
      ring.style.transform = `translate(${rx.toFixed(1)}px,${ry.toFixed(1)}px)`;
      requestAnimationFrame(loop);
    })();
    document.addEventListener("pointerover", e => {
      const t = e.target.closest("[data-cursor], a, button, label, .swatch");
      const lab = t && t.closest("[data-cursor]");
      c.classList.toggle("is-hover", !!t && !lab);
      c.classList.toggle("is-label", !!lab);
      if (lab) label.textContent = lab.dataset.cursor;
    });
  }

  /* ---------- Botones magnéticos + relleno desde el puntero ---------- */
  function initButtons() {
    document.addEventListener("pointerover", e => {
      const b = e.target.closest(".btn");
      if (!b) return;
      const r = b.getBoundingClientRect();
      b.style.setProperty("--x", `${e.clientX - r.left}px`);
      b.style.setProperty("--y", `${e.clientY - r.top}px`);
    });
    if (!finePointer || reduced) return;
    document.querySelectorAll("[data-magnetic]").forEach(b => {
      const inner = b.firstElementChild;
      b.addEventListener("pointermove", e => {
        const r = b.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
        b.style.transition = "transform .25s var(--ease)";
        b.style.transform = `translate(${dx * .22}px, ${dy * .32}px)`;
        if (inner) inner.style.transform = `translate(${dx * .08}px, ${dy * .1}px)`;
      });
      b.addEventListener("pointerleave", () => {
        b.style.transition = "transform .8s var(--ease-back)";
        b.style.transform = "";
        if (inner) inner.style.transform = "";
      });
    });
  }

  /* ---------- Inclinación 3D con brillo que sigue al puntero ---------- */
  function initTilt() {
    if (!finePointer || reduced) return;
    document.querySelectorAll("[data-tilt]").forEach(card => {
      card.setAttribute("data-tilted", "");
      card.addEventListener("pointermove", e => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
        card.style.transition = "transform .2s ease-out, box-shadow .7s";
        card.style.transform = `perspective(900px) translateY(-8px) rotateX(${(.5 - py) * 7}deg) rotateY(${(px - .5) * 8}deg)`;
        card.style.setProperty("--mx", `${px * 100}%`);
        card.style.setProperty("--my", `${py * 100}%`);
      });
      card.addEventListener("pointerleave", () => {
        card.style.transition = "transform .9s var(--ease), box-shadow .7s";
        card.style.transform = "";
      });
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-split]").forEach(splitTitle);
    initReveal();
    initMotes();
    initHero();
    initParallax();
    initWaves();
    initProcess();
    initScrub();
    initThread();
    initCursor();
    initButtons();
    initTilt();
  });
})();

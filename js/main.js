/* =============================================================
   main.js — composition root
   ============================================================= */
import {
  profile, systemNodes, metrics, experience, projects,
  skills, skillProjectMap, learning, education, nav,
} from "./data.js";
import { VISUALS } from "./visuals.js";

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

/* ---------------- Navbar + mobile menu ---------------- */
function buildNav() {
  $("#navLinks").innerHTML = nav
    .map((n) => `<a class="nav__link" href="#${n.id}" data-nav="${n.id}" data-cursor="hover">${n.label}</a>`)
    .join("");
  $("#menuList").innerHTML = nav
    .map((n, i) => `<a class="menu__item" href="#${n.id}" style="transition-delay:${0.06 * i + 0.1}s">${n.label}<small>0${i + 1}</small></a>`)
    .join("");

  const toggle = $("#navToggle");
  const close = () => {
    document.body.classList.remove("menu-open", "is-locked");
    toggle.setAttribute("aria-expanded", "false");
    $("#menu").setAttribute("aria-hidden", "true");
  };
  toggle.addEventListener("click", () => {
    const open = !document.body.classList.contains("menu-open");
    document.body.classList.toggle("menu-open", open);
    document.body.classList.toggle("is-locked", open);
    toggle.setAttribute("aria-expanded", String(open));
    $("#menu").setAttribute("aria-hidden", String(!open));
  });
  $$("#menuList a").forEach((a) => a.addEventListener("click", close));
  window.addEventListener("keydown", (e) => e.key === "Escape" && close());
}

/* ---------------- Hero ---------------- */
function buildHero() {
  // orbit nodes
  $("#panelNodes").innerHTML = systemNodes
    .map(
      (n) => `
      <div class="node" style="left:${n.x}%;top:${n.y}%" tabindex="0">
        <span class="node__idx">${n.idx}</span>
        <span class="node__label">${n.label}</span>
        <span class="node__meta">${n.meta}</span>
      </div>`
    )
    .join("");

  // gentle pointer parallax on the panel
  if (!isTouch && !REDUCED) {
    const stage = $("#panelStage");
    const nodeEls = $$(".node", stage);
    stage.addEventListener("pointermove", (e) => {
      const r = stage.getBoundingClientRect();
      const dx = (e.clientX - r.left) / r.width - 0.5;
      const dy = (e.clientY - r.top) / r.height - 0.5;
      nodeEls.forEach((el, i) => {
        const depth = (i % 3) + 1;
        el.style.transform = `translate3d(${dx * depth * 7}px, ${dy * depth * 7}px, 0)`;
      });
    });
    stage.addEventListener("pointerleave", () => nodeEls.forEach((el) => (el.style.transform = "")));
  }

  // clock
  const clock = $("#clock");
  const tick = () => {
    clock.textContent =
      new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Kolkata" }).format(new Date()) +
      " IST";
  };
  tick();
  setInterval(tick, 30000);

  // hero glow
  if (!isTouch && !REDUCED) {
    const glow = $("#heroGlow"), hero = $(".hero");
    let tx = 0, ty = 0, cx = 0, cy = 0, on = false;
    hero.addEventListener("pointermove", (e) => {
      const r = hero.getBoundingClientRect();
      tx = e.clientX - r.left; ty = e.clientY - r.top;
      if (!on) { on = true; glow.style.opacity = "1"; cx = tx; cy = ty; }
    });
    hero.addEventListener("pointerleave", () => { on = false; glow.style.opacity = "0"; });
    (function loop() {
      cx += (tx - cx) * 0.07; cy += (ty - cy) * 0.07;
      glow.style.transform = `translate3d(${cx}px,${cy}px,0) translate(-50%,-50%)`;
      requestAnimationFrame(loop);
    })();
  }

  const words = [
    "FULL STACK", "AZURE", "DATA ENGINEERING", "REACT.JS", "NODE.JS",
    "PYTHON", "SQL", "REST APIs", "LANGCHAIN", "RAG", "PROMPT ENGINEERING",
    ".NET CORE", "MYSQL", "NOSQL", "GIT",
  ];
  const line = words.map((w) => `<span>${w} <em>/</em></span>`).join("");
  $("#marquee").innerHTML = line + line;
}

/* ---------------- About + terminal ---------------- */
function buildAbout() {
  $("#aboutText").innerHTML = profile.about.map((p) => `<p>${esc(p)}</p>`).join("");
  $("#aboutPillars").innerHTML = profile.aboutPillars.map((p) => `<li class="pill">${p}</li>`).join("");

  const lines = [
    { t: "$ whoami", c: "p" },
    { t: "krishna joshi — software engineer", c: "k" },
    { t: "$ cat stack.json", c: "p" },
    { t: '{ "frontend": ["React.js", "JavaScript"],', c: "" },
    { t: '  "backend":  ["Node.js", "REST APIs", ".NET Core"],', c: "" },
    { t: '  "data":     ["MySQL", "NoSQL", "SQL"],', c: "" },
    { t: '  "cloud":    ["Azure Data Factory", "Azure AI"],', c: "" },
    { t: '  "ai":       ["LangChain", "RAG", "Prompt Eng."] }', c: "" },
    { t: "$ ls projects/", c: "p" },
    { t: "c-hub  academic-portal  adf-pipeline  rag-assistant", c: "k" },
    { t: "# currently upskilling: kubernetes, azure ai", c: "c" },
  ];

  const host = $("#term");
  const render = (n) =>
    (host.innerHTML =
      lines.slice(0, n).map((l) => `<div class="l"><span class="${l.c}">${esc(l.t)}</span></div>`).join("") +
      (n < lines.length ? '<div class="l"><span class="caret"></span></div>' : ""));

  if (REDUCED) return render(lines.length);
  let i = 0;
  const io = new IntersectionObserver(([e]) => {
    if (!e.isIntersecting) return;
    io.disconnect();
    const step = () => { render(++i); if (i < lines.length) setTimeout(step, 190); };
    step();
  }, { threshold: 0.3 });
  io.observe(host);
}

/* ---------------- Metrics ---------------- */
function buildMetrics() {
  $("#metrics").innerHTML = metrics
    .map(
      (m) => `
      <div class="metric">
        <p class="metric__v" data-to="${m.value}" data-prefix="${m.prefix || ""}" data-suffix="${m.suffix}">${m.prefix || ""}0${m.suffix}</p>
        <p class="metric__l">${m.label}</p>
        <p class="metric__n">${m.note}</p>
      </div>`
    )
    .join("");

  const fmt = (n) => n.toLocaleString("en-US");
  $$("#metrics .metric__v").forEach((el) => {
    const to = +el.dataset.to, pre = el.dataset.prefix, suf = el.dataset.suffix;
    const set = (v) => (el.textContent = pre + fmt(v) + suf);
    if (REDUCED) return set(to);
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now(), dur = 1500;
      const run = (t) => {
        const p = Math.min((t - t0) / dur, 1);
        set(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(run);
      };
      requestAnimationFrame(run);
    }, { threshold: 0.4 });
    io.observe(el);
  });
}

/* ---------------- Experience ---------------- */
function buildExperience() {
  const rail = $("#rail");
  $("#timeline").insertAdjacentHTML(
    "beforeend",
    experience
      .map(
        (j) => `
      <article class="job reveal ${j.current ? "is-current" : ""}">
        <div class="job__meta">
          <p class="job__period">${j.period}</p>
          <h3 class="job__company">${esc(j.company)}</h3>
          <p class="job__role">${esc(j.role)}</p>
          ${j.current ? '<p class="badge-now"><i></i> CURRENT</p>' : ""}
        </div>
        <div>
          <ul class="job__points">${j.points.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>
          <ul class="tags">${j.tags.map((t) => `<li class="tag">${esc(t)}</li>`).join("")}</ul>
        </div>
      </article>`
      )
      .join("")
  );

  if (REDUCED) return rail.style.setProperty("--p", 1);
  const tl = $("#timeline");
  const onScroll = () => {
    const r = tl.getBoundingClientRect();
    const p = Math.min(Math.max((window.innerHeight * 0.8 - r.top) / r.height, 0), 1);
    rail.style.setProperty("--p", p.toFixed(3));
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

/* ---------------- Projects ---------------- */
function buildProjects() {
  $("#projectList").innerHTML = projects
    .map(
      (p) => `
      <article class="project reveal" data-layout="${p.layout}" data-id="${p.id}" id="${p.id}">
        <div class="project__head">
          <div>
            <h3 class="project__title">${esc(p.short)}</h3>
            <p class="project__org">${esc(p.org)} · ${p.year}</p>
          </div>
          <p class="project__idx" aria-hidden="true">${p.index}</p>
        </div>
        <div class="project__grid">
          <div class="project__content">
            <p class="project__summary">${esc(p.summary)}</p>
            <div class="project__impact">
              ${p.impact.map((m) => `<div><p class="pm__k">${m.k}</p><p class="pm__v">${m.v}</p></div>`).join("")}
            </div>
            <ul class="tags" style="margin-top:1.5rem">${p.tech.map((t) => `<li class="tag">${esc(t)}</li>`).join("")}</ul>
            <div class="project__actions">
              <button class="btn btn--accent" data-open="${p.id}" data-cursor="hover">
                <span>Case study</span><span class="btn__arrow">↗</span>
              </button>
            </div>
          </div>
          <div class="project__visual" data-visual="${p.visual}" data-cursor="view">
            <p class="visual__tag">${p.index} / ${esc(p.visual).toUpperCase()}</p>
            ${
              p.visual === "network"
                ? `<div class="visual__scale">
                     <div><b>3,000+</b><span>PORTS</span></div>
                     <div><b>100,000+</b><span>VESSELS</span></div>
                     <div><b>24×7</b><span>AVAILABILITY</span></div>
                   </div>
                   <p class="visual__note">Abstract network graphic —<br>not live vessel data</p>`
                : ""
            }
          </div>
        </div>
      </article>`
    )
    .join("");

  $$(".project__visual").forEach((host) => {
    const kind = host.dataset.visual;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      VISUALS[kind]?.(host);
    }, { rootMargin: "200px" });
    io.observe(host);
  });

  $$("[data-open]").forEach((b) => b.addEventListener("click", () => openProject(b.dataset.open)));
  $$(".project__visual").forEach((v) =>
    v.addEventListener("click", () => openProject(v.closest(".project").dataset.id))
  );
}

/* ---------------- Project overlay ---------------- */
let lastFocus = null;
function openProject(id) {
  const p = projects.find((x) => x.id === id);
  if (!p) return;
  lastFocus = document.activeElement;
  $("#ovBody").innerHTML = `
    <p class="overlay__idx">PROJECT ${p.index} — ${esc(p.org)}</p>
    <h3 id="ovTitle">${esc(p.title)}</h3>
    <div class="ov__grid">
      <div>
        <div class="ov__block"><h4>Overview</h4><p>${esc(p.summary)}</p></div>
        <div class="ov__block"><h4>Context</h4><p>${esc(p.context)}</p></div>
        <div class="ov__block"><h4>Role</h4><p>${esc(p.role)}</p></div>
        <div class="ov__block"><h4>Technology</h4>
          <ul class="tags">${p.tech.map((t) => `<li class="tag">${esc(t)}</li>`).join("")}</ul>
        </div>
      </div>
      <div>
        <div class="ov__block"><h4>What I worked on</h4>
          <ul>${p.work.map((w) => `<li>${esc(w)}</li>`).join("")}</ul>
        </div>
        <div class="ov__block"><h4>Impact</h4>
          <div class="project__impact" style="margin-top:0">
            ${p.impact.map((m) => `<div><p class="pm__k">${m.k}</p><p class="pm__v">${m.v}</p></div>`).join("")}
          </div>
        </div>
      </div>
    </div>`;
  const ov = $("#overlay");
  ov.classList.add("is-open");
  ov.setAttribute("aria-hidden", "false");
  document.body.classList.add("is-locked");
  ov.scrollTop = 0;
  $("#ovClose").focus();
}
function closeProject() {
  const ov = $("#overlay");
  if (!ov.classList.contains("is-open")) return;
  ov.classList.remove("is-open");
  ov.setAttribute("aria-hidden", "true");
  document.body.classList.remove("is-locked");
  lastFocus?.focus();
}

/* ---------------- Skills ecosystem ---------------- */
function buildSkills() {
  $("#skillsGrid").innerHTML = skills
    .map(
      (g) => `
      <div class="skillgroup">
        <p class="skillgroup__t">${g.group}</p>
        <div class="skillgroup__i">
          ${g.items
            .map((s) => {
              const ids = skillProjectMap[s] || [];
              return `<button class="skill" type="button" data-skill="${esc(s)}" data-count="${ids.length}" aria-pressed="false">${esc(s)}</button>`;
            })
            .join("")}
        </div>
      </div>`
    )
    .join("");

  const list = $("#projectList"), hint = $("#skillHint");
  const base = hint.textContent;
  let pinned = null;

  const apply = (skill) => {
    const ids = skillProjectMap[skill] || [];
    $$(".skill").forEach((b) => b.classList.toggle("is-on", b.dataset.skill === skill));
    if (!skill || !ids.length) {
      list.classList.remove("is-filtering");
      $$(".project").forEach((p) => p.classList.remove("is-match"));
      hint.innerHTML = skill
        ? `<strong>${esc(skill)}</strong> — from training / certification, not mapped to a listed project.`
        : base;
      return;
    }
    list.classList.add("is-filtering");
    $$(".project").forEach((p) => p.classList.toggle("is-match", ids.includes(p.dataset.id)));
    hint.innerHTML = `<strong>${esc(skill)}</strong> → project ${ids.map((i) => projects.find((p) => p.id === i).index).join(" · ")}`;
  };

  $$(".skill").forEach((b) => {
    const enter = () => { if (!pinned) apply(b.dataset.skill); };
    const leave = () => { if (!pinned) apply(null); };
    b.addEventListener("pointerenter", enter);
    b.addEventListener("pointerleave", leave);
    b.addEventListener("mouseenter", enter);
    b.addEventListener("mouseleave", leave);
    b.addEventListener("focus", enter);
    b.addEventListener("blur", leave);
    b.addEventListener("click", () => {
      pinned = pinned === b.dataset.skill ? null : b.dataset.skill;
      $$(".skill").forEach((x) => x.setAttribute("aria-pressed", String(x.dataset.skill === pinned)));
      apply(pinned);
    });
  });
}

/* ---------------- Learning / Education / Contact ---------------- */
function buildLearning() {
  $("#learning").innerHTML = learning
    .map(
      (l) => `
      <article class="learn">
        <p class="learn__state ${l.state === "IN PROGRESS" ? "now" : ""}">
          ${l.state === "IN PROGRESS" ? "<i></i>" : "◆"} ${l.state}
        </p>
        <h3 class="learn__n">${esc(l.name)}</h3>
        <p class="learn__d">${esc(l.note)}</p>
      </article>`
    )
    .join("");
}

function buildEducation() {
  $("#edu").innerHTML = education
    .map(
      (e) => `
      <div class="edu__row">
        <p class="edu__yr">${e.year}</p>
        <div><p class="edu__d">${esc(e.degree)}</p><p class="edu__s">${esc(e.school)}</p></div>
        <p class="edu__sc">${esc(e.score)}</p>
      </div>`
    )
    .join("");
}

function buildContact() {
  const items = [
    { label: "EMAIL", value: profile.email, href: `mailto:${profile.email}` },
    { label: "PHONE", value: profile.phone, href: profile.phoneHref },
    { label: "RESUME", value: "Download PDF", href: profile.resume, dl: true },
  ];
  if (profile.links.linkedin) items.push({ label: "LINKEDIN", value: "Profile", href: profile.links.linkedin });
  if (profile.links.github) items.push({ label: "GITHUB", value: "Profile", href: profile.links.github });

  $("#contactLinks").innerHTML = items
    .map((i) => `<a class="clink" href="${i.href}" ${i.dl ? "download" : ""} data-cursor="hover"><b>${esc(i.value)}</b><small>${i.label} ↗</small></a>`)
    .join("");
  $("#year").textContent = new Date().getFullYear();
}

/* ---------------- Reveal ---------------- */
function initReveal() {
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );
  $$(".reveal, .lines").forEach((el) => io.observe(el));
}

/* ---------------- Scroll UI: progress, active nav, nav surface ---------------- */
function initScrollUI() {
  const bar = $("#progress"), navEl = $("#nav");
  const sections = nav.map((n) => document.getElementById(n.id)).filter(Boolean);
  const surfaces = $$("[data-surface]");
  let ticking = false;

  const update = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
    navEl.classList.toggle("is-stuck", window.scrollY > 40);

    // invert the navbar when it sits over a light section
    // probe just below the bar so the surface under it decides the bar's theme
    const probe = navEl.offsetHeight + 28;
    let onLight = false;
    surfaces.forEach((s) => {
      const r = s.getBoundingClientRect();
      if (r.top <= probe && r.bottom > probe) onLight = s.dataset.surface === "light";
    });
    navEl.classList.toggle("on-light", onLight);

    let active = "";
    sections.forEach((s) => { if (s.getBoundingClientRect().top <= window.innerHeight * 0.35) active = s.id; });
    $$("[data-nav]").forEach((a) => a.classList.toggle("is-active", a.dataset.nav === active));
    ticking = false;
  };
  window.addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  window.addEventListener("resize", update);
  update();
}

/* ---------------- Custom cursor ---------------- */
function initCursor() {
  if (isTouch) return;
  const ring = $("#cursor"), dot = $("#cursorDot"), label = $("#cursorLabel");
  let x = innerWidth / 2, y = innerHeight / 2, rx = x, ry = y;

  addEventListener("pointermove", (e) => {
    x = e.clientX; y = e.clientY;
    dot.style.transform = `translate3d(${x}px,${y}px,0)`;
  }, { passive: true });

  (function loop() {
    rx += (x - rx) * 0.16; ry += (y - ry) * 0.16;
    ring.style.transform = `translate3d(${rx}px,${ry}px,0)`;
    requestAnimationFrame(loop);
  })();

  addEventListener("pointerover", (e) => {
    const el = e.target;
    const t = el instanceof Element ? el.closest("[data-cursor], a, button") : null;
    if (!t) { ring.className = "cursor"; label.textContent = ""; return; }
    if (t.dataset?.cursor === "view") { ring.className = "cursor is-label"; label.textContent = "VIEW"; }
    else { ring.className = "cursor is-hover"; label.textContent = ""; }
  });
  addEventListener("pointerdown", () => (ring.style.opacity = "0.5"));
  addEventListener("pointerup", () => (ring.style.opacity = "1"));
}

/* ---------------- Magnetic buttons ---------------- */
function initMagnetic() {
  if (isTouch || REDUCED) return;
  $$(".btn").forEach((b) => {
    b.addEventListener("pointermove", (e) => {
      const r = b.getBoundingClientRect();
      b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.2}px, ${(e.clientY - r.top - r.height / 2) * 0.28}px)`;
    });
    b.addEventListener("pointerleave", () => (b.style.transform = ""));
  });
}

/* ---------------- Toast ---------------- */
let toastT;
function toast(msg) {
  const el = $("#toast");
  el.textContent = msg;
  el.classList.add("is-on");
  clearTimeout(toastT);
  toastT = setTimeout(() => el.classList.remove("is-on"), 2600);
}

/* ---------------- Command palette ---------------- */
function initCmdK() {
  const wrap = $("#cmdk"), input = $("#cmdInput"), list = $("#cmdList");
  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: REDUCED ? "auto" : "smooth" });

  const commands = [
    ...nav.map((n) => ({ name: `Go to ${n.label}`, hint: "SECTION", run: () => go(n.id) })),
    ...projects.map((p) => ({ name: `Open ${p.short}`, hint: `PROJECT ${p.index}`, run: () => openProject(p.id) })),
    { name: "Download Resume", hint: "FILE", run: () => { const a = document.createElement("a"); a.href = profile.resume; a.download = ""; a.click(); } },
    { name: "Email Krishna", hint: "MAILTO", run: () => (location.href = `mailto:${profile.email}`) },
    { name: "Call Krishna", hint: "TEL", run: () => (location.href = profile.phoneHref) },
    { name: "Copy email address", hint: "CLIPBOARD", run: async () => { try { await navigator.clipboard.writeText(profile.email); toast("Email copied"); } catch { toast(profile.email); } } },
    { name: "Back to top", hint: "SCROLL", run: () => scrollTo({ top: 0, behavior: REDUCED ? "auto" : "smooth" }) },
  ];

  let filtered = commands, sel = 0;

  const render = () => {
    list.innerHTML = filtered.length
      ? filtered.map((c, i) => `<button class="cmdk__item" role="option" aria-selected="${i === sel}" data-i="${i}">${esc(c.name)}<span>${c.hint}</span></button>`).join("")
      : '<p class="cmdk__empty">No matching command.</p>';
    $$(".cmdk__item", list).forEach((b) =>
      b.addEventListener("click", () => { const c = filtered[+b.dataset.i]; close(); c.run(); })
    );
  };

  const open = () => {
    wrap.classList.add("is-open");
    wrap.setAttribute("aria-hidden", "false");
    document.body.classList.add("is-locked");
    input.value = ""; filtered = commands; sel = 0; render(); input.focus();
  };
  const close = () => {
    wrap.classList.remove("is-open");
    wrap.setAttribute("aria-hidden", "true");
    document.body.classList.remove("is-locked");
  };

  $("#openCmd").addEventListener("click", open);
  wrap.addEventListener("click", (e) => e.target === wrap && close());

  input.addEventListener("input", () => {
    const q = input.value.toLowerCase().trim();
    filtered = commands.filter((c) => c.name.toLowerCase().includes(q));
    sel = 0; render();
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown") { e.preventDefault(); sel = (sel + 1) % filtered.length; render(); }
    else if (e.key === "ArrowUp") { e.preventDefault(); sel = (sel - 1 + filtered.length) % filtered.length; render(); }
    else if (e.key === "Enter") { e.preventDefault(); const c = filtered[sel]; if (c) { close(); c.run(); } }
  });

  addEventListener("keydown", (e) => {
    const typing = /^(INPUT|TEXTAREA)$/.test(document.activeElement.tagName);
    if (e.key === "/" && !typing) { e.preventDefault(); open(); }
    if (e.key === "Escape") { close(); closeProject(); }
  });
}

/* ---------------- Easter egg ---------------- */
function initEggs() {
  let n = 0;
  $("#logo").addEventListener("click", (e) => {
    if (++n < 3) return;
    e.preventDefault(); n = 0;
    const cur = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim();
    document.documentElement.style.setProperty("--accent", cur === "#ff4a1c" ? "#0f62fe" : "#ff4a1c");
    toast("Accent switched — press / for commands");
  });
}

/* ---------------- Boot ---------------- */
function boot() {
  buildNav();
  buildHero();
  buildAbout();
  buildMetrics();
  buildExperience();
  buildProjects();
  buildSkills();
  buildLearning();
  buildEducation();
  buildContact();
  initReveal();
  initScrollUI();
  initCursor();
  initMagnetic();
  initCmdK();
  initEggs();

  $("#ovClose").addEventListener("click", closeProject);

  const loader = $("#loader");
  setTimeout(() => {
    loader.classList.add("is-done");
    document.body.classList.add("is-ready");
    setTimeout(() => loader.remove(), 1000);
  }, REDUCED ? 120 : 1200);
}

document.readyState === "loading" ? addEventListener("DOMContentLoaded", boot) : boot();

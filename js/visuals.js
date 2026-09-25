/* =============================================================
   components/ProjectVisual — bespoke visuals per project
   ============================================================= */

const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- 01 · maritime network (canvas, design representation) ---------- */
export function maritimeNetwork(host) {
  const canvas = document.createElement("canvas");
  canvas.setAttribute("aria-hidden", "true");
  canvas.style.cssText = "position:absolute;inset:0;width:100%;height:100%";
  host.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  let w = 0, h = 0;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  let nodes = [], links = [], pulses = [], raf = null, running = false;
  const pointer = { x: -999, y: -999 };

  function size() {
    const r = host.getBoundingClientRect();
    w = r.width; h = r.height;
    canvas.width = w * dpr; canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    build();
  }

  function build() {
    const count = w < 620 ? 26 : 46;
    nodes = Array.from({ length: count }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      r: Math.random() * 1.6 + 0.8,
      vx: (Math.random() - 0.5) * 0.14, vy: (Math.random() - 0.5) * 0.14,
      hub: Math.random() > 0.84,
    }));
    links = [];
    nodes.forEach((n, i) => {
      if (!n.hub) return;
      nodes
        .map((m, j) => ({ j, d: Math.hypot(m.x - n.x, m.y - n.y) }))
        .filter((o) => o.j !== i)
        .sort((a, b) => a.d - b.d)
        .slice(0, 3)
        .forEach((o) => links.push([i, o.j]));
    });
    pulses = links.map((_, i) => ({ link: i, t: Math.random() }));
  }

  function frame() {
    ctx.clearRect(0, 0, w, h);

    nodes.forEach((n) => {
      n.x += n.vx; n.y += n.vy;
      if (n.x < 0 || n.x > w) n.vx *= -1;
      if (n.y < 0 || n.y > h) n.vy *= -1;
      const dx = n.x - pointer.x, dy = n.y - pointer.y;
      const d = Math.hypot(dx, dy);
      if (d < 110 && d > 0.01) {
        n.x += (dx / d) * (110 - d) * 0.02;
        n.y += (dy / d) * (110 - d) * 0.02;
      }
    });

    ctx.lineWidth = 0.6;
    links.forEach(([a, b]) => {
      const A = nodes[a], B = nodes[b];
      const d = Math.hypot(A.x - B.x, A.y - B.y);
      if (d > 230) return;
      ctx.strokeStyle = `rgba(240,237,229,${0.16 * (1 - d / 230)})`;
      ctx.beginPath(); ctx.moveTo(A.x, A.y); ctx.lineTo(B.x, B.y); ctx.stroke();
    });

    pulses.forEach((p) => {
      const pair = links[p.link];
      if (!pair) return;
      const A = nodes[pair[0]], B = nodes[pair[1]];
      p.t += 0.0045;
      if (p.t > 1) p.t = 0;
      ctx.fillStyle = "rgba(255,74,28,0.9)";
      ctx.beginPath();
      ctx.arc(A.x + (B.x - A.x) * p.t, A.y + (B.y - A.y) * p.t, 1.5, 0, Math.PI * 2);
      ctx.fill();
    });

    nodes.forEach((n) => {
      ctx.fillStyle = n.hub ? "rgba(255,74,28,0.95)" : "rgba(240,237,229,0.55)";
      ctx.beginPath(); ctx.arc(n.x, n.y, n.hub ? n.r + 0.9 : n.r, 0, Math.PI * 2); ctx.fill();
      if (n.hub) {
        ctx.strokeStyle = "rgba(255,74,28,0.28)"; ctx.lineWidth = 0.7;
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r + 6, 0, Math.PI * 2); ctx.stroke();
      }
    });

    raf = requestAnimationFrame(frame);
  }

  const start = () => { if (!running && !REDUCED) { running = true; frame(); } };
  const stop = () => { running = false; if (raf) cancelAnimationFrame(raf); raf = null; };

  host.addEventListener("pointermove", (e) => {
    const r = host.getBoundingClientRect();
    pointer.x = e.clientX - r.left; pointer.y = e.clientY - r.top;
  });
  host.addEventListener("pointerleave", () => { pointer.x = pointer.y = -999; });

  new ResizeObserver(size).observe(host);
  size();
  if (REDUCED) frame();

  new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()), { threshold: 0.05 }).observe(host);
}

/* ---------- 02 · product mock ---------- */
export function productMock(host) {
  host.insertAdjacentHTML(
    "beforeend",
    `<div class="mock" aria-hidden="true">
      <div class="mock__chrome"><i></i><i></i><i></i><span class="mock__url">academic-portal / calculators</span></div>
      <div class="mock__screen">
        <div class="mock__pane">
          <p class="mock__label">MARITIME CALCULATOR</p>
          <div class="mock__field"><span>Distance</span><span>— nm</span></div>
          <div class="mock__field"><span>Speed</span><span>— kn</span></div>
          <div class="mock__field"><span>Consumption</span><span>— mt/d</span></div>
          <div class="mock__out"><span>RESULT</span><span>▮▮▮</span></div>
          <p class="mock__label" style="margin-top:auto">RESPONSIVE · MOBILE-FIRST</p>
        </div>
        <div class="mock__pane">
          <p class="mock__label">LEARNING MODULES</p>
          <div class="mock__rows"><i></i><i></i><i></i></div>
          <p class="mock__label">USAGE</p>
          <div class="mock__bars">
            ${Array.from({ length: 9 }).map((_, i) => `<i style="animation-delay:${(i * 0.18).toFixed(2)}s"></i>`).join("")}
          </div>
        </div>
      </div>
    </div>
    <p class="visual__note">Interface concept — design representation</p>`
  );
}

/* ---------- 03 · azure pipeline ---------- */
export function pipelineDiagram(host) {
  const stages = [
    { t: "SOURCE", s: "Azure SQL · Cloud Storage" },
    { t: "AZURE DATA FACTORY", s: "Linked Services · Datasets" },
    { t: "COPY ACTIVITY", s: "Scheduled Triggers" },
    { t: "AZURE BLOB STORAGE", s: "Structured · Unstructured" },
  ];
  const row = stages
    .map(
      (st, i) =>
        `<div class="pipe__stage"><b>${st.t}</b><span>${st.s}</span></div>` +
        (i < stages.length - 1 ? `<div class="pipe__link"><i style="animation-delay:${i * 0.6}s"></i></div>` : "")
    )
    .join("");
  host.insertAdjacentHTML(
    "beforeend",
    `<div class="pipe" aria-hidden="true"><div class="pipe__row">${row}</div>
      <div class="pipe__chips">
        <span class="tag">Linked Services</span><span class="tag">Datasets</span><span class="tag">Triggers</span>
      </div>
    </div>
    <p class="visual__note">Architecture diagram — design representation</p>`
  );
}

/* ---------- 04 · RAG workflow ---------- */
export function ragFlow(host) {
  const steps = ["DOCUMENT", "PROCESSING", "RETRIEVAL", "RELEVANT CONTEXT", "AZURE OPENAI", "ANSWER"];
  host.insertAdjacentHTML(
    "beforeend",
    `<div class="rag" aria-hidden="true">
      <div class="rag__flow">${steps.map((s) => `<div class="rag__step">${s}</div>`).join("")}</div>
      <div class="rag__chat">
        <div class="rag__doc"><span>▤</span> document.pdf — indexed</div>
        <p class="rag__q">“What does the document say about the ingestion schedule?”</p>
        <p class="rag__a" data-rag-out></p>
        <p class="rag__cite">RETRIEVED CONTEXT · 3 CHUNKS</p>
      </div>
    </div>
    <p class="visual__note">Workflow concept — design representation</p>`
  );

  const stepEls = host.querySelectorAll(".rag__step");
  const out = host.querySelector("[data-rag-out]");
  const answer = "Concise answer generated from retrieved document context.";
  let i = 0, typed = 0, timer = null;

  function cycle() {
    stepEls.forEach((e, k) => e.classList.toggle("is-live", k === i));
    if (i === stepEls.length - 1) {
      typed = 0;
      const type = () => {
        out.textContent = answer.slice(0, typed++);
        if (typed <= answer.length) setTimeout(type, 22);
      };
      type();
    } else if (i === 0) out.textContent = "";
    i = (i + 1) % stepEls.length;
  }

  new IntersectionObserver(([e]) => {
    if (e.isIntersecting && !timer && !REDUCED) { cycle(); timer = setInterval(cycle, 1100); }
    else if (!e.isIntersecting && timer) { clearInterval(timer); timer = null; }
  }, { threshold: 0.2 }).observe(host);

  if (REDUCED) { stepEls.forEach((e) => e.classList.add("is-live")); out.textContent = answer; }
}

export const VISUALS = {
  network: maritimeNetwork,
  product: productMock,
  pipeline: pipelineDiagram,
  rag: ragFlow,
};

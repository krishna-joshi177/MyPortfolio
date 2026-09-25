const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

const nav = $('.nav-wrap');
const menuButton = $('.menu-toggle');
const mobileMenu = $('.mobile-menu');

window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 40), { passive: true });
menuButton.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', open);
  mobileMenu.setAttribute('aria-hidden', !open);
});
$$('.mobile-menu a').forEach(link => link.addEventListener('click', () => {
  mobileMenu.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

const revealObserver = new IntersectionObserver((entries) => entries.forEach(entry => {
  if (entry.isIntersecting) revealObserver.unobserve(entry.target), entry.target.classList.add('visible');
}), { threshold: .14 });
$$('.reveal').forEach(section => revealObserver.observe(section));

const countObserver = new IntersectionObserver((entries) => entries.forEach(entry => {
  if (!entry.isIntersecting) return;
  const number = entry.target.dataset.count;
  const duration = 1100;
  const started = performance.now();
  const update = now => {
    const progress = Math.min((now - started) / duration, 1);
    entry.target.textContent = Math.floor(progress * Number(number)).toLocaleString();
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
  countObserver.unobserve(entry.target);
}), { threshold: .8 });
$$('[data-count]').forEach(number => countObserver.observe(number));

const cursor = $('.cursor');
const cursorLabel = $('.cursor-label');
window.addEventListener('mousemove', event => {
  cursor.style.left = `${event.clientX}px`;
  cursor.style.top = `${event.clientY}px`;
  cursor.style.opacity = '1';
  cursorLabel.style.left = `${event.clientX}px`;
  cursorLabel.style.top = `${event.clientY}px`;
  cursorLabel.style.opacity = cursorLabel.dataset.visible === 'true' ? '1' : '0';
});
$$('a, button, .system-node, .project').forEach(element => {
  element.addEventListener('mouseenter', () => { cursor.style.transform = 'translate(-50%,-50%) scale(2.4)'; });
  element.addEventListener('mouseleave', () => { cursor.style.transform = 'translate(-50%,-50%) scale(1)'; cursorLabel.dataset.visible = 'false'; });
});
$$('.project').forEach(project => {
  project.addEventListener('mouseenter', () => { cursorLabel.dataset.visible = 'true'; cursorLabel.textContent = 'EXPLORE'; });
});

const palette = $('.command-palette');
const paletteInput = $('.palette input');
const openPalette = () => { palette.classList.add('open'); palette.setAttribute('aria-hidden', 'false'); paletteInput.focus(); };
const closePalette = () => { palette.classList.remove('open'); palette.setAttribute('aria-hidden', 'true'); };
window.addEventListener('keydown', event => {
  if (event.key === '/' && document.activeElement.tagName !== 'INPUT') { event.preventDefault(); openPalette(); }
  if (event.key === 'Escape') closePalette();
});
palette.addEventListener('click', event => { if (event.target === palette) closePalette(); });
$$('[data-target]', palette).forEach(button => button.addEventListener('click', () => { closePalette(); $(button.dataset.target).scrollIntoView({ behavior: 'smooth' }); }));
paletteInput.addEventListener('input', event => {
  const query = event.target.value.toLowerCase();
  $$('.commands > *', palette).forEach(command => command.hidden = query && !command.textContent.toLowerCase().includes(query));
});

$$('.skill-group button').forEach(skill => {
  skill.addEventListener('mouseenter', () => { $$('.skill-group button').forEach(item => item.classList.remove('active')); skill.classList.add('active'); });
  skill.addEventListener('focus', () => skill.classList.add('active'));
});

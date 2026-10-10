'use strict';
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#nav-principal');
if (toggle && nav) {
  const closeMenu = () => { nav.classList.remove('is-open'); toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-label', 'Abrir menu'); };
  toggle.addEventListener('click', () => {
    const opened = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(opened));
    toggle.setAttribute('aria-label', opened ? 'Fechar menu' : 'Abrir menu');
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
  document.addEventListener('click', event => { if (!nav.contains(event.target) && !toggle.contains(event.target)) closeMenu(); });
}
const filterButtons = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.project-card');
const empty = document.querySelector('.filter-empty');
filterButtons.forEach(button => button.addEventListener('click', () => {
  const selected = button.dataset.filter;
  filterButtons.forEach(b => { const active = b === button; b.classList.toggle('active', active); b.setAttribute('aria-pressed', String(active)); });
  let visible = 0;
  cards.forEach(card => { const show = selected === 'todos' || card.dataset.categories.split(' ').includes(selected); card.hidden = !show; if (show) visible++; });
  if (empty) empty.hidden = visible > 0;
}));
const year = document.querySelector('#ano');
if (year) year.textContent = String(new Date().getFullYear());

// Elementos de atmosfera: desativados para usuários que preferem menos movimento.
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
function initializeCyberEffects(){
  if (reducedMotion.matches) return;
  const matrix = document.getElementById('matrix-layer');
  const particles = document.getElementById('particle-layer');
  if (!matrix || !particles) return;
  const characters = '01ABCDEF';
  const matrixCount = Math.min(22, Math.max(10, Math.floor(window.innerWidth / 55)));
  for (let i = 0; i < matrixCount; i++){
    const element = document.createElement('span');
    element.className = 'matrix-char';
    element.textContent = characters[Math.floor(Math.random() * characters.length)];
    element.style.left = `${Math.random() * 100}%`;
    element.style.setProperty('--duration', `${10 + Math.random() * 15}s`);
    element.style.setProperty('--delay', `${-Math.random() * 20}s`);
    matrix.appendChild(element);
  }
  for (let i = 0; i < 26; i++){
    const element = document.createElement('span');
    element.className = 'cyber-particle';
    element.style.setProperty('--left', `${Math.random() * 100}%`);
    element.style.setProperty('--top', `${Math.random() * 100}%`);
    element.style.setProperty('--duration', `${5 + Math.random() * 9}s`);
    element.style.setProperty('--delay', `${-Math.random() * 9}s`);
    particles.appendChild(element);
  }
}
initializeCyberEffects();
if ('IntersectionObserver' in window && !reducedMotion.matches){
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {threshold:.08});
  document.querySelectorAll('.skill-card,.project-card,.timeline-item').forEach(el => {
    el.classList.add('reveal-on-scroll');
    observer.observe(el);
  });
}

// Se a preferência de movimento mudar durante a sessão, remove efeitos decorativos.
reducedMotion.addEventListener?.('change', event => {
  if (event.matches) {
    document.querySelector('#matrix-layer')?.replaceChildren();
    document.querySelector('#particle-layer')?.replaceChildren();
    document.querySelectorAll('.reveal-on-scroll').forEach(el => el.classList.add('is-visible'));
  } else {
    initializeCyberEffects();
    document.querySelectorAll('.reveal-on-scroll').forEach(el => el.classList.add('is-visible'));
  }
});

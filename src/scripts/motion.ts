import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { splitChars } from './fx/split';
import { initCursor } from './fx/cursor';
import { initSpotlight } from './fx/spotlight';
import { initMarquee } from './fx/marquee';
import { initRail } from './fx/rail';

/**
 * Animations globales : scroll fluide Lenis branché sur GSAP, rideau d'intro en échiquier (1re visite
 * de l'accueil par session), hero, révélations, titres lettre par lettre, bandeau, rail, curseur,
 * spotlight, inclinaison 3D de l'échiquier, chute du roi. Rien ne tourne en `prefers-reduced-motion`.
 */
const root = document.documentElement;
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine = matchMedia('(pointer: fine)').matches;

/** Rideau : damier qui se dissout depuis le centre. Renvoie la timeline, ou null s'il est ignoré. */
function curtain(): gsap.core.Timeline | null {
  if (!root.classList.contains('intro')) return null;
  const cols = innerWidth < 700 ? 6 : 12;
  const size = Math.ceil(innerWidth / cols);
  const rows = Math.ceil(innerHeight / size);
  const wrap = document.createElement('div');
  wrap.className = 'curtain';
  wrap.setAttribute('aria-hidden', 'true');
  wrap.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
  wrap.style.gridTemplateRows = `repeat(${rows}, ${size}px)`;
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
    const q = document.createElement('i');
    q.className = (r + c) % 2 ? 'd' : 'l';
    wrap.appendChild(q);
  }
  const mark = document.createElement('div');
  mark.className = 'curtain-mark';
  mark.setAttribute('aria-hidden', 'true');
  mark.textContent = '♞';
  document.body.append(wrap, mark);
  root.classList.remove('intro');
  try { sessionStorage.setItem('introSeen', '1'); } catch {}

  const squares = wrap.querySelectorAll('i');
  return gsap
    .timeline({ onComplete: () => { wrap.remove(); mark.remove(); } })
    .fromTo(mark, { opacity: 0, scale: 0.6, rotate: -20 }, { opacity: 1, scale: 1, rotate: 0, duration: 0.7, ease: 'back.out(2)' })
    .to(mark, { y: -14, duration: 0.25, yoyo: true, repeat: 1, ease: 'power2.inOut' }, '+=0.05')
    .to(mark, { opacity: 0, scale: 1.6, duration: 0.45, ease: 'power2.in' })
    .to(squares, { scale: 0, rotate: 12, duration: 0.55, ease: 'power3.in', stagger: { grid: [rows, cols], from: 'center', amount: 0.85 } }, '-=0.25');
}

function start() {
  if (reduced) return;
  gsap.registerPlugin(ScrollTrigger);

  // --- Scroll fluide ---
  const lenis = new Lenis({ lerp: 0.1, anchors: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);

  // --- Barre de progression + nav intelligente ---
  const bar = document.querySelector<HTMLElement>('[data-progress]');
  if (bar) gsap.to(bar, { scaleX: 1, ease: 'none', scrollTrigger: { scrub: 0.2, start: 0, end: 'max' } });
  const nav = document.querySelector<HTMLElement>('[data-nav]');
  lenis.on('scroll', ({ direction, scroll }: { direction: number; scroll: number }) => {
    if (!nav) return;
    nav.classList.toggle('scrolled', scroll > 20);
    nav.classList.toggle('hide', direction === 1 && scroll > 400);
  });

  // --- Intro : rideau puis hero ---
  const intro = curtain();
  const hero = gsap.timeline({ paused: !!intro, defaults: { ease: 'power4.out' } });
  hero
    .from('.hero .eyebrow', { opacity: 0, x: -20, duration: 0.8 })
    .from('.hero h1 .line > span', { yPercent: 115, duration: 1.1, stagger: 0.12 }, '-=0.5')
    .from('.hero [data-hero-in]', { opacity: 0, y: 24, duration: 0.8, stagger: 0.1 }, '-=0.7')
    .from('.board-wrap', { opacity: 0, scale: 0.94, rotate: -2, duration: 1.2 }, 0.2);
  if (intro) intro.add(() => hero.play(), '-=0.7');

  // --- Révélations au scroll ---
  gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
    gsap.fromTo(el, { opacity: 0, y: 36 }, {
      opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
      delay: Number(el.dataset.revealDelay ?? 0),
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
    });
  });
  gsap.utils.toArray<HTMLElement>('[data-stagger]').forEach((group) => {
    gsap.fromTo(group.children, { opacity: 0, y: 40 }, {
      opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.12,
      scrollTrigger: { trigger: group, start: 'top 85%', once: true },
    });
  });
  gsap.utils.toArray<HTMLElement>('.sec-head .rule').forEach((rule) => {
    gsap.fromTo(rule, { scaleX: 0 }, {
      scaleX: 1, duration: 1.1, ease: 'power3.out', transformOrigin: 'left',
      scrollTrigger: { trigger: rule, start: 'top 95%', once: true },
    });
  });

  // --- Titres lettre par lettre ---
  document.querySelectorAll<HTMLElement>('.sec-head h2, .big, .page-head h1').forEach((h) => {
    const chars = splitChars(h);
    gsap.from(chars, {
      yPercent: 115, rotate: 6, duration: 0.9, ease: 'power4.out', stagger: 0.022,
      scrollTrigger: { trigger: h, start: 'top 90%', once: true },
    });
  });

  // --- Échiquier : parallaxe au scroll + inclinaison 3D au pointeur ---
  const board = document.querySelector<HTMLElement>('.board-wrap');
  const heroEl = document.querySelector<HTMLElement>('.hero');
  if (board && heroEl) {
    gsap.to(board, { yPercent: -6, rotate: 1.5, ease: 'none', scrollTrigger: { trigger: heroEl, start: 'top top', end: 'bottom top', scrub: true } });
    if (fine) {
      gsap.set(board, { transformPerspective: 1000 });
      const rx = gsap.quickTo(board, 'rotationX', { duration: 0.8, ease: 'power3' });
      const ry = gsap.quickTo(board, 'rotationY', { duration: 0.8, ease: 'power3' });
      heroEl.addEventListener('pointermove', (e) => {
        const r = heroEl.getBoundingClientRect();
        ry(((e.clientX - r.left) / r.width - 0.5) * 9);
        rx(-((e.clientY - r.top) / r.height - 0.5) * 9);
      });
      heroEl.addEventListener('pointerleave', () => { rx(0); ry(0); });
    }
  }

  // --- Le roi tombe : « Échec et mat » ---
  const king = document.querySelector<HTMLElement>('.king');
  if (king) {
    gsap.set(king, { transformOrigin: '18% 88%' });
    gsap.to(king, { rotation: 84, duration: 1.3, ease: 'bounce.out', scrollTrigger: { trigger: '#contact', start: 'top 60%', once: true } });
  }

  // --- Boutons magnétiques ---
  if (fine) {
    document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => {
      const x = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3' });
      const y = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3' });
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        x((e.clientX - (r.left + r.width / 2)) * 0.28);
        y((e.clientY - (r.top + r.height / 2)) * 0.28);
      });
      el.addEventListener('pointerleave', () => { x(0); y(0); });
    });
  }

  // --- Effets additionnels ---
  initCursor();
  initSpotlight();
  initMarquee((cb) => lenis.on('scroll', ({ velocity }: { velocity: number }) => cb(velocity)));
  initRail((el) => lenis.scrollTo(el, { offset: -60 }));

  (window as unknown as { __motion?: boolean }).__motion = true;
  root.classList.add('motion-ready');
}

try {
  start();
} catch (err) {
  console.error('[motion]', err);
  root.classList.remove('anim', 'intro');
}
if (reduced) (window as unknown as { __motion?: boolean }).__motion = true;

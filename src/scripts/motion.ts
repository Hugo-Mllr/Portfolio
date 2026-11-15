import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Animations globales (v1) : scroll fluide Lenis branché sur GSAP, révélations au scroll,
 * intro du hero, barre de progression, nav qui se cache, boutons magnétiques.
 * Rien ne tourne en `prefers-reduced-motion` : le contenu reste visible et statique.
 */
const root = document.documentElement;
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

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

  // --- Intro du hero ---
  const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
  tl.from('.hero .eyebrow', { opacity: 0, x: -20, duration: 0.8 })
    .from('.hero h1 .line > span', { yPercent: 115, duration: 1.1, stagger: 0.12 }, '-=0.5')
    .from('.hero [data-hero-in]', { opacity: 0, y: 24, duration: 0.8, stagger: 0.1 }, '-=0.7')
    .from('.board-wrap', { opacity: 0, scale: 0.94, rotate: -2, duration: 1.2 }, 0.2);

  // --- Révélations au scroll ---
  gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 36 },
      {
        opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
        delay: Number(el.dataset.revealDelay ?? 0),
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      }
    );
  });
  gsap.utils.toArray<HTMLElement>('[data-stagger]').forEach((group) => {
    gsap.fromTo(
      group.children,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.12,
        scrollTrigger: { trigger: group, start: 'top 85%', once: true },
      }
    );
  });

  // --- Titres de section : soulignement qui se dessine ---
  gsap.utils.toArray<HTMLElement>('.sec-head').forEach((h) => {
    gsap.fromTo(h.querySelector('.rule'), { scaleX: 0 }, {
      scaleX: 1, duration: 1.1, ease: 'power3.out', transformOrigin: 'left',
      scrollTrigger: { trigger: h, start: 'top 88%', once: true },
    });
  });

  // --- Parallaxe douce de l'échiquier ---
  const board = document.querySelector<HTMLElement>('.board-wrap');
  if (board) gsap.to(board, { yPercent: -6, rotate: 1.5, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });

  // --- Boutons magnétiques (pointeur fin uniquement) ---
  if (matchMedia('(pointer: fine)').matches) {
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

  (window as unknown as { __motion?: boolean }).__motion = true;
  root.classList.add('motion-ready');
}

try {
  start();
} catch (err) {
  console.error('[motion]', err);
  root.classList.remove('anim');
}
if (reduced) (window as unknown as { __motion?: boolean }).__motion = true;

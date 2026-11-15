import gsap from 'gsap';

/** Halo doré qui suit le pointeur (le curseur natif reste visible). Pointeur fin uniquement. */
export function initCursor() {
  if (!matchMedia('(pointer: fine)').matches) return;
  const ring = document.createElement('div');
  ring.className = 'cursor-ring';
  ring.setAttribute('aria-hidden', 'true');
  document.body.appendChild(ring);
  gsap.set(ring, { xPercent: -50, yPercent: -50, opacity: 0 });
  const x = gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'power3' });
  const y = gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'power3' });
  let shown = false;
  window.addEventListener('pointermove', (e) => {
    x(e.clientX);
    y(e.clientY);
    if (!shown) { shown = true; gsap.to(ring, { opacity: 1, duration: 0.3 }); }
  }, { passive: true });
  document.addEventListener('pointerleave', () => { shown = false; gsap.to(ring, { opacity: 0, duration: 0.2 }); });
  const hot = 'a, button, [role="button"], input, summary, .sq.hint';
  document.addEventListener('pointerover', (e) => ring.classList.toggle('hot', !!(e.target as HTMLElement).closest(hot)));
  window.addEventListener('pointerdown', () => gsap.to(ring, { scale: 0.7, duration: 0.15 }));
  window.addEventListener('pointerup', () => gsap.to(ring, { scale: 1, duration: 0.3, ease: 'back.out(3)' }));
}

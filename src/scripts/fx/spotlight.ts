/** Halo lumineux qui suit le pointeur sur les éléments [data-spot] (variables CSS --mx / --my). */
export function initSpotlight() {
  if (!matchMedia('(pointer: fine)').matches) return;
  document.querySelectorAll<HTMLElement>('[data-spot]').forEach((el) => {
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${e.clientX - r.left}px`);
      el.style.setProperty('--my', `${e.clientY - r.top}px`);
    });
  });
}

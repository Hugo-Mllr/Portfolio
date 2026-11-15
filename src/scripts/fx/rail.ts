import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/** Rail vertical : un cavalier descend le long de la page, un point par section [data-rail]. */
export function initRail(scrollTo: (target: HTMLElement) => void) {
  const sections = [...document.querySelectorAll<HTMLElement>('[data-rail]')];
  if (sections.length < 2 || !matchMedia('(min-width: 1180px)').matches) return;
  const rail = document.createElement('nav');
  rail.className = 'rail';
  rail.setAttribute('aria-label', document.documentElement.lang === 'en' ? 'Page sections' : 'Sections de la page');
  rail.innerHTML = `<span class="rail-line"></span><span class="rail-knight" aria-hidden="true">♞</span>`;
  const dots = sections.map((s) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'rail-dot';
    b.innerHTML = `<span class="rail-label">${s.dataset.rail}</span>`;
    b.setAttribute('aria-label', s.dataset.rail ?? '');
    b.addEventListener('click', () => scrollTo(s));
    rail.appendChild(b);
    return b;
  });
  document.body.appendChild(rail);

  const knight = rail.querySelector<HTMLElement>('.rail-knight')!;
  const line = rail.querySelector<HTMLElement>('.rail-line')!;
  const place = () => {
    const h = rail.clientHeight;
    dots.forEach((d, i) => (d.style.top = `${(i / (dots.length - 1)) * 100}%`));
    return h;
  };
  place();
  gsap.set(knight, { top: 0 });
  gsap.to(knight, { top: '100%', ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.4 } });
  gsap.fromTo(line, { scaleY: 0 }, { scaleY: 1, ease: 'none', transformOrigin: 'top', scrollTrigger: { start: 0, end: 'max', scrub: 0.4 } });

  sections.forEach((s, i) => {
    ScrollTrigger.create({
      trigger: s, start: 'top 55%', end: 'bottom 55%',
      onToggle: (self) => { if (self.isActive) dots.forEach((d, j) => d.classList.toggle('on', j === i)); },
    });
  });
  gsap.from(rail, { opacity: 0, x: 16, duration: 1, delay: 1.4, ease: 'power3.out' });
}

/** Bandeau défilant : sa vitesse suit celle du scroll et il s'inverse quand on remonte. */
export function initMarquee(onScroll: (cb: (v: number) => void) => void) {
  const tracks = [...document.querySelectorAll<HTMLElement>('[data-marquee-track]')];
  if (!tracks.length) return;
  const anims = tracks.map((t) => t.getAnimations()[0]).filter(Boolean);
  if (!anims.length) return;
  let target = 1;
  let current = 1;
  onScroll((velocity) => {
    const dir = velocity < 0 ? -1 : 1;
    target = dir * (1 + Math.min(Math.abs(velocity) * 0.35, 6));
  });
  const tick = () => {
    current += (target - current) * 0.08;
    target += (Math.sign(target || 1) - target) * 0.04; // retour au calme
    anims.forEach((a) => (a.playbackRate = current));
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

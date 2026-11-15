import gsap from 'gsap';

/**
 * Échiquier décoratif du hero : un cavalier doré saute en L (coups automatiques),
 * et le visiteur peut jouer en cliquant une case dorée (les pièces noires peuvent être capturées).
 * Décoratif pour les lecteurs d'écran (aria-hidden) : aucune information n'y est portée.
 */
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

const INITIAL: Record<string, string> = {
  '0,0': '♜b', '0,1': '♞b', '0,2': '♝b', '0,3': '♛b', '0,4': '♚b', '0,5': '♝b', '0,7': '♜b',
  '1,0': '♟b', '1,1': '♟b', '1,2': '♟b', '1,3': '♟b', '1,5': '♟b', '1,6': '♟b', '1,7': '♟b', '3,4': '♟b',
  '4,4': '♙', '6,0': '♙', '6,1': '♙', '6,2': '♙', '6,3': '♙', '6,5': '♙', '6,6': '♙', '6,7': '♙',
  '7,0': '♖', '7,2': '♗', '7,3': '♕', '7,4': '♔', '7,5': '♗', '7,7': '♖',
};
const JUMPS = [[1, 2], [2, 1], [-1, 2], [-2, 1], [1, -2], [2, -1], [-1, -2], [-2, -1]];
const FILES = 'abcdefgh';

function init() {
  const board = document.getElementById('board');
  const knight = document.getElementById('knight');
  const log = document.getElementById('move-log');
  if (!board || !knight || !log) return;

  const lang = document.documentElement.lang === 'en' ? 'en' : 'fr';
  const letter = lang === 'en' ? 'N' : 'C';
  let layout: Record<string, string> = { ...INITIAL };
  const cells: HTMLElement[] = [];
  const pieceEls = new Map<string, HTMLElement>();
  let pos = { r: 5, c: 5 };
  let moveNo = 1;
  let busy = false;
  let captured = 0;
  let pauseUntil = 0;

  const key = (r: number, c: number) => `${r},${c}`;
  const inside = (r: number, c: number) => r >= 0 && r < 8 && c >= 0 && c < 8;
  const isBlack = (r: number, c: number) => layout[key(r, c)]?.endsWith('b');
  const isWhite = (r: number, c: number) => !!layout[key(r, c)] && !isBlack(r, c);

  // Construction des cases
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const sq = document.createElement('div');
      sq.className = `sq ${(r + c) % 2 ? 'd' : 'l'}`;
      sq.dataset.r = String(r);
      sq.dataset.c = String(c);
      if (c === 0) sq.insertAdjacentHTML('beforeend', `<i class="coord r">${8 - r}</i>`);
      if (r === 7) sq.insertAdjacentHTML('beforeend', `<i class="coord f">${FILES[c]}</i>`);
      board.insertBefore(sq, knight);
      cells.push(sq);
    }
  }

  function drawPieces() {
    pieceEls.forEach((el) => el.remove());
    pieceEls.clear();
    for (const [k, v] of Object.entries(layout)) {
      const [r, c] = k.split(',').map(Number);
      const el = document.createElement('span');
      el.className = 'p' + (v.endsWith('b') ? ' b' : '');
      el.textContent = v[0];
      cells[r * 8 + c].prepend(el);
      pieceEls.set(k, el);
    }
  }
  drawPieces();

  gsap.set(knight, { xPercent: pos.c * 100, yPercent: pos.r * 100 });

  const legal = () =>
    JUMPS.map(([a, b]) => ({ r: pos.r + a, c: pos.c + b })).filter((p) => inside(p.r, p.c) && !isWhite(p.r, p.c));

  function showHints() {
    cells.forEach((s) => s.classList.remove('hint'));
    if (busy) return;
    legal().forEach((p) => cells[p.r * 8 + p.c].classList.add('hint'));
  }

  function moveTo(n: { r: number; c: number }, capture: boolean) {
    if (busy) return;
    busy = true;
    showHints();
    const from = cells[pos.r * 8 + pos.c];
    from.classList.add('trail');
    setTimeout(() => from.classList.remove('trail'), 1600);

    const san = `${letter}${capture ? 'x' : ''}${FILES[n.c]}${8 - n.r}`;
    const finish = () => {
      if (capture) {
        const k = key(n.r, n.c);
        const el = pieceEls.get(k);
        delete layout[k];
        pieceEls.delete(k);
        if (el) gsap.to(el, { scale: 0.2, opacity: 0, rotate: 40, duration: 0.35, onComplete: () => el.remove() });
        captured++;
      }
      pos = n;
      moveNo++;
      log.textContent = `${moveNo}. ${san}`;
      busy = false;
      showHints();
      if (captured >= 6) setTimeout(resetBoard, 900);
    };

    if (reduced) {
      gsap.set(knight, { xPercent: n.c * 100, yPercent: n.r * 100 });
      pos = n;
      finish();
      return;
    }
    const glyph = knight.firstElementChild as HTMLElement;
    gsap
      .timeline({ onComplete: finish })
      .to(knight, { xPercent: n.c * 100, yPercent: n.r * 100, duration: 0.65, ease: 'power3.inOut' }, 0)
      .to(glyph, { scale: 1.45, y: -10, duration: 0.3, ease: 'power2.out' }, 0)
      .to(glyph, { scale: 1, y: 0, duration: 0.35, ease: 'bounce.out' }, 0.3);
  }

  function resetBoard() {
    captured = 0;
    layout = { ...INITIAL };
    drawPieces();
    if (!reduced) gsap.from('.sq .p', { opacity: 0, y: -14, duration: 0.5, stagger: { each: 0.012, from: 'random' }, ease: 'power2.out' });
    showHints();
  }

  // Coups automatiques (cases vides uniquement), en pause un moment après un clic
  const auto = () => {
    if (busy || performance.now() < pauseUntil || document.hidden) return;
    const opts = legal().filter((p) => !layout[key(p.r, p.c)]);
    if (!opts.length) return;
    moveTo(opts[Math.floor(Math.random() * opts.length)], false);
  };
  if (!reduced) setInterval(auto, 2600);

  // Clic : jouer une case valide
  board.addEventListener('click', (e) => {
    const sq = (e.target as HTMLElement).closest<HTMLElement>('.sq');
    if (!sq) return;
    const r = Number(sq.dataset.r);
    const c = Number(sq.dataset.c);
    const ok = legal().some((p) => p.r === r && p.c === c);
    if (!ok) return;
    pauseUntil = performance.now() + 7000;
    moveTo({ r, c }, isBlack(r, c));
  });

  showHints();

  // Mise en scène à l'arrivée : pièces qui tombent
  if (!reduced) {
    gsap.from('.sq .p', { opacity: 0, y: -22, duration: 0.7, stagger: { each: 0.018, from: 'random' }, ease: 'power3.out', delay: 0.3 });
    gsap.from(knight, { opacity: 0, scale: 0.4, duration: 0.8, ease: 'back.out(2)', delay: 1 });
  }
}

init();

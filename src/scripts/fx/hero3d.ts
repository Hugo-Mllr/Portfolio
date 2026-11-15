/**
 * Hero 3D : des pièces d'échecs dorées (géométries de révolution, aucun modèle externe) flottent en
 * profondeur derrière le hero et réagissent doucement au pointeur et au scroll.
 *
 * Garde-fous : import dynamique (aucun coût au premier rendu), jamais lancé en reduced-motion, sans
 * WebGL, ou sur machine modeste ; dpr plafonné ; rendu en pause hors écran / onglet masqué ;
 * auto-désactivation si la fluidité est insuffisante. Décoratif (aria-hidden), contenu inchangé sans lui.
 */
export async function initHero3D() {
  const host = document.querySelector<HTMLElement>('[data-hero3d]');
  if (!host) return;

  const cores = navigator.hardwareConcurrency ?? 8;
  const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8;
  if (cores < 4 || mem < 4 || matchMedia('(max-width: 600px)').matches) return;

  const probe = document.createElement('canvas');
  if (!(probe.getContext('webgl2') || probe.getContext('webgl'))) return;

  const THREE = await import('three');
  const { RoomEnvironment } = await import('three/addons/environments/RoomEnvironment.js');

  const css = getComputedStyle(document.documentElement);
  const accent = new THREE.Color(css.getPropertyValue('--accent').trim() || '#d4a84b');
  const ink = new THREE.Color(css.getPropertyValue('--ink').trim() || '#0d0d10');

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.domElement.setAttribute('aria-hidden', 'true');
  host.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(ink, 7, 17);
  const pmrem = new THREE.PMREMGenerator(renderer);
  const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = envTex;

  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 60);
  camera.position.set(0, 0, 9);

  // --- Pièces : profils (rayon, hauteur) révolutionnés ---
  const base: [number, number][] = [[0, 0], [0.52, 0], [0.54, 0.07], [0.48, 0.13], [0.36, 0.2]];
  const lathe = (pts: [number, number][]) =>
    new THREE.LatheGeometry(pts.map(([r, y]) => new THREE.Vector2(r, y)), 56);
  const geos = {
    pawn: lathe([...base, [0.2, 0.46], [0.27, 0.54], [0.15, 0.6], [0.24, 0.72], [0.28, 0.86], [0.22, 1.0], [0.1, 1.07], [0, 1.09]]),
    rook: lathe([...base, [0.3, 0.34], [0.27, 0.95], [0.4, 1.02], [0.42, 1.3], [0.3, 1.3], [0.3, 1.2], [0.16, 1.2], [0.16, 1.3], [0, 1.3]]),
    bishop: lathe([...base, [0.22, 0.55], [0.32, 0.66], [0.18, 0.76], [0.34, 1.0], [0.3, 1.25], [0.12, 1.5], [0.12, 1.58], [0, 1.6]]),
    queen: lathe([...base, [0.24, 0.62], [0.38, 0.74], [0.22, 0.86], [0.32, 1.25], [0.5, 1.46], [0.22, 1.52], [0.18, 1.62], [0.1, 1.74], [0, 1.78]]),
    king: lathe([...base, [0.24, 0.62], [0.38, 0.74], [0.22, 0.86], [0.34, 1.3], [0.34, 1.5], [0.16, 1.55], [0.12, 1.62], [0, 1.64]]),
  };
  const mat = new THREE.MeshStandardMaterial({ color: accent, metalness: 0.92, roughness: 0.26, envMapIntensity: 1.1 });
  const crossGeo = new THREE.BoxGeometry(0.1, 0.34, 0.1);
  const crossGeo2 = new THREE.BoxGeometry(0.28, 0.09, 0.1);

  // Pièces rejetées vers les bords et le haut/bas : la colonne de texte (gauche) reste dégagée.
  const specs: { k: keyof typeof geos; x: number; y: number; z: number; s: number }[] = [
    { k: 'king', x: -9.2, y: -2.2, z: -4.5, s: 1.2 },
    { k: 'queen', x: 6.2, y: 3.5, z: -5.5, s: 1.15 },
    { k: 'rook', x: -2.4, y: 4.2, z: -8.5, s: 1 },
    { k: 'bishop', x: 3.2, y: -3.6, z: -5, s: 1.1 },
    { k: 'pawn', x: -9.4, y: 2.8, z: -3, s: 0.9 },
    { k: 'pawn', x: 1.2, y: 4.4, z: -9, s: 1 },
    { k: 'rook', x: 8.2, y: -2.0, z: -8, s: 1.1 },
  ];
  const group = new THREE.Group();
  scene.add(group);
  const pieces = specs.map((sp, i) => {
    const m = new THREE.Mesh(geos[sp.k], mat);
    if (sp.k === 'king') {
      const c1 = new THREE.Mesh(crossGeo, mat); c1.position.y = 1.82; m.add(c1);
      const c2 = new THREE.Mesh(crossGeo2, mat); c2.position.y = 1.86; m.add(c2);
    }
    m.scale.setScalar(sp.s);
    m.position.set(sp.x, sp.y, sp.z);
    m.rotation.set(0.35 + i * 0.4, i * 1.3, 0.25 - i * 0.18);
    group.add(m);
    return { m, base: sp, phase: i * 1.7 };
  });

  const key = new THREE.DirectionalLight(0xfff1d6, 1.4);
  key.position.set(4, 6, 6);
  scene.add(key);

  // --- Taille, visibilité, pointeur ---
  const resize = () => {
    const w = host.clientWidth, h = host.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(host);

  let visible = true;
  new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: 0 }).observe(host);
  const target = { x: 0, y: 0 };
  window.addEventListener('pointermove', (e) => {
    target.x = (e.clientX / innerWidth - 0.5) * 2;
    target.y = (e.clientY / innerHeight - 0.5) * 2;
  }, { passive: true });

  // --- Boucle ---
  const timer = new THREE.Timer();
  let slow = 0;
  let frames = 0;
  let dead = false;
  const dispose = () => {
    dead = true;
    renderer.setAnimationLoop(null);
    ro.disconnect();
    Object.values(geos).forEach((g) => g.dispose());
    [crossGeo, crossGeo2, mat, envTex].forEach((x) => x.dispose());
    pmrem.dispose();
    renderer.dispose();
    host.classList.remove('on');
    setTimeout(() => renderer.domElement.remove(), 800);
  };

  renderer.setAnimationLoop(() => {
    if (dead || !visible || document.hidden) return;
    timer.update();
    const dt = Math.min(timer.getDelta(), 0.1);
    const t = timer.getElapsed();
    // Adaptatif : si > 45 ms/image pendant 40 images (après un temps de chauffe), on coupe.
    if (++frames > 30) { slow = dt > 0.045 ? slow + 1 : Math.max(0, slow - 1); if (slow > 40) return dispose(); }

    pieces.forEach(({ m, base: b, phase }) => {
      m.position.y = b.y + Math.sin(t * 0.5 + phase) * 0.22;
      m.rotation.y += dt * 0.25;
      m.rotation.x += dt * 0.05;
    });
    camera.position.x += (target.x * 0.9 - camera.position.x) * 0.04;
    camera.position.y += (-target.y * 0.6 - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);
    group.rotation.y = scrollY * 0.0006;
    group.position.y = scrollY * 0.0016;
    renderer.render(scene, camera);
  });

  requestAnimationFrame(() => host.classList.add('on'));
}

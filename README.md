# Portfolio — Hugo Muller

Portfolio d'un étudiant en cybersécurité (CPE Lyon, cursus ICS) pour présenter ses projets et trouver un stage puis une alternance.

**Thème : l'échiquier** — sobre, éditorial, noir / ivoire / or. Les projets sont des « coups », les compétences des « pièces ».

## État
- [x] Exploration de 3 directions (échiquier, game HUD, manga)
- [x] Direction choisie : **échiquier**
- [ ] Maquette finale validée
- [ ] Implémentation du site
- [ ] Contenu réel (projets, CV, liens)
- [ ] Déploiement (Cloudflare Pages)

Détail dans [`docs/ROADMAP.md`](docs/ROADMAP.md).

## Maquettes
Ouvrir directement dans un navigateur :

| Fichier | Direction |
|---|---|
| [`mockups/index.html`](mockups/index.html) | Page de comparaison |
| [`mockups/1-echiquier.html`](mockups/1-echiquier.html) | **Retenue** |
| [`mockups/2-game-hud.html`](mockups/2-game-hud.html) | Écartée |
| [`mockups/3-manga.html`](mockups/3-manga.html) | Écartée |

Chaque maquette est un fichier HTML autonome avec un bouton FR/EN fonctionnel.

## Projets présentés
1. **Lab Wazuh** — SIEM/XDR (PPE BTS SIO 2)
2. **Cluster Docker Swarm** — orchestration et haute disponibilité (PPE BTS SIO 2)
3. **Home lab** — projet personnel en évolution

## Stack visée
Astro (statique) · TypeScript · CSS à variables · GSAP + ScrollTrigger · Lenis · Three.js · Docker (nginx) + Portainer + Cloudflare. Détails et décisions : [`CLAUDE.md`](CLAUDE.md).

## Démarrer
```bash
npm ci
npm run dev      # http://localhost:4321
npm run build    # génère dist/
```
Déploiement Docker / Portainer / Cloudflare : [`docs/DEPLOY.md`](docs/DEPLOY.md).

## Structure
```
.
├── CLAUDE.md          # Contexte pour les assistants IA (lire en premier)
├── README.md
├── docs/
│   ├── DESIGN.md      # Tokens et composants de la maquette
│   ├── CONTENT.md     # Textes FR/EN et placeholders
│   └── ROADMAP.md     # Étapes et avancement
├── mockups/           # Maquettes HTML
└── .claude/agents/    # Agents spécialisés
```

## Travailler avec Claude
Les agents de `.claude/agents/` se lancent par leur nom (ex. « utilise `frontend-builder` pour créer la section Projets »). Un nouveau modèle n'a pas besoin de l'historique : `CLAUDE.md` et `docs/` suffisent.

## Licence
À définir.

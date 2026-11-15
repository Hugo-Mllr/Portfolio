# CLAUDE.md — Contexte du projet Portfolio

> Lis ce fichier en premier. Il remplace l'historique de conversation : tout ce qui a été décidé est ici ou dans `docs/`.

## Qui / pourquoi
- **Propriétaire** : Hugo Muller (nom à confirmer), étudiant en cybersécurité, cursus **ICS à CPE Lyon**, ex-BTS SIO (PPE en BTS SIO 2).
- **Objectif du site** : portfolio pour **présenter ses projets** et **décrocher un stage puis une alternance** en cybersécurité. Le style doit marquer, mais la lisibilité pour un recruteur passe avant.
- **Langue** : français par défaut, avec un **bouton FR/EN** (déjà prototypé dans les maquettes).
- **Personnalité à faire transparaître** : passionné d'**échecs** (thème retenu), jeux vidéo, anime/manga. **Pas de thème terminal/hacker** (jugé trop vu).

## Décisions prises
1. **Direction artistique retenue : « Échiquier »** → source de vérité visuelle : `mockups/1-echiquier.html`. Les deux autres maquettes (`2-game-hud.html`, `3-manga.html`) sont écartées mais gardées comme référence ; on peut en emprunter des idées si Hugo le demande.
2. Projets à afficher : **Lab Wazuh** (PPE BTS SIO 2), **Cluster Docker Swarm** (PPE BTS SIO 2), **Home lab** (perso, en évolution continue).
3. Hébergement visé : **Cloudflare** (Pages, ou Workers avec assets statiques : Cloudflare pousse désormais vers Workers, vérifier la doc actuelle via le connecteur ou Context7 avant de choisir). Le connecteur « Cloudflare Developer Platform » est déprécié au profit du serveur MCP `https://mcp.cloudflare.com/mcp`.

## Stack proposée (à confirmer avec Hugo avant de coder)
- **Astro + îlots React + TypeScript + Tailwind** (contenu surtout statique, bon SEO, rapide).
- Animations : **GSAP + ScrollTrigger** (scroll/timelines), **Lenis** (scroll fluide), **Motion** (micro-interactions), éventuellement **React Three Fiber** pour un hero 3D léger.
- i18n : fichiers de contenu `fr` / `en`, choix mémorisé dans `localStorage` (avec try/catch).
- Si une autre stack est choisie, mettre à jour cette section.

## Docs à lire selon la tâche
| Fichier | Contenu |
|---|---|
| `docs/DESIGN.md` | Tokens (couleurs, typo, espacements), composants, animations de la maquette échiquier |
| `docs/CONTENT.md` | Textes FR/EN, projets, ce qui est **placeholder** et à faire valider |
| `docs/ROADMAP.md` | Étapes, état d'avancement, prochaines actions |
| `README.md` | Présentation, structure, commandes |

## Agents disponibles (`.claude/agents/`)
- `frontend-builder` : implémente le site fidèlement à la maquette.
- `design-guardian` : vérifie la fidélité visuelle et la cohérence des tokens.
- `content-writer` : rédige/corrige les textes FR/EN pour recruteurs.
- `a11y-perf-reviewer` : audit accessibilité, performance, SEO, `prefers-reduced-motion`.
- `job-search-coach` : CV, lettre, candidatures stage/alternance.

## Conventions
- **Aucune invention de faits** : ne jamais inventer de techno, chiffre, résultat ou expérience dans les projets de Hugo. Si une info manque, mettre un placeholder visible `[À COMPLÉTER]` et le lister dans `docs/CONTENT.md`.
- Respecter `prefers-reduced-motion` ; contraste WCAG AA ; navigation clavier ; HTML sémantique.
- Mobile-first, aucune barre de scroll horizontale ; 16 px de gouttière minimum.
- Pas de dépendance inutile ; versions épinglées (pas de `latest`).
- **Utiliser Context7** (MCP) pour la doc à jour des bibliothèques. IDs déjà résolus : GSAP `/greensock/gsap-skills`, Lenis `/darkroomengineering/lenis`, React Three Fiber `/pmndrs/react-three-fiber`, Motion `/websites/motion_dev`.
- Ne pas committer de données personnelles sensibles (email, téléphone) sans accord explicite de Hugo.
- Branche de travail : `claude/nice-ramanujan-7k6lth` ; PR en brouillon ; messages de commit clairs.
- Répondre à Hugo **en français**, ton direct et enthousiaste, sans jargon inutile.

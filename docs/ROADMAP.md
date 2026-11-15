# Roadmap

## Fait
- [x] Choix du public et de l'objectif (recruteurs, stage puis alternance)
- [x] Vérification des connecteurs (Context7 OK ; Cloudflare à reconnecter)
- [x] 3 maquettes HTML avec bascule FR/EN
- [x] Direction choisie : échiquier
- [x] Contexte, README, docs et agents pour passer la main à un autre modèle
- [x] PR 1 : scaffold Astro, tokens thémables, i18n FR/EN par routes (`/fr/`, `/en/`), Dockerfile + compose (image non testée : pas de daemon Docker dans l'environnement de dev)
- [x] PR 2 : accueil (hero + échiquier interactif, projets, compétences, contact), Lenis + GSAP v1
- [x] PR 3 : collections projets (multi-fichiers) et writeups CTF, pages liste/détail, filtres, brouillons
- [x] PR 4 : rideau d'intro en damier, curseur halo, bandeau défilant (vitesse liée au scroll), rail de navigation, spotlight, titres lettre par lettre, inclinaison 3D de l'échiquier, chute du roi

## Plan de PR (empilées, en brouillon)
Base : `claude/nice-ramanujan-7k6lth`. Chaque PR part de la précédente.

| # | Branche | Contenu |
|---|---|---|
| 1 | `claude/feat-scaffold` | Astro + TS, tokens thémables, layout, i18n FR/EN par routes, Dockerfile + compose |
| 2 | `claude/feat-home` | Nav, hero avec échiquier animé, sections accueil, Lenis + GSAP (animations v1) |
| 3 | `claude/feat-content` | Collections projets (multi-fichiers) et writeups CTF, pages liste/détail, contenu d'exemple |
| 4 | `claude/feat-animations` | Animations avancées (scroll narratif, curseur, transitions de page, marquee) |
| 5 | `claude/feat-hero-3d` | Hero 3D Three.js (cavalier), chargé à la demande |
| 6 | `claude/feat-ci-qa` | Image Docker via GitHub Actions (GHCR), audit a11y/perf, corrections |

## Plus tard
- [ ] Sélecteur de thème de couleur (accent au choix du visiteur)
- [ ] Contenu réel : projets, CV téléchargeable, liens (voir `docs/CONTENT.md`)
- [ ] Déploiement : stack Docker + Portainer + tunnel Cloudflare (par Hugo)
- [ ] Nom de domaine et analytics éventuels

## Questions ouvertes
- Liens GitHub / LinkedIn exacts, CV PDF
- Vrais détails des 3 projets (machines, versions, résultats, captures)
- Premiers writeups CTF à publier

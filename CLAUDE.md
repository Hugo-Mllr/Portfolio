# CLAUDE.md — Contexte du projet Portfolio

> Lis ce fichier en premier. Il remplace l'historique de conversation : tout ce qui a été décidé est ici ou dans `docs/`.

## Qui / pourquoi
- **Propriétaire** : **Hugo Muller**, étudiant en cybersécurité, cursus **ICS à CPE Lyon**, ex-BTS SIO (PPE en BTS SIO 2).
- **Objectif du site** : présenter ses projets, publier des **comptes rendus de projet** et des **writeups de CTF**, et aider à décrocher un stage puis une alternance. Le style doit marquer, mais la lisibilité pour un recruteur passe avant.
- **Langue** : français par défaut, avec un **bouton FR/EN**.
- **Personnalité** : passionné d'**échecs** (thème retenu), jeux vidéo, anime/manga. **Pas de thème terminal/hacker.**

## Décisions prises
1. **Direction artistique : « Échiquier »**, source de vérité visuelle : `mockups/1-echiquier.html`. Palette validée par Hugo. Les maquettes `2-game-hud` et `3-manga` sont écartées (référence d'idées seulement).
2. **Thèmes de couleur** : la palette échiquier (noir/ivoire/or) est le thème par défaut. **Plus tard**, chaque visiteur pourra choisir sa couleur d'accent. → Toutes les couleurs passent par des variables CSS (`--accent`, etc.) dès le départ, jamais en dur.
3. **Animations : un maximum**, vraiment stylées, livrées par étapes. Toujours avec un repli propre pour `prefers-reduced-motion`.
4. **Stack : Astro** (contenu en collections Markdown/MDX, sortie **statique**), TypeScript, CSS natif avec variables (pas de Tailwind, pour coller exactement à la maquette), **GSAP + ScrollTrigger**, **Lenis**, **Three.js** (vanilla, chargé à la demande) pour le hero 3D. React uniquement si un îlot l'exige.
5. **Contenu éditable par Hugo** sans toucher au code : fichiers Markdown/MDX.
   - **Projets** : un dossier par projet, plusieurs fichiers (présentation + chapitres), pièces jointes (PDF, images).
   - **Writeups CTF** : un fichier par writeup, avec événement, catégorie, difficulté, date, tags.
6. **Hébergement** : Hugo a un nom de domaine. Il déploiera une **stack Docker avec Portainer** reliée à **Cloudflare** via un tunnel `cloudflared` **déjà existant** du homelab : la stack du portfolio contient donc **uniquement le site**, rejoint le réseau Docker de ce cloudflared (`TUNNEL_NETWORK`) et s'appelle `portfolio-web` (route : `http://portfolio-web:8080`). Pas de second cloudflared, pas de jeton dans cette stack. → Le projet fournit un `Dockerfile` (build Astro puis nginx), un `docker-compose.yml` compatible Portainer et, plus tard, une image publiée sur GHCR. Aucun secret dans le dépôt.
7. **Workflow Git** : plusieurs petites PR (une par objectif), en brouillon puis « prêtes ». Hugo a explicitement donné l'**autonomie** de fusionner les PR de ce projet (« tu es autonome ») : fusionner après CI verte et état « clean », en vérifiant `expectedHeadSha`. Branche de base : `main` (créée à la demande de Hugo). Les PR 1 à 6 (scaffold, accueil, contenu, animations, hero 3D, CI/QA) sont **fusionnées**.

## Docs à lire selon la tâche
| Fichier | Contenu |
|---|---|
| `docs/DESIGN.md` | Tokens, composants, animations de la maquette échiquier |
| `docs/CONTENT.md` | Textes FR/EN, projets, placeholders, **comment ajouter un projet ou un writeup** |
| `docs/ROADMAP.md` | Étapes, avancement, questions ouvertes |
| `README.md` | Présentation, structure, commandes |

## Agents (`.claude/agents/`) et choix du modèle
Lance le chef d'orchestre avec `claude --agent portfolio-manager` : il lit la roadmap, découpe le travail et choisit **agent + modèle** selon la tâche (table de routage dans son fichier).

| Agent | Rôle | Modèle par défaut |
|---|---|---|
| `portfolio-manager` | Orchestration, vérification, PR | Sonnet 5.5 |
| `frontend-builder` | Implémentation du site, animations | Fable 5.2 (Sonnet/Haiku pour le simple) |
| `design-guardian` | Fidélité visuelle, captures | Sonnet 5.5 |
| `content-writer` | Textes FR/EN | Sonnet 5.5 |
| `a11y-perf-reviewer` | Accessibilité, perf, SEO | Sonnet 5.5 |
| `writeup-publisher` | Met en forme comptes rendus et writeups | Haiku 5.5 |

Principe : le modèle le moins cher qui réussit ; on monte seulement si nécessaire.

## Conventions
- **Aucune invention de faits** sur les projets de Hugo : placeholder visible `[À COMPLÉTER]`, listé dans `docs/CONTENT.md`.
- `prefers-reduced-motion` respecté partout ; contraste WCAG AA ; navigation clavier ; HTML sémantique.
- Mobile-first, aucun scroll horizontal. Performance : animations sur `transform`/`opacity`, 3D chargée à la demande avec repli statique.
- Dépendances à versions épinglées, justifiées.
- **Context7** pour la doc à jour des bibliothèques (GSAP `/greensock/gsap-skills`, Lenis `/darkroomengineering/lenis`, Three.js, Astro).
- **Sécurité et vie privée (règle absolue)** : ne jamais committer de secret (clés, jetons, `.env`, certificats), même « de test » ; tout nouveau type de fichier sensible va dans `.gitignore` ; lancer `bash scripts/check-secrets.sh` avant de pousser. Aucune donnée personnelle (email, téléphone) sans accord de Hugo. Aucun flag de CTF actif publié. Aucun tiers côté visiteur (pas de CDN/analytics/police externe) sans mise à jour de la CSP et accord de Hugo. Détails : `docs/SECURITY.md`.
- Répondre à Hugo **en français**, ton direct et enthousiaste.
- **Format des réponses** : regrouper **toutes** les actions demandées à Hugo dans une seule section « À faire » numérotée, placée **à la toute fin** de la réponse. Pas de demandes éparpillées dans le texte (il s'y perd).

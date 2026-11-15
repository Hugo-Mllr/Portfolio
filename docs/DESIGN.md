# Design — direction « Échiquier »

Source de vérité : `mockups/1-echiquier.html`. En cas de doute, ouvrir la maquette.

## Intention
Élégance éditoriale sombre, avec une touche de jeu d'échecs : anticipation, structure, sang-froid. Le style marque sans nuire à la lisibilité pour un recruteur.

## Tokens
### Couleurs
| Token | Valeur | Usage |
|---|---|---|
| `--ink` | `#0d0d10` | Fond principal |
| `--ink2` | `#15151a` | Cartes, surfaces |
| `--line` | `#2a2a31` | Bordures |
| `--ivory` | `#f2ebd9` | Texte principal |
| `--mute` | `#9a968b` | Texte secondaire |
| `--gold` | `#d4a84b` | Accent, CTA |
| `--gold2` | `#f0cf86` | Accent clair, italiques, hover |
| `--sq-d` / `--sq-l` | `#1b1b21` / `#26262e` | Cases de l'échiquier |
| Succès | `#5fd38d` | Pastille « disponible », statut « en évolution » |

À vérifier : contraste de `--mute` sur `--ink` (AA pour le corps de texte).

### Typographie
- Titres : **Fraunces** (serif, 400/700, italique pour les mots clés en `--gold2`).
- Texte : **Inter** (400/500/600).
- Détails / labels / code : **JetBrains Mono**, petites capitales espacées.
- Fallbacks : Georgia, system-ui, ui-monospace. Auto-héberger les polices en production.

## Structure de page
1. **Nav** sticky translucide (flou) : logo `♞ Hugo.Muller`, liens Coups / Pièces / Contact, bascule **FR | EN**.
2. **Hero** : accroche « Je pense *trois coups* d'avance. », texte, 2 CTA (Voir mes coups / CV), pastille de disponibilité, **échiquier animé** à droite.
3. **Mes coups** (projets) : lignes numérotées en notation algébrique (`1. e4`, `2. Cf3`, `3. Fc4`), titre, description, tags, statut. Au survol : fond `--ink2`, barre dorée à gauche, léger décalage.
4. **Mes pièces** (compétences) : grille de cartes avec glyphe ♙♘♗♖♕♔ et niveau (Solide / En progression / Pratique / En apprentissage).
5. **Échec et mat ?** : section de contact centrée, halo doré, CTA Me contacter / GitHub / LinkedIn.
6. **Footer** minimal.

## Animations
- **Cavalier** : toutes les 2,2 s, saute en L vers une case libre, laisse une trace dorée 1,6 s, met à jour « Dernier coup » (notation).
- **Révélation au scroll** : fondu + translation 24 px, `IntersectionObserver`, seuil 0,15.
- **Pastille disponible** : pulsation douce.
- **Boutons / cartes** : translation de 2 à 4 px au survol.
- **Obligatoire** : tout couper avec `prefers-reduced-motion: reduce`.

## Idées d'évolution (à valider avec Hugo)
- Hero 3D léger (React Three Fiber, `frameloop="demand"`, dpr adaptatif, fallback statique sans WebGL).
- Scroll fluide Lenis branché sur le ticker GSAP.
- Pages détail par projet (schémas d'architecture, captures, ce qui a été appris).
- Mini-partie d'échecs cliquable ou position célèbre comme easter egg.
- Section « Parcours » en frise.

## Responsive
- Hero en une colonne sous 860 px ; liens de nav masqués (prévoir un menu mobile).
- Lignes de projets : numéro à gauche, statut sous le texte.

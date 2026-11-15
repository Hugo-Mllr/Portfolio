# Roadmap

## Fait
- [x] Choix du public et de l'objectif (recruteurs, stage puis alternance)
- [x] Vérification des connecteurs (Context7 OK ; Cloudflare à reconnecter)
- [x] 3 maquettes HTML avec bascule FR/EN
- [x] Direction choisie : échiquier
- [x] Contexte, README, docs et agents pour passer la main à un autre modèle

## À faire
### 1. Finaliser la maquette (avec Hugo)
- [ ] Retours de Hugo sur `mockups/1-echiquier.html` (couleurs, textes, sections, animations)
- [ ] Décider : hero 3D ou non ; pages détail par projet ; section parcours
- [ ] Valider le nom, les liens et les vrais textes de projets (`docs/CONTENT.md`)

### 2. Mise en place technique
- [ ] Confirmer la stack (Astro + React + TS + Tailwind proposé)
- [ ] Initialiser le projet, structure de composants, tokens CSS
- [ ] i18n FR/EN avec persistance

### 3. Implémentation
- [ ] Nav, hero, échiquier animé
- [ ] Section projets + pages détail
- [ ] Section compétences
- [ ] Contact, CV téléchargeable
- [ ] Animations GSAP / Lenis / Motion, avec `prefers-reduced-motion`

### 4. Qualité
- [ ] Audit accessibilité (WCAG AA), performance (Lighthouse), SEO, Open Graph
- [ ] Tests responsive mobile / tablette / desktop
- [ ] Polices auto-hébergées

### 5. Mise en ligne
- [ ] Reconnecter Cloudflare, déployer sur Pages, domaine éventuel
- [ ] Analytics respectueux de la vie privée (optionnel)

### 6. Recherche de stage / alternance
- [ ] CV aligné avec le site
- [ ] Liste d'entreprises cibles, modèles de candidature, suivi
- [ ] Profil LinkedIn cohérent

## Questions ouvertes
- Nom exact, zone géographique, dates de stage et rythme d'alternance
- Hero 3D : oui ou non ?
- Nom de domaine souhaité ?

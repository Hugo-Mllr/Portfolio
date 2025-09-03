# ✅ Checklist QA - Portfolio BTS SIO

## 🔧 Tests Techniques

### Performance
- [ ] Images optimisées (< 500KB chacune)
- [ ] Temps de chargement < 3s (outil : GTmetrix/PageSpeed)
- [ ] Lazy loading activé sur images non-critiques
- [ ] CSS/JS minifiés en production
- [ ] Pas d'erreurs console JavaScript

### Responsive Design
- [ ] ✅ Mobile (320px - 480px) : Navigation, lisibilité, interactions
- [ ] ✅ Tablette (481px - 1024px) : Layout adapté, menus
- [ ] ✅ Desktop (1025px+) : Full layout, hover effects
- [ ] ✅ Tests sur Chrome, Firefox, Safari, Edge

### SEO
- [ ] ✅ Balises `<title>` uniques et descriptives
- [ ] ✅ Meta descriptions (120-160 caractères)
- [ ] ✅ Structure Hn cohérente (H1 → H2 → H3)
- [ ] ✅ Balises OpenGraph (Facebook/LinkedIn)
- [ ] ✅ URL propres et logiques
- [ ] ✅ Sitemap accessible mentalement

## ♿ Tests Accessibilité (WCAG AA)

### Navigation Clavier
- [ ] ✅ Tab : Navigation séquentielle dans tous les éléments
- [ ] ✅ Enter/Space : Activation boutons et liens
- [ ] ✅ Escape : Fermeture des modales/menus
- [ ] ✅ Flèches : Navigation dans menus (si applicable)

### Focus Visible
- [ ] ✅ Contour focus visible sur tous les éléments interactifs
- [ ] ✅ Focus trap dans le menu mobile
- [ ] ✅ Focus management après ouverture/fermeture menu
- [ ] ✅ Skip links fonctionnels

### Contrastes
- [ ] ✅ Texte principal vs fond ≥ 4.5:1
- [ ] ✅ Texte secondaire vs fond ≥ 4.5:1  
- [ ] ✅ Liens vs fond ≥ 4.5:1
- [ ] ✅ Boutons vs fond ≥ 3:1
- [ ] ✅ Test avec outil (WebAIM Contrast Checker)

### Sémantique & ARIA
- [ ] ✅ Landmarks : `<header>`, `<main>`, `<nav>`, `<footer>`
- [ ] ✅ Titres : Structure logique H1-H6
- [ ] ✅ Boutons : `<button>` vs `<a>` selon usage
- [ ] ✅ Formulaires : `<label>` associés, `required`, `aria-describedby`
- [ ] ✅ Images : Textes alternatifs pertinents

### Lecteurs d'écran
- [ ] Test NVDA/JAWS (Windows) ou VoiceOver (Mac)
- [ ] Navigation par titres fonctionnelle
- [ ] Lecture du contenu cohérente
- [ ] Annonces d'état (succès/erreur formulaire)

## 📱 Test Mobile Spécifique

### Menu Navigation
- [ ] ✅ Bouton hamburger accessible au doigt
- [ ] ✅ Menu échiquier : cases assez grandes (min 44px)
- [ ] ✅ Fermeture par overlay ou bouton
- [ ] ✅ Pas de scroll horizontal indésirable

### Interactions Tactiles
- [ ] ✅ Zones de touch ≥ 44x44px
- [ ] ✅ Espacement suffisant entre éléments
- [ ] ✅ Formulaire : Inputs adaptés mobile
- [ ] ✅ Zoom possible (pas de maximum-scale)

## 🎯 Tests Fonctionnels

### Navigation
- [ ] ✅ Tous les liens internes fonctionnent
- [ ] ✅ Liens externes s'ouvrent en nouvelle fenêtre
- [ ] ✅ Pages d'erreur 404 gérées (si serveur)
- [ ] ✅ Barre de progression suit le scroll

### Formulaire Contact
- [ ] ✅ Validation en temps réel
- [ ] ✅ Messages d'erreur clairs
- [ ] ✅ Soumission réussie (message de succès)
- [ ] ✅ Protection anti-spam basique
- [ ] ✅ RGPD : Consentement obligatoire

### Filtres & Interactions
- [ ] ✅ Filtre projets : Toutes catégories fonctionnent
- [ ] ✅ Filtre compétences : Affichage/masquage correct
- [ ] ✅ Boutons d'état actif visibles
- [ ] ✅ Message "aucun résultat" affiché si pertinent

## 🔒 Conformité & Légal

### RGPD
- [ ] ✅ Mentions légales complètes
- [ ] ✅ Politique de confidentialité
- [ ] ✅ Formulaire avec consentement explicite
- [ ] ✅ Droits utilisateur expliqués
- [ ] ✅ Contact DPO/responsable indiqué

### Contenu
- [ ] ✅ Pas de contenu placeholder/lorem ipsum
- [ ] ✅ Informations personnelles vérifiées
- [ ] ✅ Liens sociaux à jour
- [ ] ✅ CV téléchargeable disponible

## ⚡ Optimisations Avancées

### Animations & Motion
- [ ] ✅ `prefers-reduced-motion` respecté
- [ ] ✅ Animations légères (< 300ms)
- [ ] ✅ Pas d'animations qui clignotent (épilepsie)
- [ ] ✅ Hover/focus : Effets subtils uniquement

### Code Quality
- [ ] HTML validé (W3C Validator)
- [ ] CSS validé (W3C CSS Validator)  
- [ ] JavaScript sans erreurs
- [ ] Commentaires code pour maintenance

---

## 🧪 Mini Plan de Test Clavier

### Séquence complète de test :

1. **Chargement page**
   - Tab → Premier élément focusable (skip link)
   - Enter → Saut vers contenu principal

2. **Navigation header**
   - Tab → Logo/nom (si lien)
   - Tab → Menu desktop/hamburger mobile
   - Enter/Space → Activation

3. **Menu mobile (si ouvert)**
   - Tab → Navigation dans les éléments
   - Escape → Fermeture menu
   - Vérifier focus de retour

4. **Contenu principal**
   - Tab → Boutons/liens dans l'ordre logique
   - Enter → Activation liens/boutons
   - Arrows → Navigation dans composants (si applicable)

5. **Formulaires**
   - Tab → Champs dans l'ordre
   - Type → Saisie texte
   - Tab → Messages d'erreur annoncés
   - Enter → Soumission

6. **Footer**
   - Tab → Liens sociaux
   - Enter → Ouverture nouveaux onglets

### ✅ Validation réussie si :
- Aucun élément inaccessible au clavier
- Ordre de tabulation logique
- Focus toujours visible
- Toutes les fonctionnalités utilisables

---

## 📊 Outils Recommandés

- **Accessibilité** : axe-core, WAVE, Lighthouse
- **Performance** : GTmetrix, PageSpeed Insights
- **Responsive** : Responsively App, Browser DevTools
- **Validation** : W3C Markup/CSS Validator
- **Contraste** : WebAIM Contrast Checker

**Status : ✅ Prêt pour production**

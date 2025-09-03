# Portfolio BTS SIO - Guide d'utilisation

## 📋 Vue d'ensemble

Ce portfolio moderne utilise :
- **HTML5 + TailwindCSS** (via CDN)
- **JavaScript Vanilla** pour les interactions
- **Thème "échecs"** en mode sombre
- **2 variantes de navigation** (A et B)

## 🔧 Comment changer la variante de menu

### Méthode 1 : Modification manuelle
Dans chaque fichier HTML, modifiez la classe du `<body>` :

```html
<!-- Variante A (Topbar classique) -->
<body class="nav-variant-a">

<!-- Variante B (Menu échiquier) -->
<body class="nav-variant-b">
```

### Méthode 2 : Via JavaScript (temporaire)
Ajoutez ce bouton dans le header pour tester :

```html
<button class="nav-variant-toggle btn btn-secondary">
  Changer navigation
</button>
```

## 📂 Structure des fichiers

```
Portfolio/
├── index.html              # Page d'accueil
├── profil.html             # CV et compétences
├── projets.html            # Projets et réalisations
├── contact.html            # Formulaire de contact
├── mentions.html           # Mentions légales RGPD
├── assets/
│   ├── css/
│   │   └── styles.css      # Styles personnalisés
│   ├── js/
│   │   └── main.js         # JavaScript principal
│   ├── img/
│   │   ├── logo.png        # Logo/avatar
│   │   └── projets/        # Images de projets
│   └── docs/
│       └── CV.pdf          # CV téléchargeable
```

## ➕ Comment ajouter un nouveau projet

### 1. Ajout dans projets.html

Dupliquez une carte existante et modifiez :

```html
<article class="card project-card reveal" data-category="CATEGORIE">
  <div class="aspect-video bg-bg-primary rounded-lg border border-border-subtle mb-4 flex items-center justify-center">
    <div class="text-4xl text-accent-gold">🎯</div>
  </div>
  <div class="flex flex-wrap gap-2 mb-3">
    <span class="tag">Type</span>
    <span class="tag">Technologie</span>
  </div>
  <h4 class="text-lg font-semibold mb-2">
    Titre du projet
  </h4>
  <p class="text-text-secondary text-sm mb-4">
    Description courte du projet...
  </p>
  <div class="space-y-2 text-xs text-text-secondary">
    <div><strong>Période :</strong> Dates</div>
    <div><strong>Technologies :</strong> Liste</div>
    <div><strong>Résultat :</strong> Outcome</div>
  </div>
  <div class="mt-4 pt-4 border-t border-border-subtle">
    <a href="#" class="btn btn-primary w-full text-sm">
      Voir la preuve
      <span aria-hidden="true">→</span>
    </a>
  </div>
</article>
```

### 2. Catégories disponibles
- `stages` : Stages en entreprise
- `ppe` : Projets personnalisés de professionnalisation
- `tp` : Travaux pratiques
- `perso` : Projets personnels
- `certifications` : Certifications obtenues

### 3. Ajout d'une image
1. Placez l'image dans `assets/img/projets/`
2. Remplacez l'icône emoji par :
```html
<img src="assets/img/projets/mon-projet.jpg" 
     alt="Capture d'écran du projet" 
     class="w-full h-full object-cover rounded-lg">
```

## 🔗 Comment ajouter une preuve/documentation

### 1. Documents PDF
1. Ajoutez le fichier dans `assets/docs/`
2. Liez-le : `href="assets/docs/rapport-stage.pdf"`

### 2. Liens externes
- GitHub : `href="https://github.com/username/repo"`
- Site web : `href="https://monprojet.com"`

### 3. Pages détaillées
Créez une nouvelle page HTML pour des preuves complexes :
1. Copiez la structure d'une page existante
2. Adaptez le contenu
3. Liez depuis la carte projet

## 🎨 Personnalisation des couleurs

Dans `assets/css/styles.css`, modifiez les variables CSS :

```css
:root {
  --bg-primary: #0B0B0B;      /* Fond principal */
  --accent-gold: #CDA434;      /* Couleur d'accent */
  --text-primary: #EAEAEA;     /* Texte principal */
  /* ... */
}
```

Ou dans la config Tailwind (dans chaque HTML) :

```javascript
tailwind.config = {
  theme: {
    extend: {
      colors: {
        'accent-gold': '#CDA434',  // Votre couleur
      }
    }
  }
}
```

## 📱 Responsive Design

Le site est responsive par défaut avec Tailwind :
- `sm:` : ≥ 640px
- `md:` : ≥ 768px  
- `lg:` : ≥ 1024px
- `xl:` : ≥ 1280px

## ⚡ Performance

### Images optimisées
1. Compressez vos images (JPG 80-85%, PNG avec compression)
2. Utilisez des formats modernes (WebP si possible)
3. Ajoutez `loading="lazy"` sauf pour les images au-dessus de la ligne de flottaison

### JavaScript
- Toutes les animations respectent `prefers-reduced-motion`
- Pas de frameworks lourds, JavaScript vanilla uniquement

## 🔒 Sécurité et Conformité

### RGPD
- Mentions légales complètes dans `mentions.html`
- Formulaire de contact avec consentement
- Pas de tracking sans consentement

### Accessibilité (WCAG AA)
- Navigation au clavier
- Contrastes respectés
- Landmarks ARIA
- Focus visible
- Textes alternatifs

## 🚀 Déploiement

### GitHub Pages
1. Push sur la branche `main`
2. Activez Pages dans Settings → Pages
3. Source : "Deploy from branch" → `main` → `/ (root)`

### Autres plateformes
- **Netlify** : Glissez-déposez le dossier
- **Vercel** : Connectez le repo GitHub
- **000webhost** : Upload via FTP

## 🛠️ Maintenance

### Mise à jour du contenu
1. **CV** : Remplacez `assets/docs/CV.pdf`
2. **Photo** : Remplacez `img/logo.png` (format carré recommandé)
3. **Projets** : Suivez la section "Ajouter un nouveau projet"

### Mise à jour des compétences
Dans `profil.html`, section tableau :
1. Dupliquez une ligne `<tr>`
2. Modifiez le contenu
3. Ajustez la barre de progression (style="width: X%")

### Nouvelles certifications
1. Ajoutez les PDF dans `certifs/`
2. Créez/mettez à jour `certifications.html` si nécessaire
3. Ajoutez une ligne dans le tableau de compétences si pertinent

---

## 📞 Support

Pour toute question sur ce portfolio :
- Consultez la documentation inline dans le code
- Vérifiez la console browser pour les erreurs JavaScript
- Validez votre HTML/CSS avec les outils W3C

**Bonne utilisation ! 🎯**

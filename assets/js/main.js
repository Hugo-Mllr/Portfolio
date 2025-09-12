/* =============================================
   PORTFOLIO BTS SIO - JavaScript Principal
   Fonctionnalités : Menu, Progress Bar, Animations
   ============================================= */

class PortfolioApp {
  constructor() {
    this.init();
  }

  init() {
    this.setupProgressBar();
    this.setupMenuToggle();
    this.setupScrollAnimations();
    this.setupAccessibility();
    this.setupNavVariantToggle();
  }

  // Barre de progression de lecture
  setupProgressBar() {
    const progressBar = document.querySelector('.progress-bar');
    if (!progressBar) return;

    const updateProgress = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      progressBar.style.width = `${Math.min(scrollPercent, 100)}%`;
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress(); // Initial call
  }

  // Toggle menu (pour variante B - échiquier)
  setupMenuToggle() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const menuOverlay = document.querySelector('.menu-overlay');

    if (!menuToggle || !mobileMenu) return;

    const toggleMenu = () => {
      const isOpen = mobileMenu.classList.contains('menu-open');
      
      if (isOpen) {
        this.closeMenu();
      } else {
        this.openMenu();
      }
    };

    const closeMenu = () => {
      mobileMenu.classList.remove('menu-open');
      menuToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      
      // Focus retour au bouton toggle
      setTimeout(() => menuToggle.focus(), 100);
    };

    const openMenu = () => {
      mobileMenu.classList.add('menu-open');
      menuToggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
      
      // Focus sur le premier lien du menu
      const firstLink = mobileMenu.querySelector('a');
      if (firstLink) {
        setTimeout(() => firstLink.focus(), 100);
      }
    };

    // Event listeners
    menuToggle.addEventListener('click', toggleMenu);

    if (menuOverlay) {
      menuOverlay.addEventListener('click', closeMenu);
    }

    // Fermeture par Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('menu-open')) {
        closeMenu();
      }
    });

    // Trap focus dans le menu mobile
    this.setupFocusTrap(mobileMenu);

    // Expose les méthodes pour l'externe
    this.closeMenu = closeMenu;
    this.openMenu = openMenu;
  }

  // Focus trap pour accessibilité
  setupFocusTrap(container) {
    if (!container) return;

    const focusableElements = container.querySelectorAll(
      'a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );

    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    container.addEventListener('keydown', (e) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    });
  }

  // Animations au scroll (respecte prefers-reduced-motion)
  setupScrollAnimations() {
    // Vérifier si l'utilisateur préfère les animations réduites
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) return;

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    // Observer tous les éléments avec la classe 'reveal'
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => {
      el.classList.add('reveal-hidden');
      observer.observe(el);
    });
  }

  // Améliorations d'accessibilité
  setupAccessibility() {
    // Skip links
    this.createSkipLinks();
    
    // Gestion du focus visible
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        document.body.classList.add('user-tabbing');
      }
    });

    document.addEventListener('mousedown', () => {
      document.body.classList.remove('user-tabbing');
    });

    // Annonce des changements de page pour les lecteurs d'écran
    this.announcePageChanges();
  }

  // Créer des liens de navigation rapide
  createSkipLinks() {
    const skipNav = document.createElement('a');
    skipNav.href = '#main';
    skipNav.textContent = 'Aller au contenu principal';
    skipNav.className = 'skip-link';
    skipNav.style.cssText = `
      position: absolute;
      top: -40px;
      left: 6px;
      background: var(--accent-gold);
      color: var(--bg-primary);
      padding: 8px;
      text-decoration: none;
      border-radius: 4px;
      z-index: 1000;
      transition: top 0.3s;
    `;

    skipNav.addEventListener('focus', () => {
      skipNav.style.top = '6px';
    });

    skipNav.addEventListener('blur', () => {
      skipNav.style.top = '-40px';
    });

    document.body.insertBefore(skipNav, document.body.firstChild);
  }

  // Annonce des changements de page
  announcePageChanges() {
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    announcer.className = 'sr-only';
    document.body.appendChild(announcer);

    // Annoncer le titre de la page au chargement
    setTimeout(() => {
      const pageTitle = document.title;
      announcer.textContent = `Page chargée : ${pageTitle}`;
    }, 1000);
  }

  // Toggle entre les variantes de navigation
  setupNavVariantToggle() {
    const navToggle = document.querySelector('.nav-variant-toggle');
    if (!navToggle) return;

    navToggle.addEventListener('click', () => {
      const currentVariant = document.body.classList.contains('nav-variant-b') ? 'b' : 'a';
      const newVariant = currentVariant === 'a' ? 'b' : 'a';
      
      document.body.classList.remove(`nav-variant-${currentVariant}`);
      document.body.classList.add(`nav-variant-${newVariant}`);
      
      // Sauvegarder la préférence
      localStorage.setItem('nav-variant', newVariant);
      
      navToggle.textContent = `Mode navigation ${newVariant.toUpperCase()}`;
    });

    // Charger la préférence sauvegardée
    const savedVariant = localStorage.getItem('nav-variant') || 'a';
    document.body.classList.add(`nav-variant-${savedVariant}`);
    if (navToggle) {
      navToggle.textContent = `Mode navigation ${savedVariant.toUpperCase()}`;
    }
  }

  // Utilitaires
  static debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  static throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
}

// Styles CSS pour les animations (injectés via JS pour éviter les conflits)
const animationStyles = `
  .reveal-hidden {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
  }

  .animate-in {
    opacity: 1;
    transform: translateY(0);
  }

  .user-tabbing *:focus {
    outline: 2px solid var(--accent-gold) !important;
    outline-offset: 2px !important;
  }

  /* Menu échiquier pour variante B */
  .chess-menu {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 4px;
    padding: 1rem;
    background: var(--bg-secondary);
    border-radius: var(--radius-lg);
  }

  .chess-menu-item {
    aspect-ratio: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: var(--bg-primary);
    color: var(--text-primary);
    text-decoration: none;
    border-radius: var(--radius-sm);
    transition: all var(--transition-base);
    padding: 0.5rem;
    text-align: center;
  }

  .chess-menu-item:nth-child(even) {
    background: var(--bg-secondary);
  }

  .chess-menu-item:hover,
  .chess-menu-item:focus {
    background: var(--accent-gold);
    color: var(--bg-primary);
    transform: scale(1.05);
  }

  .chess-icon {
    font-size: 1.5rem;
    margin-bottom: 0.25rem;
  }

  .chess-label {
    font-size: 0.75rem;
    font-weight: 500;
  }

  @media (prefers-reduced-motion: reduce) {
    .reveal-hidden,
    .animate-in,
    .chess-menu-item {
      transition: none !important;
      transform: none !important;
    }
  }
`;

// Injecter les styles
const styleSheet = document.createElement('style');
styleSheet.textContent = animationStyles;
document.head.appendChild(styleSheet);

// Animation de la pièce d'échecs au scroll vertical
class ChessScrollAnimation {
  constructor() {
    this.chessPiece = document.getElementById('chess-piece');
    this.pieces = ['♙', '♘', '♗', '♖', '♕', '♔'];
    this.pieceNames = ['Pion', 'Cavalier', 'Fou', 'Tour', 'Dame', 'Roi'];
    this.scrollTimeout = null;
    
    if (this.chessPiece) {
      this.init();
    }
  }
  
  init() {
    // Initialisation avec le pion
    this.chessPiece.textContent = this.pieces[0];
    this.chessPiece.title = `Progression: ${this.pieceNames[0]} (0%)`;
    
    // Écouter le scroll avec throttling
    window.addEventListener('scroll', () => {
      if (this.scrollTimeout) {
        clearTimeout(this.scrollTimeout);
      }
      this.scrollTimeout = setTimeout(() => this.updateChessPiece(), 10);
    });
    
    // Initialiser la pièce
    this.updateChessPiece();
  }
  
  updateChessPiece() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = Math.max(0, Math.min(1, scrollTop / docHeight));
    
    // Calculer la position verticale (de 10% à 90% de la hauteur de l'écran)
    const viewportHeight = window.innerHeight;
    const minPosition = viewportHeight * 0.1; // 10% du haut
    const maxPosition = viewportHeight * 0.9; // 90% du haut
    const currentPosition = minPosition + (scrollPercent * (maxPosition - minPosition));
    
    // Mettre à jour la position verticale
    this.chessPiece.style.top = `${currentPosition}px`;
    this.chessPiece.style.transform = 'translateY(-50%)';
    
    // Calculer l'index de la pièce (0-5)
    const index = Math.min(this.pieces.length - 1, Math.floor(scrollPercent * this.pieces.length));
    
    // Mettre à jour la pièce si elle a changé
    if (this.chessPiece.textContent !== this.pieces[index]) {
      this.chessPiece.textContent = this.pieces[index];
      this.chessPiece.title = `Progression: ${this.pieceNames[index]} (${Math.round(scrollPercent * 100)}%)`;
      
      // Animation de pulsation lors du changement
      this.chessPiece.style.transform = 'translateY(-50%) scale(1.2)';
      setTimeout(() => {
        this.chessPiece.style.transform = 'translateY(-50%) scale(1)';
      }, 200);
    }
    
    // Mettre à jour le hover transform pour garder la cohérence
    this.chessPiece.addEventListener('mouseenter', () => {
      this.chessPiece.style.transform = 'translateY(-50%) scale(1.1)';
    });
    
    this.chessPiece.addEventListener('mouseleave', () => {
      this.chessPiece.style.transform = 'translateY(-50%) scale(1)';
    });
  }
}

// Initialiser l'application quand le DOM est prêt
document.addEventListener('DOMContentLoaded', () => {
  new PortfolioApp();
  new ChessScrollAnimation();
});

// Utilitaire pour l'année du footer
document.addEventListener('DOMContentLoaded', () => {
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});

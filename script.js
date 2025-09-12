document.addEventListener('DOMContentLoaded', () => {
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Animation d'apparition au scroll
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll('.reveal').forEach(el => {
    el.classList.add('hidden');
    observer.observe(el);
  });

  // Filtres de projets
  const projectFilters = document.querySelectorAll('.project-filter');
  const projectCards = document.querySelectorAll('.project-card');
  const noProjectsMessage = document.getElementById('no-projects');

  if (projectFilters.length > 0 && projectCards.length > 0) {
    projectFilters.forEach(filter => {
      filter.addEventListener('click', () => {
        const filterValue = filter.getAttribute('data-filter');
        
        // Mettre à jour les boutons
        projectFilters.forEach(btn => {
          btn.classList.remove('active', 'tag-gold');
        });
        filter.classList.add('active', 'tag-gold');
        
        // Filtrer les projets
        let visibleCount = 0;
        
        projectCards.forEach(card => {
          const category = card.getAttribute('data-category');
          
          if (filterValue === 'all' || category === filterValue) {
            card.style.display = 'block';
            visibleCount++;
          } else {
            card.style.display = 'none';
          }
        });
        
        // Afficher/cacher le message "aucun projet"
        if (noProjectsMessage) {
          if (visibleCount === 0) {
            noProjectsMessage.classList.remove('hidden');
          } else {
            noProjectsMessage.classList.add('hidden');
          }
        }
      });
    });
  }

  // Navigation fluide vers les sections
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const headerHeight = document.querySelector('header').offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Menu mobile toggle
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  
  if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
    
    // Fermer le menu en cliquant sur un lien
    document.querySelectorAll('.mobile-menu a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
    
    // Fermer le menu en cliquant à l'extérieur
    document.addEventListener('click', (e) => {
      if (!mobileMenuToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.add('hidden');
      }
    });
  }

  // Animation de la pièce d'échecs au scroll
  const chessPiece = document.getElementById('chess-piece');
  
  if (chessPiece) {
    // Pièces d'échecs dans l'ordre hiérarchique (Unicode)
    const pieces = ['♙', '♘', '♗', '♖', '♕', '♔'];
    const pieceNames = ['Pion', 'Cavalier', 'Fou', 'Tour', 'Dame', 'Roi'];
    
    // Initialisation avec le pion
    chessPiece.textContent = pieces[0];
    chessPiece.title = `Progression: ${pieceNames[0]}`;
    
    // Fonction de mise à jour de la pièce selon le scroll
    function updateChessPiece() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.max(0, Math.min(1, scrollTop / docHeight));
      
      // Calculer l'index de la pièce (0-5)
      const index = Math.min(pieces.length - 1, Math.floor(scrollPercent * pieces.length));
      
      // Mettre à jour la pièce si elle a changé
      if (chessPiece.textContent !== pieces[index]) {
        chessPiece.textContent = pieces[index];
        chessPiece.title = `Progression: ${pieceNames[index]} (${Math.round(scrollPercent * 100)}%)`;
        
        // Animation de pulsation lors du changement
        chessPiece.style.transform = 'scale(1.2)';
        setTimeout(() => {
          chessPiece.style.transform = 'scale(1)';
        }, 200);
      }
    }
    
    // Écouter le scroll avec throttling pour les performances
    let scrollTimeout;
    window.addEventListener('scroll', () => {
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      scrollTimeout = setTimeout(updateChessPiece, 10);
    });
    
    // Initialiser la pièce
    updateChessPiece();
  }
});


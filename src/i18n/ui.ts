export const languages = { fr: 'Français', en: 'English' } as const;
export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'fr';
export const langs = Object.keys(languages) as Lang[];

export const ui = {
  fr: {
    'site.name': 'Hugo Muller',
    'site.tagline': 'Étudiant ingénieur en cybersécurité · CPE Lyon',
    'site.description':
      "Portfolio de Hugo Muller, étudiant ingénieur en cybersécurité à CPE Lyon : projets, comptes rendus et writeups de CTF.",
    'nav.home': 'Accueil',
    'nav.projects': 'Projets',
    'nav.writeups': 'Writeups',
    'nav.contact': 'Contact',
    'nav.menu': 'Menu',
    'nav.language': 'Langue',
    'a11y.skip': 'Aller au contenu',
    'footer.rights': 'Tous droits réservés',
    'footer.built': 'Conçu avec ♞ à Lyon',
    '404.title': 'Échec… et pat.',
    '404.text': "Cette page n'existe pas (ou plus). Revenez à l'accueil pour rejouer.",
    '404.back': "Retour à l'accueil",
    'projects.title': 'Mes <em>projets</em>',
    'projects.sub': 'Comptes rendus',
    'projects.intro': "Chaque projet est documenté comme une partie d'échecs : le contexte, les coups joués, le résultat et ce que j'en retiens.",
    'projects.empty': 'Les comptes rendus de mes projets arrivent bientôt.',
    'project.back': 'Tous les projets',
    'project.toc': 'Sommaire',
    'project.files': 'Pièces jointes',
    'project.links': 'Liens',
    'project.fallback': "Cette page n'est pas encore traduite : la version dans l'autre langue est affichée.",
    'project.draft': 'Brouillon (visible uniquement en développement)',
    'status.done': 'Terminé',
    'status.live': 'En évolution',
    'status.planned': 'Prévu',
    'writeups.title': 'Mes <em>writeups</em>',
    'writeups.sub': 'CTF',
    'writeups.intro': "Mes résolutions de défis de CTF : la démarche, les outils, les impasses et la solution.",
    'writeups.empty': "Aucun writeup publié pour l'instant. Les premiers arrivent bientôt.",
    'writeups.search': 'Rechercher un writeup…',
    'writeups.all': 'Tout',
    'writeups.none': 'Aucun résultat pour ce filtre.',
    'writeup.back': 'Tous les writeups',
    'writeup.event': 'Compétition',
    'writeup.category': 'Catégorie',
    'writeup.difficulty': 'Difficulté',
    'writeup.points': 'Points',
    'writeup.date': 'Date',
    'diff.easy': 'Facile',
    'diff.medium': 'Moyen',
    'diff.hard': 'Difficile',
    'diff.insane': 'Extrême',
    'cat.web': 'Web',
    'cat.crypto': 'Crypto',
    'cat.pwn': 'Pwn',
    'cat.rev': 'Reverse',
    'cat.forensics': 'Forensics',
    'cat.osint': 'OSINT',
    'cat.stego': 'Stégano',
    'cat.network': 'Réseau',
    'cat.system': 'Système',
    'cat.misc': 'Divers',
  },
  en: {
    'site.name': 'Hugo Muller',
    'site.tagline': 'Cybersecurity engineering student · CPE Lyon',
    'site.description':
      'Portfolio of Hugo Muller, cybersecurity engineering student at CPE Lyon: projects, reports and CTF writeups.',
    'nav.home': 'Home',
    'nav.projects': 'Projects',
    'nav.writeups': 'Writeups',
    'nav.contact': 'Contact',
    'nav.menu': 'Menu',
    'nav.language': 'Language',
    'a11y.skip': 'Skip to content',
    'footer.rights': 'All rights reserved',
    'footer.built': 'Built with ♞ in Lyon',
    '404.title': 'Stalemate.',
    '404.text': "This page doesn't exist (anymore). Head back home to play again.",
    '404.back': 'Back to home',
    'projects.title': 'My <em>projects</em>',
    'projects.sub': 'Reports',
    'projects.intro': 'Each project is documented like a chess game: the context, the moves played, the outcome and what I take from it.',
    'projects.empty': 'My project reports are coming soon.',
    'project.back': 'All projects',
    'project.toc': 'Contents',
    'project.files': 'Attachments',
    'project.links': 'Links',
    'project.fallback': 'This page is not translated yet: the version in the other language is shown.',
    'project.draft': 'Draft (only visible in development)',
    'status.done': 'Completed',
    'status.live': 'Evolving',
    'status.planned': 'Planned',
    'writeups.title': 'My <em>writeups</em>',
    'writeups.sub': 'CTF',
    'writeups.intro': 'My CTF challenge solutions: the approach, the tools, the dead ends and the solution.',
    'writeups.empty': 'No writeup published yet. The first ones are coming soon.',
    'writeups.search': 'Search a writeup…',
    'writeups.all': 'All',
    'writeups.none': 'No result for this filter.',
    'writeup.back': 'All writeups',
    'writeup.event': 'Event',
    'writeup.category': 'Category',
    'writeup.difficulty': 'Difficulty',
    'writeup.points': 'Points',
    'writeup.date': 'Date',
    'diff.easy': 'Easy',
    'diff.medium': 'Medium',
    'diff.hard': 'Hard',
    'diff.insane': 'Insane',
    'cat.web': 'Web',
    'cat.crypto': 'Crypto',
    'cat.pwn': 'Pwn',
    'cat.rev': 'Reverse',
    'cat.forensics': 'Forensics',
    'cat.osint': 'OSINT',
    'cat.stego': 'Stego',
    'cat.network': 'Network',
    'cat.system': 'System',
    'cat.misc': 'Misc',
  },
} as const;

export type UiKey = keyof (typeof ui)['fr'];

export function t(lang: Lang, key: UiKey): string {
  return ui[lang][key] ?? ui[defaultLang][key];
}

export function isLang(value: unknown): value is Lang {
  return typeof value === 'string' && value in languages;
}

/** Chemin localisé : localePath('en', 'projects/') -> /en/projects/ */
export function localePath(lang: Lang, path = ''): string {
  const clean = path.replace(/^\/+/, '');
  return `/${lang}/${clean}`;
}

/** Même page dans une autre langue : /fr/projects/x/ -> /en/projects/x/ */
export function switchLangPath(pathname: string, to: Lang): string {
  // Pages sans préfixe de langue (404…) : on renvoie vers l'accueil de la langue cible.
  if (!/^\/(fr|en)(\/|$)/.test(pathname)) return `/${to}/`;
  const rest = pathname.replace(/^\/(fr|en)(?=\/|$)/, '');
  return `/${to}${rest || '/'}`;
}

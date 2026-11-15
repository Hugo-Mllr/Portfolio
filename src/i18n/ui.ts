export const languages = { fr: 'Français', en: 'English' } as const;
export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'fr';
export const langs = Object.keys(languages) as Lang[];

export const ui = {
  fr: {
    'site.name': 'Hugo Muller',
    'site.tagline': 'Étudiant en cybersécurité · CPE Lyon',
    'site.description':
      "Portfolio de Hugo Muller, étudiant en cybersécurité à CPE Lyon : projets, comptes rendus et writeups de CTF.",
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
  },
  en: {
    'site.name': 'Hugo Muller',
    'site.tagline': 'Cybersecurity student · CPE Lyon',
    'site.description':
      'Portfolio of Hugo Muller, cybersecurity student at CPE Lyon: projects, reports and CTF writeups.',
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
  const rest = pathname.replace(/^\/(fr|en)(?=\/|$)/, '');
  return `/${to}${rest || '/'}`;
}

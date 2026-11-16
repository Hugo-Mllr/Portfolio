// Liens publics. `null` = pas encore fourni : le bouton correspondant est masqué.
export const site = {
  github: 'https://github.com/Hugo-Mllr',
  linkedin: 'https://www.linkedin.com/in/hugo-muller-cyber/',
  // E-mail publié avec l'accord explicite de Hugo. Scindé en deux parties et assemblé côté navigateur
  // pour éviter les collectes automatiques les plus simples (il reste visible dans le dépôt public).
  email: { user: 'hugo.muller.cyber', domain: 'proton.me' } as { user: string; domain: string } | null,
  cv: null as string | null, // ex. '/files/cv-hugo-muller.pdf' (fichier à déposer dans public/files/)
};

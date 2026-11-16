// Liens publics. `null` = pas encore fourni : le bouton correspondant est masqué.
export const site = {
  github: 'https://github.com/Hugo-Mllr',
  linkedin: 'https://www.linkedin.com/in/hugo-muller-cyber/',
  // E-mail publié avec l'accord explicite de Hugo. Scindé en deux parties et assemblé côté navigateur
  // pour éviter les collectes automatiques les plus simples (il reste visible dans le dépôt public).
  email: { user: 'hugo.muller.cyber', domain: 'proton.me' } as { user: string; domain: string } | null,
  // CV publiés avec l'accord de Hugo (fichiers dans public/files/cv/). `null` = pas de CV publié.
  cvs: {
    alternance: '/files/cv/hugo-muller-cv-alternance.pdf', // FR, alternance dès sept. 2027
    internship: '/files/cv/hugo-muller-cv-internship.pdf', // EN, stage de 3 mois (été 2027)
  } as { alternance: string; internship: string } | null,
};

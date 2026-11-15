import type { Lang } from '../i18n/ui';

type Status = 'done' | 'live';
export interface MoveItem {
  slug: string;
  notation: Record<Lang, string>;
  title: Record<Lang, string>;
  summary: Record<Lang, string>;
  tags: string[];
  status: Status;
  context: Record<Lang, string>;
}

// Placeholders : descriptions génériques à remplacer par les vrais comptes rendus (PR « content »).
export const moves: MoveItem[] = [
  {
    slug: 'lab-wazuh',
    notation: { fr: 'e4', en: 'e4' },
    title: { fr: 'Lab Wazuh', en: 'Wazuh Lab' },
    summary: {
      fr: "Déploiement d'une plateforme SIEM/XDR : agents, règles de détection, alertes et tableau de bord. Un projet pour voir l'attaque avant qu'elle ne frappe.",
      en: 'Deployment of a SIEM/XDR platform: agents, detection rules, alerts and dashboard. A project to spot the attack before it lands.',
    },
    tags: ['Wazuh', 'SIEM / XDR', 'Linux', 'Détection'],
    status: 'done',
    context: { fr: 'PPE · BTS SIO 2', en: 'PPE · BTS SIO 2' },
  },
  {
    slug: 'cluster-swarm',
    notation: { fr: 'Cf3', en: 'Nf3' },
    title: { fr: 'Cluster Docker Swarm', en: 'Docker Swarm Cluster' },
    summary: {
      fr: "Mise en place d'un cluster d'orchestration : services répliqués, réseau overlay, tolérance aux pannes et haute disponibilité.",
      en: 'Orchestration cluster setup: replicated services, overlay network, fault tolerance and high availability.',
    },
    tags: ['Docker', 'Swarm', 'Haute dispo', 'Réseau overlay'],
    status: 'done',
    context: { fr: 'PPE · BTS SIO 2', en: 'PPE · BTS SIO 2' },
  },
  {
    slug: 'home-lab',
    notation: { fr: 'Fc4', en: 'Bc4' },
    title: { fr: 'Home lab', en: 'Home lab' },
    summary: {
      fr: "Mon terrain d'entraînement personnel. Il grandit au fil de mes envies et de mes apprentissages : virtualisation, segmentation réseau, supervision.",
      en: 'My personal training ground. It grows with my curiosity and learning: virtualization, network segmentation, monitoring.',
    },
    tags: ['Virtualisation', 'Réseau', 'Supervision', 'Auto-hébergement'],
    status: 'live',
    context: { fr: 'Projet personnel', en: 'Personal project' },
  },
];

export const pieces: { glyph: string; level: 1 | 2 | 3 | 4; title: Record<Lang, string>; text: Record<Lang, string> }[] = [
  { glyph: '♙', level: 1, title: { fr: 'Réseaux', en: 'Networking' }, text: { fr: "Adressage, VLAN, routage, pare-feu : les fondations de toute bonne position.", en: 'Addressing, VLANs, routing, firewalls: the foundation of any good position.' } },
  { glyph: '♘', level: 2, title: { fr: 'Systèmes Linux', en: 'Linux systems' }, text: { fr: "Administration, durcissement, services et automatisation en ligne de commande.", en: 'Administration, hardening, services and command-line automation.' } },
  { glyph: '♗', level: 2, title: { fr: 'Supervision & SIEM', en: 'Monitoring & SIEM' }, text: { fr: "Collecte de logs, détection d'incidents, corrélation d'événements avec Wazuh.", en: 'Log collection, incident detection, event correlation with Wazuh.' } },
  { glyph: '♖', level: 3, title: { fr: 'Conteneurs', en: 'Containers' }, text: { fr: "Docker, orchestration Swarm, déploiement reproductible et résilient.", en: 'Docker, Swarm orchestration, reproducible and resilient deployment.' } },
  { glyph: '♕', level: 4, title: { fr: 'Sécurité offensive', en: 'Offensive security' }, text: { fr: "Comprendre les attaques pour mieux défendre : labs, CTF, méthodologie.", en: 'Understanding attacks to defend better: labs, CTFs, methodology.' } },
  { glyph: '♔', level: 4, title: { fr: 'Architecture sécurisée', en: 'Secure architecture' }, text: { fr: "Penser la défense en profondeur dès la conception d'une infrastructure.", en: 'Thinking defense in depth from the very design of an infrastructure.' } },
];

export const levels: Record<1 | 2 | 3 | 4, Record<Lang, string>> = {
  1: { fr: 'Solide', en: 'Solid' },
  2: { fr: 'En progression', en: 'Growing' },
  3: { fr: 'Pratique', en: 'Hands-on' },
  4: { fr: 'En apprentissage', en: 'Learning' },
};

export const copy = {
  fr: {
    eyebrow: 'Étudiant en cybersécurité · CPE Lyon',
    h1: ['Je pense', '<em>trois coups</em>', "d'avance."],
    lead: "Étudiant en cursus ICS à CPE Lyon, je défends des systèmes comme on joue une partie : en anticipant l'adversaire, en structurant ma position et en gardant le sang-froid.",
    cta1: 'Voir mes coups',
    ctaWriteups: 'Mes writeups CTF',
    ctaCv: 'Télécharger mon CV',
    status: 'Disponible · stage & alternance',
    lastMove: 'Dernier coup',
    boardHint: 'Cliquez sur une case dorée pour jouer le cavalier.',
    movesTitle: 'Mes <em>coups</em>',
    movesSub: 'Projets · Partie en cours',
    done: 'Terminé',
    live: 'En évolution',
    readMore: 'Lire le compte rendu',
    allProjects: 'Tous les projets',
    piecesTitle: 'Mes <em>pièces</em>',
    piecesSub: 'Compétences',
    mate: 'Échec <em>et mat</em> ?',
    mateText: 'Je recherche un stage puis une alternance en cybersécurité. Parlons-en.',
    contactCta: 'Me contacter',
    cvAlt: 'Mon CV',
    soon: 'Contact bientôt disponible',
  },
  en: {
    eyebrow: 'Cybersecurity student · CPE Lyon',
    h1: ['I think', '<em>three moves</em>', 'ahead.'],
    lead: "ICS student at CPE Lyon, I defend systems the way I play chess: anticipating the opponent, building a solid position and keeping a cool head.",
    cta1: 'See my moves',
    ctaWriteups: 'My CTF writeups',
    ctaCv: 'Download my CV',
    status: 'Available · internship & work-study',
    lastMove: 'Last move',
    boardHint: 'Click a golden square to move the knight.',
    movesTitle: 'My <em>moves</em>',
    movesSub: 'Projects · Game in progress',
    done: 'Completed',
    live: 'Evolving',
    readMore: 'Read the report',
    allProjects: 'All projects',
    piecesTitle: 'My <em>pieces</em>',
    piecesSub: 'Skills',
    mate: 'Check<em>mate</em>?',
    mateText: "I'm looking for an internship, then a work-study position in cybersecurity. Let's talk.",
    contactCta: 'Get in touch',
    cvAlt: 'My CV',
    soon: 'Contact coming soon',
  },
} as const;

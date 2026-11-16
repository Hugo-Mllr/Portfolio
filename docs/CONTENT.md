# Contenu

Textes actuellement dans la maquette. **Tout ce qui est marqué ⚠️ est un placeholder** à faire valider ou compléter par Hugo. Ne rien inventer : si une info manque, demander.

## Identité
- Nom : **Hugo Muller** (validé).
- Formation : 3e année d'ingénieur informatique et cybersécurité à **CPE Lyon** (3ICS, depuis sept. 2026) ; BTS SIO option SISR (2024–2026).
- Recherche (d'après ses CV) : **stage de 3 mois, juin–août 2027** (international) puis **alternance dès septembre 2027**.
- Liens publiés avec l'accord de Hugo : GitHub, LinkedIn (`/in/hugo-muller-cyber/`) et e-mail de contact (assemblé côté navigateur, voir `src/data/site.ts`). **CV PDF publiés** à sa demande (`public/files/cv/`) : version FR « alternance » et version EN « internship ». Ils contiennent son e-mail, son âge, sa ville et ses employeurs, mais ni téléphone ni adresse. Pour les mettre à jour, remplacer les fichiers (mêmes noms).

## Accroche
Présentation sobre (la première version, « Je pense trois coups d'avance », a été jugée trop prétentieuse) : « Bonjour, je suis *Hugo*. » suivie d'un court paragraphe factuel tiré de son CV. Le thème des échecs reste dans les titres de sections et l'échiquier.

## Projets
Les 3 projets sont **masqués** (`draft: true`) tant que leurs comptes rendus ne sont pas rédigés ; la section disparaît de l'accueil et `/projects/` affiche « arrivent bientôt ». Pour publier : remplir le contenu puis retirer `draft: true`. Faits du CV utilisables (à développer dans les comptes rendus) : Wazuh avec agents poussés par GPO (Windows) et Ansible (Linux), détection d'attaques simulées depuis Kali, règle personnalisée, blocage automatique d'IP, alertes Teams ; cluster Docker Swarm de 3 nœuds (Portainer, Nginx Proxy Manager) ; homelab Proxmox à 2 nœuds (7 services LXC).

### 1. Lab Wazuh — PPE BTS SIO 2
Actuel : déploiement d'une plateforme SIEM/XDR (agents, règles de détection, alertes, tableau de bord).
À compléter : contexte et besoin, architecture (machines, OS, versions), agents déployés, règles ou cas d'usage de détection, résultats, difficultés rencontrées, ce qui a été appris, captures, lien dépôt/rapport.

### 2. Cluster Docker Swarm — PPE BTS SIO 2
Actuel : cluster d'orchestration (services répliqués, réseau overlay, haute disponibilité).
À compléter : nombre de nœuds, services déployés, tests de panne, stockage, sécurité (secrets, TLS), schéma, résultats.

### 3. Home lab — perso, en évolution
Actuel : virtualisation, segmentation réseau, supervision, auto-hébergement.
À compléter : matériel réel, hyperviseur, topologie, services, sécurité, roadmap du lab. Prévoir un format « journal » pour que le projet vive dans le temps.

## Compétences (« pièces »)
Listes reprises **telles quelles du CV** de Hugo (Réseau, Systèmes, Sécurité, Virtualisation, DevOps, Programmation) + certifications. Aucun niveau affiché. Ne rien ajouter que Hugo ne puisse défendre en entretien.

## Pistes de contenu pour convaincre
- Certifications / formations en cours ⚠️ (ex. CTF, plateformes d'entraînement, certifs visées)
- Veille sécurité, writeups, outils créés
- Parcours (BTS SIO → CPE ICS) et motivation
- Échecs / jeux : une phrase qui humanise, sans prendre toute la place

## Règles de rédaction
- Phrases courtes, verbes d'action, résultats concrets.
- Tutoiement exclu sur le site ; vouvoiement ou neutre.
- Chaque texte FR a son équivalent EN, de même longueur à peu près.

## Ajouter du contenu

Tout se passe dans `src/content/` en Markdown (`.md`) ou MDX (`.mdx`). Aucun code à toucher. Un fichier dont le nom commence par `_` est ignoré.

### Un projet avec compte rendu (plusieurs fichiers)
```
src/content/projects/lab-wazuh/
├── index.fr.md          # présentation + frontmatter (obligatoire)
├── index.en.md          # version anglaise (optionnelle)
├── 01-architecture.fr.md
├── 02-deploiement.fr.md
└── 03-resultats.fr.md
public/files/lab-wazuh/rapport.pdf   # pièces jointes (PDF, archives…)
```
- Le **nom du dossier** devient l'URL : `/fr/projects/lab-wazuh/`.
- Les chapitres `NN-*.md` s'affichent à la suite sur la page du projet, dans l'ordre du nom de fichier, avec un sommaire.
- Sans suffixe de langue (`index.md`), le fichier est considéré comme français. Si une langue manque, l'autre est affichée avec un avertissement.
- Frontmatter de `index` :
```yaml
---
title: Lab Wazuh
summary: "Une ou deux phrases."
status: done            # done | live | planned
context: PPE · BTS SIO 2
tags: [Wazuh, SIEM]
order: 1                # ordre d'affichage (petit = premier)
date: 2026-03-01        # optionnel
links:                  # optionnel
  - { label: Dépôt GitHub, url: "https://github.com/…" }
files:                  # optionnel
  - { label: Rapport complet (PDF), path: /files/lab-wazuh/rapport.pdf }
draft: false            # true = visible seulement en développement
---
```
- Les chapitres n'ont besoin que de `title:`.
- Les 3 premiers projets (selon `order`) apparaissent sur l'accueil.

### Un writeup CTF
Copier `src/content/writeups/_template.md` en `<evenement>-<defi>.md`, compléter, passer `draft: false`.
Champs : `title`, `ctf`, `category` (web, crypto, pwn, rev, forensics, osint, stego, network, system, misc), `difficulty` (easy, medium, hard, insane), `points`, `date`, `tags`, `summary`, `lang` (fr/en), `draft`.
Les writeups sont filtrables par catégorie et recherchables sur la page liste.
**Ne publiez pas le flag ni la solution d'un CTF encore actif** : gardez `draft: true` jusqu'à la fin de l'épreuve.

### Prévisualiser les brouillons
```bash
npm run dev                  # les brouillons sont visibles
SHOW_DRAFTS=1 npm run build  # build qui inclut les brouillons
```
Le build de production (`npm run build`) les exclut.

### Aide
Demander à l'agent `writeup-publisher` de mettre en forme des notes brutes ou un rapport existant.

### Contenu d'exemple actuel
Les 3 projets contiennent des squelettes avec des **[À COMPLÉTER]**, et `exemple-demo.md` est un writeup **factice** en brouillon à supprimer.

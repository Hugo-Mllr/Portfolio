# Sécurité et vie privée

## Règles du dépôt
- **Aucun secret dans git** : jetons, clés privées, certificats, `.env`. Le `.gitignore` les exclut (`.env*`, `*.pem`, `*.key`, `*credentials*.json`, `.cloudflared/`, `*.tfstate`…). Seul `.env.example` (sans valeur) est suivi.
- `scripts/check-secrets.sh` (lancé en CI) échoue si un fichier sensible est suivi ou si un motif de secret apparaît. Pour l'utiliser avant chaque commit :
  ```bash
  printf '#!/bin/sh\nbash scripts/check-secrets.sh\n' > .git/hooks/pre-commit && chmod +x .git/hooks/pre-commit
  ```
- Les secrets d'exécution (`TUNNEL_TOKEN`) vivent **uniquement** dans Portainer. Si un secret est committé par erreur : le **révoquer/régénérer d'abord**, puis nettoyer l'historique.
- Recommandé côté GitHub : activer *Secret scanning* et *Push protection* (*Settings → Code security*).

## Vie privée des visiteurs
- Aucun cookie, aucun traceur, aucune requête vers un tiers : polices auto-hébergées, pas d'analytics, pas de CDN externe (vérifié : seul le domaine du site est contacté).
- Le navigateur ne stocke que le choix de langue (`localStorage`) et un indicateur d'intro (`sessionStorage`), jamais envoyés au serveur.
- Si un analytics est ajouté un jour, choisir un outil sans cookie (ex. Cloudflare Web Analytics) et mettre à jour la CSP.

## Données personnelles de Hugo
- Aucun e-mail, téléphone ou adresse dans le dépôt sans accord explicite. Les liens de contact se renseignent dans `src/data/site.ts`.
- Writeups CTF : jamais de flag ni de solution complète d'une épreuve encore active ; masquer IP/hostnames privés et identifiants dans les comptes rendus.

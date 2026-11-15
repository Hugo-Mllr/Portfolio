# Déploiement : Docker + Portainer + Cloudflare

Le site est **100 % statique** : l'image finale n'est qu'un nginx qui sert `dist/` (port 8080, utilisateur non root, système de fichiers en lecture seule).

## Local
```bash
npm ci
npm run dev        # http://localhost:4321
npm run build      # sortie dans dist/
docker compose up --build   # http://localhost:8080
```

## Portainer
1. **Stacks → Add stack → Repository** (ou Web editor avec `docker-compose.yml`).
2. Variables d'environnement : `SITE_URL` (ton vrai domaine, avec `https://`), éventuellement `WEB_PORT`.
3. Déployer. Pour mettre à jour : *Pull and redeploy*.

## Cloudflare
Deux options :
- **Tunnel `cloudflared`** (recommandé : aucun port ouvert) : créer un tunnel dans Cloudflare Zero Trust, copier le jeton dans `TUNNEL_TOKEN`, activer le profil `tunnel`, puis router `ton-domaine.fr` vers `http://web:8080`.
- **Reverse proxy existant** (Traefik, NPM…) pointant vers le service `web:8080`, avec le DNS proxifié par Cloudflare.

Dans les deux cas : SSL/TLS en mode **Full (strict)**, et `SITE_URL` doit correspondre au domaine public (canonical, sitemap, Open Graph).

## Image prébuild (GitHub Actions → GHCR)
`.github/workflows/docker.yml` construit l'image (amd64 + arm64) et la publie sur `ghcr.io/hugo-mllr/portfolio` à chaque push sur `main`, sur les tags `v*` ou à la demande (*Actions → Image Docker → Run workflow*).

Avant le premier build :
1. *Settings → Secrets and variables → Actions → Variables* : créer `SITE_URL` (ex. `https://ton-domaine.fr`).
2. Après la première publication, passer le paquet en **public** (*Packages → portfolio → Package settings*) ou donner à Portainer un jeton de lecture.
3. Dans Portainer, utiliser `IMAGE=ghcr.io/hugo-mllr/portfolio:latest`, puis *Pull and redeploy*.

`.github/workflows/ci.yml` vérifie que le site se construit à chaque PR.

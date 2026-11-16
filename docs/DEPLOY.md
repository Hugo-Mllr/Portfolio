# Déploiement : Docker + Portainer + Cloudflare

Le site est **100 % statique** : l'image finale est un nginx non privilégié qui sert `dist/` (port 8080, système de fichiers en lecture seule, GET/HEAD uniquement).

## Local
```bash
npm ci
npm run dev        # http://localhost:4321
npm run build      # sortie dans dist/
```

## Variables d'environnement de la stack Portainer
| Variable | Obligatoire | Secret ? | Rôle |
|---|---|---|---|
| `TUNNEL_TOKEN` | **Oui** (si tunnel) | **OUI** | Jeton du tunnel Cloudflare. À saisir uniquement dans Portainer. |
| `IMAGE` | Non | Non | Défaut `ghcr.io/hugo-mllr/portfolio:latest`. |
| `WEB_PORT` | Non | Non | Port local (lié à `127.0.0.1`), défaut 8080. |
| `CLOUDFLARED_VERSION` | Non | Non | Version épinglée de `cloudflared` (défaut `2026.11.0`). |

`SITE_URL` n'est **pas** une variable de runtime : c'est une variable de **build**, à créer côté GitHub (*Settings → Secrets and variables → Actions → Variables*), puis relancer le workflow *Image Docker*. Elle alimente les liens canoniques, le sitemap et Open Graph.

## Cloudflare
1. **Tunnel** : *Zero Trust → Networking → Tunnels* → créer un tunnel, copier le jeton dans `TUNNEL_TOKEN` (Portainer).
2. **Route (published application)** : sous-domaine/domaine voulu → service `http://web:8080`.
3. **Accès public** : une route de tunnel est **publique par défaut**. Ne crée **pas** d'application Access pour ce site. Si tu en as créé une, soit tu la supprimes, soit tu lui ajoutes une politique `Bypass` / `Include: Everyone` (une application Access sans politique **bloque tout le monde**).
4. Vérifier *Zero Trust → Access controls → Access settings* : « Block traffic to all domains in this account » doit être **désactivé**, ou le domaine doit avoir une application avec un `Bypass`.
5. HTTPS : le visiteur est servi en HTTPS par Cloudflare ; activer *Always Use HTTPS* et **HSTS** (*SSL/TLS → Edge Certificates*) car nginx n'est joignable qu'en HTTP à l'intérieur du tunnel.

## Sécurité du déploiement
- Le port 8080 est lié à `127.0.0.1` : le trafic public ne passe **que** par le tunnel (ne pas ouvrir 8080 au pare-feu).
- Les conteneurs tournent avec `cap_drop: ALL`, `no-new-privileges` et un système de fichiers en lecture seule.
- En-têtes appliqués par nginx : CSP stricte (aucun tiers), `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, COOP/CORP.
- Le jeton du tunnel donne le droit de faire tourner le tunnel : le **régénérer** (*Add a replica → rotate*) s'il fuite.

## Image prébuild (GitHub Actions → GHCR)
`.github/workflows/docker.yml` construit l'image (amd64 + arm64) et la publie sur `ghcr.io/hugo-mllr/portfolio` à chaque push sur `main`, sur les tags `v*` ou à la demande.
- Après la première publication, passer le paquet en **public** (*Packages → portfolio → Package settings*) ou donner à Portainer un jeton de lecture.
- Mise à jour : *Pull and redeploy* dans Portainer.

`.github/workflows/ci.yml` vérifie à chaque PR : contrôle anti-secrets, build, build avec brouillons.

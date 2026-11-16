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
| `TUNNEL_NETWORK` | **Oui** | Non | Nom du réseau Docker où tourne ton `cloudflared` existant. |
| `IMAGE` | Non | Non | Défaut `ghcr.io/hugo-mllr/portfolio:latest`. |
| `WEB_PORT` | Non | Non | Port local (lié à `127.0.0.1`), défaut 8080. |

Aucun jeton dans cette stack : elle ne contient **pas** de `cloudflared`. Elle rejoint le réseau de celui qui tourne déjà.

`SITE_URL` n'est **pas** une variable de runtime : c'est une variable de **build**, à créer côté GitHub (*Settings → Secrets and variables → Actions → Variables*), puis relancer le workflow *Image Docker*. Elle alimente les liens canoniques, le sitemap et Open Graph.

## Cloudflare (tunnel déjà existant)
1. **Trouver le réseau du tunnel** : Portainer → *Containers* → ton conteneur `cloudflared` → section *Connected networks* → noter le nom → c'est la valeur de `TUNNEL_NETWORK`.
2. **Route** (*Networking → Tunnels → ton tunnel → Routes → Ajouter une route → Application publiée*) : ton (sous-)domaine, service **`http://portfolio-web:8080`** (HTTP, pas HTTPS). Le nom `portfolio-web` est le `container_name` du compose : unique, donc sans collision avec d'autres stacks.
3. Si ton `cloudflared` tourne directement sur l'hôte (hors Docker), vise plutôt `http://localhost:8080`.
4. **Accès public** : une route de tunnel est **publique par défaut**. Ne crée **pas** d'application Access pour ce site. Si tu en as créé une, soit tu la supprimes, soit tu lui ajoutes une politique `Bypass` / `Include: Everyone` (une application Access sans politique **bloque tout le monde**).
5. Vérifier *Zero Trust → Access controls → Access settings* : « Block traffic to all domains in this account » doit être **désactivé**, ou le domaine doit avoir une application avec un `Bypass`.
6. HTTPS : le visiteur est servi en HTTPS par Cloudflare ; activer *Always Use HTTPS* et **HSTS** (*SSL/TLS → Edge Certificates*) car nginx n'est joignable qu'en HTTP à l'intérieur du tunnel.

### Variante : tunnel dédié à ce site
Si tu veux un `cloudflared` propre à cette stack : créer un nouveau tunnel, copier son jeton (*Add a replica*), ajouter un service `cloudflared` (image épinglée, `TUNNEL_TOKEN` saisi dans Portainer uniquement) dans le compose, et router vers `http://portfolio-web:8080`.

## Sécurité du déploiement
- Le port 8080 est lié à `127.0.0.1` : le trafic public ne passe **que** par le tunnel (ne pas ouvrir 8080 au pare-feu).
- Les conteneurs tournent avec `cap_drop: ALL`, `no-new-privileges` et un système de fichiers en lecture seule.
- En-têtes appliqués par nginx : CSP stricte (aucun tiers), `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, COOP/CORP.
- Le jeton d'un tunnel donne le droit de le faire tourner : s'il fuite, le **régénérer** (*Rotate a token*) et mettre le nouveau uniquement dans la stack concernée.

## Image prébuild (GitHub Actions → GHCR)
`.github/workflows/docker.yml` construit l'image (amd64 + arm64) et la publie sur `ghcr.io/hugo-mllr/portfolio` à chaque push sur `main`, sur les tags `v*` ou à la demande.
- Après la première publication, passer le paquet en **public** (*Packages → portfolio → Package settings*) ou donner à Portainer un jeton de lecture.
- Mise à jour : *Pull and redeploy* dans Portainer.

`.github/workflows/ci.yml` vérifie à chaque PR : contrôle anti-secrets, build, build avec brouillons.

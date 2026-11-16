# Déploiement : Docker + Portainer + Cloudflare

Le site est **100 % statique** : l'image finale est un nginx non privilégié qui sert `dist/` (port 8080, système de fichiers en lecture seule, GET/HEAD uniquement).

## Local
```bash
npm ci
npm run dev        # http://localhost:4321
npm run build      # sortie dans dist/
```

## Principe : construction sur le serveur
La stack Portainer est « Managed by Git » : Portainer clone ce dépôt (public) et **construit l'image sur le serveur** (`build:` dans `docker-compose.yml`). Aucun registre, aucun jeton. Compromis : un déploiement prend 1 à 2 minutes et utilise le CPU/la RAM du serveur (prévoir ≥ 2 Go de RAM pour `npm ci` + build).

## Variables d'environnement de la stack Portainer
| Variable | Obligatoire | Secret ? | Rôle |
|---|---|---|---|
| `TUNNEL_NETWORK` | **Oui** | Non | Nom du réseau Docker où tourne ton `cloudflared` existant. |
| `SITE_URL` | Recommandé | Non | URL publique (ex. `https://ton-domaine.fr`), lue au **build** : liens canoniques, sitemap, Open Graph. |
| `WEB_PORT` | Non | Non | Port local (lié à `127.0.0.1`), défaut 8080. |

Aucun jeton dans cette stack : elle ne contient **pas** de `cloudflared` (le tunnel existant a déjà le sien) et n'utilise pas de registre.

## Mettre à jour le site
Pousser sur `main`, puis dans Portainer : **Pull and redeploy**. `pull_policy: build` force la reconstruction de l'image et empêche toute tentative de téléchargement depuis un registre. Laisser **désactivée** l'option « Re-pull image » si elle est proposée.

Si le site ne reflète pas la dernière version (comportement connu de certaines versions de Portainer qui ne reconstruisent pas) : arrêter la stack, supprimer l'image `portfolio-portfolio-web`, puis redéployer.

## Redéploiement automatique (GitOps updates)
Dans Portainer : **Stacks → portfolio → Edit stack settings**. Dans le formulaire qui s'ouvre, sous les infos du dépôt Git, activer **GitOps updates** (nommé « Automatic updates » dans les versions plus anciennes), choisir **Polling** avec un intervalle (ex. 5 minutes), laisser **Force redeployment** désactivé (Portainer ne redéploie alors que si le dépôt a changé), puis **Save settings**. Chaque changement sur `main` déclenche ensuite un nouveau build sur le serveur.

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

## Image prébuild GHCR (optionnel, non utilisé)
`.github/workflows/docker.yml` peut publier une image (amd64 + arm64) sur GHCR, **à la demande seulement**. Elle n'est pas utilisée par la stack actuelle. Attention : un paquet GHCR rendu **public** ne peut plus redevenir privé (doc GitHub). Pour la retirer, supprimer le paquet depuis ses réglages.

`.github/workflows/ci.yml` vérifie à chaque PR : contrôle anti-secrets, build, build avec brouillons.

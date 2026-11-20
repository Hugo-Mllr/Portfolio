---
title: Cluster Docker Swarm — haute disponibilité et tests de charge
summary: "Cluster Docker Swarm sur la ferme vSphere de PacketLand : Portainer, reverse proxy Nginx Proxy Manager, WordPress et GLPI répliqués, supervision Uptime Kuma avec alertes Teams, tests de panne et de charge (Locust)."
status: done
context: PPE · BTS SIO 2
tags: [Docker, Swarm, Portainer, Nginx Proxy Manager, Uptime Kuma, Locust]
order: 3
draft: false
---

## Objectif
Construire un cluster d'orchestration capable de **maintenir les services en cas de panne** d'un nœud, accessibles par nom de domaine interne (`*.Packetland.local`), supervisés et testés en charge.

## Mise en place
- 3 VM Ubuntu Server dans le VLAN serveurs (1121) de la ferme vSphere, IP statiques (netplan), SSH, hostnames distincts (`manager`, `worker1`, `worker2`).
- Docker installé sur chaque nœud, cluster initialisé avec `docker swarm init`, workers rattachés par jeton (non reproduit ici).
- Ports du cluster ouverts avec UFW (2377/tcp, 7946 et 4789 en TCP/UDP).
- **Portainer** déployé en stack avec son agent ; un conflit d'agents venait de noms d'hôtes identiques, corrigé en renommant les nœuds.
- Réseau **overlay** commun aux services.

<details>
<summary>Captures (22)</summary>

<img src="/projects/cluster-swarm/001.webp" alt="Capture 1 — Mise en place" width="606" height="65" loading="lazy" decoding="async">

<img src="/projects/cluster-swarm/002.webp" alt="Capture 2 — Mise en place" width="411" height="191" loading="lazy" decoding="async">

<img src="/projects/cluster-swarm/003.webp" alt="Capture 3 — Mise en place" width="818" height="214" loading="lazy" decoding="async">

<img src="/projects/cluster-swarm/004.webp" alt="Capture 4 — Mise en place" width="678" height="113" loading="lazy" decoding="async">

<img src="/projects/cluster-swarm/008.webp" alt="Capture 5 — Mise en place" width="309" height="31" loading="lazy" decoding="async">

<img src="/projects/cluster-swarm/009.webp" alt="Capture 6 — Mise en place" width="896" height="98" loading="lazy" decoding="async">

<img src="/projects/cluster-swarm/010.webp" alt="Capture 7 — Mise en place" width="894" height="174" loading="lazy" decoding="async">

<img src="/projects/cluster-swarm/011.webp" alt="Capture 8 — Mise en place" width="1159" height="728" loading="lazy" decoding="async">

<img src="/projects/cluster-swarm/012.webp" alt="Capture 9 — Mise en place" width="1316" height="319" loading="lazy" decoding="async">

<img src="/projects/cluster-swarm/013.webp" alt="Capture 10 — Mise en place" width="695" height="63" loading="lazy" decoding="async">

<img src="/projects/cluster-swarm/014.webp" alt="Capture 11 — Mise en place" width="1043" height="77" loading="lazy" decoding="async">

<img src="/projects/cluster-swarm/015.webp" alt="Capture 12 — Mise en place" width="1158" height="616" loading="lazy" decoding="async">

<img src="/projects/cluster-swarm/016.webp" alt="Capture 13 — Mise en place" width="1101" height="461" loading="lazy" decoding="async">

<img src="/projects/cluster-swarm/017.webp" alt="Capture 14 — Mise en place" width="682" height="917" loading="lazy" decoding="async">

<img src="/projects/cluster-swarm/018.webp" alt="Capture 15 — Mise en place" width="1400" height="320" loading="lazy" decoding="async">

<img src="/projects/cluster-swarm/019.webp" alt="Capture 16 — Mise en place" width="1400" height="185" loading="lazy" decoding="async">

<img src="/projects/cluster-swarm/020.webp" alt="Capture 17 — Mise en place" width="809" height="454" loading="lazy" decoding="async">

<img src="/projects/cluster-swarm/021.webp" alt="Capture 18 — Mise en place" width="1400" height="425" loading="lazy" decoding="async">

<img src="/projects/cluster-swarm/022.webp" alt="Capture 19 — Mise en place" width="1131" height="463" loading="lazy" decoding="async">

<img src="/projects/cluster-swarm/023.webp" alt="Capture 20 — Mise en place" width="483" height="623" loading="lazy" decoding="async">

<img src="/projects/cluster-swarm/024.webp" alt="Capture 21 — Mise en place" width="763" height="130" loading="lazy" decoding="async">

<img src="/projects/cluster-swarm/025.webp" alt="Capture 22 — Mise en place" width="934" height="516" loading="lazy" decoding="async">

</details>

## Services déployés (stacks)
| Service | Rôle | Particularité |
|---|---|---|
| Nginx Proxy Manager | Reverse proxy | Entrées DNS dans l'AD, hôtes virtuels par FQDN, affinité de session |
| WordPress + MariaDB | Site web | 2 réplicas ; URL forcée via `WORDPRESS_CONFIG_EXTRA` pour éviter les erreurs derrière le proxy |
| GLPI + MariaDB | Gestion de parc | 5 réplicas |
| Uptime Kuma | Supervision | Sondes HTTP et ping ; WebSockets requis dans NPM |
| Locust | Tests de charge | 1 master + 3 workers, script déposé via Docker config |

Chaîne de requête : l'utilisateur tape `wordpress.Packetland.local` → l'AD résout vers le cluster → NPM reçoit et route sur l'overlay → Swarm choisit un réplica.

<details>
<summary>Captures (30)</summary>

<img src="/projects/cluster-swarm/026.webp" alt="Capture 1 — Services déployés (stacks)" width="609" height="1067" loading="lazy" decoding="async">

<img src="/projects/cluster-swarm/027.webp" alt="Capture 2 — Services déployés (stacks)" width="996" height="502" loading="lazy" decoding="async">

<img src="/projects/cluster-swarm/029.webp" alt="Capture 3 — Services déployés (stacks)" width="1322" height="353" loading="lazy" decoding="async">

<img src="/projects/cluster-swarm/030.webp" alt="Capture 4 — Services déployés (stacks)" width="543" height="637" loading="lazy" decoding="async">

<img src="/projects/cluster-swarm/031.webp" alt="Capture 5 — Services déployés (stacks)" width="1329" height="793" loading="lazy" decoding="async">

<img src="/projects/cluster-swarm/032.webp" alt="Capture 6 — Services déployés (stacks)" width="1400" height="857" loading="lazy" decoding="async">

<img src="/projects/cluster-swarm/033.webp" alt="Capture 7 — Services déployés (stacks)" width="348" height="356" loading="lazy" decoding="async">

<img src="/projects/cluster-swarm/034.webp" alt="Capture 8 — Services déployés (stacks)" width="456" height="194" loading="lazy" decoding="async">

<img src="/projects/cluster-swarm/035.webp" alt="Capture 9 — Services déployés (stacks)" width="311" height="82" loading="lazy" decoding="async">

<img src="/projects/cluster-swarm/036.webp" alt="Capture 10 — Services déployés (stacks)" width="388" height="304" loading="lazy" decoding="async">

<img src="/projects/cluster-swarm/037.webp" alt="Capture 11 — Services déployés (stacks)" width="1043" height="538" loading="lazy" decoding="async">

<img src="/projects/cluster-swarm/039.webp" alt="Capture 12 — Services déployés (stacks)" width="513" height="432" loading="lazy" decoding="async">

<img src="/projects/cluster-swarm/041.webp" alt="Capture 13 — Services déployés (stacks)" width="1358" height="593" loading="lazy" decoding="async">

<img src="/projects/cluster-swarm/042.webp" alt="Capture 14 — Services déployés (stacks)" width="1186" height="322" loading="lazy" decoding="async">

<img src="/projects/cluster-swarm/045.webp" alt="Capture 15 — Services déployés (stacks)" width="1400" height="616" loading="lazy" decoding="async">

<img src="/projects/cluster-swarm/051.webp" alt="Capture 16 — Services déployés (stacks)" width="365" height="352" loading="lazy" decoding="async">

<img src="/projects/cluster-swarm/052.webp" alt="Capture 17 — Services déployés (stacks)" width="403" height="459" loading="lazy" decoding="async">

<img src="/projects/cluster-swarm/053.webp" alt="Capture 18 — Services déployés (stacks)" width="534" height="636" loading="lazy" decoding="async">

<img src="/projects/cluster-swarm/054.webp" alt="Capture 19 — Services déployés (stacks)" width="591" height="742" loading="lazy" decoding="async">

<img src="/projects/cluster-swarm/055.webp" alt="Capture 20 — Services déployés (stacks)" width="1400" height="295" loading="lazy" decoding="async">

<img src="/projects/cluster-swarm/056.webp" alt="Capture 21 — Services déployés (stacks)" width="462" height="86" loading="lazy" decoding="async">

<img src="/projects/cluster-swarm/057.webp" alt="Capture 22 — Services déployés (stacks)" width="341" height="358" loading="lazy" decoding="async">

<img src="/projects/cluster-swarm/058.webp" alt="Capture 23 — Services déployés (stacks)" width="539" height="645" loading="lazy" decoding="async">

<img src="/projects/cluster-swarm/059.webp" alt="Capture 24 — Services déployés (stacks)" width="1400" height="412" loading="lazy" decoding="async">

<img src="/projects/cluster-swarm/060.webp" alt="Capture 25 — Services déployés (stacks)" width="1052" height="829" loading="lazy" decoding="async">

<img src="/projects/cluster-swarm/061.webp" alt="Capture 26 — Services déployés (stacks)" width="1400" height="723" loading="lazy" decoding="async">

<img src="/projects/cluster-swarm/062.webp" alt="Capture 27 — Services déployés (stacks)" width="797" height="162" loading="lazy" decoding="async">

<img src="/projects/cluster-swarm/063.webp" alt="Capture 28 — Services déployés (stacks)" width="1216" height="397" loading="lazy" decoding="async">

<img src="/projects/cluster-swarm/064.webp" alt="Capture 29 — Services déployés (stacks)" width="799" height="333" loading="lazy" decoding="async">

<img src="/projects/cluster-swarm/065.webp" alt="Capture 30 — Services déployés (stacks)" width="1400" height="595" loading="lazy" decoding="async">

</details>

## Tests de résilience
- **Panne d'un worker** : extinction brutale de `worker1`. Swarm recrée la tâche sur un autre nœud, le site reste disponible. Swarm **ne rééquilibre pas** automatiquement : une mise à jour du service est nécessaire pour redistribuer.
- **Quorum** : passage à 3 managers + 2 workers (règle N/2+1) pour qu'un manager puisse tomber sans perdre le cluster ; nœuds promus avec `docker node promote`.
- **Alerte** : scale-down de GLPI à 0 réplica → Uptime Kuma détecte l'arrêt et notifie un canal Teams.
- **Test de charge** : Locust jusqu'à 500 utilisateurs simulés sur WordPress. Le temps de réponse monte (plus de 45 s au pic), des requêtes échouent et des tâches sont redémarrées sur d'autres nœuds, puis le service se stabilise. Limite constatée : les VM n'ont que 4 Go de RAM et 2 vCPU ; augmenter les ressources réduirait la coupure.

<details>
<summary>Captures (23)</summary>

<img src="/projects/cluster-swarm/043.webp" alt="Capture 1 — Tests de résilience" width="1400" height="249" loading="lazy" decoding="async">

<img src="/projects/cluster-swarm/044.webp" alt="Capture 2 — Tests de résilience" width="846" height="312" loading="lazy" decoding="async">

<img src="/projects/cluster-swarm/046.webp" alt="Capture 3 — Tests de résilience" width="1400" height="398" loading="lazy" decoding="async">

<img src="/projects/cluster-swarm/047.webp" alt="Capture 4 — Tests de résilience" width="746" height="384" loading="lazy" decoding="async">

<img src="/projects/cluster-swarm/048.webp" alt="Capture 5 — Tests de résilience" width="1400" height="454" loading="lazy" decoding="async">

<img src="/projects/cluster-swarm/049.webp" alt="Capture 6 — Tests de résilience" width="605" height="47" loading="lazy" decoding="async">

<img src="/projects/cluster-swarm/050.webp" alt="Capture 7 — Tests de résilience" width="798" height="126" loading="lazy" decoding="async">

<img src="/projects/cluster-swarm/069.webp" alt="Capture 8 — Tests de résilience" width="564" height="511" loading="lazy" decoding="async">

<img src="/projects/cluster-swarm/070.webp" alt="Capture 9 — Tests de résilience" width="1400" height="999" loading="lazy" decoding="async">

<img src="/projects/cluster-swarm/071.webp" alt="Capture 10 — Tests de résilience" width="710" height="758" loading="lazy" decoding="async">

<img src="/projects/cluster-swarm/072.webp" alt="Capture 11 — Tests de résilience" width="645" height="530" loading="lazy" decoding="async">

<img src="/projects/cluster-swarm/073.webp" alt="Capture 12 — Tests de résilience" width="343" height="366" loading="lazy" decoding="async">

<img src="/projects/cluster-swarm/074.webp" alt="Capture 13 — Tests de résilience" width="534" height="643" loading="lazy" decoding="async">

<img src="/projects/cluster-swarm/075.webp" alt="Capture 14 — Tests de résilience" width="788" height="166" loading="lazy" decoding="async">

<img src="/projects/cluster-swarm/076.webp" alt="Capture 15 — Tests de résilience" width="1240" height="612" loading="lazy" decoding="async">

<img src="/projects/cluster-swarm/077.webp" alt="Capture 16 — Tests de résilience" width="882" height="498" loading="lazy" decoding="async">

<img src="/projects/cluster-swarm/078.webp" alt="Capture 17 — Tests de résilience" width="367" height="241" loading="lazy" decoding="async">

<img src="/projects/cluster-swarm/079.webp" alt="Capture 18 — Tests de résilience" width="647" height="232" loading="lazy" decoding="async">

<img src="/projects/cluster-swarm/080.webp" alt="Capture 19 — Tests de résilience" width="1400" height="286" loading="lazy" decoding="async">

<img src="/projects/cluster-swarm/081.webp" alt="Capture 20 — Tests de résilience" width="1400" height="407" loading="lazy" decoding="async">

<img src="/projects/cluster-swarm/082.webp" alt="Capture 21 — Tests de résilience" width="1400" height="858" loading="lazy" decoding="async">

<img src="/projects/cluster-swarm/083.webp" alt="Capture 22 — Tests de résilience" width="1400" height="682" loading="lazy" decoding="async">

<img src="/projects/cluster-swarm/084.webp" alt="Capture 23 — Tests de résilience" width="649" height="495" loading="lazy" decoding="async">

</details>

## Ce que j'en retiens
- Un cluster n'évite pas toute coupure : il la raccourcit. Les tests de charge montrent où sont les limites.
- La supervision et les alertes font partie de la haute disponibilité.

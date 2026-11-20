---
title: Lab Wazuh — détection et réponse automatique
summary: "Déploiement d'un SIEM/XDR Wazuh dans l'infrastructure PacketLand : agents poussés par GPO (Windows) et en ligne de commande (Linux), attaques simulées depuis Kali, règle personnalisée, blocage automatique d'IP et alertes Teams."
status: done
context: PPE · BTS SIO 2
tags: [Wazuh, SIEM, XDR, Active Directory, GPO, Kali, Teams]
order: 2
draft: false
---

## Contexte
Dans le cadre de la PPE de BTS SIO 2 (option SISR), j'ai ajouté une couche de supervision de sécurité à l'infrastructure fictive de **PacketLand** (voir le projet dédié). Objectif : voir les attaques, être alerté, et réagir automatiquement.

## Architecture
Wazuh se compose de trois éléments : l'**Indexer** (stockage et recherche des alertes), le **Server** (analyse des événements des agents) et le **Dashboard** (interface web). Le manager est importé en OVA dans la ferme de virtualisation.

| VLAN | Machine | IP | Rôle |
|---|---|---|---|
| 1121 | Wazuh-Manager | 172.16.121.200 | Manager central |
| 1121 | Metasploitable 3 | 172.16.121.201 | Serveur cible aux failles volontaires |
| 1125 | Kali Linux | 172.16.125.203 | Attaquant |
| 1126 | Windows 11 ×2 | 172.16.126.202 / .203 | Postes clients cibles |

Un incident récurrent : une adresse DHCP s'ajoutait et écrasait la configuration réseau du manager. Correction : arrêt de `dhclient` et désactivation de la gestion réseau de cloud-init. Les mots de passe générés à l'installation ont été renouvelés avec `wazuh-passwords-tool.sh`.

<details>
<summary>Captures (4)</summary>

<img src="/projects/lab-wazuh/001.webp" alt="Capture 1 — Architecture" width="454" height="127" loading="lazy" decoding="async">

<img src="/projects/lab-wazuh/004.webp" alt="Capture 2 — Architecture" width="182" height="157" loading="lazy" decoding="async">

<img src="/projects/lab-wazuh/005.webp" alt="Capture 3 — Architecture" width="407" height="122" loading="lazy" decoding="async">

<img src="/projects/lab-wazuh/006.webp" alt="Capture 4 — Architecture" width="395" height="427" loading="lazy" decoding="async">

</details>

## Déploiement des agents
- **Windows** : agent poussé par **GPO**. Le paquet MSI est personnalisé avec Master Packager (fichiers `.mst`) pour que chaque machine rejoigne automatiquement le bon **groupe Wazuh** (un groupe par VLAN, via `WAZUH_AGENT_GROUP`). Les GPO sont rattachées à des OU par VLAN, plus une GPO qui garantit le redémarrage du service. Le MSI et les transformations sont servis depuis un partage réseau.
- **Linux** : pas d'installation centralisée possible ; une commande unique ajoute le dépôt signé, installe l'agent et l'enregistre auprès du manager.

<details>
<summary>Captures (34)</summary>

<img src="/projects/lab-wazuh/009.webp" alt="Capture 1 — Déploiement des agents" width="492" height="176" loading="lazy" decoding="async">

<img src="/projects/lab-wazuh/010.webp" alt="Capture 2 — Déploiement des agents" width="1123" height="239" loading="lazy" decoding="async">

<img src="/projects/lab-wazuh/011.webp" alt="Capture 3 — Déploiement des agents" width="860" height="209" loading="lazy" decoding="async">

<img src="/projects/lab-wazuh/012.webp" alt="Capture 4 — Déploiement des agents" width="1100" height="168" loading="lazy" decoding="async">

<img src="/projects/lab-wazuh/013.webp" alt="Capture 5 — Déploiement des agents" width="484" height="148" loading="lazy" decoding="async">

<img src="/projects/lab-wazuh/014.webp" alt="Capture 6 — Déploiement des agents" width="1098" height="170" loading="lazy" decoding="async">

<img src="/projects/lab-wazuh/015.webp" alt="Capture 7 — Déploiement des agents" width="1172" height="121" loading="lazy" decoding="async">

<img src="/projects/lab-wazuh/016.webp" alt="Capture 8 — Déploiement des agents" width="566" height="733" loading="lazy" decoding="async">

<img src="/projects/lab-wazuh/017.webp" alt="Capture 9 — Déploiement des agents" width="538" height="486" loading="lazy" decoding="async">

<img src="/projects/lab-wazuh/018.webp" alt="Capture 10 — Déploiement des agents" width="1100" height="178" loading="lazy" decoding="async">

<img src="/projects/lab-wazuh/019.webp" alt="Capture 11 — Déploiement des agents" width="541" height="311" loading="lazy" decoding="async">

<img src="/projects/lab-wazuh/020.webp" alt="Capture 12 — Déploiement des agents" width="325" height="102" loading="lazy" decoding="async">

<img src="/projects/lab-wazuh/021.webp" alt="Capture 13 — Déploiement des agents" width="789" height="785" loading="lazy" decoding="async">

<img src="/projects/lab-wazuh/022.webp" alt="Capture 14 — Déploiement des agents" width="580" height="581" loading="lazy" decoding="async">

<img src="/projects/lab-wazuh/024.webp" alt="Capture 15 — Déploiement des agents" width="496" height="239" loading="lazy" decoding="async">

<img src="/projects/lab-wazuh/025.webp" alt="Capture 16 — Déploiement des agents" width="357" height="62" loading="lazy" decoding="async">

<img src="/projects/lab-wazuh/026.webp" alt="Capture 17 — Déploiement des agents" width="154" height="30" loading="lazy" decoding="async">

<img src="/projects/lab-wazuh/027.webp" alt="Capture 18 — Déploiement des agents" width="496" height="247" loading="lazy" decoding="async">

<img src="/projects/lab-wazuh/028.webp" alt="Capture 19 — Déploiement des agents" width="380" height="96" loading="lazy" decoding="async">

<img src="/projects/lab-wazuh/029.webp" alt="Capture 20 — Déploiement des agents" width="272" height="347" loading="lazy" decoding="async">

<img src="/projects/lab-wazuh/030.webp" alt="Capture 21 — Déploiement des agents" width="467" height="625" loading="lazy" decoding="async">

<img src="/projects/lab-wazuh/031.webp" alt="Capture 22 — Déploiement des agents" width="671" height="341" loading="lazy" decoding="async">

<img src="/projects/lab-wazuh/032.webp" alt="Capture 23 — Déploiement des agents" width="539" height="387" loading="lazy" decoding="async">

<img src="/projects/lab-wazuh/033.webp" alt="Capture 24 — Déploiement des agents" width="533" height="540" loading="lazy" decoding="async">

<img src="/projects/lab-wazuh/034.webp" alt="Capture 25 — Déploiement des agents" width="188" height="224" loading="lazy" decoding="async">

<img src="/projects/lab-wazuh/035.webp" alt="Capture 26 — Déploiement des agents" width="272" height="428" loading="lazy" decoding="async">

<img src="/projects/lab-wazuh/036.webp" alt="Capture 27 — Déploiement des agents" width="437" height="327" loading="lazy" decoding="async">

<img src="/projects/lab-wazuh/037.webp" alt="Capture 28 — Déploiement des agents" width="338" height="245" loading="lazy" decoding="async">

<img src="/projects/lab-wazuh/038.webp" alt="Capture 29 — Déploiement des agents" width="390" height="448" loading="lazy" decoding="async">

<img src="/projects/lab-wazuh/039.webp" alt="Capture 30 — Déploiement des agents" width="756" height="103" loading="lazy" decoding="async">

<img src="/projects/lab-wazuh/040.webp" alt="Capture 31 — Déploiement des agents" width="1033" height="353" loading="lazy" decoding="async">

<img src="/projects/lab-wazuh/041.webp" alt="Capture 32 — Déploiement des agents" width="390" height="446" loading="lazy" decoding="async">

<img src="/projects/lab-wazuh/042.webp" alt="Capture 33 — Déploiement des agents" width="383" height="181" loading="lazy" decoding="async">

<img src="/projects/lab-wazuh/043.webp" alt="Capture 34 — Déploiement des agents" width="625" height="984" loading="lazy" decoding="async">

</details>

## Scénarios d'attaque et détection
1. **Force brute SMB** (Windows 11) : après avoir exposé un partage, tentatives depuis Kali (`nmap`, `smbclient`, `nxc`). Wazuh remonte les échecs d'authentification et la série de tentatives consécutives dans *Threat Hunting*.
2. **Scan web Nikto** (Metasploitable 3) : aucune alerte au départ, car l'agent ne lisait pas les journaux Apache. Une configuration **centralisée par groupe** (`Web-Servers`) lui ajoute `access.log` et `error.log`. Résultat : de nombreuses alertes de niveau 5 (erreurs 400) et une alerte corrélée de **niveau 10** (règle 31151, erreurs multiples depuis une même IP).

<details>
<summary>Captures (31)</summary>

<img src="/projects/lab-wazuh/044.webp" alt="Capture 1 — Scénarios d'attaque et détection" width="454" height="120" loading="lazy" decoding="async">

<img src="/projects/lab-wazuh/045.webp" alt="Capture 2 — Scénarios d'attaque et détection" width="722" height="217" loading="lazy" decoding="async">

<img src="/projects/lab-wazuh/046.webp" alt="Capture 3 — Scénarios d'attaque et détection" width="523" height="331" loading="lazy" decoding="async">

<img src="/projects/lab-wazuh/047.webp" alt="Capture 4 — Scénarios d'attaque et détection" width="557" height="118" loading="lazy" decoding="async">

<img src="/projects/lab-wazuh/048.webp" alt="Capture 5 — Scénarios d'attaque et détection" width="597" height="241" loading="lazy" decoding="async">

<img src="/projects/lab-wazuh/049.webp" alt="Capture 6 — Scénarios d'attaque et détection" width="222" height="43" loading="lazy" decoding="async">

<img src="/projects/lab-wazuh/050.webp" alt="Capture 7 — Scénarios d'attaque et détection" width="208" height="39" loading="lazy" decoding="async">

<img src="/projects/lab-wazuh/051.webp" alt="Capture 8 — Scénarios d'attaque et détection" width="513" height="115" loading="lazy" decoding="async">

<img src="/projects/lab-wazuh/052.webp" alt="Capture 9 — Scénarios d'attaque et détection" width="411" height="81" loading="lazy" decoding="async">

<img src="/projects/lab-wazuh/053.webp" alt="Capture 10 — Scénarios d'attaque et détection" width="1206" height="634" loading="lazy" decoding="async">

<img src="/projects/lab-wazuh/054.webp" alt="Capture 11 — Scénarios d'attaque et détection" width="1212" height="321" loading="lazy" decoding="async">

<img src="/projects/lab-wazuh/058.webp" alt="Capture 12 — Scénarios d'attaque et détection" width="920" height="175" loading="lazy" decoding="async">

<img src="/projects/lab-wazuh/059.webp" alt="Capture 13 — Scénarios d'attaque et détection" width="1204" height="540" loading="lazy" decoding="async">

<img src="/projects/lab-wazuh/063.webp" alt="Capture 14 — Scénarios d'attaque et détection" width="1400" height="483" loading="lazy" decoding="async">

<img src="/projects/lab-wazuh/064.webp" alt="Capture 15 — Scénarios d'attaque et détection" width="407" height="385" loading="lazy" decoding="async">

<img src="/projects/lab-wazuh/065.webp" alt="Capture 16 — Scénarios d'attaque et détection" width="177" height="480" loading="lazy" decoding="async">

<img src="/projects/lab-wazuh/066.webp" alt="Capture 17 — Scénarios d'attaque et détection" width="817" height="378" loading="lazy" decoding="async">

<img src="/projects/lab-wazuh/067.webp" alt="Capture 18 — Scénarios d'attaque et détection" width="999" height="527" loading="lazy" decoding="async">

<img src="/projects/lab-wazuh/068.webp" alt="Capture 19 — Scénarios d'attaque et détection" width="397" height="328" loading="lazy" decoding="async">

<img src="/projects/lab-wazuh/069.webp" alt="Capture 20 — Scénarios d'attaque et détection" width="860" height="209" loading="lazy" decoding="async">

<img src="/projects/lab-wazuh/070.webp" alt="Capture 21 — Scénarios d'attaque et détection" width="1140" height="273" loading="lazy" decoding="async">

<img src="/projects/lab-wazuh/071.webp" alt="Capture 22 — Scénarios d'attaque et détection" width="1007" height="62" loading="lazy" decoding="async">

<img src="/projects/lab-wazuh/072.webp" alt="Capture 23 — Scénarios d'attaque et détection" width="1265" height="701" loading="lazy" decoding="async">

<img src="/projects/lab-wazuh/073.webp" alt="Capture 24 — Scénarios d'attaque et détection" width="528" height="177" loading="lazy" decoding="async">

<img src="/projects/lab-wazuh/074.webp" alt="Capture 25 — Scénarios d'attaque et détection" width="1226" height="281" loading="lazy" decoding="async">

<img src="/projects/lab-wazuh/075.webp" alt="Capture 26 — Scénarios d'attaque et détection" width="623" height="281" loading="lazy" decoding="async">

<img src="/projects/lab-wazuh/076.webp" alt="Capture 27 — Scénarios d'attaque et détection" width="631" height="897" loading="lazy" decoding="async">

<img src="/projects/lab-wazuh/077.webp" alt="Capture 28 — Scénarios d'attaque et détection" width="837" height="94" loading="lazy" decoding="async">

<img src="/projects/lab-wazuh/078.webp" alt="Capture 29 — Scénarios d'attaque et détection" width="643" height="305" loading="lazy" decoding="async">

<img src="/projects/lab-wazuh/079.webp" alt="Capture 30 — Scénarios d'attaque et détection" width="972" height="417" loading="lazy" decoding="async">

<img src="/projects/lab-wazuh/080.webp" alt="Capture 31 — Scénarios d'attaque et détection" width="208" height="405" loading="lazy" decoding="async">

</details>

## Réponse automatique
Une **active response** `firewall-drop` bloque temporairement l'IP de l'attaquant quand la règle 31151 se déclenche : après relance de Nikto, la cible n'est plus joignable depuis Kali.

<details>
<summary>Captures (7)</summary>

<img src="/projects/lab-wazuh/081.webp" alt="Capture 1 — Réponse automatique" width="1400" height="738" loading="lazy" decoding="async">

<img src="/projects/lab-wazuh/082.webp" alt="Capture 2 — Réponse automatique" width="902" height="1132" loading="lazy" decoding="async">

<img src="/projects/lab-wazuh/083.webp" alt="Capture 3 — Réponse automatique" width="625" height="495" loading="lazy" decoding="async">

<img src="/projects/lab-wazuh/084.webp" alt="Capture 4 — Réponse automatique" width="429" height="177" loading="lazy" decoding="async">

<img src="/projects/lab-wazuh/085.webp" alt="Capture 5 — Réponse automatique" width="905" height="227" loading="lazy" decoding="async">

<img src="/projects/lab-wazuh/086.webp" alt="Capture 6 — Réponse automatique" width="482" height="74" loading="lazy" decoding="async">

<img src="/projects/lab-wazuh/088.webp" alt="Capture 7 — Réponse automatique" width="988" height="208" loading="lazy" decoding="async">

</details>

## Règle personnalisée : injection SQL furtive
Une injection SQL reçoit une réponse HTTP 200, donc Wazuh ne la signale pas par défaut. J'ai écrit une règle locale (ID supérieur à 100000, niveau 12) qui s'appuie sur le groupe `web` et recherche la chaîne caractéristique de l'injection : l'alerte remonte désormais.

<details>
<summary>Captures (6)</summary>

<img src="/projects/lab-wazuh/087.webp" alt="Capture 1 — Règle personnalisée : injection SQL furtive" width="1236" height="413" loading="lazy" decoding="async">

<img src="/projects/lab-wazuh/089.webp" alt="Capture 2 — Règle personnalisée : injection SQL furtive" width="1127" height="687" loading="lazy" decoding="async">

<img src="/projects/lab-wazuh/090.webp" alt="Capture 3 — Règle personnalisée : injection SQL furtive" width="390" height="94" loading="lazy" decoding="async">

<img src="/projects/lab-wazuh/091.webp" alt="Capture 4 — Règle personnalisée : injection SQL furtive" width="1023" height="306" loading="lazy" decoding="async">

<img src="/projects/lab-wazuh/092.webp" alt="Capture 5 — Règle personnalisée : injection SQL furtive" width="916" height="170" loading="lazy" decoding="async">

<img src="/projects/lab-wazuh/093.webp" alt="Capture 6 — Règle personnalisée : injection SQL furtive" width="273" height="149" loading="lazy" decoding="async">

</details>

## Audit des vulnérabilités
Le module *Vulnerability Detection* liste les CVE par agent et par OS, filtrables.

<details>
<summary>Captures (2)</summary>

<img src="/projects/lab-wazuh/094.webp" alt="Capture 1 — Audit des vulnérabilités" width="290" height="159" loading="lazy" decoding="async">

<img src="/projects/lab-wazuh/095.webp" alt="Capture 2 — Audit des vulnérabilités" width="1400" height="544" loading="lazy" decoding="async">

</details>

## Alertes Teams en temps réel
Un script Python d'intégration (`custom-teams.py`, droits `750`, propriétaire `root:wazuh`) convertit les alertes JSON de Wazuh en message pour un workflow Teams. Seules les alertes de niveau 11 et plus sont envoyées. Test avec une requête Shellshock : l'alerte arrive dans le canal.
Pistes d'amélioration : couleur selon la gravité, IP de l'attaquant dans le message.

<details>
<summary>Captures (5)</summary>

<img src="/projects/lab-wazuh/097.webp" alt="Capture 1 — Alertes Teams en temps réel" width="272" height="207" loading="lazy" decoding="async">

<img src="/projects/lab-wazuh/101.webp" alt="Capture 2 — Alertes Teams en temps réel" width="1248" height="404" loading="lazy" decoding="async">

<img src="/projects/lab-wazuh/102.webp" alt="Capture 3 — Alertes Teams en temps réel" width="770" height="156" loading="lazy" decoding="async">

<img src="/projects/lab-wazuh/103.webp" alt="Capture 4 — Alertes Teams en temps réel" width="202" height="77" loading="lazy" decoding="async">

<img src="/projects/lab-wazuh/104.webp" alt="Capture 5 — Alertes Teams en temps réel" width="726" height="197" loading="lazy" decoding="async">

</details>

## Ce que j'en retiens
- Un SIEM n'est utile que si les bonnes sources de journaux sont collectées.
- Les règles par défaut ne voient pas les attaques « silencieuses » : il faut savoir écrire ses propres règles.
- Automatiser le déploiement (GPO, groupes) rend le lab reproductible.

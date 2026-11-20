---
title: PacketLand — infrastructure d'un parc d'attractions
summary: "Projet de groupe : conception et déploiement du système d'information d'un parc d'attractions fictif (VLAN, firewalls OPNsense en haute disponibilité, Active Directory/DHCP, Zabbix, VoIP, Wi-Fi…)."
status: done
context: Projet de groupe · BTS SIO 2
tags: [Réseau, OPNsense, Active Directory, VLAN, Zabbix, VoIP, vSphere]
order: 1
draft: false
---

## Contexte
**PacketLand** est un parc d'attractions fictif, organisé en quatre zones (Feu, Eau, Terre, Air), situé au nord de Marseille. Le projet consistait à concevoir et déployer son système d'information : sécurité des visiteurs et des données, disponibilité, résilience et capacité à évoluer.

Projet réalisé **en binôme**, dans l'infrastructure de l'école (vSphere). Chacun a ensuite mené ses propres PPE au-dessus de cette base : voir [Lab Wazuh](/fr/projects/lab-wazuh/) et [Cluster Docker Swarm](/fr/projects/cluster-swarm/).

## Architecture réseau
Un VLAN par usage : DMZ (120), serveurs (121), zones Eau/Feu/Terre/Air (122–125), accueil (126), Wi-Fi visiteurs isolé (127), Wi-Fi interne (128), gestion (129), tous en `172.16.<VLAN>.0/24`. Chaque zone a un poste opérateur, deux Wi-Fi (employés / visiteurs) et de la VoIP.

## Briques mises en place
- **Switching** : switch HP A5120 en cœur de réseau (VLAN, trunks, ports hybrides vers les firewalls, sécurisation, PoE pour les bornes Wi-Fi), switch Aruba côté WAN.
- **Firewalling** : deux **OPNsense** en haute disponibilité MASTER/SLAVE, NAT sortant, relais DHCP inter-VLAN, filtrage inter-VLAN, test de basculement.
- **Active Directory et DHCP** : deux contrôleurs de domaine, DHCP en basculement (failover), peuplement de l'annuaire par script PowerShell.
- **Déploiement de postes** : WDS/MDT avec démarrage PXE.
- **Messagerie** : serveur SMTP Postfix.
- **Supervision** : Zabbix (agents, SNMP sur le switch, alertes).
- **Sauvegarde** : serveur de sauvegarde Veeam sur vSphere.
- **VoIP** : FreePBX/Asterisk, postes SIP, Linphone, résolution d'un blocage Fail2Ban.
- **Wi-Fi** : contrôleur UniFi et bornes.


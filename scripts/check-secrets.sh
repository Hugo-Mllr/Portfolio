#!/usr/bin/env bash
# Garde-fou anti-secrets : échoue si un fichier suivi par git contient un motif de secret connu,
# ou si un fichier sensible est suivi. Utilisé en CI ; peut servir de hook pre-commit.
set -euo pipefail
cd "$(git rev-parse --show-toplevel)"
fail=0

# 1) Fichiers sensibles suivis (hors modèles)
bad=$(git ls-files | grep -Ei '(^|/)(\.env(\..*)?|id_rsa.*|id_ed25519.*|.*\.(pem|key|p12|pfx|crt|cer|der|tfstate|tfvars)|.*credentials.*\.json|cert\.pem)$' | grep -v '\.env\.example$' || true)
if [ -n "$bad" ]; then echo "::error::Fichiers sensibles suivis par git :"; echo "$bad"; fail=1; fi

# 2) Motifs de secrets dans le contenu
pattern='(AKIA[0-9A-Z]{16}|-----BEGIN [A-Z ]*PRIVATE KEY-----|gh[pousr]_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{30,}|xox[baprs]-[A-Za-z0-9-]{10,}|sk-[A-Za-z0-9]{20,}|eyJhIjoi[A-Za-z0-9_=-]{20,}|(TUNNEL_TOKEN|API_KEY|SECRET|PASSWORD|TOKEN)[A-Z_]*[[:space:]]*[:=][[:space:]]*["'"'"']?[A-Za-z0-9_./+=-]{16,})'
hits=$(git grep -nEI "$pattern" -- . ':!package-lock.json' ':!scripts/check-secrets.sh' || true)
if [ -n "$hits" ]; then echo "::error::Motif de secret détecté :"; echo "$hits"; fail=1; fi

[ "$fail" -eq 0 ] && echo "OK : aucun secret détecté dans les fichiers suivis."
exit "$fail"

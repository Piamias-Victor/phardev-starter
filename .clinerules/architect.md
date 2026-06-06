# Mode /architect — Règles Phardev

## Rôle
Analyse READ-ONLY. Aucun fichier créé ou modifié sans validation humaine explicite.

## Interdits absolus
- Écrire du code dans les réponses
- Créer, modifier ou supprimer des fichiers
- Passer à l'implémentation sans approbation

## Checklist avant toute proposition
- [ ] Fichiers impactés listés exhaustivement
- [ ] Dépendances inter-packages identifiées
- [ ] Risques de régression documentés
- [ ] Décisions irréversibles signalées (⚠️)

## Dogmes Phardev
R1 — Fichiers < 100 lignes · R2 — DRY absolu · R3 — Zéro hardcode
R4 — Zéro any · R5 — Séparation design/logique · R6 — Tests code impératif
R7 — Imports absolus · R8 — Naming cohérent · R9 — Erreurs explicites · R10 — Commentaires = pourquoi

## Handoff
Déclencher si > 30k tokens OU > 15 tours.
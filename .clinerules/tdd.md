# Mode /tdd — Règles Phardev

## Rôle
Cycle RED → GREEN → REFACTOR strict. Jamais de code sans test rouge d'abord.

## Cycle obligatoire
1. RED — Écrire le test qui échoue. Lancer `pnpm test:run`. Confirmer l'échec.
2. GREEN — Écrire le minimum de code pour passer.
3. REFACTOR — Nettoyer. Vérifier < 100 lignes. Relancer les tests.

## Cible de couverture
packages/domain/ → 100% statements, branches, functions
packages/trpc/   → 80% minimum

## Interdits
- Tester les composants UI (pas de logique = pas de test)
- Mocker ce qu'on possède (mocker uniquement les I/O externes)
- Sauter RED

## Handoff
Déclencher si > 30k tokens OU > 15 tours.
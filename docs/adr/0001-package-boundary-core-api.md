# Frontière de packages : `@repo/core` (Services) séparé de `@repo/api` (Routers)

La logique métier (Services) vit dans `@repo/core`, qui est le seul package autorisé à dépendre de `@repo/db`/Prisma. Les routers tRPC vivent dans `@repo/api`, qui dépend de `@repo/core` mais **pas** de Prisma. On aurait pu tout mettre dans un seul package backend, mais le but du template est de contraindre des agents IA : une frontière de package est physiquement infranchissable (un agent ne peut pas appeler Prisma depuis un router si le package ne le dépend pas), là où une simple convention de dossier ne serait qu'une suggestion. Un linter d'imports rend cette frontière exécutable.

## Consequences

- Un package de plus à maintenir (`@repo/core`).
- Les Server Components importent les Services depuis `@repo/core` directement (voir ADR-0003) ; les routers de `@repo/api` ne sont qu'une couche transport mince.

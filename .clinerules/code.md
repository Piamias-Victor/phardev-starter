# Mode /code — Règles Phardev

## Rôle
Implémentation stricte. Valider typecheck + lint après chaque fichier.

## Interdits absolus
- Fichiers > 100 lignes (R1 — bloquant CI)
- `any` TypeScript (R4)
- Valeurs hardcodées (R3)
- `fetch` HTTP vers nos routes dans les RSC → `createCaller` obligatoire
- Données serveur dans Zustand → TanStack Query via tRPC uniquement
- Imports relatifs profonds → alias @phardev/* obligatoire (R7)

## Validation après chaque fichier
```bash
pnpm typecheck   # 0 erreur
pnpm lint        # 0 warning
```

## Séparation des couches
domain/ → fonctions pures · db/repositories/ → queries Prisma
trpc/routers/ → validation Zod · view-models/ → pont DB-UI
packages/ui/ → présentation pure, zéro fetch

## Handoff
Déclencher si > 30k tokens OU > 15 tours.
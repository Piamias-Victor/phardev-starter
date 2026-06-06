# Les Server Components appellent les Services directement (pas via tRPC)

Dans les pages Next 15 (App Router), les Server Components lisent les données en appelant les **Services** de `@repo/core` directement, sans passer par tRPC. tRPC est réservé aux Client Components et aux mutations. On aurait pu router toute lecture par un caller tRPC server-side pour avoir une porte d'entrée unique, mais cela ajoute une couche d'indirection (et de sérialisation) inutile alors que les Services sont déjà la frontière métier propre. Un lecteur pourrait s'étonner que tRPC soit « contourné » côté serveur — d'où cet ADR.

## Consequences

- La règle pour les agents est binaire : lecture en RSC → Service direct ; toute interaction client (queries réactives, mutations) → tRPC.
- Les invariants métier vivent dans les Services, donc les deux chemins (RSC direct et router tRPC) traversent la même logique — pas de duplication.

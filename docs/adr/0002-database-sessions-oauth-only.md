# Sessions en base de données (pas JWT), OAuth uniquement

NextAuth v5 (Auth.js) est configuré avec des **database sessions** via le Prisma adapter, et non la stratégie JWT par défaut. Les seules méthodes de connexion sont les providers **OAuth** (Google, GitHub) — pas de magic-link, pas de credentials email/mot de passe.

Pourquoi database sessions : la révocation instantanée et la fraîcheur des données de session priment sur la micro-perf, ce qui colle à l'objectif « qualité industrielle » ; et Postgres est déjà sur le chemin critique. Le coût est une requête DB par requête authentifiée.

Pourquoi OAuth uniquement : on évite tout stockage de hash de mot de passe et le provider Credentials (bare-bones, déconseillé par l'équipe Auth.js, et qui forcerait JWT — incompatible avec database sessions). Le schéma Prisma se limite aux modèles standard Auth.js : `User`, `Account`, `Session`, `VerificationToken`.

## Consequences

- Ajouter plus tard un login email/mot de passe nécessiterait de revoir la stratégie de session (Credentials force JWT) — d'où cet ADR.

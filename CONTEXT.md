# phardev-starter

Template de monorepo Next.js 15 de qualité industrielle, destiné à un développeur solo qui délègue 100 % de l'écriture du code à des agents IA. Contexte unique : une seule application métier, des packages partagés comme frontières techniques.

## Language

**Router**:
Un router tRPC, vivant dans `@repo/api`. Couche transport : il valide les entrées et orchestre des appels de Service. Il ne contient aucune logique métier et n'appelle jamais Prisma — `@repo/api` ne dépend pas de Prisma, la frontière est structurelle.
_Avoid_: Endpoint, controller, handler

**Service**:
Une fonction qui porte la logique métier, vivant dans `@repo/core`, et constitue le seul endroit autorisé à appeler Prisma. Reçoit des entrées déjà validées par le Router. Appelable depuis un Router (Client Components / mutations) ou directement depuis un Server Component. Testable sans HTTP.
_Avoid_: Repository, use-case, manager

**Validator**:
Un schéma Zod décrivant la forme d'une entrée. Vit dans `@repo/validators` et sert de source unique de vérité, partagée entre le Router (`.input()`) et les formulaires client.
_Avoid_: Schema (seul), DTO

**User**:
L'identité d'une personne authentifiée. Modèle racine de l'authentification (NextAuth v5).
_Avoid_: Account, member, profile

**Account**:
Le lien entre un User et un provider OAuth externe (Google, GitHub). Un User peut avoir plusieurs Accounts. N'est PAS le compte de l'utilisateur au sens courant — ça, c'est le User.
_Avoid_: Provider link, connection

**Session**:
Un enregistrement de connexion active stocké en base (database sessions, pas JWT). Révocable instantanément.
_Avoid_: Token, login

**Domain Error**:
Une erreur métier typée lancée par un Service (NotFoundError, ForbiddenError, ConflictError…). Indépendante du transport ; un middleware tRPC la mappe vers une TRPCError. Un Service ne lance jamais de TRPCError directement.
_Avoid_: AppError, HttpError, exception

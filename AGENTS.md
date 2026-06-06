Topologie monorepo : apps/web · packages/ui · packages/trpc · packages/db · packages/domain · packages/config
Commandes : pnpm dev · pnpm build · pnpm typecheck · pnpm lint · pnpm test:run · pnpm db:migrate
Interdits absolus : fichiers >100 lignes, any TypeScript, valeurs hardcodées, fetch vers nos propres routes dans RSC, données serveur dans Zustand
Règles détaillées déportées dans .clinerules/
Workflow : /grill-with-docs → /architect → /tdd ou /code → /audit → /handoff
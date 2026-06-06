# Mode /audit — Règles Phardev

## Rôle
Revue sécurité OWASP + qualité R1-R10. READ-ONLY. Rapport uniquement, jamais corriger.

## Checklist OWASP
- [ ] Zéro secret dans les logs ou erreurs exposées au client
- [ ] Validation Zod sur toutes les entrées externes
- [ ] Argon2id pour les mots de passe (jamais bcrypt)
- [ ] Headers sécurité Next.js configurés (CSP, HSTS)
- [ ] Zéro dangerouslySetInnerHTML sans sanitisation

## Checklist qualité
- [ ] Aucun fichier > 100 lignes (R1)
- [ ] Aucun `any` TypeScript (R4)
- [ ] Aucune logique dans les composants UI (R5)
- [ ] Aucune query Prisma hors repositories/
- [ ] Aucune donnée serveur dans Zustand

## Format rapport
### 🔴 Bloquants (corriger avant merge)
### 🟡 Warnings (corriger session suivante)
### 🟢 Conformes

## Handoff
Déclencher si > 30k tokens OU > 15 tours.
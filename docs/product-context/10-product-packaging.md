# 10 - Product Packaging (Plans V1)

Version: 2026-03-26
Scope: structuration produit des plans SaaS a partir des capacites reelles et des entitlements existants (sans changement d'architecture technique)

## 1) Sources utilisees

Sources principales:
- `docs/plan-system/01-feature-inventory.md`
- `docs/plan-system/06-recommendations.md`
- `docs/plan-system/07-feature-permission-entitlement-matrix.md`

Contrainte de cette etape:
- re-packaging produit uniquement
- pas de changement de schema, pas de refactor runtime

## 2) Inventaire des capacites produit (regroupe par valeur)

## 2.1 Production quotidienne
- Catalogue ingredients (lecture/edition)
- Catalogue recettes (lecture/edition)
- Achats (lecture/edition)
- Donnees de base pour calculer les couts de production

## 2.2 Pilotage economique
- Analyse couts recettes
- Analyse evolution des prix
- Impacts recettes (effet ingredient -> marge/cout)
- Audit cout recette (historique/snapshots)

## 2.3 Gouvernance interne du tenant
- Gestion utilisateurs tenant
- Gestion roles d'acces tenant
- Gestion configurations metier (unites, processus, categories, langues, couts)

## 2.4 Gouvernance multi-tenant (operateur/backoffice)
- Consultation portefeuille tenants
- Actions ecriture cross-tenant (clients/plans/overrides)
- Diagnostic et observabilite d'acces

## 3) Redefinition des plans (orientee valeur)

Convention de mapping:
- Plan 1 = code technique `ESSENTIAL`
- Plan 2 = code technique `PRO`
- Plan 3 = code technique `ENTERPRISE`

## Plan 1 - Essentiel Operations (`ESSENTIAL`)

Description valeur:
- Digitaliser la production et fiabiliser le socle ingredients/recettes/achats.

Cible client:
- petites structures ou sites uniques qui veulent sortir du tableur.

Problemes resolus:
- centralisation des donnees ingredients/recettes
- suivi propre des achats
- reduction des erreurs manuelles de cout de revient

## Plan 2 - Pilotage Performance (`PRO`)

Description valeur:
- Passer de la production a la decision, avec analyses de marge et sensibilite prix.

Cible client:
- structures en croissance qui pilotent plusieurs gammes et doivent arbitrer vite.

Problemes resolus:
- visibilite sur l'evolution des couts
- priorisation des recettes a retravailler
- anticipation de l'impact des fluctuations fournisseurs

## Plan 3 - Gouvernance Enterprise (`ENTERPRISE`)

Description valeur:
- Industrialiser la gouvernance (droits, configuration avancee, pilotage multi-tenant).

Cible client:
- groupes/multi-entites avec besoin de controle fin et exploitation backoffice.

Problemes resolus:
- delegation securisee par roles
- standardisation des regles de configuration
- exploitation centralisee des tenants et plans

## 4) Mapping Entitlements -> Plans (V1 cible)

| Feature | Entitlement | Plan 1 | Plan 2 | Plan 3 |
|---|---|---|---|---|
| Catalogue ingredients (lecture) | `catalog.ingredients.read` | Oui | Oui | Oui |
| Catalogue ingredients (edition) | `catalog.ingredients.write` | Oui | Oui | Oui |
| Catalogue recettes (lecture) | `catalog.recipes.read` | Oui | Oui | Oui |
| Catalogue recettes (edition) | `catalog.recipes.write` | Oui | Oui | Oui |
| Achats (lecture) | `operations.purchases.read` | Oui | Oui | Oui |
| Achats (edition) | `operations.purchases.write` | Oui | Oui | Oui |
| Analyse couts recettes | `analytics.recipe-costs.read` | Non | Oui | Oui |
| Analyse evolution prix | `analytics.price-evolution.read` | Non | Oui | Oui |
| Impacts recettes | `analytics.recipe-impacts.read` | Non | Oui | Oui |
| Audit cout recette (via module analyses couts) | `analytics.recipe-costs.read` | Non | Oui | Oui |
| Configuration tenant | `admin.configuration.manage` | Non | Oui | Oui |
| Gestion utilisateurs tenant | `admin.users.manage` | Non | Non | Oui |
| Gestion roles tenant | `admin.roles.manage` | Non | Non | Oui |
| Backoffice tenants (lecture) | `backoffice.tenants.read` | Non | Non | Oui |
| Backoffice tenants (ecriture) | `backoffice.tenants.write` | Non | Non | Oui |

## 5) Manques et incoherences identifies (corrections minimales)

## 5.1 Incoherence packaging actuelle sur `PRO`
- Constat: le setup technique historique mettait `PRO` surtout sur analytics, sans `admin.configuration.manage`.
- Risque produit: plan "pilotage" sans capacite de parametrage metier cle.
- Correction minimale proposee (V1): activer `admin.configuration.manage` dans `PRO`.

## 5.2 Audit cout recette non differencie
- Constat: l'audit cout est implicitement packe avec `analytics.recipe-costs.read`.
- Risque produit: impossible de vendre un palier "analyses de base" vs "audit avance".
- Correction minimale proposee (V1.1): ajouter un entitlement dedie `analytics.recipe-audit.read` seulement si un besoin commercial concret apparait.

## 5.3 Backoffice encore coarse-grain
- Constat: seulement `backoffice.tenants.read/write`.
- Risque produit: faible finesse de delegation des operations internes.
- Correction minimale proposee (V1.1): split optionnel `backoffice.plans.read/write` si besoin d'organisation equipe.

## 5.4 Valeur operationnelle non explicite dans le naming technique
- Constat: `ESSENTIAL/PRO/ENTERPRISE` est techniquement correct mais peu narratif.
- Correction minimale proposee (V1): conserver les codes techniques, exposer des noms marketing:
  - Essentiel Operations
  - Pilotage Performance
  - Gouvernance Enterprise

## 6) Version commerciale V1 (landing + pricing + pitch)

## 6.1 Message global
- "Passez d'une gestion artisanale a un pilotage industriel de vos couts alimentaires."
- "Un socle operationnel solide, des analyses actionnables, puis une gouvernance complete selon votre maturite."

## 6.2 Pitch par plan

Essentiel Operations:
- "Centralisez ingredients, recettes et achats dans un seul outil fiable."
- "Maitrisez votre execution quotidienne sans complexite inutile."

Pilotage Performance:
- "Ajoutez la lecture business: couts, tendances prix et impacts recettes."
- "Transformez les donnees de production en decisions de marge."

Gouvernance Enterprise:
- "Structurez les droits, la configuration et l'exploitation multi-tenant."
- "Passez a une gouvernance robuste pour scaler sans perdre le controle."

## 6.3 Bullets pricing-page (sans prix)

Essentiel Operations:
- Catalogue ingredients et recettes
- Gestion achats
- Ecriture metier complete du socle

Pilotage Performance:
- Tout Essentiel Operations
- Analyses couts recettes
- Evolution des prix + impacts recettes
- Configuration tenant metier

Gouvernance Enterprise:
- Tout Pilotage Performance
- Gestion utilisateurs et roles
- Backoffice lecture/ecriture tenants
- Gouvernance operationnelle centralisee

## 7) Rationale produit (resume)

- Segmentation par maturite reelle du client, pas par volume artificiel.
- Reutilisation maximale des entitlements existants pour limiter la dette technique.
- Differenciation claire:
  - Plan 1 = execution
  - Plan 2 = pilotage
  - Plan 3 = gouvernance
- Base directement exploitable pour:
  - page pricing
  - page landing
  - argumentaire sales

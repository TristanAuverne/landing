# Auverne - Site marketing statique

Site marketing statique HTML/CSS/JS pour `auverne.com`, orienté SEO et prêt à être déployé sur Vercel.

## Structure du projet

- `index.html` : page d'accueil
- `fonctionnalites.html` : page fonctionnalités
- `tarifs.html` : page tarifs
- `pages/logiciel-couts-alimentaires.html` : page SEO "logiciel de gestion des coûts alimentaires"
- `pages/calcul-cout-recette.html` : page SEO "calcul coût recette"
- `pages/gestion-ingredients.html` : page SEO "gestion des ingrédients"
- `contact.html` : formulaire de contact
- `robots.txt` : directives d'indexation
- `sitemap.xml` : sitemap XML des pages publiques
- `assets/img/logo-auverne.png` : logo utilisé dans le header/footer
- `assets/img/og-image.png` : image Open Graph
- `favicon.ico` : favicon (placeholder actuel)
- `assets/css/style.css` : design system et styles communs
- `assets/js/main.js` : JS minimal (menu mobile + année dynamique)
- `assets/images/` : dossier prêt pour les futures images

## Lancer le site en local

Option simple avec Python:

```bash
python3 -m http.server 8000
```

Puis ouvrir `http://localhost:8000`.

## Modifier les pages

1. Éditer les fichiers `.html` à la racine.
2. Réutiliser les composants CSS existants dans `assets/css/style.css`.
3. Garder les métadonnées SEO (`title`, `description`, canonical, Open Graph) uniques par page.
4. Vérifier la cohérence des liens internes dans le header/footer.

## Ajouter des images

- Placer les nouvelles images dans `assets/images/`.
- Utiliser des noms explicites (ex: `dashboard-couts.webp`).
- Compresser les images avant mise en production.
- Mettre à jour `assets/img/og-image.png` avec une vraie image de partage social.
- Remplacer `favicon.ico` par une vraie icône multi-format.

## Déploiement sur Vercel

1. Pousser le repository sur GitHub.
2. Importer le projet dans Vercel (framework: `Other`).
3. Build command: aucune.
4. Output directory: racine du repo.
5. Configurer le domaine `auverne.com` (GoDaddy déjà relié côté DNS).
6. Vérifier après déploiement:
   - `https://auverne.com/robots.txt`
   - `https://auverne.com/sitemap.xml`
   - balises SEO dans le code source.

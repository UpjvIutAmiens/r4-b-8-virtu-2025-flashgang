# Film-o-mètre

Application web de découverte et notation de films développée dans le cadre du module R4.B.8 Virtualisation et Conteneurisation.

## Description

Film-o-mètre est une application permettant aux utilisateurs de découvrir des films aléatoires et de les noter. L'application utilise une architecture microservices avec Docker et intègre plusieurs fonctionnalités bonus pour enrichir l'expérience utilisateur.

## Installation et lancement

```bash
git clone https://github.com/UpjvIutAmiens/r4-b-8-virtu-2025-flashgang.git
cd r4-b-8-virtu-2025-flashgang
docker compose up
```

L'application est accessible sur http://localhost

## Fonctionnalités

### Fonctionnalités de base
- Affichage de films aléatoires avec poster et informations
- Système de notation de 1 à 5 étoiles
- Calcul automatique de la note moyenne
- Comptage du nombre de votes

### Fonctionnalités bonus implémentées
- **Bonus** : Classement des films les mieux notés
- **Bonus** : Intégration de l'API OMDb pour récupérer de vrais films
- **Bonus** : Stockage persistant avec Redis
- **Bonus** : Dashboard avec statistiques détaillées

## Architecture technique

L'application est composée de plusieurs services orchestrés avec Docker Compose :

- **Frontend** : Interface web statique servie par Nginx
- **Backend** : API REST développée en Node.js avec Express
- **Redis** : Base de données en mémoire pour la persistance des notes
- **Caddy** : Reverse proxy exposant uniquement le port 80

### Structure des services
```
Caddy (port 80) → Frontend (Nginx) → Backend (Node.js) → Redis
```

## API

### Endpoints principaux
- `GET /api/film` - Récupère un film aléatoire
- `POST /api/note` - Enregistre une note pour un film

### Endpoints bonus
- `GET /api/classement` - Retourne le classement des films
- `GET /api/stats` - Fournit les statistiques globales

## Structure du projet

```
.
├── README.md
├── src/
│   ├── frontend/           # Interface utilisateur
│   │   ├── index.html      # Page principale
│   │   ├── classement.html # Page de classement
│   │   ├── dashboard.html  # Dashboard statistiques
│   │   └── style.css       # Styles CSS
│   └── backend/            # API Node.js
│       ├── server.js       # Serveur Express
│       ├── package.json    # Dépendances npm
│       └── Dockerfile      # Image Docker backend
└── docker/
    └── docker-compose.yml  # Configuration des services
```

## Pages disponibles

- `/` - Application principale de notation
- `/classement.html` - Classement des films par note
- `/dashboard.html` - Tableau de bord avec statistiques


### Variables d'environnement

```
NODE_ENV=production
REDIS_URL=redis://redis:6379
USE_REDIS=true
OMDB_API_KEY=demo
USE_OMDB=false
```

## Contraintes respectées

- Port unique : Seul le port 80 est exposé via Caddy
- Reverse proxy : Caddy gère le routage vers les différents services
- Structure normalisée : Séparation claire entre src/ et docker/
- Conteneurisation complète : Tous les services sont dockerisés

## Tests et qualité

Le projet intègre une pipeline CI/CD avec :
- GitHub Actions pour les tests automatisés
- SonarQube pour l'analyse de la qualité du code

## Configuration SonarQube

Projet configuré sur l'instance SonarQube de l'IUT :
- Project key : `r4-b-8-virtu-2025-flashgang`
- URL : https://sonarqube.delpech.info/dashboard?id=r4-b-8-virtu-2025-flashgang

## Auteur

Théo Le Bastard  
IUT Amiens - Département Informatique  
R4.B.8 Virtualisation et Conteneurisation  
Année 2024-2025

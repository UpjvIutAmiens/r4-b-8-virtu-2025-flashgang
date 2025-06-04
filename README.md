# 🎬 Film-o-mètre

Application web conteneurisée permettant de découvrir des films aléatoires et de les noter.

## 🚀 Lancement rapide

```bash
docker compose up
```

**Accédez à l'application sur : http://localhost**

## ✨ Fonctionnalités

- 🎲 **Film aléatoire** : Découvrez des films avec posters
- ⭐ **Système de notation** : Notez de 1 à 5 étoiles
- 📊 **Statistiques** : Note moyenne et nombre de votes

## 🎁 Bonus implémentés

- 🏆 **BONUS** : Classement des films les mieux notés
- 🌐 **BONUS** : Intégration API OMDb pour films réels
- 💾 **BONUS** : Stockage Redis persistant
- 📊 **BONUS** : Dashboard avec statistiques avancées

## 🏗️ Architecture

- **Frontend** : Interface web HTML/CSS/JS servie par Nginx
- **Backend** : API REST Node.js Express
- **Redis** : Stockage persistant des notes
- **Proxy** : Caddy comme reverse proxy (port 80)

## 📡 API Endpoints

| Endpoint | Description | Bonus |
|----------|-------------|-------|
| `GET /api/film` | Film aléatoire | ✅ |
| `POST /api/note` | Enregistrer note | ✅ |
| `GET /api/classement` | Top films | 🏆 BONUS |
| `GET /api/stats` | Statistiques | 📊 BONUS |

## 📦 Structure

```
.
├── README.md
├── src/
│   ├── frontend/    # Interface web
│   └── backend/     # API Node.js
└── docker/          # Configuration Docker
```


## 🎯 Pages disponibles

- http://localhost/ - Application principale
- http://localhost/classement.html - Classement (BONUS)
- http://localhost/dashboard.html - Dashboard (BONUS)

## ✅ Contraintes respectées

- ✅ Port unique : Seul le port 80 exposé
- ✅ Proxy inverse : Caddy route tout
- ✅ Structure src/docker conforme

## 📧 Contact
**Developeur** : Theo Le Bastard
**Projet** : IUT - Virtualisation et Conteneurisation
**Année** : 2025
# Film-o-mètre avec SonarQube

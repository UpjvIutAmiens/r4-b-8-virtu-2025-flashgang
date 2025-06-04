const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Configuration OMDb API (BONUS 2)
const OMDB_API_KEY = process.env.OMDB_API_KEY || 'demo';
const USE_OMDB = process.env.USE_OMDB === 'true';

// Logs pour debug
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// Base de données films étendue (BONUS 2)
const films = [
    {
        id: 1,
        title: "The Shawshank Redemption",
        description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
        poster: "https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_SX300.jpg",
        year: 1994,
        director: "Frank Darabont",
        genre: "Drama",
        imdbID: "tt0111161"
    },
    {
        id: 2,
        title: "The Godfather",
        description: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
        poster: "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzUwOTU2@._V1_SX300.jpg",
        year: 1972,
        director: "Francis Ford Coppola",
        genre: "Crime, Drama",
        imdbID: "tt0068646"
    },
    {
        id: 3,
        title: "The Dark Knight",
        description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests.",
        poster: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg",
        year: 2008,
        director: "Christopher Nolan",
        genre: "Action, Crime, Drama",
        imdbID: "tt0468569"
    },
    {
        id: 4,
        title: "Pulp Fiction",
        description: "The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.",
        poster: "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_SX300.jpg",
        year: 1994,
        director: "Quentin Tarantino",
        genre: "Crime, Drama",
        imdbID: "tt0110912"
    },
    {
        id: 5,
        title: "Inception",
        description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea.",
        poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
        year: 2010,
        director: "Christopher Nolan",
        genre: "Action, Sci-Fi, Thriller",
        imdbID: "tt1375666"
    },
    {
        id: 6,
        title: "Forrest Gump",
        description: "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man.",
        poster: "https://m.media-amazon.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtMmZiYmEyNmU1NjMzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
        year: 1994,
        director: "Robert Zemeckis",
        genre: "Drama, Romance",
        imdbID: "tt0109830"
    },
    {
        id: 7,
        title: "The Matrix",
        description: "A computer programmer is led to fight an underground war against powerful computers who have constructed his entire reality with a system called the Matrix.",
        poster: "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
        year: 1999,
        director: "The Wachowskis",
        genre: "Action, Sci-Fi",
        imdbID: "tt0133093"
    },
    {
        id: 8,
        title: "Goodfellas",
        description: "The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners Jimmy Conway and Tommy DeVito.",
        poster: "https://m.media-amazon.com/images/M/MV5BY2NkZjEzMDgtN2RjYy00YzM1LWI4ZmQtMjA4YTQyYzA4NmFjXkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_SX300.jpg",
        year: 1990,
        director: "Martin Scorsese",
        genre: "Biography, Crime, Drama",
        imdbID: "tt0099685"
    },
    {
        id: 9,
        title: "Titanic",
        description: "A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic.",
        poster: "https://m.media-amazon.com/images/M/MV5BMDdmZGU3NDQtY2E5My00ZTliLWIzOTUtMTY4ZGI1YjdiNjk3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg",
        year: 1997,
        director: "James Cameron",
        genre: "Drama, Romance",
        imdbID: "tt0120338"
    },
    {
        id: 10,
        title: "Avatar",
        description: "A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world.",
        poster: "https://m.media-amazon.com/images/M/MV5BNjA3NGExZDUtZDk3OC00ODY5LTg2ZDQtNGM0YzJiYzQzMGYzXkEyXkFqcGdeQXVyMTU0OTM5ODc1._V1_SX300.jpg",
        year: 2009,
        director: "James Cameron",
        genre: "Action, Adventure, Fantasy",
        imdbID: "tt0499549"
    }
];

// BONUS 3 : Redis Storage
const RedisStorage = require('./redis-storage');
const redisStorage = new RedisStorage();
let notes = []; // Fallback si Redis indisponible

// Initialiser Redis
(async () => {
    const redisConnected = await redisStorage.connect();
    if (redisConnected) {
        notes = await redisStorage.getNotes();
        console.log(`✅ Redis connecté - ${notes.length} notes chargées`);
    } else {
        console.log('⚠️ Redis indisponible - mode mémoire activé');
    }
})();

// BONUS 2 : Fonction OMDb
async function getOMDbDetails(imdbID) {
    if (!USE_OMDB || OMDB_API_KEY === 'demo') return null;
    
    try {
        const fetch = (await import('node-fetch')).default;
        const response = await fetch(`http://www.omdbapi.com/?i=${imdbID}&apikey=${OMDB_API_KEY}`);
        const data = await response.json();
        return data.Response === 'True' ? data : null;
    } catch (error) {
        console.log('⚠️ Erreur OMDb:', error.message);
        return null;
    }
}

// GET /film → retourne un film aléatoire
app.get('/api/film', async (req, res) => {
    console.log('📡 GET /api/film - Récupération d\'un film aléatoire');
    const randomFilm = films[Math.floor(Math.random() * films.length)];
    
    // BONUS 2 : Enrichir avec OMDb si possible
    let enrichedFilm = { ...randomFilm };
    if (USE_OMDB && randomFilm.imdbID) {
        const omdbData = await getOMDbDetails(randomFilm.imdbID);
        if (omdbData) {
            enrichedFilm = {
                ...enrichedFilm,
                poster: omdbData.Poster !== 'N/A' ? omdbData.Poster : enrichedFilm.poster,
                plot: omdbData.Plot !== 'N/A' ? omdbData.Plot : enrichedFilm.description,
                imdbRating: omdbData.imdbRating !== 'N/A' ? omdbData.imdbRating : null,
                runtime: omdbData.Runtime !== 'N/A' ? omdbData.Runtime : null
            };
        }
    }
    
    // Calculer la moyenne des notes
    const filmNotes = notes.filter(note => note.filmId === enrichedFilm.id);
    const averageRating = filmNotes.length > 0 
        ? parseFloat((filmNotes.reduce((sum, note) => sum + note.rating, 0) / filmNotes.length).toFixed(1))
        : null;
    
    const result = {
        ...enrichedFilm,
        averageRating,
        totalRatings: filmNotes.length
    };
    
    console.log(`🎬 Film envoyé: ${result.title} (${result.year})`);
    res.json(result);
});

// POST /note → enregistre une note
app.post('/api/note', async (req, res) => {
    console.log('📝 POST /api/note - Ajout d\'une note');
    const { filmId, rating } = req.body;
    
    if (!filmId || !rating || rating < 1 || rating > 5) {
        console.log('❌ Données invalides:', { filmId, rating });
        return res.status(400).json({ error: 'Données invalides' });
    }
    
    const noteId = notes.length + 1;
    const newNote = {
        id: noteId,
        filmId: parseInt(filmId),
        rating: parseInt(rating),
        createdAt: new Date().toISOString()
    };
    
    // BONUS 3 : Sauvegarder en Redis si disponible
    const redisSaved = await redisStorage.saveNote(newNote);
    
    notes.push(newNote);
    console.log(`⭐ Note ajoutée: ${newNote.rating}/5 pour film ${filmId} ${redisSaved ? '(Redis ✅)' : '(Mémoire ⚠️)'}`);
    
    res.json({ 
        message: 'Note enregistrée avec succès',
        noteId,
        rating: newNote.rating 
    });
});

// GET /note/:id → retourne la moyenne des notes pour un film
app.get('/api/note/:id', (req, res) => {
    const filmId = parseInt(req.params.id);
    console.log(`📊 GET /api/note/${filmId} - Récupération des notes`);
    
    const filmNotes = notes.filter(note => note.filmId === filmId);
    const averageRating = filmNotes.length > 0 
        ? parseFloat((filmNotes.reduce((sum, note) => sum + note.rating, 0) / filmNotes.length).toFixed(1))
        : null;
    
    const result = {
        filmId,
        averageRating,
        totalRatings: filmNotes.length,
        notes: filmNotes.map(note => ({ rating: note.rating, createdAt: note.createdAt }))
    };
    
    console.log(`📈 Stats film ${filmId}: ${averageRating}/5 (${filmNotes.length} votes)`);
    res.json(result);
});

// BONUS 1 : GET /api/classement → top films les mieux notés
app.get('/api/classement', (req, res) => {
    console.log('🏆 GET /api/classement - Récupération du top films');
    
    const filmsWithRatings = films.map(film => {
        const filmNotes = notes.filter(note => note.filmId === film.id);
        const averageRating = filmNotes.length > 0 
            ? parseFloat((filmNotes.reduce((sum, note) => sum + note.rating, 0) / filmNotes.length).toFixed(1))
            : 0;
        
        return {
            ...film,
            averageRating,
            totalRatings: filmNotes.length
        };
    });
    
    const classement = filmsWithRatings
        .filter(film => film.totalRatings > 0)
        .sort((a, b) => {
            if (b.averageRating !== a.averageRating) {
                return b.averageRating - a.averageRating;
            }
            return b.totalRatings - a.totalRatings;
        });
    
    console.log(`🥇 Classement généré: ${classement.length} films notés`);
    res.json(classement);
});

// Health check
app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        films: films.length,
        notes: notes.length,
        redisConnected: redisStorage.connected,
        omdbEnabled: USE_OMDB
    });
});

// BONUS 5 : Statistiques avancées
app.get('/api/stats', (req, res) => {
    const stats = {
        totalFilms: films.length,
        totalNotes: notes.length,
        filmsWithNotes: [...new Set(notes.map(n => n.filmId))].length,
        averageRatingGlobal: notes.length > 0 
            ? parseFloat((notes.reduce((sum, note) => sum + note.rating, 0) / notes.length).toFixed(1))
            : 0,
        redisEnabled: redisStorage.connected,
        omdbEnabled: USE_OMDB
    };
    
    console.log('📊 Statistiques demandées:', stats);
    res.json(stats);
});

const PORT = 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Backend Film-o-mètre démarré sur port ${PORT}`);
    console.log(`📚 ${films.length} films disponibles`);
    console.log(`🌐 OMDb API: ${USE_OMDB ? 'Activée' : 'Désactivée'}`);
    console.log(`💾 Redis: ${redisStorage.connected ? 'Connecté' : 'Indisponible'}`);
    console.log('🔗 Endpoints disponibles:');
    console.log('  GET  /api/film');
    console.log('  POST /api/note');
    console.log('  GET  /api/note/:id');
    console.log('  GET  /api/classement    🏆 BONUS 1');
    console.log('  GET  /api/stats         📊 BONUS 5');
    console.log('  GET  /health');
});

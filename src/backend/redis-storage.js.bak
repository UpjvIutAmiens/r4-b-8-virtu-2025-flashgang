const redis = require('redis');

class RedisStorage {
    constructor() {
        this.client = null;
        this.connected = false;
    }

    async connect() {
        try {
            const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
            this.client = redis.createClient({ url: redisUrl });
            
            this.client.on('error', (err) => {
                console.log('❌ Redis Error:', err);
                this.connected = false;
            });
            
            this.client.on('connect', () => {
                console.log('✅ Redis connecté');
                this.connected = true;
            });
            
            await this.client.connect();
            return true;
        } catch (error) {
            console.log('⚠️ Redis non disponible:', error.message);
            this.connected = false;
            return false;
        }
    }

    async saveNote(note) {
        if (!this.connected) return false;
        
        try {
            const key = `note:${note.id}`;
            await this.client.hSet(key, {
                id: note.id.toString(),
                filmId: note.filmId.toString(),
                rating: note.rating.toString(),
                createdAt: note.createdAt
            });
            
            // Ajouter à la liste des notes du film
            await this.client.lPush(`film:${note.filmId}:notes`, note.id.toString());
            
            console.log(`💾 Note ${note.id} sauvée dans Redis`);
            return true;
        } catch (error) {
            console.log('❌ Erreur sauvegarde Redis:', error.message);
            return false;
        }
    }

    async getNotes() {
        if (!this.connected) return [];
        
        try {
            const keys = await this.client.keys('note:*');
            const notes = [];
            
            for (const key of keys) {
                const note = await this.client.hGetAll(key);
                if (note.id) {
                    notes.push({
                        id: parseInt(note.id),
                        filmId: parseInt(note.filmId),
                        rating: parseInt(note.rating),
                        createdAt: note.createdAt
                    });
                }
            }
            
            console.log(`📖 ${notes.length} notes récupérées depuis Redis`);
            return notes;
        } catch (error) {
            console.log('❌ Erreur lecture Redis:', error.message);
            return [];
        }
    }

    async getFilmNotes(filmId) {
        if (!this.connected) return [];
        
        try {
            const noteIds = await this.client.lRange(`film:${filmId}:notes`, 0, -1);
            const notes = [];
            
            for (const noteId of noteIds) {
                const note = await this.client.hGetAll(`note:${noteId}`);
                if (note.id) {
                    notes.push({
                        id: parseInt(note.id),
                        filmId: parseInt(note.filmId),
                        rating: parseInt(note.rating),
                        createdAt: note.createdAt
                    });
                }
            }
            
            return notes;
        } catch (error) {
            console.log('❌ Erreur lecture notes film Redis:', error.message);
            return [];
        }
    }

    async getStats() {
        if (!this.connected) return { totalNotes: 0, filmsWithNotes: 0 };
        
        try {
            const noteKeys = await this.client.keys('note:*');
            const filmKeys = await this.client.keys('film:*:notes');
            
            return {
                totalNotes: noteKeys.length,
                filmsWithNotes: filmKeys.length
            };
        } catch (error) {
            console.log('❌ Erreur stats Redis:', error.message);
            return { totalNotes: 0, filmsWithNotes: 0 };
        }
    }
}

module.exports = RedisStorage;

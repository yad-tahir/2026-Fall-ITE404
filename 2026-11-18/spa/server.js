const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
//localhost/public/index.html
app.use(express.static(path.join(__dirname, 'public')));

let songs = [
    { id: 1, title: 'Bohemian Rhapsody', artist: 'Queen' },
    { id: 2, title: 'Imagine', artist: 'John Lennon' }
];

app.get('/api/songs', (req, res) => {
    res.json(songs);
});

app.get('/api/songs/:id', (req, res) => {
    const songId = parseInt(req.params.id, 10);
    const song = songs.find(s => s.id === songId);

    if (song) {
	res.json(song);
    } else {
	res.status(404).json({ message: 'Song not found' });
    }
});

app.post('/api/songs', (req, res) => {
    const newSong = {
	id: Date.now(),
	title: req.body.title,
	artist: req.body.artist
    };
    songs.push(newSong);
    res.status(201).json(newSong);
});

app.post('/api/songs/delete', (req, res) => {
    const songId = parseInt(req.body.id, 10);
    songs = songs.filter(s => s.id !== songId);
    res.json({ message: 'Song deleted successfully' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

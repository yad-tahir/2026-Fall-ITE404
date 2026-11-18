const songList = document.getElementById('songList');
const titleInput = document.getElementById('titleInput');
const artistInput = document.getElementById('artistInput');
const addSongBtn = document.getElementById('addSongBtn');
const songDetails = document.getElementById('songDetails');
const detailId = document.getElementById('detailId');
const detailTitle = document.getElementById('detailTitle');
const detailArtist = document.getElementById('detailArtist');

fetchSongs();

addSongBtn.addEventListener('click', () => {
    const title = titleInput.value.trim();
    const artist = artistInput.value.trim();
    if (title && artist) {
	addSong(title, artist);
	titleInput.value = '';
	artistInput.value = '';
    }
});

async function fetchSongs() {
    try {
	const response = await fetch('/api/songs');
	const songs = await response.json();
	renderSongs(songs);
    } catch (error) {
	console.error(error);
    }
}

async function viewSong(id) {
    try {
	const response = await fetch(`/api/songs/${id}`);
	if (response.ok) {
	    const song = await response.json();
	    detailId.textContent = song.id;
	    detailTitle.textContent = song.title;
	    detailArtist.textContent = song.artist;
	    songDetails.style.display = 'block';
	}
    } catch (error) {
	console.error(error);
    }
}

async function addSong(title, artist) {
    try {
	await fetch('/api/songs', {
	    method: 'POST',
	    headers: { 'Content-Type': 'application/json' },
	    body: JSON.stringify({ title, artist })
	});
	fetchSongs();
    } catch (error) {
	console.error(error);
    }
}

async function deleteSong(id) {
    try {
	await fetch('/api/songs/delete', {
	    method: 'POST',
	    headers: { 'Content-Type': 'application/json' },
	    body: JSON.stringify({ id })
	});
	songDetails.style.display = 'none';
	fetchSongs();
    } catch (error) {
	console.error(error);
    }
}

function renderSongs(songs) {
    songList.innerHTML = '';
    songs.forEach(song => {
	const li = document.createElement('li');
	li.className = 'song-item';
	li.innerHTML = `
	    <div class="song-info">
		<strong>${song.title}</strong>
		<span class="song-artist">${song.artist}</span>
	    </div>
	    <div class="action-btns">
		<button class="view-btn" onclick="viewSongHandler(${song.id})">View</button>
		<button class="delete-btn" onclick="deleteSongHandler(${song.id})">Delete</button>
	    </div>
	`;
	songList.appendChild(li);
    });
}

window.viewSongHandler = (id) => {
    viewSong(id);
};

window.deleteSongHandler = (id) => {
    deleteSong(id);
};

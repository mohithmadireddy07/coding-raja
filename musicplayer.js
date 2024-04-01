const playlist = [
    { title: "Song 1", artist: "Artist 1", src: "song1.mp3" },
    { title: "Song 2", artist: "Artist 2", src: "song2.mp3" },
    { title: "Song 3", artist: "Artist 3", src: "song3.mp3" }
];

const audio = new Audio();

let currentTrackIndex = 0;

const playlistElement = document.getElementById('playlist');
const currentTrackElement = document.getElementById('current-track');
const progressBar = document.getElementById('progress-bar');
const playPauseButton = document.getElementById('play-pause-btn');
const shuffleButton = document.getElementById('shuffle-btn');
const prevButton = document.getElementById('prev-btn');
const nextButton = document.getElementById('next-btn');
const repeatButton = document.getElementById('repeat-btn');
const volumeSlider = document.getElementById('volume-slider');

playlist.forEach((track, index) => {
    const playlistItem = document.createElement('div');
    playlistItem.textContent = `${track.title} - ${track.artist}`;
    playlistItem.classList.add('playlist-item');
    playlistItem.addEventListener('click', () => playTrack(index));
    playlistElement.appendChild(playlistItem);
});

playPauseButton.addEventListener('click', togglePlayPause);

prevButton.addEventListener('click', playPreviousTrack);

nextButton.addEventListener('click', playNextTrack);

shuffleButton.addEventListener('click', toggleShuffle);

repeatButton.addEventListener('click', toggleRepeat);

volumeSlider.addEventListener('input', updateVolume);

audio.addEventListener('timeupdate', updateProgress);

function playTrack(index) {
    currentTrackIndex = index;
    const track = playlist[currentTrackIndex];
    audio.src = track.src;
    audio.play();
    updateCurrentTrack();
}

function togglePlayPause() {
    if (audio.paused) {
        audio.play();
        playPauseButton.textContent = 'Pause';
    } else {
        audio.pause();
        playPauseButton.textContent = 'Play';
    }
}

function playPreviousTrack() {
    currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
    playTrack(currentTrackIndex);
}

function playNextTrack() {
    if (shuffle) {
        currentTrackIndex = getRandomIndex();
    } else {
        currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
    }
    playTrack(currentTrackIndex);
}

function toggleShuffle() {
    shuffle = !shuffle;
    shuffleButton.textContent = shuffle ? 'Shuffle On' : 'Shuffle Off';
}

function toggleRepeat() {
    repeat = !repeat;
    repeatButton.textContent = repeat ? 'Repeat On' : 'Repeat Off';
}

function updateVolume() {
    audio.volume = volumeSlider.value / 100;
}

function updateCurrentTrack() {
    const track = playlist[currentTrackIndex];
    currentTrackElement.textContent = `${track.title} - ${track.artist}`;
}

function updateProgress() {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = progress + '%';

    if (progress >= 100 && repeat) {
        playNextTrack();
    }
}

function getRandomIndex() {
    let randomIndex = currentTrackIndex;
    while (randomIndex === currentTrackIndex) {
        randomIndex = Math.floor(Math.random() * playlist.length);
    }
    return randomIndex;
}

playTrack(currentTrackIndex);

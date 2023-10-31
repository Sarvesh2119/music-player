var songs = [
    {
        artist: "Artist 1",
        songName: "Song 1",
        thumbnail: "thumbnail/song1.jpg",
        audio: "songs/song1.mp3"
    },
    {
        artist: "Artist 2",
        songName: "Song 2",
        thumbnail: "thumbnail/song2.jpg",
        audio: "songs/song2.mp3"
    },
    {
        artist: "Artist 3",
        songName: "Song 3",
        thumbnail: "thumbnail/song3.jpg",
        audio: "songs/song3.mp3"
    }
    ,
    {
        artist: "Artist 4",
        songName: "Song 4",
        thumbnail: "thumbnail/song4.jpg",
        audio: "songs/song4.mp3"
    }
];

var currentSongIndex = 0;
var shuffleMode = false;
var shuffledSongIndexes = [];
var isPlaying = false;

var audioPlayer = document.getElementById("audioPlayer");
var songThumbnail = document.getElementById("songThumbnail");
var shuffleButton = document.getElementById("shuffleButton");

function updateSongInfo() {
    var currentSong = songs[currentSongIndex];
    document.getElementById("artistName").textContent = currentSong.artist;
    document.getElementById("songName").textContent = currentSong.songName;
    songThumbnail.src = currentSong.thumbnail;
    audioPlayer.src = currentSong.audio;
    audioPlayer.load(); // Load the new audio
}

function loadInitialSong() {
    updateSongInfo();
}

function togglePlay() {
    if (isPlaying) {
        audioPlayer.pause();
    } else {
        audioPlayer.play();
    }
    isPlaying = !isPlaying;
}
audioPlayer.addEventListener("ended", function () {
    nextSong();
    togglePlay(); // Start playing the next song automatically
});
function nextSong() {
    if (shuffleMode) {
        if (shuffledSongIndexes.length === 0) {
            shuffledSongIndexes = shuffleArray([...Array(songs.length).keys()]);
        }

        if (shuffledSongIndexes[shuffledSongIndexes.length - 1] === currentSongIndex) {
            shuffledSongIndexes.pop();
        }

        currentSongIndex = shuffledSongIndexes.pop();
    } else {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
    }

    isPlaying = false;
    updateSongInfo();
    updateShuffleButtonUI();
}

function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    isPlaying = false;
    updateSongInfo();
    updateShuffleButtonUI();
}

function toggleShuffle() {
    shuffleMode = !shuffleMode;
    updateShuffleButtonUI();
}

function updateShuffleButtonUI() {
    if (shuffleMode) {
        shuffleButton.classList.remove("shuffle-off");
        shuffleButton.classList.add("shuffle-on");
    } else {
        shuffleButton.classList.remove("shuffle-on");
        shuffleButton.classList.add("shuffle-off");
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
// JavaScript
var seekBar = document.getElementById("seekBar");

seekBar.addEventListener("change", function () {
    var time = audioPlayer.duration * (seekBar.value / 100);
    audioPlayer.currentTime = time;
});

audioPlayer.addEventListener("timeupdate", function () {
    var value = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    seekBar.value = value;
});

updateSongInfo();


document.addEventListener('DOMContentLoaded', function () {
    const playlist = [
        { name: 'Song 1', artist: 'Artist 1', url: '/music163api/song/media/outer/url?id=447925558.mp3', albumArt: 'https://ts2.cn.mm.bing.net/th?id=OIP-C.ifPqGP9X7_HVoLeWChTD4QHaHa&rs=1&pid=ImgDetMain' },
        { name: 'Song 2', artist: 'Artist 2', url: '/music163api/song/media/outer/url?id=447925559.mp3', albumArt: 'https://ts2.cn.mm.bing.net/th?id=OIP-C.ifPqGP9X7_HVoLeWChTD4QHaHa&rs=1&pid=ImgDetMain' },
        { name: 'Song 3', artist: 'Artist 3', url: '/music163api/song/media/outer/url?id=447925560.mp3', albumArt: 'https://ts2.cn.mm.bing.net/th?id=OIP-C.ifPqGP9X7_HVoLeWChTD4QHaHa&rs=1&pid=ImgDetMain' },
    ];

    let selectedTrack = playlist[0];
    let audio = new Audio(selectedTrack.url);
    let isPlaying = false;
    let playMode = 'list';
    let volume = 1;
    let currentTime = 0;
    let totalDuration = 0;
    let updateTimeInterval;

    // Elements
    const songName = document.getElementById('songName');
    const artistName = document.getElementById('artistName');
    const albumArt = document.getElementById('albumArt');
    const volumeSlider = document.getElementById('volumeSlider');
    const playPauseButton = document.getElementById('playPauseButton');
    const playPauseIcon = document.getElementById('playPauseIcon');
    const progressBar = document.getElementById('progressBar');
    const currentTimeDisplay = document.getElementById('currentTime');
    const totalTimeDisplay = document.getElementById('totalTime');
    const loopButton = document.getElementById('loopButton');
    const loopIcon = document.getElementById('loopIcon');
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');

    function loadTrack() {
        songName.textContent = selectedTrack.name;
        artistName.textContent = selectedTrack.artist;
        albumArt.src = selectedTrack.albumArt;
        audio.src = selectedTrack.url;
        audio.load();
    }

    function playTrack() {
        audio.play();
        isPlaying = true;
        playPauseIcon.classList.replace('fa-play', 'fa-pause');
        updateTimeInterval = setInterval(updateCurrentTime, 100);
    }

    function pauseTrack() {
        audio.pause();
        isPlaying = false;
        playPauseIcon.classList.replace('fa-pause', 'fa-play');
        clearInterval(updateTimeInterval);
    }

    function updateCurrentTime() {
        currentTime = audio.currentTime;
        currentTimeDisplay.textContent = formatTime(currentTime);
        progressBar.value = currentTime;
    }

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    function setVolume() {
        audio.volume = volumeSlider.value;
    }

    function togglePlayPause() {
        if (isPlaying) {
            pauseTrack();
        } else {
            playTrack();
        }
    }

    function nextTrack() {
        let currentIndex = playlist.indexOf(selectedTrack);
        let nextIndex = (currentIndex + 1) % playlist.length;
        selectedTrack = playlist[nextIndex];
        loadTrack();
        playTrack();
    }

    function prevTrack() {
        let currentIndex = playlist.indexOf(selectedTrack);
        let prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
        selectedTrack = playlist[prevIndex];
        loadTrack();
        playTrack();
    }

    function togglePlayMode() {
        if (playMode === 'list') {
            playMode = 'single';
            loopIcon.className = 'fas fa-sync-alt';
        } else if (playMode === 'single') {
            playMode = 'random';
            loopIcon.className = 'fas fa-random';
        } else {
            playMode = 'list';
            loopIcon.className = 'fas fa-sort-amount-down-alt';
        }
    }

    // Event Listeners
    volumeSlider.addEventListener('input', setVolume);
    playPauseButton.addEventListener('click', togglePlayPause);
    nextButton.addEventListener('click', nextTrack);
    prevButton.addEventListener('click', prevTrack);
    loopButton.addEventListener('click', togglePlayMode);

    loadTrack();
});

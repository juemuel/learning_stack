// 移除这行：import { h5AudioController } from './h5AudioController.js';

// 创建音乐播放器控制器
document.addEventListener('DOMContentLoaded', function () {
    const audioController = new h5AudioController();

    // 播放列表数据
    const playlist = [
        { name: 'Song 1', artist: 'Artist 1', url: 'http://music.163.com/song/media/outer/url?id=447925558.mp3', albumArt: 'https://ts2.cn.mm.bing.net/th?id=OIP-C.ifPqGP9X7_HVoLeWChTD4QHaHa&rs=1&pid=ImgDetMain' },
        { name: 'Song 2', artist: 'Artist 2', url: 'http://music.163.com/song/media/outer/url?id=447925559.mp3', albumArt: 'https://ts2.cn.mm.bing.net/th?id=OIP-C.ifPqGP9X7_HVoLeWChTD4QHaHa&rs=1&pid=ImgDetMain' },
        { name: 'Song 3', artist: 'Artist 3', url: 'http://music.163.com/song/media/outer/url?id=447925560.mp3', albumArt: 'https://ts2.cn.mm.bing.net/th?id=OIP-C.ifPqGP9X7_HVoLeWChTD4QHaHa&rs=1&pid=ImgDetMain' },
    ];

    let selectedTrack = playlist[0];
    let isPlaying = false;
    let isPaused = false;
    let playMode = 'list';
    let currentTime = 0;
    let totalDuration = 0;
    let updateTimeInterval;

    // DOM元素
    const songName = document.getElementById('songName');
    const artistName = document.getElementById('artistName');
    const albumArt = document.getElementById('albumArt');
    const volumeSlider = document.getElementById('volumeSlider');
    const playPauseButton = document.getElementById('playPauseButton');
    const progressBar = document.getElementById('progressBar');
    const currentTimeDisplay = document.getElementById('currentTime');
    const totalTimeDisplay = document.getElementById('totalTime');
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    const loopButton = document.getElementById('loopButton');

    function loadTrack() {
        songName.textContent = selectedTrack.name;
        artistName.textContent = selectedTrack.artist;
        albumArt.src = selectedTrack.albumArt;
        
        // 先初始化 AudioContext，然后加载音频文件
        audioController.initAudioContext();
        audioController.loadAudioFile(selectedTrack).then(() => {
            totalDuration = audioController.getTotalDuration();
            totalTimeDisplay.textContent = formatTime(totalDuration);
            // 设置进度条的最大值
            progressBar.max = totalDuration;
        }).catch(error => {
            console.error('Failed to load track:', error);
            alert('无法加载音频文件，请检查网络连接或音频URL');
        });
    }

    function playTrack() {
        // 确保 AudioContext 已初始化
        if (!audioController.context) {
            audioController.initAudioContext();
        }
        
        // 如果是暂停状态，则恢复播放
        if (isPaused) {
            audioController.resumeSound();
        } else {
            audioController.playSound();
        }
        
        isPlaying = true;
        isPaused = false;
        playPauseButton.textContent = 'Pause';
        updateTimeInterval = setInterval(updateCurrentTime, 100);
    }

    function pauseTrack() {
        audioController.pauseSound();
        isPlaying = false;
        isPaused = true;
        playPauseButton.textContent = 'Play';
        clearInterval(updateTimeInterval);
    }

    function stopTrack() {
        audioController.stopSound();
        isPlaying = false;
        isPaused = false;
        currentTime = 0;
        if (updateTimeInterval) {
            clearInterval(updateTimeInterval);
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
        } else if (playMode === 'single') {
            playMode = 'random';
        } else {
            playMode = 'list';
        }
        audioController.setPlayMode(playMode);
    }

    function updateCurrentTime() {
        currentTime = audioController.getCurrentTime();
        currentTimeDisplay.textContent = formatTime(currentTime);
        progressBar.value = currentTime;
    }

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    function seekTo(event) {
        const target = event.target;
        const seekTime = parseFloat(target.value);
        audioController.seekTo(seekTime);
        currentTimeDisplay.textContent = formatTime(seekTime);
    }

    // Event Listeners
    playPauseButton.addEventListener('click', () => {
        if (isPlaying) {
            pauseTrack();
        } else {
            playTrack();
        }
    });

    nextButton.addEventListener('click', nextTrack);
    prevButton.addEventListener('click', prevTrack);
    loopButton.addEventListener('click', togglePlayMode);
    volumeSlider.addEventListener('input', () => {
        audioController.setVolume(volumeSlider.value);
    });

    progressBar.addEventListener('input', seekTo);

    // Initialize
    loadTrack();
});
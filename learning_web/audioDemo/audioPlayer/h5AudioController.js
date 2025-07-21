// 移除export，改为全局变量
class h5AudioController {
    constructor() {
      this.context = null;
      this.source = null;
      this.audioBuffer = null;
      this.gainNode = null;
      this.isLooping = true;
      this.isPaused = false;
      this.startTime = 0;
      this.pauseTime = 0;
    }
  
    initAudioContext() {
      if (!this.context) {
        const AudioContext = window.AudioContext ||
          window.webkitAudioContext ||
          window.mozAudioContext ||
          window.msAudioContext;
        if (!AudioContext) {
          throw new Error('AudioContext not supported in this browser');
        }
        this.context = new AudioContext();
        this.gainNode = this.context.createGain();
        this.gainNode.connect(this.context.destination);
        console.log("AudioContext initialized.");
      }
    }
  
    async loadAudioFile(track) {
      console.log('Loading audio file:', track.url);
      try {
        const response = await fetch(track.url);
        if (!response.ok) {
          throw new Error(`Failed to fetch audio file: ${response.statusText}`);
        }
        const arrayBuffer = await response.arrayBuffer();
        await this.initSound(arrayBuffer);
      } catch (e) {
        console.error('Error loading audio file:', e);
      }
    }
  
    async initSound(arrayBuffer) {
      if (!this.context) {
        console.error('AudioContext not initialized');
        return;
      }
      try {
        this.audioBuffer = await this.context.decodeAudioData(arrayBuffer);
        console.log("Audio file decoded successfully.");
      } catch (e) {
        console.error('Error decoding audio data:', e);
      }
    }
  
    playSound(offset = 0) {
      console.log(`Playing sound from offset: ${offset}`);
      if (!this.context || !this.gainNode || !this.audioBuffer) {
        console.error('AudioContext, GainNode, or AudioBuffer not initialized');
        return;
      }
  
      if (this.source) {
        this.source.stop(0);
        this.source.disconnect();
      }
  
      this.source = this.context.createBufferSource();
      this.source.buffer = this.audioBuffer;
      this.source.loop = this.isLooping;
      this.source.connect(this.gainNode);
  
      this.source.start(0, offset);
      this.startTime = this.context.currentTime - offset;
  
      this.source.onended = () => {
        if (!this.isPaused) {
          this.source = null;
          this.isPaused = false;
          this.pauseTime = 0;
          console.log('Playback finished.');
        }
      };
    }
  
    pauseSound() {
      console.log('Pausing sound...');
      if (this.source && !this.isPaused) {
        this.pauseTime = this.getCurrentTime();
        console.log(`Pausing at time: ${this.pauseTime}`);
        this.source.onended = null;
        this.source.stop(0);
        this.source.disconnect();
        this.source = null;
        this.isPaused = true;
      }
    }
  
    resumeSound() {
      console.log('Resuming sound...');
      if (this.isPaused) {
        const offset = this.pauseTime % (this.audioBuffer?.duration || 0);
        this.playSound(offset);
        this.isPaused = false;
      }
    }
  
    stopSound() {
      console.log('Stopping sound...');
      if (this.source) {
        this.source.onended = null;
        this.source.stop(0);
        this.source.disconnect();
        this.source = null;
      }
      this.isPaused = false;
      this.pauseTime = 0;
    }
  
    setLooping(looping) {
      console.log(`Setting looping to: ${looping}`);
      this.isLooping = looping;
      if (this.source) {
        this.source.loop = looping;
      }
    }
  
    setVolume(volume) {
      console.log(`Setting volume to: ${volume}`);
      if (!this.gainNode) {
        console.error('GainNode not initialized');
        return;
      }
      if (volume < 0 || volume > 1) {
        console.error('Volume must be between 0 and 1');
        return;
      }
      this.gainNode.gain.value = volume;
    }
  
    getVolume() {
      if (!this.gainNode) {
        console.error('GainNode not initialized');
        return 0;
      }
      return this.gainNode.gain.value;
    }
  
    getCurrentTime() {
      if (this.isPaused) {
        return this.pauseTime;
      }
      if (!this.context || !this.audioBuffer) {
        return 0;
      }
      return this.context.currentTime - this.startTime;
    }
  
    getTotalDuration() {
      return this.audioBuffer ? this.audioBuffer.duration : 0;
    }
  
    seekTo(seekTime) {
      console.log(`Seeking to time: ${seekTime}`);
      if (!this.context || !this.audioBuffer) {
        console.error('AudioContext or AudioBuffer not initialized');
        return;
      }
      if (this.source) {
        this.source.stop(0);
        this.source.disconnect();
        this.source = null;
      }
  
      this.source = this.context.createBufferSource();
      this.source.buffer = this.audioBuffer;
      this.source.loop = this.isLooping;
      this.source.connect(this.gainNode);
      this.source.start(0, seekTime);
      this.startTime = this.context.currentTime - seekTime;
      this.pauseTime = seekTime;
      this.isPaused = false;
    }
  
    setPlayMode(mode) {
      // 添加播放模式设置逻辑
      console.log(`Setting play mode to: ${mode}`);
    }
  }
  
  // 将类暴露到全局
  window.h5AudioController = h5AudioController;
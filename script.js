/**
 * AuraStream Music Player — Core Application Engine
 * Includes Web Audio API Visualizer & EQ, Playlist Management, Drag & Drop Upload,
 * Synchronized Lyrics, Favorites, Keyboard Shortcuts, and MediaSession API.
 */

// ==========================================================================
// 1. Initial State & Data Definitions
// ==========================================================================

const INITIAL_TRACKS = [
  {
    id: "track-1",
    name: "Tum Ho",
    artist: "Mohit Chauhan, A.R. Rahman",
    album: "Rockstar",
    genre: "Bollywood • Acoustic",
    img: "images/img1.jpg",
    music: "music/song1.mp3",
    isCustom: false,
    duration: 318,
    accentColors: ["#6366f1", "#ec4899", "#8b5cf6"],
    lyrics: [
      { time: 0, text: "🎵 (Acoustic Guitar Intro)" },
      { time: 15, text: "Tum ho... tum ho paas mere" },
      { time: 27, text: "Saath mere ho tum yun..." },
      { time: 38, text: "Jitna mehsoos karoon tumko" },
      { time: 49, text: "Utna hi paa bhi loon..." },
      { time: 61, text: "Tum ho mere liye, mere liye ho tum yun" },
      { time: 75, text: "Khud ko main haar gaya, tumko paa ke" },
      { time: 89, text: "Kahin aisi jagah pe le chal mujhe" },
      { time: 104, text: "Jahan ho bas pyaar hi pyaar..." },
      { time: 120, text: "Tum ho... tum ho paas mere" },
      { time: 135, text: "Saath mere ho tum yun..." },
      { time: 150, text: "🎵 (Instrumental Interlude)" },
      { time: 175, text: "Kis tarah se shukrana tera ada karoon" },
      { time: 195, text: "Har lamha teri chahat mein fana karoon..." },
      { time: 215, text: "Tum ho... mere paas..." }
    ]
  },
  {
    id: "track-2",
    name: "Banjara",
    artist: "Mohammed Irfan",
    album: "Ek Villain",
    genre: "Soulful • Ballad",
    img: "images/img2.jpg",
    music: "music/song2.mp3",
    isCustom: false,
    duration: 336,
    accentColors: ["#06b6d4", "#3b82f6", "#1d4ed8"],
    lyrics: [
      { time: 0, text: "🎵 (Melodic Strings Intro)" },
      { time: 14, text: "Jise zindagi dhoondh rahi hai" },
      { time: 26, text: "Kya ye woh makaam mera hai..." },
      { time: 39, text: "Yahan chain se bas ruk jaaun" },
      { time: 51, text: "Kyun dil ye mujhe kehta hai..." },
      { time: 64, text: "Jazbaat naye se mile hain" },
      { time: 76, text: "Jaane kya asar ye hua hai..." },
      { time: 89, text: "Ik aawara banjara hoon main" },
      { time: 102, text: "Mili mujhe manzil yahan..." },
      { time: 120, text: "🎵 (Whistle & Violin Solo)" },
      { time: 142, text: "Pehle kahan aisi thi khushi" },
      { time: 155, text: "Jee utha hoon jabse tu mili..." },
      { time: 172, text: "Banjara... ko ghar mil gaya..." }
    ]
  },
  {
    id: "track-3",
    name: "O Sajni Re",
    artist: "Arijit Singh",
    album: "Laapataa Ladies",
    genre: "Acoustic • Romantic",
    img: "images/img3.jpg",
    music: "music/song3.mp3",
    isCustom: false,
    duration: 170,
    accentColors: ["#f59e0b", "#ef4444", "#dc2626"],
    lyrics: [
      { time: 0, text: "🎵 (Harmonium & Sitar Intro)" },
      { time: 12, text: "O sajni re... kaise kate din raat" },
      { time: 25, text: "Kaise ho tumse baat..." },
      { time: 38, text: "Naino mein rehti hai teri hi tasveer" },
      { time: 50, text: "Likhi jo kismat mein tu meri taqdeer..." },
      { time: 64, text: "O sajni re... lauta de mera chain" },
      { time: 78, text: "Tadpe hain dono naine..." },
      { time: 92, text: "Kaise bataun kitna satati hai teri yaad" },
      { time: 108, text: "Har pal maangi bas teri hi fariyaad..." },
      { time: 125, text: "O sajni re... o sajni re..." }
    ]
  },
  {
    id: "track-4",
    name: "Husn",
    artist: "Anuv Jain",
    album: "Husn - Single",
    genre: "Indie Pop • Acoustic",
    img: "images/img4.jpg",
    music: "music/song4.mp3",
    isCustom: false,
    duration: 218,
    accentColors: ["#10b981", "#059669", "#047857"],
    lyrics: [
      { time: 0, text: "🎵 (Fingerstyle Guitar Solo)" },
      { time: 11, text: "Dekho dekho kaisi baatein yahan ki" },
      { time: 23, text: "Baatein to thi badi ajeeb si..." },
      { time: 36, text: "Husn tera taaron jaisa" },
      { time: 48, text: "Kyun khone laga hai andhere mein..." },
      { time: 61, text: "Haan main to yahan tha bas tere liye" },
      { time: 74, text: "Tu dhoondhti thi kisi aur ko..." },
      { time: 88, text: "Kaise samjhaun tujhe dil ki baat" },
      { time: 103, text: "Kyun thaame baitha hoon tera hi haath..." },
      { time: 120, text: "🎵 (Acoustic Refrain)" },
      { time: 138, text: "Husn tera... aahista aahista..." },
      { time: 155, text: "Kyun chup sa baitha hai yahan..." }
    ]
  }
];

// App State
const state = {
  playlist: [...INITIAL_TRACKS],
  currentTrackIndex: 0,
  isPlaying: false,
  isShuffle: false,
  repeatMode: "off", // "off" | "all" | "one"
  playbackRate: 1.0,
  volume: 0.85,
  isMuted: false,
  previousVolume: 0.85,
  favorites: JSON.parse(localStorage.getItem("aurastream_favorites") || "[]"),
  currentFilter: "all",
  searchQuery: "",
  activeTab: "queueTab",
  visualizerMode: "bars", // "bars" | "wave" | "glow"
  lyricsFontSize: 1.1,
  lyricsAutoScroll: true,
  sleepTimer: null,
  sleepTimerRemaining: 0,
  audioContextReady: false
};

// ==========================================================================
// 2. DOM Element Selectors
// ==========================================================================

// Audio Core
const audio = new Audio();
audio.preload = "metadata";

// Player UI Elements
const ambientBg = document.getElementById("ambientBg");
const vinylSleeve = document.getElementById("vinylSleeve");
const trackArt = document.getElementById("trackArt");
const vinylLabel = document.getElementById("vinylLabel");
const artGlow = document.getElementById("artGlow");
const trackTitle = document.getElementById("trackTitle");
const trackArtist = document.getElementById("trackArtist");
const trackTags = document.getElementById("trackTags");
const trackIndexBadge = document.getElementById("trackIndexBadge");
const qualityBadge = document.getElementById("qualityBadge");
const likeTrackBtn = document.getElementById("likeTrackBtn");

// Controls
const playPauseBtn = document.getElementById("playPauseBtn");
const playPauseIcon = document.getElementById("playPauseIcon");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const shuffleBtn = document.getElementById("shuffleBtn");
const repeatBtn = document.getElementById("repeatBtn");
const repeatIcon = document.getElementById("repeatIcon");
const repeatIndicator = document.getElementById("repeatIndicator");

// Progress & Time
const progressBarContainer = document.getElementById("progressBarContainer");
const seekSlider = document.getElementById("seekSlider");
const progressFill = document.getElementById("progressFill");
const progressBuffered = document.getElementById("progressBuffered");
const progressTooltip = document.getElementById("progressTooltip");
const currentTimeEl = document.getElementById("currentTime");
const totalDurationEl = document.getElementById("totalDuration");

// Aux Controls
const speedBtn = document.getElementById("speedBtn");
const speedValue = document.getElementById("speedValue");
const speedMenu = document.getElementById("speedMenu");
const volumeSlider = document.getElementById("volumeSlider");
const volumeFill = document.getElementById("volumeFill");
const volumeIcon = document.getElementById("volumeIcon");
const muteBtn = document.getElementById("muteBtn");
const volumePercent = document.getElementById("volumePercent");

// Visualizer Canvas
const visualizerCanvas = document.getElementById("visualizerCanvas");
const visCtx = visualizerCanvas.getContext("2d");
const visModeBtns = document.querySelectorAll(".vis-mode-btn");

// Workspace Tabs & Panels
const tabBtns = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");
const trackListEl = document.getElementById("trackList");
const queueCountBadge = document.getElementById("queueCountBadge");
const likedCountEl = document.getElementById("likedCount");
const filterPills = document.querySelectorAll(".filter-pill");
const shuffleAllBtn = document.getElementById("shuffleAllBtn");
const clearUploadedBtn = document.getElementById("clearUploadedBtn");
const uploadDropzone = document.getElementById("uploadDropzone");
const audioFileInput = document.getElementById("audioFileInput");
const searchInput = document.getElementById("searchInput");
const clearSearchBtn = document.getElementById("clearSearchBtn");

// Lyrics UI
const lyricsContainer = document.getElementById("lyricsContainer");
const lyricsSongTitle = document.getElementById("lyricsSongTitle");
const lyricsArtistName = document.getElementById("lyricsArtistName");
const lyricsFontDecr = document.getElementById("lyricsFontDecr");
const lyricsFontIncr = document.getElementById("lyricsFontIncr");
const lyricsAutoScrollToggle = document.getElementById("lyricsAutoScrollToggle");

// EQ Sliders & FX
const eqPresets = document.querySelectorAll(".eq-preset-btn");
const eqSliders = {
  band60: document.getElementById("eqBand60"),
  band250: document.getElementById("eqBand250"),
  band1k: document.getElementById("eqBand1k"),
  band4k: document.getElementById("eqBand4k"),
  band16k: document.getElementById("eqBand16k")
};
const eqValues = {
  band60: document.getElementById("val60"),
  band250: document.getElementById("val250"),
  band1k: document.getElementById("val1k"),
  band4k: document.getElementById("val4k"),
  band16k: document.getElementById("val16k")
};
const eqResetBtn = document.getElementById("eqResetBtn");
const bassBoostCheckbox = document.getElementById("bassBoostCheckbox");
const surroundCheckbox = document.getElementById("surroundCheckbox");

// Modals & Overlays
const sleepTimerBtn = document.getElementById("sleepTimerBtn");
const sleepTimerBadge = document.getElementById("sleepTimerBadge");
const sleepTimerModal = document.getElementById("sleepTimerModal");
const closeSleepTimerModal = document.getElementById("closeSleepTimerModal");
const timerPresetBtns = document.querySelectorAll(".timer-preset-btn");

const shortcutsBtn = document.getElementById("shortcutsBtn");
const shortcutsModal = document.getElementById("shortcutsModal");
const closeShortcutsModal = document.getElementById("closeShortcutsModal");

const dragDropOverlay = document.getElementById("dragDropOverlay");
const toastContainer = document.getElementById("toastContainer");
const themeToggleBtn = document.getElementById("themeToggleBtn");

// ==========================================================================
// 3. Web Audio API Setup (Visualizer & Equalizer)
// ==========================================================================

let audioCtx = null;
let audioSource = null;
let analyser = null;
let biquadFilters = {};
let bassBoostNode = null;
let dataArray = null;
let bufferLength = 0;

function initWebAudio() {
  if (state.audioContextReady) return;

  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContextClass();

    // Create Equalizer Filters
    biquadFilters.band60 = audioCtx.createBiquadFilter();
    biquadFilters.band60.type = "lowshelf";
    biquadFilters.band60.frequency.value = 60;

    biquadFilters.band250 = audioCtx.createBiquadFilter();
    biquadFilters.band250.type = "peaking";
    biquadFilters.band250.frequency.value = 250;
    biquadFilters.band250.Q.value = 1.0;

    biquadFilters.band1k = audioCtx.createBiquadFilter();
    biquadFilters.band1k.type = "peaking";
    biquadFilters.band1k.frequency.value = 1000;
    biquadFilters.band1k.Q.value = 1.0;

    biquadFilters.band4k = audioCtx.createBiquadFilter();
    biquadFilters.band4k.type = "peaking";
    biquadFilters.band4k.frequency.value = 4000;
    biquadFilters.band4k.Q.value = 1.0;

    biquadFilters.band16k = audioCtx.createBiquadFilter();
    biquadFilters.band16k.type = "highshelf";
    biquadFilters.band16k.frequency.value = 16000;

    // Bass Maximizer Filter
    bassBoostNode = audioCtx.createBiquadFilter();
    bassBoostNode.type = "lowshelf";
    bassBoostNode.frequency.value = 100;
    bassBoostNode.gain.value = 0;

    // Analyser Node for Visualizer
    analyser = audioCtx.createAnalyser();
    analyser.fftSize = 128;
    analyser.smoothingTimeConstant = 0.82;
    bufferLength = analyser.frequencyBinCount;
    dataArray = new Uint8Array(bufferLength);

    // Audio Graph Connection:
    // audio -> 60 -> 250 -> 1k -> 4k -> 16k -> bassBoost -> analyser -> destination
    audioSource = audioCtx.createMediaElementSource(audio);
    audioSource.connect(biquadFilters.band60);
    biquadFilters.band60.connect(biquadFilters.band250);
    biquadFilters.band250.connect(biquadFilters.band1k);
    biquadFilters.band1k.connect(biquadFilters.band4k);
    biquadFilters.band4k.connect(biquadFilters.band16k);
    biquadFilters.band16k.connect(bassBoostNode);
    bassBoostNode.connect(analyser);
    analyser.connect(audioCtx.destination);

    state.audioContextReady = true;
    startVisualizerLoop();
  } catch (err) {
    console.warn("Web Audio API initialization notice:", err);
  }
}

// Ensure AudioContext is resumed on user interaction
function resumeAudioContext() {
  if (!state.audioContextReady) {
    initWebAudio();
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume();
  }
}

// Visualizer Canvas Render Loop
function startVisualizerLoop() {
  function render() {
    requestAnimationFrame(render);
    const width = visualizerCanvas.width;
    const height = visualizerCanvas.height;

    visCtx.clearRect(0, 0, width, height);

    if (!analyser || !state.isPlaying) {
      // Draw Idle Visualizer Wave
      drawIdleWave(width, height);
      return;
    }

    analyser.getByteFrequencyData(dataArray);

    if (state.visualizerMode === "bars") {
      drawFrequencyBars(width, height);
    } else if (state.visualizerMode === "wave") {
      drawSmoothWave(width, height);
    } else if (state.visualizerMode === "glow") {
      drawBassPulse(width, height);
    }
  }
  render();
}

function drawIdleWave(width, height) {
  const bars = 36;
  const barWidth = width / bars - 2;
  const currTime = Date.now() * 0.003;

  for (let i = 0; i < bars; i++) {
    const barHeight = Math.sin(currTime + i * 0.25) * 4 + 6;
    const x = i * (barWidth + 2);
    const y = height / 2 - barHeight / 2;

    visCtx.fillStyle = "rgba(255, 255, 255, 0.12)";
    visCtx.beginPath();
    visCtx.roundRect(x, y, barWidth, barHeight, 3);
    visCtx.fill();
  }
}

function drawFrequencyBars(width, height) {
  const bars = Math.min(bufferLength, 32);
  const barWidth = width / bars - 3;
  const gradient = visCtx.createLinearGradient(0, height, 0, 0);
  gradient.addColorStop(0, "rgba(99, 102, 241, 0.3)");
  gradient.addColorStop(0.5, "rgba(236, 72, 153, 0.85)");
  gradient.addColorStop(1, "rgba(6, 182, 212, 1)");

  for (let i = 0; i < bars; i++) {
    const value = dataArray[i];
    const percent = value / 255;
    const barHeight = Math.max(percent * (height - 8), 4);
    const x = i * (barWidth + 3);
    const y = height - barHeight;

    // Glowing main bar
    visCtx.fillStyle = gradient;
    visCtx.beginPath();
    visCtx.roundRect(x, y, barWidth, barHeight, [4, 4, 0, 0]);
    visCtx.fill();

    // Floating peak cap
    visCtx.fillStyle = "#ffffff";
    visCtx.fillRect(x, Math.max(y - 3, 0), barWidth, 2);
  }
}

function drawSmoothWave(width, height) {
  visCtx.beginPath();
  visCtx.lineWidth = 3;
  visCtx.strokeStyle = "#ec4899";
  visCtx.shadowBlur = 14;
  visCtx.shadowColor = "#ec4899";

  const sliceWidth = width / bufferLength;
  let x = 0;

  for (let i = 0; i < bufferLength; i++) {
    const v = dataArray[i] / 128.0;
    const y = (v * height) / 2.5 + height / 5;

    if (i === 0) {
      visCtx.moveTo(x, y);
    } else {
      visCtx.lineTo(x, y);
    }
    x += sliceWidth;
  }

  visCtx.lineTo(width, height / 2);
  visCtx.stroke();
  visCtx.shadowBlur = 0;
}

function drawBassPulse(width, height) {
  let sum = 0;
  for (let i = 0; i < 8; i++) {
    sum += dataArray[i];
  }
  const avgBass = sum / 8;
  const radius = (avgBass / 255) * (height / 2.2) + 8;

  const gradient = visCtx.createRadialGradient(
    width / 2,
    height / 2,
    2,
    width / 2,
    height / 2,
    radius * 2
  );
  gradient.addColorStop(0, "rgba(236, 72, 153, 0.95)");
  gradient.addColorStop(0.4, "rgba(99, 102, 241, 0.6)");
  gradient.addColorStop(1, "transparent");

  visCtx.fillStyle = gradient;
  visCtx.beginPath();
  visCtx.arc(width / 2, height / 2, radius * 2, 0, Math.PI * 2);
  visCtx.fill();
}

// ==========================================================================
// 4. Equalizer Presets & Controls
// ==========================================================================

const EQ_PRESETS = {
  flat: { band60: 0, band250: 0, band1k: 0, band4k: 0, band16k: 0 },
  bass: { band60: 7.5, band250: 5, band1k: 0, band4k: -1, band16k: 1 },
  vocal: { band60: -2, band250: 1, band1k: 5.5, band4k: 4, band16k: -1 },
  treble: { band60: -2, band250: -1, band1k: 1, band4k: 6, band16k: 8 },
  electronic: { band60: 6, band250: 4, band1k: -1, band4k: 3, band16k: 6 },
  rock: { band60: 5, band250: 3, band1k: -1, band4k: 4, band16k: 5 },
  acoustic: { band60: 3, band250: 2, band1k: 3, band4k: 3, band16k: 4 }
};

function setEqBand(bandKey, gainVal) {
  if (biquadFilters[bandKey]) {
    biquadFilters[bandKey].gain.value = gainVal;
  }
  if (eqSliders[bandKey]) {
    eqSliders[bandKey].value = gainVal;
  }
  if (eqValues[bandKey]) {
    eqValues[bandKey].textContent = (gainVal > 0 ? "+" : "") + gainVal + " dB";
  }
}

function applyEqPreset(presetName) {
  const preset = EQ_PRESETS[presetName];
  if (!preset) return;

  resumeAudioContext();

  Object.keys(preset).forEach((bandKey) => {
    setEqBand(bandKey, preset[bandKey]);
  });

  eqPresets.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.preset === presetName);
  });

  showToast(`Equalizer Preset: ${presetName.toUpperCase()}`, "fa-sliders");
}

// Attach Slider Listeners
Object.keys(eqSliders).forEach((bandKey) => {
  const slider = eqSliders[bandKey];
  slider.addEventListener("input", (e) => {
    resumeAudioContext();
    const val = parseFloat(e.target.value);
    setEqBand(bandKey, val);

    // Remove active preset highlight on manual tweak
    eqPresets.forEach((b) => b.classList.remove("active"));
  });
});

eqPresets.forEach((btn) => {
  btn.addEventListener("click", () => applyEqPreset(btn.dataset.preset));
});

eqResetBtn.addEventListener("click", () => applyEqPreset("flat"));

bassBoostCheckbox.addEventListener("change", (e) => {
  resumeAudioContext();
  if (bassBoostNode) {
    bassBoostNode.gain.value = e.target.checked ? 8 : 0;
  }
  showToast(
    e.target.checked ? "Deep Bass Maximizer ON" : "Deep Bass Maximizer OFF",
    "fa-bolt"
  );
});

surroundCheckbox.addEventListener("change", (e) => {
  showToast(
    e.target.checked ? "Stereo Widener Enabled" : "Stereo Widener Disabled",
    "fa-headphones"
  );
});

// ==========================================================================
// 5. Track Management & Playback Logic
// ==========================================================================

function loadTrack(index, shouldPlay = false) {
  if (index < 0 || index >= state.playlist.length) return;

  state.currentTrackIndex = index;
  const track = state.playlist[index];

  // Set audio source
  audio.src = track.music;
  audio.playbackRate = state.playbackRate;
  audio.load();

  // Update Artwork & Metadata
  trackArt.style.backgroundImage = `url("${track.img}")`;
  vinylLabel.style.backgroundImage = `url("${track.img}")`;
  trackTitle.textContent = track.name;
  trackArtist.textContent = track.artist;

  // Update Tag Badges
  trackIndexBadge.innerHTML = `<i class="fa-solid fa-music"></i> Track ${
    index + 1
  } of ${state.playlist.length}`;
  qualityBadge.innerHTML = track.isCustom
    ? `<i class="fa-solid fa-file-audio"></i> User Audio`
    : `<i class="fa-solid fa-wave-square"></i> Hi-Fi 24-bit`;

  // Render Tags
  if (track.genre) {
    trackTags.innerHTML = track.genre
      .split("•")
      .map((g) => `<span class="pill">${g.trim()}</span>`)
      .join("");
  } else {
    trackTags.innerHTML = `<span class="pill">Custom</span>`;
  }

  // Update Liked Status
  updateLikeButtonUI();

  // Reset Progress Display
  currentTimeEl.textContent = "00:00";
  totalDurationEl.textContent = track.duration ? formatTime(track.duration) : "00:00";
  seekSlider.value = 0;
  progressFill.style.width = "0%";

  // Update Dynamic Ambient Colors
  updateDynamicColors(track);

  // Update Lyrics View
  renderLyrics(track);

  // Update Active Item in Playlist UI
  renderPlaylist();

  // Update OS MediaSession
  updateMediaSession(track);

  if (shouldPlay) {
    playTrack();
  }
}

function playTrack() {
  resumeAudioContext();
  audio
    .play()
    .then(() => {
      state.isPlaying = true;
      playPauseIcon.className = "fa-solid fa-pause";
      vinylSleeve.classList.add("playing");
      vinylSleeve.classList.remove("paused");
      renderPlaylist();
    })
    .catch((err) => {
      console.warn("Autoplay notice:", err);
    });
}

function pauseTrack() {
  audio.pause();
  state.isPlaying = false;
  playPauseIcon.className = "fa-solid fa-play";
  vinylSleeve.classList.remove("playing");
  vinylSleeve.classList.add("paused");
  renderPlaylist();
}

function togglePlayPause() {
  if (state.isPlaying) {
    pauseTrack();
  } else {
    playTrack();
  }
}

function nextTrack() {
  if (state.playlist.length === 0) return;

  if (state.isShuffle) {
    let nextIndex = Math.floor(Math.random() * state.playlist.length);
    if (state.playlist.length > 1 && nextIndex === state.currentTrackIndex) {
      nextIndex = (nextIndex + 1) % state.playlist.length;
    }
    loadTrack(nextIndex, true);
  } else if (state.currentTrackIndex < state.playlist.length - 1) {
    loadTrack(state.currentTrackIndex + 1, true);
  } else {
    // Loop back to start
    loadTrack(0, true);
  }
}

function prevTrack() {
  if (state.playlist.length === 0) return;

  // If track played > 3 seconds, replay track
  if (audio.currentTime > 3) {
    audio.currentTime = 0;
    return;
  }

  if (state.currentTrackIndex > 0) {
    loadTrack(state.currentTrackIndex - 1, true);
  } else {
    loadTrack(state.playlist.length - 1, true);
  }
}

// Repeat Mode Switcher (Off -> All -> One)
function toggleRepeatMode() {
  if (state.repeatMode === "off") {
    state.repeatMode = "all";
    repeatBtn.classList.add("active");
    repeatIcon.className = "fa-solid fa-repeat";
    repeatIndicator.textContent = "";
    showToast("Repeat All Tracks Enabled", "fa-repeat");
  } else if (state.repeatMode === "all") {
    state.repeatMode = "one";
    repeatBtn.classList.add("active");
    repeatIcon.className = "fa-solid fa-repeat";
    repeatIndicator.textContent = "1";
    showToast("Repeat Single Track Enabled", "fa-repeat");
  } else {
    state.repeatMode = "off";
    repeatBtn.classList.remove("active");
    repeatIndicator.textContent = "";
    showToast("Repeat Off", "fa-repeat");
  }
}

// Shuffle Mode Switcher
function toggleShuffleMode() {
  state.isShuffle = !state.isShuffle;
  shuffleBtn.classList.toggle("active", state.isShuffle);
  showToast(
    state.isShuffle ? "Shuffle Mode ON" : "Shuffle Mode OFF",
    "fa-shuffle"
  );
}

// Volume Controls
function updateVolume(val) {
  state.volume = Math.max(0, Math.min(1, val));
  audio.volume = state.volume;
  volumeSlider.value = state.volume * 100;
  volumeFill.style.width = `${state.volume * 100}%`;
  volumePercent.textContent = `${Math.round(state.volume * 100)}%`;

  if (state.volume === 0) {
    state.isMuted = true;
    volumeIcon.className = "fa-solid fa-volume-xmark";
  } else if (state.volume < 0.5) {
    state.isMuted = false;
    volumeIcon.className = "fa-solid fa-volume-low";
  } else {
    state.isMuted = false;
    volumeIcon.className = "fa-solid fa-volume-high";
  }
}

function toggleMute() {
  if (state.isMuted) {
    updateVolume(state.previousVolume || 0.85);
    state.isMuted = false;
    showToast("Unmuted", "fa-volume-high");
  } else {
    state.previousVolume = state.volume;
    updateVolume(0);
    state.isMuted = true;
    showToast("Muted", "fa-volume-xmark");
  }
}

// Playback Speed Controller
function setPlaybackSpeed(rate) {
  state.playbackRate = rate;
  audio.playbackRate = rate;
  speedValue.textContent = `${rate}x`;

  document.querySelectorAll(".speed-option").forEach((opt) => {
    opt.classList.toggle("active", parseFloat(opt.dataset.speed) === rate);
  });
  speedMenu.classList.remove("open");
  showToast(`Speed: ${rate}x`, "fa-gauge-high");
}

// ==========================================================================
// 6. Audio Progress & Seek Bar Engine
// ==========================================================================

audio.addEventListener("timeupdate", () => {
  if (!isNaN(audio.duration) && audio.duration > 0) {
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    seekSlider.value = progressPercent;
    progressFill.style.width = `${progressPercent}%`;

    currentTimeEl.textContent = formatTime(audio.currentTime);
    totalDurationEl.textContent = formatTime(audio.duration);

    // Synchronize Live Lyrics
    highlightLiveLyric(audio.currentTime);
  }
});

// Buffer Progress Calculation
audio.addEventListener("progress", () => {
  if (audio.buffered.length > 0 && audio.duration > 0) {
    const bufferedEnd = audio.buffered.end(audio.buffered.length - 1);
    const bufferedPercent = (bufferedEnd / audio.duration) * 100;
    progressBuffered.style.width = `${bufferedPercent}%`;
  }
});

// Track Ended Handler
audio.addEventListener("ended", () => {
  if (state.repeatMode === "one") {
    audio.currentTime = 0;
    playTrack();
  } else if (
    state.repeatMode === "off" &&
    state.currentTrackIndex === state.playlist.length - 1 &&
    !state.isShuffle
  ) {
    pauseTrack();
  } else {
    nextTrack();
  }
});

// Seek Input
seekSlider.addEventListener("input", (e) => {
  if (!isNaN(audio.duration) && audio.duration > 0) {
    const seekTime = (e.target.value / 100) * audio.duration;
    audio.currentTime = seekTime;
    progressFill.style.width = `${e.target.value}%`;
    currentTimeEl.textContent = formatTime(seekTime);
  }
});

// Hover Tooltip on Seekbar
progressBarContainer.addEventListener("mousemove", (e) => {
  if (isNaN(audio.duration) || audio.duration === 0) return;
  const rect = progressBarContainer.getBoundingClientRect();
  const offsetX = e.clientX - rect.left;
  const percent = Math.max(0, Math.min(1, offsetX / rect.width));
  const hoverTime = percent * audio.duration;

  progressTooltip.textContent = formatTime(hoverTime);
  progressTooltip.style.left = `${offsetX}px`;
});

// Format Seconds into MM:SS
function formatTime(secs) {
  if (isNaN(secs)) return "00:00";
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${m < 10 ? "0" + m : m}:${s < 10 ? "0" + s : s}`;
}

// ==========================================================================
// 7. Dynamic Ambient Palette Generator
// ==========================================================================

function updateDynamicColors(track) {
  let colors = track.accentColors;
  if (!colors || colors.length === 0) {
    colors = ["#6366f1", "#ec4899", "#06b6d4"];
  }

  ambientBg.style.background = `
    radial-gradient(circle at 30% 30%, ${colors[0]}44 0%, transparent 50%),
    radial-gradient(circle at 75% 40%, ${colors[1]}40 0%, transparent 45%),
    radial-gradient(circle at 50% 80%, ${colors[2] || colors[0]}35 0%, transparent 50%),
    #070a12
  `;

  artGlow.style.background = `radial-gradient(circle, ${colors[0]} 0%, transparent 70%)`;
}

// ==========================================================================
// 8. Playlist & Queue Rendering with Filters & Search
// ==========================================================================

function renderPlaylist() {
  const filtered = getFilteredTracks();
  trackListEl.innerHTML = "";

  queueCountBadge.textContent = state.playlist.length;
  likedCountEl.textContent = state.favorites.length;

  if (filtered.length === 0) {
    trackListEl.innerHTML = `
      <div class="lyrics-empty-state" style="padding: 40px 10px;">
        <i class="fa-solid fa-music-slash" style="font-size: 2rem; margin-bottom: 8px;"></i>
        <p>No tracks found in this category.</p>
      </div>
    `;
    return;
  }

  filtered.forEach((track) => {
    const originalIndex = state.playlist.findIndex((t) => t.id === track.id);
    const isActive = originalIndex === state.currentTrackIndex;
    const isLiked = isTrackLiked(track.id);

    const item = document.createElement("div");
    item.className = `track-item ${isActive ? "active" : ""}`;
    item.innerHTML = `
      <div class="track-left">
        <div class="track-index-col">
          <span class="track-index-number">${originalIndex + 1}</span>
          <div class="mini-equalizer">
            <span class="eq-bar"></span>
            <span class="eq-bar"></span>
            <span class="eq-bar"></span>
          </div>
        </div>
        <div class="track-thumb" style="background-image: url('${track.img}');"></div>
        <div class="track-details">
          <span class="item-title">${escapeHtml(track.name)}</span>
          <span class="item-artist">${escapeHtml(track.artist)}</span>
        </div>
      </div>
      <div class="track-right">
        <span class="item-duration">${track.duration ? formatTime(track.duration) : "--:--"}</span>
        <button class="item-like-btn ${isLiked ? "liked" : ""}" title="Like Track" data-id="${track.id}">
          <i class="${isLiked ? "fa-solid" : "fa-regular"} fa-heart"></i>
        </button>
        ${
          track.isCustom
            ? `<button class="item-delete-btn" title="Remove Track" data-id="${track.id}"><i class="fa-regular fa-trash-can"></i></button>`
            : ""
        }
      </div>
    `;

    // Click track to play
    item.addEventListener("click", (e) => {
      if (e.target.closest(".item-like-btn") || e.target.closest(".item-delete-btn")) return;
      loadTrack(originalIndex, true);
    });

    // Like Button Listener
    const likeBtn = item.querySelector(".item-like-btn");
    likeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleFavorite(track.id);
    });

    // Delete Custom Track Listener
    if (track.isCustom) {
      const deleteBtn = item.querySelector(".item-delete-btn");
      deleteBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        deleteCustomTrack(track.id);
      });
    }

    trackListEl.appendChild(item);
  });
}

function getFilteredTracks() {
  return state.playlist.filter((track) => {
    // Filter Tab Check
    if (state.currentFilter === "favorites" && !isTrackLiked(track.id)) return false;
    if (state.currentFilter === "custom" && !track.isCustom) return false;

    // Search Query Check
    if (state.searchQuery.trim() !== "") {
      const q = state.searchQuery.toLowerCase();
      const matchName = track.name.toLowerCase().includes(q);
      const matchArtist = track.artist.toLowerCase().includes(q);
      const matchAlbum = track.album && track.album.toLowerCase().includes(q);
      return matchName || matchArtist || matchAlbum;
    }
    return true;
  });
}

function isTrackLiked(id) {
  return state.favorites.includes(id);
}

function toggleFavorite(trackId) {
  if (isTrackLiked(trackId)) {
    state.favorites = state.favorites.filter((id) => id !== trackId);
    showToast("Removed from Liked Songs", "fa-heart-crack");
  } else {
    state.favorites.push(trackId);
    showToast("Added to Liked Songs", "fa-heart");
  }
  localStorage.setItem("aurastream_favorites", JSON.stringify(state.favorites));
  updateLikeButtonUI();
  renderPlaylist();
}

function updateLikeButtonUI() {
  const currentTrack = state.playlist[state.currentTrackIndex];
  if (!currentTrack) return;
  const isLiked = isTrackLiked(currentTrack.id);

  likeTrackBtn.classList.toggle("liked", isLiked);
  likeTrackBtn.innerHTML = `<i class="${isLiked ? "fa-solid" : "fa-regular"} fa-heart"></i>`;
}

function deleteCustomTrack(id) {
  const delIndex = state.playlist.findIndex((t) => t.id === id);
  if (delIndex === -1) return;

  state.playlist.splice(delIndex, 1);
  state.favorites = state.favorites.filter((favId) => favId !== id);
  localStorage.setItem("aurastream_favorites", JSON.stringify(state.favorites));

  if (delIndex === state.currentTrackIndex) {
    if (state.playlist.length > 0) {
      loadTrack(0, state.isPlaying);
    } else {
      audio.pause();
    }
  } else if (delIndex < state.currentTrackIndex) {
    state.currentTrackIndex--;
  }

  showToast("Track removed from queue", "fa-trash-can");
  renderPlaylist();
}

// Clear all uploaded custom tracks
clearUploadedBtn.addEventListener("click", () => {
  const customTracks = state.playlist.filter((t) => t.isCustom);
  if (customTracks.length === 0) {
    showToast("No uploaded tracks to clear", "fa-circle-info");
    return;
  }
  state.playlist = state.playlist.filter((t) => !t.isCustom);
  if (state.currentTrackIndex >= state.playlist.length) {
    state.currentTrackIndex = 0;
  }
  loadTrack(state.currentTrackIndex, state.isPlaying);
  showToast("Cleared uploaded tracks", "fa-trash-can");
});

// Shuffle All Tracks
shuffleAllBtn.addEventListener("click", () => {
  for (let i = state.playlist.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [state.playlist[i], state.playlist[j]] = [state.playlist[j], state.playlist[i]];
  }
  loadTrack(0, true);
  showToast("Playlist Shuffled", "fa-shuffle");
});

// Filter Pill Tabs
filterPills.forEach((pill) => {
  pill.addEventListener("click", () => {
    filterPills.forEach((p) => p.classList.remove("active"));
    pill.classList.add("active");
    state.currentFilter = pill.dataset.filter;
    renderPlaylist();
  });
});

// Search Filter
searchInput.addEventListener("input", (e) => {
  state.searchQuery = e.target.value;
  clearSearchBtn.style.display = state.searchQuery ? "block" : "none";
  renderPlaylist();
});

clearSearchBtn.addEventListener("click", () => {
  searchInput.value = "";
  state.searchQuery = "";
  clearSearchBtn.style.display = "none";
  renderPlaylist();
});

// ==========================================================================
// 9. Local Audio File Import (Drag & Drop & File Picker)
// ==========================================================================

function handleFiles(files) {
  if (!files || files.length === 0) return;

  let addedCount = 0;
  Array.from(files).forEach((file) => {
    if (!file.type.startsWith("audio/") && !file.name.match(/\.(mp3|wav|ogg|flac|aac|m4a)$/i)) {
      return;
    }

    const fileUrl = URL.createObjectURL(file);
    const fileNameClean = file.name.replace(/\.[^/.]+$/, "");
    let title = fileNameClean;
    let artist = "Local File";

    if (fileNameClean.includes(" - ")) {
      const parts = fileNameClean.split(" - ");
      artist = parts[0].trim();
      title = parts.slice(1).join(" - ").trim();
    }

    // Default gradient art placeholder
    const colors = ["#8b5cf6", "#ec4899", "#3b82f6"];
    const customArt = generatePlaceholderArt(title);

    const newTrack = {
      id: `custom-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      name: title,
      artist: artist,
      album: "Local Upload",
      genre: "Custom • Local Audio",
      img: customArt,
      music: fileUrl,
      isCustom: true,
      duration: 0,
      accentColors: colors,
      lyrics: [{ time: 0, text: "Lyrics not available for imported local file" }]
    };

    // Extract audio duration
    const tempAudio = new Audio(fileUrl);
    tempAudio.addEventListener("loadedmetadata", () => {
      newTrack.duration = tempAudio.duration;
      renderPlaylist();
    });

    state.playlist.push(newTrack);
    addedCount++;
  });

  if (addedCount > 0) {
    showToast(`Imported ${addedCount} song${addedCount > 1 ? "s" : ""} to queue!`, "fa-folder-plus");
    renderPlaylist();
    // If only had default tracks and nothing playing, switch to first uploaded track
    if (!state.isPlaying && state.playlist.length === INITIAL_TRACKS.length + addedCount) {
      loadTrack(INITIAL_TRACKS.length, true);
    }
  }
}

function generatePlaceholderArt(text) {
  const canvas = document.createElement("canvas");
  canvas.width = 300;
  canvas.height = 300;
  const ctx = canvas.getContext("2d");

  const gradient = ctx.createLinearGradient(0, 0, 300, 300);
  gradient.addColorStop(0, "#6366f1");
  gradient.addColorStop(1, "#ec4899");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 300, 300);

  ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
  ctx.font = "bold 24px Outfit, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(text.slice(0, 16), 150, 155);

  return canvas.toDataURL();
}

// File Picker Trigger
audioFileInput.addEventListener("change", (e) => {
  handleFiles(e.target.files);
  e.target.value = "";
});

uploadDropzone.addEventListener("click", () => audioFileInput.click());

// Full Page Drag & Drop
window.addEventListener("dragenter", (e) => {
  e.preventDefault();
  dragDropOverlay.classList.add("active");
});

window.addEventListener("dragover", (e) => {
  e.preventDefault();
});

dragDropOverlay.addEventListener("dragleave", (e) => {
  if (e.relatedTarget === null) {
    dragDropOverlay.classList.remove("active");
  }
});

dragDropOverlay.addEventListener("drop", (e) => {
  e.preventDefault();
  dragDropOverlay.classList.remove("active");
  if (e.dataTransfer && e.dataTransfer.files) {
    handleFiles(e.dataTransfer.files);
  }
});

// ==========================================================================
// 10. Synchronized Lyrics Engine
// ==========================================================================

function renderLyrics(track) {
  lyricsSongTitle.textContent = track.name;
  lyricsArtistName.textContent = track.artist;
  lyricsContainer.innerHTML = "";

  if (!track.lyrics || track.lyrics.length === 0) {
    lyricsContainer.innerHTML = `
      <div class="lyrics-empty-state">
        <i class="fa-solid fa-align-left" style="font-size: 2rem; margin-bottom: 10px;"></i>
        <p>No lyrics found for this track.</p>
      </div>
    `;
    return;
  }

  track.lyrics.forEach((line, i) => {
    const el = document.createElement("div");
    el.className = "lyric-line";
    el.dataset.time = line.time;
    el.dataset.index = i;
    el.textContent = line.text;
    el.style.fontSize = `${state.lyricsFontSize}rem`;

    // Click lyric line to seek
    el.addEventListener("click", () => {
      audio.currentTime = line.time;
      playTrack();
    });

    lyricsContainer.appendChild(el);
  });
}

function highlightLiveLyric(currentTime) {
  const lines = lyricsContainer.querySelectorAll(".lyric-line");
  if (lines.length === 0) return;

  let activeIndex = -1;
  const track = state.playlist[state.currentTrackIndex];
  if (!track || !track.lyrics) return;

  for (let i = 0; i < track.lyrics.length; i++) {
    if (currentTime >= track.lyrics[i].time) {
      activeIndex = i;
    } else {
      break;
    }
  }

  lines.forEach((el, index) => {
    const isActive = index === activeIndex;
    el.classList.toggle("active", isActive);

    if (isActive && state.lyricsAutoScroll) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  });
}

lyricsFontIncr.addEventListener("click", () => {
  if (state.lyricsFontSize < 2.0) {
    state.lyricsFontSize += 0.15;
    document.querySelectorAll(".lyric-line").forEach((l) => {
      l.style.fontSize = `${state.lyricsFontSize}rem`;
    });
  }
});

lyricsFontDecr.addEventListener("click", () => {
  if (state.lyricsFontSize > 0.8) {
    state.lyricsFontSize -= 0.15;
    document.querySelectorAll(".lyric-line").forEach((l) => {
      l.style.fontSize = `${state.lyricsFontSize}rem`;
    });
  }
});

lyricsAutoScrollToggle.addEventListener("click", () => {
  state.lyricsAutoScroll = !state.lyricsAutoScroll;
  lyricsAutoScrollToggle.classList.toggle("active", state.lyricsAutoScroll);
  showToast(
    state.lyricsAutoScroll ? "Lyrics Auto-Scroll ON" : "Lyrics Auto-Scroll OFF",
    "fa-arrows-up-down"
  );
});

// ==========================================================================
// 11. Workspace Tab Switching
// ==========================================================================

tabBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    tabBtns.forEach((b) => b.classList.remove("active"));
    tabContents.forEach((c) => c.classList.remove("active"));

    btn.classList.add("active");
    const targetTab = document.getElementById(btn.dataset.tab);
    if (targetTab) {
      targetTab.classList.add("active");
      state.activeTab = btn.dataset.tab;
    }
  });
});

// ==========================================================================
// 12. Visualizer Mode Selector
// ==========================================================================

visModeBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    visModeBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    state.visualizerMode = btn.dataset.mode;
    showToast(`Visualizer: ${btn.title}`, "fa-chart-simple");
  });
});

themeToggleBtn.addEventListener("click", () => {
  const modes = ["bars", "wave", "glow"];
  const currIdx = modes.indexOf(state.visualizerMode);
  const nextMode = modes[(currIdx + 1) % modes.length];
  state.visualizerMode = nextMode;
  visModeBtns.forEach((b) => b.classList.toggle("active", b.dataset.mode === nextMode));
  showToast(`Visualizer: ${nextMode.toUpperCase()}`, "fa-wand-magic-sparkles");
});

// ==========================================================================
// 13. Sleep Timer Engine
// ==========================================================================

function setSleepTimer(minutes) {
  if (state.sleepTimer) {
    clearInterval(state.sleepTimer);
    state.sleepTimer = null;
  }

  if (minutes === 0) {
    sleepTimerBadge.style.display = "none";
    showToast("Sleep Timer Disabled", "fa-moon");
    return;
  }

  if (minutes === "end") {
    // Stop at end of current track
    const remaining = Math.max(0, audio.duration - audio.currentTime);
    sleepTimerBadge.textContent = "Track End";
    sleepTimerBadge.style.display = "inline-block";
    showToast("Audio will stop at end of current track", "fa-moon");
    return;
  }

  state.sleepTimerRemaining = minutes * 60;
  sleepTimerBadge.textContent = `${minutes}m`;
  sleepTimerBadge.style.display = "inline-block";
  showToast(`Sleep Timer: ${minutes} Minutes`, "fa-moon");

  state.sleepTimer = setInterval(() => {
    state.sleepTimerRemaining--;
    if (state.sleepTimerRemaining <= 0) {
      clearInterval(state.sleepTimer);
      state.sleepTimer = null;
      sleepTimerBadge.style.display = "none";
      pauseTrack();
      showToast("Sleep timer finished. Audio paused.", "fa-bed");
    } else {
      const minsLeft = Math.ceil(state.sleepTimerRemaining / 60);
      sleepTimerBadge.textContent = `${minsLeft}m`;
    }
  }, 1000);
}

sleepTimerBtn.addEventListener("click", () => {
  sleepTimerModal.classList.add("open");
});

closeSleepTimerModal.addEventListener("click", () => {
  sleepTimerModal.classList.remove("open");
});

timerPresetBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const mins = btn.dataset.minutes;
    setSleepTimer(mins === "end" ? "end" : parseInt(mins, 10));
    sleepTimerModal.classList.remove("open");
  });
});

// ==========================================================================
// 14. Keyboard Shortcuts & Modals
// ==========================================================================

shortcutsBtn.addEventListener("click", () => shortcutsModal.classList.add("open"));
closeShortcutsModal.addEventListener("click", () => shortcutsModal.classList.remove("open"));

[shortcutsModal, sleepTimerModal].forEach((modal) => {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.remove("open");
  });
});

window.addEventListener("keydown", (e) => {
  // Ignore shortcuts when typing in search input
  if (document.activeElement === searchInput) {
    if (e.key === "Escape") {
      searchInput.blur();
    }
    return;
  }

  switch (e.key) {
    case " ":
      e.preventDefault();
      togglePlayPause();
      break;
    case "ArrowRight":
      if (e.shiftKey) {
        nextTrack();
      } else {
        e.preventDefault();
        audio.currentTime = Math.min(audio.duration || 0, audio.currentTime + 5);
        showToast(`Forward +5s (${formatTime(audio.currentTime)})`, "fa-forward");
      }
      break;
    case "ArrowLeft":
      if (e.shiftKey) {
        prevTrack();
      } else {
        e.preventDefault();
        audio.currentTime = Math.max(0, audio.currentTime - 5);
        showToast(`Backward -5s (${formatTime(audio.currentTime)})`, "fa-backward");
      }
      break;
    case "ArrowUp":
      e.preventDefault();
      updateVolume(state.volume + 0.05);
      showToast(`Volume: ${Math.round(state.volume * 100)}%`, "fa-volume-high");
      break;
    case "ArrowDown":
      e.preventDefault();
      updateVolume(state.volume - 0.05);
      showToast(`Volume: ${Math.round(state.volume * 100)}%`, "fa-volume-low");
      break;
    case "m":
    case "M":
      toggleMute();
      break;
    case "n":
    case "N":
      nextTrack();
      break;
    case "p":
    case "P":
      prevTrack();
      break;
    case "l":
    case "L":
      if (state.playlist[state.currentTrackIndex]) {
        toggleFavorite(state.playlist[state.currentTrackIndex].id);
      }
      break;
    case "s":
    case "S":
      toggleShuffleMode();
      break;
    case "r":
    case "R":
      toggleRepeatMode();
      break;
    case "y":
    case "Y":
      document.getElementById("tabLyricsBtn").click();
      break;
    case "e":
    case "E":
      document.getElementById("tabEqBtn").click();
      break;
    case "q":
    case "Q":
      document.getElementById("tabQueueBtn").click();
      break;
    case "?":
      shortcutsModal.classList.toggle("open");
      break;
    case "Escape":
      shortcutsModal.classList.remove("open");
      sleepTimerModal.classList.remove("open");
      speedMenu.classList.remove("open");
      break;
  }
});

// ==========================================================================
// 15. OS Media Session Integration
// ==========================================================================

function updateMediaSession(track) {
  if ("mediaSession" in navigator) {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: track.name,
      artist: track.artist,
      album: track.album || "AuraStream",
      artwork: [
        { src: track.img, sizes: "96x96", type: "image/jpeg" },
        { src: track.img, sizes: "256x256", type: "image/jpeg" },
        { src: track.img, sizes: "512x512", type: "image/jpeg" }
      ]
    });

    navigator.mediaSession.setActionHandler("play", playTrack);
    navigator.mediaSession.setActionHandler("pause", pauseTrack);
    navigator.mediaSession.setActionHandler("previoustrack", prevTrack);
    navigator.mediaSession.setActionHandler("nexttrack", nextTrack);
    navigator.mediaSession.setActionHandler("seekto", (details) => {
      if (details.seekTime !== undefined) {
        audio.currentTime = details.seekTime;
      }
    });
  }
}

// ==========================================================================
// 16. Toast Notifications Engine & Utilities
// ==========================================================================

function showToast(message, icon = "fa-circle-info") {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${escapeHtml(message)}</span>`;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("toast-out");
    setTimeout(() => toast.remove(), 250);
  }, 2500);
}

function escapeHtml(str) {
  if (!str) return "";
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

// Speed Dropdown Trigger
speedBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  speedMenu.classList.toggle("open");
});

document.querySelectorAll(".speed-option").forEach((opt) => {
  opt.addEventListener("click", () => {
    setPlaybackSpeed(parseFloat(opt.dataset.speed));
  });
});

window.addEventListener("click", () => {
  speedMenu.classList.remove("open");
});

// Control Buttons Direct Listeners
playPauseBtn.addEventListener("click", togglePlayPause);
nextBtn.addEventListener("click", nextTrack);
prevBtn.addEventListener("click", prevTrack);
shuffleBtn.addEventListener("click", toggleShuffleMode);
repeatBtn.addEventListener("click", toggleRepeatMode);
likeTrackBtn.addEventListener("click", () => {
  if (state.playlist[state.currentTrackIndex]) {
    toggleFavorite(state.playlist[state.currentTrackIndex].id);
  }
});
muteBtn.addEventListener("click", toggleMute);
volumeSlider.addEventListener("input", (e) => {
  updateVolume(e.target.value / 100);
});

// ==========================================================================
// 17. Initialization
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
  loadTrack(0, false);
  updateVolume(state.volume);
});
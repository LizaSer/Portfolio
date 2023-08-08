const musicContainer = document.getElementById("music-container");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const audioPlayer = document.getElementById("audio-player");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const title = document.getElementById("title");
const singer = document.getElementById("singer");
const imgCover = document.getElementById("img-cover");

const playIcon = document.getElementById("play-icon");

const songs = [
  "Boulevard of broken dreams",
  "In the end",
  "I'm good",
  "Live Like A Warrior",
  "Party Animal",
  "Smells Like Teen Spirit",
  "So What",
  "It's My Life",
  "One Day",
];
const singers = [
  "Green Day",
  "Linkin Park",
  "Devid Guetta & Bebe Rexha",
  "Matisyahu",
  "Charly Black Luis Fonsi",
  "Nirvana",
  "Pink",
  "Bon Jovi",
  "Matisyahu",
];

let songIndex = 1;
loadSong(songs[songIndex]);

function loadSong(songName) {
  title.innerText = songName;
  singer.innerHTML = singers[songIndex];
  audioPlayer.src = `music/${songName}.mp3`;
  imgCover.src = `img/${songName}.jpg`;
}

function playSong() {
  musicContainer.classList.add("play");
  playIcon.classList.remove("bi-play");
  playIcon.classList.add("bi-pause");

  audioPlayer.play();
}

function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

function nextSong() {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audioPlayer.duration;

  audioPlayer.currentTime = (clickX / width) * duration;
}

function pauseSong() {
  musicContainer.classList.remove("play");
  playIcon.classList.add("bi-play");
  playIcon.classList.remove("bi-pause");

  audioPlayer.pause();
}

playBtn.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

audioPlayer.addEventListener("timeupdate", updateProgress);
progressContainer.addEventListener("click", setProgress);

audioPlayer.addEventListener("ended", nextSong);

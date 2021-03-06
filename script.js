const musicContainer = document.getElementById("music-container");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
// const favorite = document.querySelector(".fas");
const heart = document.querySelector(".heart");

const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const title = document.getElementById("title");
const cover = document.getElementById("cover");

//Set somg title

const songs = [
  "hey",
  "summer",
  "homecoming",
  "blurred lines",
  "ukulele",
  "rainbow",
  "bojangles",
  "pombe sigara",
  "la poupee",
  "baby",
  "darker",
  "heaven-sent",
  "bestfriend",
  "awekening",
  "go-on",
  "royals",
  "old town road",
  "star",
  "way-down",
  "bang bang",
];

//Keep track of song

let songIndex = 4;

//Load song details into DOM initialy

loadSong(songs[songIndex]);

//Update song details

function loadSong(song) {
  title.innerText = song;
  heart.classList.add("fas", "fa-heart");
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
}

//Play song

function playSong() {
  musicContainer.classList.add("play");
  playBtn.querySelector("i.fas").classList.remove("fa-play");
  playBtn.querySelector("i.fas").classList.add("fa-pause");

  audio.play();
}

//Pause Song

function pauseSong() {
  musicContainer.classList.remove("play");
  playBtn.querySelector("i.fas").classList.add("fa-play");
  playBtn.querySelector("i.fas").classList.add("fa-pause");

  audio.pause();
}

//Play prevSong

function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);

  playSong();
}

//Play Next Song

function nextSong() {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);

  playSong();
}

//Update progress bar

function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

//Set progress bar

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

// Event listeners
playBtn.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

//Change song

prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

//Time/song update

audio.addEventListener("timeupdate", updateProgress);

//Click om progres bar

progressContainer.addEventListener("click", setProgress);

//Song ends

audio.addEventListener("ended", nextSong);

//Like

heart.addEventListener("click", (e) => {
  heart.classList.toggle("liked");
});

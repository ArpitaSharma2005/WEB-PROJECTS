let progress = document.getElementById("progress");
let song = document.getElementById("song");
let ctrlIcon = document.getElementById("ctrlIcon");

// Set max progress when metadata loads
song.onloadedmetadata = function () {
  progress.max = song.duration;
  progress.value = song.currentTime;
};

// Play/Pause function
function playPause() {
  if (song.paused) {
    song.play();
    ctrlIcon.classList.remove("ri-play-fill");
    ctrlIcon.classList.add("ri-pause-fill");
  } else {
    song.pause();
    ctrlIcon.classList.remove("ri-pause-fill");
    ctrlIcon.classList.add("ri-play-fill");
  }
}

// Update progress bar as song plays
setInterval(() => {
  progress.value = song.currentTime;
}, 500);

// When user changes progress bar manually
progress.onchange = function () {
  song.currentTime = progress.value;
  song.play();
  ctrlIcon.classList.remove("ri-play-fill");
  ctrlIcon.classList.add("ri-pause-fill");
};

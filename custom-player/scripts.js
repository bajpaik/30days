const player = document.querySelector('.player');
const video = player.querySelector('.viewer');

const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelector('[data-skip]');
const ranges = player.querySelector('.player__slider');

/**
 * Plays the video via toggling the paused attribute of the video element.
 */
 function togglePlay() {
 	// if(video.paused) video.play();
 	// else video.pause();
 	// more advanced syntax using terinary operator to call play() || pause()
 	const method = video.paused ? 'play' : 'pause';
 	video[method](); 
 }

 /**
  * Updates the play/pause button according to the status of the video. If the
  * video is playing, then it displays a pause toggle, if not, then the play 
  * toggle is displayed. 
  */ 
  function updateButton() {
  	console.log('updated the button'); // check 
  }
  
 // EVENT LISTENERS:
 video.addEventListener('click', togglePlay); // click video play/pause
 toggle.addEventListener('click', togglePlay); // click toggle play/pause




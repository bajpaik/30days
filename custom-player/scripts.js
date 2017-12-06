const player = document.querySelector('.player');
const video = player.querySelector('.viewer');

const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelector('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
let mousedown = false;

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
  	const icon = this.paused ? ">>" : "||";
  	// can use "this" keyword, since the event was triggered from the video element 
  	toggle.textContent = icon;
  	// console.log('updated the button'); // check 
  }

  /**
   * Skips data in the video, according to which skip button was selected by the
   * user. 
   */
   function skip() {
   	// console.log("Check for skip log");
   	console.log(this.dataset);
   	/* DATASET:
   		The dataset attribute gives access to the HTML's data-"propName" value.
   		Here, this is where data-skip was defined in the video HTML object. 
   			EX: DOMStringMap
   				 skip : "25"  (Since the 25 second toggle button was clicked) 
   	*/
   	console.log(this.dataset.skip);
   	video.currentTime += parseFloat(this.dataset.skip); 
   	// need to parse the skip value since it's returned as a String. 
   }

   /**
    * Handles the events fired when adjusting the range sliders for the volume
    * and speed sliders.
    */
    function handleRangeUpdate() {
    	// console.log(this.value); 
    	// This is the value that is needed, so this.value can be used to set the property.
    	//console.log(this.name);
    	// notice that the name of the property is logged. 
    	video[this.name] = this.value;
    }

    function handleProgress() {
    	// representation of how much time has ellapsed vs the duratino of the video.
    	const percent = (video.currentTime / video.duration) * 100;
    	// flex-basis value is essentially the width of the progress bar.
    	progressBar.style.flexBasis = `${percent}%`;
    }

    /**
     * Moves the progress barto the spot where the user clicked and advances the
     * video data accordingly.
     * e: The event that was fired on the video.
     */
    function scrub(e) {
    	// console.log(e); logs all properties that are accessible from the event.
    	const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    	video.currentTime = scrubTime;
    }

 // EVENT LISTENERS:
 video.addEventListener('click', togglePlay); // click video play/pause
 video.addEventListener('play', updateButton); // play || pause display toggle
 video.addEventListener('pause', updateButton); // click toggle play/pause
 toggle.addEventListener('click', togglePlay); // play || pause display toggle
 /* The play and pause events are triggered when the video is correspondingly 
 		clicked to play or pause. Once these are detected, the updateButton should
 		be called to make it show what behaivor will be performed once clicked. */
 ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
 ranges.forEach(range => addEventListener('mousemove', handleRangeUpdate));
 video.addEventListener('timeupdate', handleProgress); // could also have used PROGRESS instead of TIMEUPDATE
 // change the flag variable (mousedown) to true/false via inline function.
 progress.addEventListener('mousedown', () => mousedown = true);
 progress.addEventListener('mouseup', () => mousedown = false);
 /* run the scrub function when the flag variable is TRUE. Since the left-var is tested first,
 		the scrub function will not run if the user is not holding down the mouse. */
 progress.addEventListener('mousemove', (e) => mousedown && scrub(e));






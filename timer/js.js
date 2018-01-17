let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
  // clear any timers that may already be queued
  clearInterval(countdown);
    const now = Date.now();
    const then = now + seconds * 1000;
    //run immediately once
    displayTimeLeft(seconds);
    displayEndTime(then)

    countdown = setInterval(() => {
        // cannot use now, since it was captured at the time this was ran.
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        if (secondsLeft < 0) {
            clearInterval(countdown);
            return;
        }

        //display it
        displayTimeLeft(secondsLeft);
    }, 1000);
}

function displayTimeLeft(seconds) {

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    // console.log(minutes, remainingSeconds);
    const display = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    timerDisplay.textContent = display;
    document.title = display;
}

function displayEndTime(timestamp) {
    const end = new Date(timestamp);
    const hour = end.getHours();
    const minutes = end.getMinutes();
    endTime.textContent = `Be Back At ${hour > 12 ? hour - 12 : hour}:${minutes}`;
}

function startTimer() {
  // console.log(this.dataset);
  const seconds = parseInt(this.dataset.time); // a string is returned unless parsed
  timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function(e) {
  e.preventDefault(); //need this to prevent reloading the page and resetting the data
  const mins = this.minutes.value; // "this" is the form, so this.minutes.value gives you access to the forms minutes
  //console.log(mins);  //proof of above
  timer(mins * 60); // Form specifies minutes, but timer works on seconds; convert
  this.reset(); // reset the form value!
});
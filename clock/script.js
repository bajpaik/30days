  const secondHand = document.querySelector(".second-hand");
  const minsHand = document.querySelector(".min-hand");
  const hourHand = document.querySelector(".hour-hand");

  function setDate() {
    const date = new Date(); 
      // Grab a new date to get the time params 
      const seconds = date.getSeconds();
      const secDegrees = ((seconds / 60) * 360) + 90; 
      // representation of degrees per second
      // Add 90 degrees to counter the initial offset that I used to place the second hand in a vertical position.
      secondHand.style.transform = `rotate(${secDegrees}deg)`;
      // This tells the second hand to rotate a set amount of degrees per second by using the secDegrees calculation above and the transform method.
      // Make sure you're using the ` mark and not a '' for query selectors!
      //console.log(seconds);

      const mins = date.getMinutes();
      const minsDegrees = ((mins/ 60) * 360) + 90;
      minsHand.style.transform = `rotate(${minsDegrees}deg)`;

      const hour = date.getHours();
      const hourDegrees = ((hour / 12) * 360) + 90;
      hourHand.style.transform = `rotate(${hourDegrees}deg)`;
    }
    $(document).ready(function() {
      setInterval(setDate, 1000);
    }); 
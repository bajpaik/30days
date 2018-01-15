let countdown;

  function timer(seconds) {
    const now = Date.now();
    const then = now + seconds * 1000;

    countdown = setInterval(() => {
      // cannot use now, since it was captured at the time this was ran.
      const secondsLeft = Math.round(then - (Date.now() / 1000));
      if(secondsLeft < 0) {
        clearInterval(countdown);
      }
    });
  }
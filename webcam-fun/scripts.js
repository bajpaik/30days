const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');


function getVideo() {
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then(localMediaStream => {
            console.log(localMediaStream);
            video.src = window.URL.createObjectURL(localMediaStream);
            video.play();
        })
        .catch(err => {
            console.error("Error with video", err);
        });
}

//put video to canvas
function paintToCanvas() {
    // get video dimensions 
    const width = video.videoWidth;
    const height = video.videoHeight;
    // make sure the canvas can contain the video.
    canvas.width = width;
    canvas.height = height;
    // Draw the image from video to canvas every X seconds with drawImage
    return setInterval(() => {
        ctx.drawImage(video, 0, 0, width, height);
        // arguments are input, X0, Y0, X1,Y1)
        let pixels = ctx.getImageData(0, 0, width, height);
        // pixels = redEffect(pixels);
        pixels = rgbSplit(pixels);
        ctx.globalAlpha = 0.2;
        ctx.putImageData(pixels, 0, 0);
    }, 16);
}

function takePhoto() {
    // set shutter sound to 0
    snap.currentTime = 0;
    // play sound on each photo taken
    snap.play();
    // take the current image on the canvas (video frame) and make it img format
    const data = canvas.toDataURL('image/jpeg');
    // create anchor element
    const link = document.createElement('a');
    // add the href property and assign the data from your image
    link.href = data;
    // setting a new attribute called download to a flame emoji :)
    link.setAttribute('download', 'you-look-awesome');
    // adding the image snapshop to the html page
    link.innerHTML = `<img src="${data}" alt="Awesome picture!"/>`;
    // inserting the image as the first child, which will make sure the last photo is placed first.
    strip.insertBefore(link, strip.firstChild);
}

/**
 * Takes each pixel in argument and shifts the color to achive a more red-like 
 * appearance. 
 * @param pixels: array of pixel data from the canvas
 * @return pixels: altered pixel data.
 */
function redEffect(pixels) {
    for (let i = 0; i < pixels.data.length; i += 4) {
        pixels.data[i] = pixels.data[i] + 100; //shift more red.
        pixels.data[i + 1] = pixels.data[i + 1] - 50; // less green
        pixels.data[i + 2] = pixels.data[i + 2] * 0.5; // less blue 
    }
    return pixels;
}

/**
 * Shifts pixel content to separate/group red, green, and blue values.
 * @param pixels: array of pixel data from the canvas
 * @return pixels: altered pixel data.
 */
function rgbSplit(pixels) {
    for (let i = 0; i < pixels.data.length; i += 4) {
        pixels.data[i - 150] = pixels.data[i]; // set pixel data 150 pixels back to current
        pixels.data[i + 500] = pixels.data[i + 1];
        pixels.data[i - 550] = pixels.data[i + 2];
    }
    return pixels;
}

/**
 * Creates a green screen effect on the pixel content that's passed in as an array.
 * @param pixels: array of pixel data from the canvas
 * @return pixels: altered pixel data.
 */
function greenScreen(pixels) {
    const levels = {};

    document.querySelectorAll('.rgb input').forEach((input) => {
        levels[input.name] = input.value;
    });
    // loop over all pixels and get rbg values.
    for (i = 0; i < pixels.data.length; i = i + 4) {
        red = pixels.data[i + 0];
        green = pixels.data[i + 1];
        blue = pixels.data[i + 2];
        alpha = pixels.data[i + 3];
        // conditional statement that will set opacity to 0 if the current 
        // values are within the minimum values set by the sliders.
        if (red >= levels.rmin &&
            green >= levels.gmin &&
            blue >= levels.bmin &&
            red <= levels.rmax &&
            green <= levels.gmax &&
            blue <= levels.bmax) {
            // take it out by setting alpha (opacity) to zero)
            pixels.data[i + 3] = 0;
        }
    }

    return pixels;
}

getVideo();
// The video element fires an event called 'canplay' once the user clicks play,
// which is when it should start displaying on the canvas.
video.addEventListener('canplay', paintToCanvas);
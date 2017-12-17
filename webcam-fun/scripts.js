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
    setInterval(() => {
        ctx.drawImage(video, 0, 0, width, height);
        // arguments are input, X0, Y0, X1,Y1)
    }, 16);
}
video.getVideo();
// The video element fires an event called 'canplay' once the user clicks play,
// which is when it should start displaying on the canvas.
video.addEventListener('canplay', paintToCanvas);
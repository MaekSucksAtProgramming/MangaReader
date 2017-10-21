// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const fs = require('fs');


const ipc = require('electron').ipcRenderer

const selectDirBtn = document.getElementById('openfiles');

selectDirBtn.addEventListener('click', function (event) {
    ipc.send('open-file`-dialog')
})

/**
 * This line holds the folder selected
 */
ipc.on('selected-directory', function (event, files) {
    // TODO: Use the files paramter here to change the source images of the image array
    // imagesArray =  files;
});



/////////////////////////////////////////////

// let imagesArray = []
let imagesArray = [
    '../assets/images/1.jpg',
    '../assets/images/2.jpg',
    '../assets/images/3.jpg',
    '../assets/images/4.jpg',
    '../assets/images/5.jpg',
    '../assets/images/6.jpg',
    '../assets/images/7.jpg',
    '../assets/images/8.jpg',
    '../assets/images/9.jpg',
    '../assets/images/10.jpg',
    '../assets/images/11.jpg',
    '../assets/images/12.jpg',
    '../assets/images/13.jpg'
]

const image = document.getElementById('image-viewer');
const btn_left = document.getElementById('btn-left');
const btn_right = document.getElementById('btn-right'); 

btn_left.addEventListener('click', (event) => {
    previousImage()
});
btn_right.addEventListener('click', (event) => {
    nextImage()
});
image.addEventListener('click', (event) => {
    if (imagesArray.length > 0) {
        nextImage();
    } else {
        ipc.send('open-file-dialog');
    }
});

/**
 * Adds an event listener to the program that'll keep track of scroll
 * If people scroll up, deltaY = -100, down deltaT = 100
 * So we check the value and act accordingly
 */
image.addEventListener('wheel', (event) => {
    event.preventDefault();
    if(event.deltaY < 0 && !event.shiftKey) {
        nextImage();
    } else if ( event.deltaY > 0 && !event.shiftKey) {
        previousImage();
    }
});

// window.addEventListener('wheel', (event) => {
//     console.log('test');
// });

window.addEventListener('wheel', (event) => {
    /**
     * The event.shiftkey is a boolean, a true or false.
     * the code inside will only be accepted if the browser detects that shift is held.
     */
    if (event.shiftKey && event.deltaY < 0) {      
        zoomIn();
    } else if (event.shiftKey && event.deltaY > 0) {
        zoomOut();
    }
});
var zoomRatio = 1.0;
 

function zoomIn() {
    if (zoomRatio <= 1.8)
    zoomRatio = zoomRatio +0.2;
    image.style.transform = `scale(${zoomRatio})`;    
}

function zoomOut() {
    if (zoomRatio >= 0.4) {
        zoomRatio = zoomRatio - 0.2;
        image.style.transform = `scale(${zoomRatio})`; 
    }
      
}


/**
 * Has to a var to allow access beyond blockscope
 */
var imageIndex = 0;


function previousImage() {
    if (imageIndex > 0) {
        imageIndex = imageIndex - 1;
        image.src = imagesArray[imageIndex];
    }
}

function nextImage() {
    if (imageIndex < (imagesArray.length - 1)) {
        imageIndex = imageIndex + 1;
        image.src = imagesArray[imageIndex];
    }
}

document.onkeydown = function (e) {
    e = e || window.event;
    if (e.keyCode == '37') {
        //left <- show Prev image
        previousImage()
    } else if (e.keyCode == '39') {
        // right -> show next image
        nextImage()
    }
}
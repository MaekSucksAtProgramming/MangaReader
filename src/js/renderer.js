// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const fs = require('fs');


const ipc = require('electron').ipcRenderer

const selectDirBtn = document.getElementById('openfiles');

selectDirBtn.addEventListener('click', function (event) {
    ipc.send('open-file-dialog')
})

/**
 * This line holds the folder selected
 */
ipc.on('selected-directory', function (event, files) {
    console.log('renderer clg');
    console.log(files);
});



/////////////////////////////////////////////

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
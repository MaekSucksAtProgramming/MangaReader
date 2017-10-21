// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const fs = require('fs');
const ipc = require('electron').ipcRenderer
const btn_openFiles = document.getElementById('openfiles');

btn_openFiles.addEventListener('click', function (event) {
    ipc.send('open-file-dialog')
})

/**
 * This line holds the folder selected
 */
ipc.on('opened-directory', (event, images) => {
    image.classList.remove('placeholder'); // Keep this

    // TODO: Dread, add code here.
    // When you click the lewd anime girl, you can select a folder
    // after selecting a folder the images will arrive here in the images variable
    // images = string[], a collection of image paths

});


/////////////////////////////////////////////

/**
 * Replace below imagesArray[] with an empty array once we got image loading going
 */
let imagesArray = [];

const image = document.getElementById('image-viewer');
const btn_left = document.getElementById('btn-left');
const btn_right = document.getElementById('btn-right');
const btn_sidebar = document.getElementById('btn-sidebar-toggle');
const btn_zoomIn = document.getElementById('zoom_in');
const btn_zoomOut = document.getElementById('zoom_out');
const sidebar = document.getElementById('sidebar');

/* Set placeholder */
if (imagesArray.length === 0) {
    image.src = '../assets/images/placeholder.png';
    image.classList.add('placeholder');
}

btn_zoomIn.addEventListener('click', (event) => {
    zoomIn();
});
btn_zoomOut.addEventListener('click', (event) => {
    zoomOut();
});

btn_left.addEventListener('click', (event) => {
    previousImage();
});
btn_right.addEventListener('click', (event) => {
    nextImage();
});
image.addEventListener('click', (event) => {
    if (imagesArray.length > 0) {
        nextImage();
    } else {
        ipc.send('open-file-dialog');
    }
});
var isSidebarShown = false;
btn_sidebar.addEventListener('click', (event) => {
    /**
     * If shown, hide
     */
    if (isSidebarShown) {
        sidebar.classList.remove('sidebar-show');
        btn_sidebar.classList.remove('btn-active');
        isSidebarShown = false;
    }
    /**
     * if hidden, show
     */
    else {
        sidebar.classList.add('sidebar-show');
        btn_sidebar.classList.add('btn-active');
        isSidebarShown = true;
    }
});

/**
 * Adds an event listener to the program that'll keep track of scroll
 * If people scroll up, deltaY = -100, down deltaT = 100
 * So we check the value and act accordingly
 */
image.addEventListener('wheel', (event) => {
    event.preventDefault();
    if (event.deltaY < 0 && !event.shiftKey) {
        nextImage();
    } else if (event.deltaY > 0 && !event.shiftKey) {
        previousImage();
    }
});

/**
 * The event.shiftkey is a boolean, a true or false.
 * the code inside will only be accepted if the browser detects that shift is held.
 */
window.addEventListener('wheel', (event) => {
    if (event.shiftKey && event.deltaY < 0) {
        zoomIn();
    } else if (event.shiftKey && event.deltaY > 0) {
        zoomOut();
    }
});
var zoomRatio = 1.0;


function zoomIn() {
    if (zoomRatio <= 1.8)
        zoomRatio = zoomRatio + 0.2;
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
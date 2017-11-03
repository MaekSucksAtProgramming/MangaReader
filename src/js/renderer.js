// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const fs = require('fs');
const ipc = require('electron').ipcRenderer
const naturalSort = require('./utils.js');


window.Tesseract = Tesseract.create({
    langPath: 'https://cdn.rawgit.com/naptha/tessdata/gh-pages/3.02/',
    corePath: 'https://cdn.rawgit.com/naptha/tesseract.js-core/0.1.0/index.js',
})


/**
 * This line holds the folder selected
 */
ipc.on('opened-directory', (event, images) => {
    image.classList.remove('placeholder'); // Keep this
    imagesArray = images;
    imagesArray.sort(naturalSort);
    console.log(imagesArray);
    image.src = imagesArray[0];
});


/////////////////////////////////////////////

/* Declerations */
let imagesArray = [];
var isSidebarShown = false;
var zoomRatio = 1.0;
var imageIndex = 0;
const btn_openFiles = document.getElementById('openfiles');
const image = document.getElementById('image-viewer');
const btn_left = document.getElementById('btn-left');
const btn_right = document.getElementById('btn-right');
const btn_sidebar = document.getElementById('btn-sidebar-toggle');
const btn_zoomIn = document.getElementById('zoom_in');
const btn_zoomOut = document.getElementById('zoom_out');
const btn_ocr = document.getElementById('ocr');
const sidebar = document.getElementById('sidebar');
const counter = document.getElementById('page-counter');

/* Set placeholder */
if (imagesArray.length === 0) {
    image.src = '../assets/images/placeholder.png';
    image.classList.add('placeholder');
}
//region
/* Event listeners*/
btn_openFiles.addEventListener('click', (event) => {
    ipc.send('open-file-dialog')
})
btn_ocr.addEventListener('click', (event) => {
    // ipc.send('perform-ocr', imagesArray[imageIndex])
    // temp
    Tesseract.recognize(image, 'jpn')
        .then(function (result) {
            console.log('result', result)
        })
})

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

image.addEventListener('wheel', (event) => {
    event.preventDefault();
    if (event.deltaY < 0 && !event.shiftKey) {
        nextImage();
    } else if (event.deltaY > 0 && !event.shiftKey) {
        previousImage();
    }
});

window.addEventListener('wheel', (event) => {
    if (event.shiftKey && event.deltaY < 0) {
        zoomIn();
    } else if (event.shiftKey && event.deltaY > 0) {
        zoomOut();
    }
});

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
//endregion

// Functions
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
<<<<<<< HEAD
}
=======
}

function countPage() {
    if (imageIndex < 0) {
        counter.classList.remove('.page-counter')
    } else {
        counter.innerHTML = `<p>${imageIndex}/${imagesArray.length}</p>`;
    }
}
>>>>>>> fb75d174128b47895f58850bd25ddce9d738ad17

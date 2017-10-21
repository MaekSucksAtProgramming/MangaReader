let imagesArray = [
    '../assets/images/1.png',
    '../assets/images/2.png',
    '../assets/images/3.png',
    '../assets/images/4.jpg',
    '../assets/images/5.jpg'
]

const image = document.getElementById('image-viewer');
const btn_left = document.getElementById('btn-left');
const btn_right = document.getElementById('btn-right');

btn_left.addEventListener('click', (event) => { previousImage() });
btn_right.addEventListener('click', (event) => { nextImage() });

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
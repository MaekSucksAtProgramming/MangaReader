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
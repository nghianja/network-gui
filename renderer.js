// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const {ipcRenderer} = require('electron')

ipcRenderer.on('readTopo', (event, arg) => {
    console.log("Topology File: " + arg);
})
ipcRenderer.on('readLog', (event, arg) => {
    console.log("Log File: " + arg);
})

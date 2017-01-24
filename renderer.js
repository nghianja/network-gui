// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const {ipcRenderer} = require('electron')

ipcRenderer.on('readTopo', (event, arg) => {
  console.log("Topology File: " + arg);
})
ipcRenderer.on('readBots', (event, arg) => {
  console.log("Bots Log: " + arg);
})
ipcRenderer.on('readBotControl', (event, arg) => {
  console.log("Bot Control Log: " + arg);
})
ipcRenderer.on('readServers', (event, arg) => {
  console.log("Servers Log: " + arg);
})
ipcRenderer.on('readSwitches', (event, arg) => {
  console.log("Switches Log: " + arg);
})

let logs = require('./logs');
const {ipcRenderer} = require('electron');

module.exports.readFiles = function() {
    ipcRenderer.send('main', 'reading logs');
    logs.readFile('anode-0');
    logs.readFile('anode-1');
};

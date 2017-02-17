let fs = require('fs');
let logs = require('./logs');
let path = require('path');
const {ipcRenderer} = require('electron');

module.exports.readFiles = function(dir) {
    ipcRenderer.send('main', 'reading logs');
    fs.readdir(path.join(__dirname, '/logs_output'), (err, dir) => {
        ipcRenderer.send('main', 'number of files: ' + dir.length);
        for (i = 0, path; path = dir[i]; i++) {
            // ipcRenderer.send('main', path);
            logs.readFile(path)
        }
    });
};

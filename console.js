const electron = require('electron');
const BrowserWindow = electron.BrowserWindow;
const path = require('path');
const url = require('url');

var main = require('./main');

let consoleWindow;
this.getConsole = function () {
    return consoleWindow;
};

function createConsole(mainWindow) {
    consoleWindow = new BrowserWindow({ parent: mainWindow, show: false });
    consoleWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'console.html'),
        protocol: 'file:',
        slashes: true
    }));
    consoleWindow.on('closed', function () {
        consoleWindow = null
    })
}

module.exports.showConsole = function(mainWindow) {
    if (consoleWindow == null) {
        createConsole(mainWindow)
    }
    consoleWindow.show()
};

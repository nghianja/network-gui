let path = require('path');
let fs = require('fs');
const {ipcRenderer} = require('electron')

module.exports.readFile = function() {
    let p = path.join(__dirname, '/logs_output', 'anode-0');
    fs.readFile(p, 'utf8', function (err, data) {
        if (err) return console.log(err);

        // data is the contents of the text file we just read
        ipcRenderer.send('main', data);
    });
};

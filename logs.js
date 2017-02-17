let path = require('path');
let fs = require('fs');
const {ipcRenderer} = require('electron');

module.exports.readFile = function(node) {
    let p = path.join(__dirname, '/logs_output', node);
    fs.readFile(p, 'utf8', function (err, data) {
        if (err) return console.log(err);

        // data is the contents of the text file we just read
        // ipcRenderer.send('main', data);
        parseLog(data);
    });
};

function parseLog(data) {
    var lines = data.split(/\s+/g);
    var lastLineIsEmpty = false;
    if (lines[lines.length - 1].length == 0) {
        lastLineIsEmpty = true;
        // ipcRenderer.send('main', 'input has ' + (lines.length - 1) + ' lines of data');
    }
    ipcRenderer.send('main', 'node: ' + lines[0]);
    var numOfPorts = 0;
    var endLine = 0;
    if (lastLineIsEmpty) {
        numOfPorts = (lines.length - 2) / 2;
        endLine = lines.length - 1;
    } else {
        numOfPorts = (lines.length - 1) / 2;
        endLine = lines.length;
    }
    ipcRenderer.send('main', 'number of ports: ' + numOfPorts);
    for(i = 1; i < endLine; i++){
        var parts = lines[i].split(',');
        // ipcRenderer.send('main', 'number of parts: ' + parts.length);
        ipcRenderer.send('main', 'port: ' + parts[0].substring(0, 4));
        if (parts[0].endsWith('inp')) {
            ipcRenderer.send('main', 'type of traffic: input');
        } else {
            ipcRenderer.send('main', 'type of traffic: output');
        }
        ipcRenderer.send('main', 'throughput: ' + parts.slice(1));
    }
}

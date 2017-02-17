const fs = require('fs');
const path = require('path');
const {ipcRenderer} = require('electron');
let nodes = [];
const logsMap = new Map();

module.exports.getLogsMap = function() {
    return logsMap;
};

module.exports.readFiles = function() {
    ipcRenderer.send('main', 'reading logs');
    nodes = fs.readdirSync(path.join(__dirname, '/logs_output'));
    ipcRenderer.send('main', 'number of files: ' + nodes.length);
    nodes.forEach(function(item, index, array) {
        readFile(item);
    });
    logsMap.forEach(function(value, key) {
        // ipcRenderer.send('main', key + ': ' + value);
        ipcRenderer.send('main', 'name: ' + value.get('name'));
        ipcRenderer.send('main', 'numOfPorts: ' + value.get('numOfPorts'));
        let portNames = value.get('portNames');
        ipcRenderer.send('main', 'portNames: ' + portNames);
        portNames.forEach(function(currentValue, index, array) {
            ipcRenderer.send('main', 'port: ' + currentValue);
            ipcRenderer.send('main', 'input: ' + value.get('ports').get(currentValue).get('input'));
            ipcRenderer.send('main', 'output: ' + value.get('ports').get(currentValue).get('output'));
        });
    });
};

function readFile(file) {
    let p = path.join(__dirname, '/logs_output', file);
    parseLog(fs.readFileSync(p, 'utf8'));
}

function parseLog(data) {
    let lines = data.split(/\s+/g);
    let lastLineIsEmpty = false;
    if (lines[lines.length - 1].length == 0) {
        lastLineIsEmpty = true;
        // ipcRenderer.send('main', 'input has ' + (lines.length - 1) + ' lines of data');
    }
    const nodeMap = new Map();
    // ipcRenderer.send('main', 'node: ' + lines[0]);
    nodeMap.set('name', lines[0]);
    let numOfPorts = 0;
    let endLine = 0;
    if (lastLineIsEmpty) {
        numOfPorts = (lines.length - 2) / 2;
        endLine = lines.length - 1;
    } else {
        numOfPorts = (lines.length - 1) / 2;
        endLine = lines.length;
    }
    // ipcRenderer.send('main', 'number of ports: ' + numOfPorts);
    nodeMap.set('numOfPorts', numOfPorts);
    let portNames = [];
    const ports = new Map();
    for(i = 1; i < endLine; i++){
        let parts = lines[i].split(',');
        // ipcRenderer.send('main', 'number of parts: ' + parts.length);
        // ipcRenderer.send('main', 'port: ' + parts[0].substring(0, 4));
        let portName = parts[0].substring(0, 4);
        if (portNames.indexOf(portName) == -1) {
            portNames.push(portName);
            ports.set(portName, new Map());
        }
        if (parts[0].endsWith('inp')) {
            // ipcRenderer.send('main', 'type of traffic: input');
            ports.get(portName).set('input', parts.slice(1));
        } else {
            // ipcRenderer.send('main', 'type of traffic: output');
            ports.get(portName).set('output', parts.slice(1));
        }
        // ipcRenderer.send('main', 'throughput: ' + parts.slice(1));
    }
    nodeMap.set('ports', ports);
    nodeMap.set('portNames', portNames);
    logsMap.set(lines[0], nodeMap);
}


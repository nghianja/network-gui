const fs = require('fs');
const path = require('path');
const {ipcRenderer} = require('electron');
const logsMap = new Map();
const utils = require('./utils');
require('./data_topology');

let nodes = [];
numberOfNodes = 68 // (22*3 + central switch)
numberOfTimes = 88;
timestampLabels = [];
for (i = 0; i < numberOfTimes; i++) {
    timestampLabels.push(i);
}
networkData_overall = [numberOfTimes];
cpuData_overall = [numberOfTimes];

module.exports.getNodes = function() {
    return nodes;
};

module.exports.getLogsMap = function() {
    return logsMap;
};

module.exports.loadLogs = function() {
    ipcRenderer.send('main', 'reading logs');
    nodes = fs.readdirSync(path.join(__dirname, '/logs_output'));
    ipcRenderer.send('main', 'number of files: ' + nodes.length);
    nodes.forEach(function(item, index, array) {
        readFile(item);
    });

    // network data
    for (i = 0; i < numberOfTimes; i++) {
        let total = 0;
        for (j = 0; j < nodes.length; j++) {
            total = Number(total) + Number(logsMap.get(nodes[j]).get('total')[i]);
        }
        networkData_overall[i] = total;
    }

    // random cpu data
    cpuData = [numberOfNodes + 1];
    for (i = 0; i < numberOfNodes; i++) {
        cpuData[i] = [numberOfTimes];
        for (j = 0; j < numberOfTimes; j++) {
            cpuData[i][j] = utils.getRandomInt(0, 100);
        }
    }

    cpuData[numberOfNodes] = cpuData_overall;
    for (i = 0; i < numberOfTimes; i++) {
        var cpuTotal = 0;
        for (j = 0; j < numberOfNodes; j++) {
            cpuTotal = cpuTotal + cpuData[j][i];
        }
        cpuData_overall[i] = Math.floor(cpuTotal / numberOfNodes);
    }
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
    }
    // ipcRenderer.send('main', 'throughput: ' + parts.slice(1));
    for (i = 0; i < portNames.length; i++) {
        let total = [];
        for (j = 0; j < ports.get(portNames[i]).get('input').length; j++) {
            total.push(Number(ports.get(portNames[i]).get('input')[j]) +
                Number(ports.get(portNames[i]).get('output')[j]));
        }
        ports.get(portNames[i]).set('total', total);
        // console.log(lines[0] + ' - ' + portNames[i] + ': input ' + ports.get(portNames[i]).get('input').length +
        //     ' output ' + ports.get(portNames[i]).get('output').length);
    }
    let total = [];
    for (i = 0; i < ports.get(portNames[0]).get('input').length; i++) {
        let sum = 0;
        for (j = 0; j < portNames.length; j++) {
            sum = Number(sum) + Number(ports.get(portNames[j]).get('total')[i]);
        }
        total.push(sum);
    }
    nodeMap.set('total', total);
    nodeMap.set('ports', ports);
    nodeMap.set('portNames', portNames);
    logsMap.set(lines[0], nodeMap);
}
